const { setGlobalOptions } = require('firebase-functions')
const { onCall, onRequest, HttpsError } = require('firebase-functions/https')
const { defineSecret } = require('firebase-functions/params')
const admin = require('firebase-admin')

admin.initializeApp()
setGlobalOptions({ invoker: 'public', maxInstances: 10 })

const stripeSecretKey = defineSecret('STRIPE_SECRET_KEY')
const stripeWebhookSecret = defineSecret('STRIPE_WEBHOOK_SECRET')

const ADMIN_EMAIL = 'aidenyasharian@gmail.com'

exports.createInvoice = onCall({
  invoker: 'public',
  secrets: [stripeSecretKey],
}, async (request) => {
  if (request.auth?.token?.email !== ADMIN_EMAIL) {
    throw new HttpsError('permission-denied', 'Admin only')
  }

  const { projectCode, projectName, description, amount, dueDate, successUrl, cancelUrl } = request.data
  const normalizedAmount = Number(amount)

  if (!projectCode || !description || !normalizedAmount) {
    throw new HttpsError('invalid-argument', 'projectCode, description, and amount are required')
  }

  if (!Number.isFinite(normalizedAmount) || normalizedAmount <= 0) {
    throw new HttpsError('invalid-argument', 'Invoice amount must be greater than zero')
  }

  const dueDateValue = dueDate ? new Date(dueDate) : null
  if (dueDateValue && Number.isNaN(dueDateValue.getTime())) {
    throw new HttpsError('invalid-argument', 'Due date is invalid')
  }

  if (!successUrl || !cancelUrl) {
    throw new HttpsError('invalid-argument', 'successUrl and cancelUrl are required')
  }

  const projectRef = admin.firestore().collection('projectCodes').doc(projectCode)
  const invoiceRef = projectRef.collection('invoices').doc()
  const invoiceId = invoiceRef.id
  const amountCents = Math.round(normalizedAmount * 100)

  await invoiceRef.set({
    id: invoiceId,
    description: description.trim(),
    amount: normalizedAmount,
    amountCents,
    currency: 'usd',
    projectCode,
    projectName: projectName || '',
    dueDate: dueDateValue ? admin.firestore.Timestamp.fromDate(dueDateValue) : null,
    status: 'creating',
    checkoutStatus: 'creating',
    paymentStatus: 'unpaid',
    stripeSessionId: null,
    stripeSessionUrl: null,
    stripePaymentIntentId: null,
    stripeCustomerEmail: null,
    createdByUid: request.auth.uid,
    createdByEmail: request.auth.token.email || '',
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    paidAt: null,
    errorMessage: null,
  })

  try {
    const stripe = require('stripe')(stripeSecretKey.value())
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { name: description.trim() },
          unit_amount: amountCents,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: { projectCode, invoiceId },
    })

    await invoiceRef.update({
      status: 'unpaid',
      checkoutStatus: 'ready',
      paymentStatus: session.payment_status || 'unpaid',
      stripeSessionId: session.id,
      stripeSessionUrl: session.url,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    })

    return { invoiceId, stripeSessionUrl: session.url }
  } catch (err) {
    console.error('createInvoice failed:', err)
    await invoiceRef.update({
      status: 'creation_failed',
      checkoutStatus: 'failed',
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      errorMessage: err.message || 'Stripe checkout session could not be created',
    })
    throw new HttpsError('failed-precondition', err.message || 'Invoice could not be created')
  }
})

exports.stripeWebhook = onRequest({
  invoker: 'public',
  secrets: [stripeSecretKey, stripeWebhookSecret],
}, async (req, res) => {
  const stripe = require('stripe')(stripeSecretKey.value())
  const sig = req.headers['stripe-signature']

  let event
  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, stripeWebhookSecret.value())
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`)
    return
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    const { projectCode, invoiceId } = session.metadata || {}
    if (projectCode && invoiceId && invoiceId !== 'pending') {
      await admin.firestore()
        .collection('projectCodes').doc(projectCode)
        .collection('invoices').doc(invoiceId)
        .update({
          status: 'paid',
          checkoutStatus: session.status || 'complete',
          paymentStatus: session.payment_status || 'paid',
          stripePaymentIntentId: session.payment_intent || null,
          stripeCustomerEmail: session.customer_details?.email || session.customer_email || null,
          paidAt: admin.firestore.FieldValue.serverTimestamp(),
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        })
    }
  }

  res.json({ received: true })
})
