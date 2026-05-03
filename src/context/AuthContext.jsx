import { createContext, useContext, useEffect, useState } from 'react'
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  updateProfile,
  getAdditionalUserInfo,
} from 'firebase/auth'
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '../lib/firebase'

const AuthContext = createContext(null)

const googleProvider = new GoogleAuthProvider()

function splitDisplayName(displayName = '') {
  const [firstName = '', ...rest] = displayName.trim().split(/\s+/).filter(Boolean)
  return { firstName, lastName: rest.join(' ') }
}

function cleanText(value) {
  return typeof value === 'string' ? value.trim() : ''
}

async function loadExistingUserDocument(ref) {
  try {
    const snap = await getDoc(ref)
    return snap.exists() ? snap.data() : {}
  } catch (error) {
    console.warn('Could not read existing user document before sync:', error)
    return {}
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  async function syncUserDocument(firebaseUser, profile = {}, options = {}) {
    if (!firebaseUser) return

    await firebaseUser.getIdToken(true)

    const ref = doc(db, 'users', firebaseUser.uid)
    const existing = options.skipRead ? {} : await loadExistingUserDocument(ref)
    const derivedName = splitDisplayName(profile.displayName ?? firebaseUser.displayName ?? existing.displayName ?? '')

    const firstName = cleanText(profile.firstName) || cleanText(existing.firstName) || derivedName.firstName
    const lastName = cleanText(profile.lastName) || cleanText(existing.lastName) || derivedName.lastName
    const displayName =
      cleanText(profile.displayName)
      || cleanText(firebaseUser.displayName)
      || cleanText(existing.displayName)
      || `${firstName} ${lastName}`.trim()

    const email = cleanText(firebaseUser.email) || cleanText(profile.email) || cleanText(existing.email)
    const photoURL = cleanText(firebaseUser.photoURL) || cleanText(existing.photoURL)

    const profileData = {
      uid: firebaseUser.uid,
      emailVerified: firebaseUser.emailVerified,
      providerIds: firebaseUser.providerData.map((provider) => provider.providerId),
      lastLoginAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }

    if (email) {
      profileData.email = email
      profileData.emailLower = email.toLowerCase()
    }
    if (photoURL) profileData.photoURL = photoURL
    if (firstName) profileData.firstName = firstName
    if (lastName) profileData.lastName = lastName
    if (displayName) profileData.displayName = displayName
    if (options.includeCreatedAt) profileData.createdAt = existing.createdAt ?? serverTimestamp()

    await setDoc(ref, profileData, { merge: true })
  }

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser)

      if (firebaseUser) {
        try {
          await syncUserDocument(firebaseUser)
          setUser(auth.currentUser)
        } catch (error) {
          console.error('User document sync failed:', error)
        }
      }

      setLoading(false)
    })
    return unsub
  }, [])

  async function signUp(email, password, firstName, lastName) {
    const normalizedEmail = email.trim()
    const normalizedFirstName = firstName.trim()
    const normalizedLastName = lastName.trim()
    const displayName = `${normalizedFirstName} ${normalizedLastName}`.trim()

    const cred = await createUserWithEmailAndPassword(auth, normalizedEmail, password)

    try {
      if (displayName) {
        await updateProfile(cred.user, { displayName })
        setUser(auth.currentUser)
      }

      await syncUserDocument(cred.user, {
        firstName: normalizedFirstName,
        lastName: normalizedLastName,
        displayName,
        email: normalizedEmail,
      }, { skipRead: true, includeCreatedAt: true })

      return cred.user
    } catch (error) {
      console.error('Signup profile sync failed:', error)

      const signupSyncError = new Error('Unable to finish account setup.')
      signupSyncError.code = 'app/signup-profile-sync-failed'
      throw signupSyncError
    }
  }

  async function logIn(email, password) {
    const cred = await signInWithEmailAndPassword(auth, email.trim(), password)

    try {
      await syncUserDocument(cred.user)
    } catch (error) {
      console.error('Post-login profile sync failed:', error)
    }

    return cred
  }

  async function signInWithGoogle() {
    const cred = await signInWithPopup(auth, googleProvider)
    try {
      const { firstName, lastName } = splitDisplayName(cred.user.displayName ?? '')
      await syncUserDocument(cred.user, { firstName, lastName }, {
        includeCreatedAt: getAdditionalUserInfo(cred)?.isNewUser,
      })
    } catch (error) {
      console.error('Google sign-in profile sync failed:', error)
    }
    return cred.user
  }

  async function updateUserProfile({ firstName, lastName }) {
    const displayName = `${firstName.trim()} ${lastName.trim()}`.trim()
    await updateProfile(auth.currentUser, { displayName })
    await syncUserDocument(auth.currentUser, { firstName: firstName.trim(), lastName: lastName.trim(), displayName })
    setUser({ ...auth.currentUser })
  }

  async function logOut() {
    return signOut(auth)
  }

  const isAdmin = user?.email === 'aidenyasharian@gmail.com'

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin, signUp, logIn, signInWithGoogle, logOut, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
