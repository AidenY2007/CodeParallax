const termsSections = [
  {
    heading: '1. Services',
    body: [
      'Parallax provides custom software development and digital services, including but not limited to:',
    ],
    list: [
      'Website development',
      'AI integrations and automation',
      'Payment system integrations',
      'Database and backend infrastructure',
      'Analytics and reporting systems',
      'API integrations',
      'Hosting and deployment assistance',
      'Email and SMS workflow implementations',
    ],
    closing: [
      'We reserve the right to modify, suspend, or discontinue any service at any time without liability.',
    ],
  },
  {
    heading: '2. Eligibility',
    body: [
      'You must be at least 18 years old or have legal parental or guardian consent to use our services.',
      'By using our services, you represent that all information you provide is accurate and complete.',
    ],
  },
  {
    heading: '3. Client Responsibilities',
    body: ['Clients agree to:'],
    list: [
      'Provide accurate project requirements and information',
      'Maintain lawful ownership or authorization for all submitted content',
      'Use our services only for lawful purposes',
      'Avoid submitting malicious code, harmful material, or unlawful content',
    ],
    closing: [
      'You are solely responsible for the content, data, and materials you provide to us.',
    ],
  },
  {
    heading: '4. Intellectual Property',
    body: ['Unless otherwise agreed in writing:'],
    list: [
      'Parallax retains ownership of all proprietary frameworks, internal tools, systems, templates, and pre-existing intellectual property.',
      'Clients retain ownership of their trademarks, logos, brand assets, and client-provided content.',
      'Upon full payment, clients receive ownership or usage rights to the final deliverables specifically created for their project, excluding third-party software and Parallax proprietary systems.',
    ],
    closing: [
      'We may showcase completed work in our portfolio unless otherwise agreed in writing.',
    ],
  },
  {
    heading: '5. Payments',
    body: [
      'All pricing, invoices, retainers, subscriptions, and project fees are governed by individual agreements or invoices.',
      'Failure to complete payment may result in suspension or termination of services.',
      'Payments processed through third-party providers such as Stripe are subject to the terms and policies of those providers.',
    ],
  },
  {
    heading: '6. Third-Party Services',
    body: [
      'Our services may integrate with third-party platforms, APIs, hosting providers, AI providers, payment processors, analytics providers, and external software.',
      'We are not responsible for:',
    ],
    list: [
      'Third-party outages',
      'API limitations or pricing changes',
      'Data loss caused by third parties',
      'Security incidents originating from third-party systems',
    ],
    closing: [
      'Use of third-party services is subject to their own terms and privacy policies.',
    ],
  },
  {
    heading: '7. AI-Generated Features',
    body: [
      'Certain features or services may utilize artificial intelligence systems.',
      'AI-generated outputs may contain inaccuracies, incomplete information, or unintended results. Clients are responsible for reviewing and validating outputs before relying on them for business, financial, legal, or operational decisions.',
      'Parallax does not guarantee the accuracy of AI-generated content.',
    ],
  },
  {
    heading: '8. Acceptable Use',
    body: ['You agree not to use our services to:'],
    list: [
      'Violate any law or regulation',
      'Infringe intellectual property rights',
      'Distribute malware or harmful code',
      'Conduct fraud, phishing, or deceptive practices',
      'Generate unlawful, abusive, or harmful content',
      'Interfere with the security or operation of our systems',
    ],
    closing: ['We reserve the right to suspend or terminate access for violations.'],
  },
  {
    heading: '9. Disclaimer of Warranties',
    body: [
      'Services are provided "as is" and "as available" without warranties of any kind, express or implied.',
      'We do not guarantee:',
    ],
    list: [
      'Continuous uptime',
      'Error-free operation',
      'Compatibility with every platform or browser',
      'Specific business outcomes or financial results',
    ],
    closing: [
      'To the fullest extent permitted by law, we disclaim all implied warranties, including merchantability, fitness for a particular purpose, and non-infringement.',
    ],
  },
  {
    heading: '10. Limitation of Liability',
    body: [
      'To the maximum extent permitted by law, Parallax shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including lost profits, lost data, or business interruption.',
      'Our total liability for any claim relating to our services shall not exceed the amount paid to us by the client during the three months preceding the claim.',
    ],
  },
  {
    heading: '11. Indemnification',
    body: [
      'You agree to indemnify and hold harmless Parallax, its affiliates, employees, contractors, and representatives from any claims, damages, liabilities, costs, or expenses arising from:',
    ],
    list: [
      'Your use of the services',
      'Your violation of these Terms',
      'Content or data you provide',
      'Your violation of any law or third-party rights',
    ],
  },
  {
    heading: '12. Termination',
    body: [
      'We reserve the right to suspend or terminate access to services at any time for violations of these Terms or for operational, legal, or security reasons.',
      'Termination does not eliminate outstanding payment obligations.',
    ],
  },
  {
    heading: '13. Privacy',
    body: ['Your use of our services is also governed by our Privacy Policy.'],
  },
  {
    heading: '14. Governing Law',
    body: [
      'These Terms shall be governed by and interpreted under the laws of the State of California, without regard to conflict of law principles.',
    ],
  },
  {
    heading: '15. Changes to These Terms',
    body: [
      'We may update these Terms periodically. Updated versions will be posted on this page with a revised effective date.',
      'Continued use of the services after updates constitutes acceptance of the revised Terms.',
    ],
  },
  {
    heading: '16. Contact Information',
    body: ['Parallax'],
    contact: [
      { label: 'Email', value: 'codeparallaxservices@gmail.com', href: 'mailto:codeparallaxservices@gmail.com' },
      { label: 'Phone', value: '(213) 973-2714', href: 'tel:+12139732714' },
      { label: 'Website', value: 'https://codeparallax.com', href: 'https://codeparallax.com' },
    ],
  },
]

const privacySections = [
  {
    heading: '1. Information We Collect',
    body: ['We may collect the following categories of information:'],
    groups: [
      {
        heading: 'Personal Information',
        list: [
          'Name',
          'Email address',
          'Phone number',
          'Company name',
          'Billing information',
          'Information submitted through forms or communications',
        ],
      },
      {
        heading: 'Technical Information',
        list: [
          'IP address',
          'Browser type',
          'Device information',
          'Operating system',
          'Pages visited',
          'Referring URLs',
          'Usage analytics',
          'Cookies and similar technologies',
        ],
      },
      {
        heading: 'Project and Client Data',
        body: [
          'We may process files, content, credentials, APIs, databases, or operational information provided by clients solely for the purpose of delivering services.',
        ],
      },
    ],
  },
  {
    heading: '2. How We Use Information',
    body: ['We may use information to:'],
    list: [
      'Provide and improve services',
      'Respond to inquiries',
      'Process payments and invoices',
      'Communicate about projects or support',
      'Monitor platform performance and security',
      'Analyze usage and improve user experience',
      'Prevent fraud, abuse, or unlawful activity',
      'Comply with legal obligations',
    ],
  },
  {
    heading: '3. Cookies and Analytics',
    body: [
      'We may use cookies, analytics tools, and similar technologies to understand website traffic and improve functionality.',
      'These tools may collect information about browsing behavior and device usage.',
      'You can modify your browser settings to disable cookies, though portions of the website may not function properly.',
    ],
  },
  {
    heading: '4. Third-Party Services',
    body: ['We may use third-party providers including:'],
    list: [
      'Hosting providers',
      'Payment processors such as Stripe',
      'Analytics providers',
      'Cloud infrastructure providers',
      'AI and automation providers',
      'Communication and email service providers',
    ],
    closing: ['These providers may process information according to their own privacy policies.'],
  },
  {
    heading: '5. Data Security',
    body: [
      'We implement reasonable administrative, technical, and organizational safeguards designed to protect information.',
      'However, no method of transmission or storage is completely secure, and we cannot guarantee absolute security.',
    ],
  },
  {
    heading: '6. Data Retention',
    body: ['We retain information only as long as reasonably necessary to:'],
    list: [
      'Provide services',
      'Fulfill contractual obligations',
      'Resolve disputes',
      'Enforce agreements',
      'Comply with legal requirements',
    ],
  },
  {
    heading: '7. Your Rights',
    body: [
      'Depending on your jurisdiction, you may have rights regarding your personal information, including the right to:',
    ],
    list: [
      'Access information we hold about you',
      'Request corrections',
      'Request deletion',
      'Object to certain processing',
      'Withdraw consent where applicable',
    ],
    closing: ['To exercise these rights, contact us using the information below.'],
  },
  {
    heading: '8. California Privacy Rights',
    body: [
      'California residents may have additional rights under applicable California privacy laws, including the right to request information regarding personal information collected and disclosed.',
      'We do not sell personal information.',
    ],
  },
  {
    heading: "9. Children's Privacy",
    body: [
      'Our services are not directed toward children under 13 years old, and we do not knowingly collect personal information from children.',
    ],
  },
  {
    heading: '10. International Users',
    body: [
      'If you access our services from outside the United States, you understand that your information may be transferred to and processed in the United States.',
    ],
  },
  {
    heading: '11. Changes to This Privacy Policy',
    body: [
      'We may update this Privacy Policy periodically. Updated versions will be posted with a revised effective date.',
    ],
  },
  {
    heading: '12. Contact Information',
    body: ['Parallax'],
    contact: [
      { label: 'Email', value: 'codeparallaxservices@gmail.com', href: 'mailto:codeparallaxservices@gmail.com' },
      { label: 'Phone', value: '(213) 973-2714', href: 'tel:+12139732714' },
      { label: 'Website', value: 'https://codeparallax.com', href: 'https://codeparallax.com' },
    ],
  },
]

function LegalSection({ section }) {
  return (
    <section className="border-b border-white/10 pb-10 last:border-b-0 last:pb-0">
      <h2 className="text-xl font-bold tracking-tight text-white md:text-2xl">
        {section.heading}
      </h2>
      <div className="mt-4 space-y-4 text-base leading-8 text-slate-300">
        {section.body?.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        {section.list && (
          <ul className="list-disc space-y-2 pl-6 marker:text-white">
            {section.list.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
        {section.groups?.map((group) => (
          <div key={group.heading} className="space-y-3">
            <h3 className="text-lg font-semibold text-white">{group.heading}</h3>
            {group.body?.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {group.list && (
              <ul className="list-disc space-y-2 pl-6 marker:text-white">
                {group.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
        {section.closing?.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        {section.contact && (
          <dl className="space-y-2">
            {section.contact.map((item) => (
              <div key={item.label} className="flex flex-col gap-1 sm:flex-row sm:gap-3">
                <dt className="font-semibold text-white">{item.label}:</dt>
                <dd>
                  <a className="text-cyan-300 transition hover:text-cyan-200" href={item.href}>
                    {item.value}
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  )
}

function TermsOfService() {
  return (
    <>
      <div className="mb-12 border-b border-white/10 pb-8">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-white">
          Effective Date: May 9, 2026
        </p>
        <h1 className="text-3xl font-extrabold tracking-tight text-white md:text-5xl">
          Terms of Service
        </h1>
        <div className="mt-8 space-y-5 text-base leading-8 text-slate-300">
          <p>
            Welcome to CodeParallax (&quot;Parallax&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;).
            These Terms of Service (&quot;Terms&quot;) govern your access to and use of
            the website located at{' '}
            <a className="text-cyan-300 transition hover:text-cyan-200" href="https://codeparallax.com">
              https://codeparallax.com
            </a>{' '}
            and any related services, applications, software, consultations, or products
            provided by Parallax.
          </p>
          <p>
            By accessing or using our services, you agree to these Terms. If you do not
            agree, you may not use our services.
          </p>
        </div>
      </div>

      <div className="space-y-10">
        {termsSections.map((section) => (
          <LegalSection key={section.heading} section={section} />
        ))}
      </div>
    </>
  )
}

function PrivacyPolicy() {
  return (
    <>
      <div className="mb-12 border-b border-white/10 pb-8">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-white">
          Effective Date: May 9, 2026
        </p>
        <h1 className="text-3xl font-extrabold tracking-tight text-white md:text-5xl">
          Privacy Policy
        </h1>
        <div className="mt-8 space-y-5 text-base leading-8 text-slate-300">
          <p>
            Parallax (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) respects your privacy and is
            committed to protecting your information. This Privacy Policy explains how we
            collect, use, disclose, and safeguard information when you visit{' '}
            <a className="text-cyan-300 transition hover:text-cyan-200" href="https://codeparallax.com">
              https://codeparallax.com
            </a>{' '}
            or use our services.
          </p>
        </div>
      </div>

      <div className="space-y-10">
        {privacySections.map((section) => (
          <LegalSection key={section.heading} section={section} />
        ))}
      </div>
    </>
  )
}

export default function LegalPage({ title }) {
  const isTermsPage = title === 'Terms & Conditions'
  const isPrivacyPage = title === 'Privacy Policy'

  return (
    <div className="min-h-screen bg-[#080d18] px-6 pt-32 pb-20">
      <div className="mx-auto max-w-4xl">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors mb-10"
        >
          <span className="text-base leading-none">←</span>
          Back
        </button>
        {isTermsPage ? (
          <TermsOfService />
        ) : isPrivacyPage ? (
          <PrivacyPolicy />
        ) : (
          <h1 className="text-3xl font-extrabold tracking-tight text-white md:text-5xl">
            {title}
          </h1>
        )}
      </div>
    </div>
  )
}
