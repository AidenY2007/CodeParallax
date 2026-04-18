import parallaxLogo from './assets/ParallaxLogo.png'

const capabilities = [
  {
    name: 'Authentication systems',
    slug: 'authentication',
    summary: 'Secure identity flows, role logic, and access control for real products.',
  },
  {
    name: 'Payments / fintech',
    slug: 'payments',
    summary: 'Revenue-ready billing, subscriptions, invoicing, and payment operations.',
  },
  {
    name: 'AI integration',
    slug: 'ai',
    summary: 'Assistants, copilots, and intelligent workflows embedded into your stack.',
  },
  {
    name: 'Automation workflows',
    slug: 'automation',
    summary: 'Trigger-based systems that remove manual operations and bottlenecks.',
  },
  {
    name: 'Databases + dashboards',
    slug: 'databases-dashboards',
    summary: 'Operational visibility with structured data, controls, and reporting.',
  },
  {
    name: 'API integrations',
    slug: 'api-integrations',
    summary: 'Connected infrastructure across the tools and services your business uses.',
  },
  {
    name: 'Email systems',
    slug: 'email',
    summary: 'Lifecycle messaging for onboarding, retention, alerts, and conversion.',
  },
  {
    name: 'SMS systems',
    slug: 'sms',
    summary: 'Transactional and campaign messaging tied directly to business events.',
  },
  {
    name: 'Website analytics',
    slug: 'analytics',
    summary: 'Performance, behavior, and conversion clarity without dashboard clutter.',
  },
]

const featureSections = [
  {
    eyebrow: 'Authentication systems',
    title: 'Secure account systems built for real products and real teams.',
    description:
      'Ship sign-in, onboarding, invited accounts, password reset, and permission-aware experiences without patchwork auth logic.',
    href: '/features/authentication',
    accent: 'from-sky-400/60 via-cyan-400/25 to-transparent',
    visual: (
      <div className="grid gap-3 rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5">
        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/40 px-4 py-3">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-slate-500">Route</p>
            <p className="mt-1 text-sm text-white">/dashboard/invoices</p>
          </div>
          <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[11px] font-medium text-emerald-300">
            access granted
          </span>
        </div>
        <div className="grid gap-3 sm:grid-cols-[1.25fr_0.75fr]">
          <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-200">Login panel</p>
              <span className="h-2.5 w-2.5 rounded-full bg-sky-400 shadow-[0_0_18px_rgba(56,189,248,0.8)]" />
            </div>
            <div className="mt-4 space-y-3">
              <div className="h-10 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-400">name@company.com</div>
              <div className="flex h-10 items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-400">
                ••••••••••••
                <span className="rounded-full bg-slate-800 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
                  reveal
                </span>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-slate-500">Roles</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {['Owner', 'Finance', 'Ops'].map((role) => (
                  <span key={role} className="rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1 text-xs text-sky-200">
                    {role}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-slate-500">State</p>
              <div className="mt-3 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10 text-emerald-300">
                  ✓
                </span>
                <div>
                  <p className="text-sm text-white">Two-factor enabled</p>
                  <p className="text-xs text-slate-400">Last session: 14 minutes ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    eyebrow: 'Payments / fintech',
    title: 'Billing, subscriptions, and payment infrastructure that supports revenue.',
    description:
      'Create invoice states, subscription plans, payment retries, and finance-facing visibility that matches how the business actually gets paid.',
    href: '/features/payments',
    accent: 'from-violet-400/60 via-fuchsia-400/25 to-transparent',
    visual: (
      <div className="grid gap-3 rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5">
        <div className="grid gap-3 sm:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-slate-500">Invoice queue</p>
            <div className="mt-3 space-y-3">
              {[
                ['INV-2048', '$8,400', 'paid'],
                ['INV-2049', '$2,150', 'due'],
                ['INV-2050', '$12,000', 'draft'],
              ].map(([id, amount, status]) => (
                <div key={id} className="flex items-center justify-between rounded-xl border border-white/10 bg-black/30 px-3 py-3">
                  <div>
                    <p className="text-sm text-white">{id}</p>
                    <p className="text-xs text-slate-500">Platform retainers</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-white">{amount}</p>
                    <p className="text-xs uppercase tracking-[0.22em] text-slate-500">{status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-slate-500">MRR movement</p>
                <p className="mt-2 text-2xl font-semibold text-white">$84.3k</p>
              </div>
              <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
                +12.4%
              </span>
            </div>
            <div className="mt-6 flex h-32 items-end gap-2">
              {[36, 48, 42, 67, 73, 88, 81, 96].map((height, index) => (
                <div key={index} className="flex-1 rounded-t-full bg-gradient-to-t from-violet-500/20 to-violet-300/80" style={{ height: `${height}%` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    eyebrow: 'AI integration',
    title: 'AI-powered assistants, copilots, and intelligent workflows.',
    description:
      'Embed model-powered interfaces into sales, service, operations, and internal tooling with clear prompt control and measurable outcomes.',
    href: '/features/ai',
    accent: 'from-cyan-400/60 via-sky-400/20 to-transparent',
    visual: (
      <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5">
        <div className="rounded-[1.4rem] border border-white/10 bg-slate-950/80 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-slate-500">Assistant console</p>
              <p className="mt-2 text-sm text-slate-300">Prompt routing: support triage / sales qualification</p>
            </div>
            <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-200">
              model online
            </span>
          </div>
          <div className="mt-4 space-y-3">
            <div className="max-w-[80%] rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-300">
              Summarize this lead and route them to the right proposal path.
            </div>
            <div className="ml-auto max-w-[88%] rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 text-sm text-cyan-50">
              Growth-stage SaaS. Billing + analytics rebuild. Recommend payments, APIs, and dashboard scope.
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {['Qualify', 'Summarize', 'Draft reply'].map((chip) => (
              <span key={chip} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-slate-300">
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    eyebrow: 'Automation workflows',
    title: 'Trigger-based systems that replace manual work.',
    description:
      'Design event-driven workflows across forms, payments, CRMs, email, SMS, and internal ops so the business moves without chasing tasks manually.',
    href: '/features/automation',
    accent: 'from-emerald-400/60 via-cyan-400/15 to-transparent',
    visual: (
      <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            ['Lead created', 'Trigger'],
            ['Verify budget + intent', 'Condition'],
            ['Create CRM record', 'Action'],
          ].map(([label, type], index) => (
            <div key={label} className="relative rounded-2xl border border-white/10 bg-black/30 p-4">
              {index < 2 ? (
                <span className="absolute right-[-18px] top-1/2 hidden h-px w-9 -translate-y-1/2 bg-gradient-to-r from-cyan-400/70 to-transparent sm:block" />
              ) : null}
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-slate-500">{type}</p>
              <p className="mt-6 text-sm text-white">{label}</p>
              <div className="mt-4 h-2 w-16 rounded-full bg-cyan-400/70 shadow-[0_0_24px_rgba(34,211,238,0.55)]" />
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
          Completion state: invoice draft, intro email, and Slack update dispatched automatically.
        </div>
      </div>
    ),
  },
  {
    eyebrow: 'Databases + dashboards',
    title: 'Operational systems with visibility, structure, and control.',
    description:
      'Build custom dashboards around the metrics, statuses, and records your team actually operates from instead of generic admin templates.',
    href: '/features/databases-dashboards',
    accent: 'from-sky-400/60 via-blue-400/20 to-transparent',
    visual: (
      <div className="grid gap-3 rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            ['Active systems', '14'],
            ['Weekly throughput', '238'],
            ['Open blockers', '03'],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-white/10 bg-black/30 p-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-slate-500">{label}</p>
              <p className="mt-4 text-3xl font-semibold text-white">{value}</p>
            </div>
          ))}
        </div>
        <div className="grid gap-3 sm:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
            <p className="text-sm text-white">Performance trend</p>
            <div className="mt-6 flex h-28 items-end gap-2">
              {[22, 34, 30, 46, 59, 52, 68, 74, 91].map((height, index) => (
                <div key={index} className="flex-1 rounded-t-full bg-gradient-to-t from-sky-500/15 to-cyan-300/85" style={{ height: `${height}%` }} />
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <p className="text-sm text-white">Table preview</p>
            <div className="mt-3 space-y-2 text-sm text-slate-300">
              {[
                ['Northwind', 'Healthy', 'Owner'],
                ['Nova Ops', 'Review', 'Finance'],
                ['Aster Labs', 'Active', 'Admin'],
              ].map(([company, state, role]) => (
                <div key={company} className="grid grid-cols-[1fr_auto_auto] items-center gap-3 rounded-xl border border-white/10 bg-black/25 px-3 py-2">
                  <span>{company}</span>
                  <span className="text-slate-500">{state}</span>
                  <span className="rounded-full border border-white/10 px-2 py-0.5 text-[11px] uppercase tracking-[0.18em] text-slate-400">
                    {role}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    eyebrow: 'API integrations',
    title: 'Connect your business to the tools and services it depends on.',
    description:
      'Move data cleanly between platforms with secure endpoints, mapped payloads, and interface logic that makes integrations dependable instead of fragile.',
    href: '/features/api-integrations',
    accent: 'from-violet-400/60 via-sky-400/15 to-transparent',
    visual: (
      <div className="grid gap-3 rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5 sm:grid-cols-[1fr_0.85fr]">
        <div className="rounded-2xl border border-white/10 bg-slate-950/80 p-4 font-mono text-sm text-slate-300">
          <p className="text-[11px] uppercase tracking-[0.28em] text-slate-500">Endpoint</p>
          <pre className="mt-4 overflow-x-auto text-xs leading-6 text-sky-200">
{`POST /v1/invoices/sync
{
  customerId: "cus_2048",
  status: "due",
  provider: "stripe"
}`}
          </pre>
        </div>
        <div className="space-y-3">
          {['Stripe', 'HubSpot', 'Firebase'].map((service) => (
            <div key={service} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
              <span className="text-sm text-white">{service}</span>
              <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_18px_rgba(34,211,238,0.8)]" />
            </div>
          ))}
          <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-slate-300">
            Response mapping and retry logic included.
          </div>
        </div>
      </div>
    ),
  },
  {
    eyebrow: 'Email & SMS systems',
    title: 'Lifecycle email and SMS systems for onboarding, communication, and conversion.',
    description:
      'Run coordinated messaging across product events, client updates, reminders, and campaigns with delivery-aware logic and clean templates.',
    href: '/features/email',
    accent: 'from-cyan-400/60 via-violet-400/15 to-transparent',
    visual: (
      <div className="grid gap-3 rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5 sm:grid-cols-[1fr_0.92fr]">
        <div className="space-y-3">
          <div className="rounded-2xl border border-white/10 bg-slate-950/80 p-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-slate-500">Email sequence</p>
            <div className="mt-3 space-y-2 text-sm text-slate-300">
              {['Welcome', 'Proposal follow-up', 'Invoice reminder'].map((item) => (
                <div key={item} className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-3">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 text-sm text-cyan-100">
            Delivery state: 98.4% sent, 61% opened, 18% replied.
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-slate-500">SMS preview</p>
          <div className="mt-4 space-y-3">
            <div className="ml-auto max-w-[85%] rounded-2xl border border-violet-400/20 bg-violet-400/10 px-4 py-3 text-sm text-violet-50">
              Project milestone approved. Next invoice scheduled for Friday.
            </div>
            <div className="max-w-[80%] rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-300">
              Reply YES to confirm deployment window.
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    eyebrow: 'Website analytics',
    title: 'Clarity into performance, behavior, and conversion.',
    description:
      'Translate traffic and product behavior into useful reporting with funnels, conversion signals, and dashboards built around business decisions.',
    href: '/features/analytics',
    accent: 'from-sky-400/60 via-emerald-400/15 to-transparent',
    visual: (
      <div className="grid gap-3 rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            ['Visitors', '18.2k'],
            ['Qualified leads', '316'],
            ['Conversion', '4.8%'],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-white/10 bg-black/30 p-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-slate-500">{label}</p>
              <p className="mt-4 text-2xl font-semibold text-white">{value}</p>
            </div>
          ))}
        </div>
        <div className="grid gap-3 sm:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-2xl border border-white/10 bg-slate-950/80 p-4">
            <p className="text-sm text-white">Trend line</p>
            <div className="mt-6 h-28 rounded-2xl bg-[linear-gradient(180deg,rgba(56,189,248,0.12),rgba(56,189,248,0))] p-4">
              <div className="graph-line h-full w-full rounded-[inherit]" />
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <p className="text-sm text-white">Funnel</p>
            <div className="mt-4 space-y-2">
              {[
                ['Landing page', '100%'],
                ['Capability visit', '62%'],
                ['Pricing view', '28%'],
                ['Inquiry started', '9%'],
              ].map(([step, rate]) => (
                <div key={step} className="flex items-center justify-between rounded-xl border border-white/10 bg-black/25 px-3 py-2 text-sm text-slate-300">
                  <span>{step}</span>
                  <span className="text-sky-200">{rate}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
  },
]

const valuePillars = [
  {
    title: 'Built for scale',
    body: 'Systems architecture that holds up when operations, customers, and revenue complexity increase.',
  },
  {
    title: 'Custom by default',
    body: 'No template assumptions. The stack, flows, and interfaces are shaped around your model.',
  },
  {
    title: 'Designed around operations',
    body: 'Every build decision considers the people, states, and workflows behind the interface.',
  },
  {
    title: 'Engineered for growth',
    body: 'Infrastructure choices are made to support future expansion into portals, analytics, automation, and AI.',
  },
]

const processSteps = [
  ['01', 'Strategy', 'Clarify the business model, operational friction, and system requirements.'],
  ['02', 'Build', 'Design and develop the product surfaces, data structure, and integrations.'],
  ['03', 'Launch', 'Ship the system with tracking, polish, and client-ready operational flows.'],
  ['04', 'Evolve', 'Expand the platform with automation, analytics, and new capability layers.'],
]

function App() {
  return (
    <div className="relative overflow-hidden bg-[#05070b] text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.16),transparent_34%),radial-gradient(circle_at_85%_10%,rgba(139,92,246,0.16),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_20%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:72px_72px] opacity-[0.16]" />

      <header className="sticky top-0 z-50 border-b border-white/8 bg-[#05070b]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <a href="/" className="flex items-center gap-3 text-sm font-medium tracking-[0.28em] text-white uppercase">
            <span className="flex h-12 items-center rounded-2xl border border-white/10 bg-white/[0.04] px-3 shadow-[0_0_32px_rgba(56,189,248,0.12)]">
              <img src={parallaxLogo} alt="Parallax logo" className="h-7 w-auto object-contain" />
            </span>
            <span className="sr-only">Parallax</span>
          </a>
          <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            <a className="transition hover:text-white" href="#capabilities">Capabilities</a>
            <a className="transition hover:text-white" href="/pricing">Pricing</a>
            <a className="transition hover:text-white" href="/contact">Contact</a>
          </nav>
          <div className="flex items-center gap-3">
            <a
              href="/pricing"
              className="hidden rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:border-white/20 hover:text-white sm:inline-flex"
            >
              View pricing
            </a>
            <a
              href="/contact"
              className="rounded-full border border-sky-400/30 bg-sky-400/12 px-5 py-2.5 text-sm font-medium text-sky-100 shadow-[0_0_36px_rgba(56,189,248,0.18)] transition hover:-translate-y-0.5 hover:border-sky-300/50 hover:bg-sky-400/18"
            >
              Start a project
            </a>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        <section className="mx-auto grid max-w-7xl gap-14 px-6 pb-24 pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:pb-32 lg:pt-24">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.3em] text-slate-400">
              <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_18px_rgba(34,211,238,0.9)]" />
              Premium web systems brand
            </div>
            <h1 className="mt-8 max-w-3xl text-5xl font-semibold leading-[0.92] tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl">
              Join the Parallax network.
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-8 text-slate-300">
              Infrastructure for modern businesses across authentication, payments, AI, automation, analytics, APIs, email, and SMS.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-sky-400/30 bg-sky-400/12 px-6 py-3.5 text-sm font-medium text-sky-100 shadow-[0_0_40px_rgba(56,189,248,0.18)] transition hover:-translate-y-0.5 hover:border-sky-300/50 hover:bg-sky-400/18"
              >
                Start a project
              </a>
              <a
                href="#capabilities"
                className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.03] px-6 py-3.5 text-sm font-medium text-slate-200 transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.06]"
              >
                Explore capabilities
              </a>
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {[
                ['09', 'Core capabilities'],
                ['24/7', 'Operational mindset'],
                ['v1-vN', 'Built to expand'],
              ].map(([value, label]) => (
                <div key={label} className="rounded-3xl border border-white/10 bg-white/[0.03] px-5 py-5">
                  <p className="font-mono text-2xl text-white">{value}</p>
                  <p className="mt-2 text-sm text-slate-400">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-10 top-8 h-40 w-40 rounded-full bg-sky-400/18 blur-3xl" />
            <div className="absolute -right-10 bottom-16 h-40 w-40 rounded-full bg-violet-400/14 blur-3xl" />
            <div className="relative rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.02))] p-5 shadow-[0_40px_120px_rgba(0,0,0,0.45)]">
              <div className="absolute left-6 top-6 z-10 rounded-2xl border border-white/10 bg-[#05070b]/80 px-3 py-2 backdrop-blur">
                <img src={parallaxLogo} alt="" aria-hidden="true" className="h-6 w-auto object-contain opacity-95" />
              </div>
              <div className="rounded-[1.6rem] border border-white/10 bg-[#070a10] p-5">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-slate-500">System shell</p>
                    <p className="mt-2 text-lg text-white">Parallax operating layer</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-700" />
                    <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_18px_rgba(34,211,238,0.8)]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-violet-400 shadow-[0_0_18px_rgba(167,139,250,0.7)]" />
                  </div>
                </div>
                <div className="grid gap-4 pt-5 sm:grid-cols-[1.1fr_0.9fr]">
                  <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-4">
                    <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-slate-500">Code fragment</p>
                    <pre className="mt-4 overflow-x-auto text-xs leading-7 text-slate-300">
{`capabilities: [
  "auth",
  "payments",
  "ai",
  "automation",
  "analytics"
]`}
                    </pre>
                  </div>
                  <div className="space-y-4">
                    <div className="rounded-[1.4rem] border border-white/10 bg-black/30 p-4">
                      <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-slate-500">Connected systems</p>
                      <div className="mt-4 space-y-3">
                        {['Identity', 'Billing', 'Messaging', 'Analytics'].map((item) => (
                          <div key={item} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-slate-200">
                            <span>{item}</span>
                            <span className="h-2 w-2 rounded-full bg-cyan-400" />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-[1.4rem] border border-white/10 bg-black/30 p-4">
                      <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-slate-500">Operational signal</p>
                      <div className="mt-4 flex h-24 items-end gap-2">
                        {[18, 36, 44, 38, 63, 71, 67, 88].map((height, index) => (
                          <div key={index} className="flex-1 rounded-t-full bg-gradient-to-t from-sky-500/10 to-cyan-300/90" style={{ height: `${height}%` }} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {['Authentication', 'Payments', 'Automation'].map((item) => (
                    <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-300">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/8 bg-black/20">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-6 lg:flex-row lg:items-center lg:justify-between lg:px-10">
            <p className="text-lg text-slate-200">Built for teams that outgrow templates.</p>
            <div className="flex flex-wrap items-center gap-3">
              {['Secure', 'Intelligent', 'Automated', 'Scalable', 'Integrated'].map((tag) => (
                <span key={tag} className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.22em] text-slate-400">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section id="capabilities" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="max-w-2xl">
            <p className="section-kicker">Capabilities</p>
            <h2 className="section-title">A better operating layer for modern business.</h2>
            <p className="section-copy">
              Nine capability tracks. One coherent brand, product, and systems approach.
            </p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {capabilities.map((capability, index) => (
              <a
                key={capability.slug}
                href={`/features/${capability.slug}`}
                className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05]"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent opacity-0 transition group-hover:opacity-100" />
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-black/30 font-mono text-sm text-slate-300">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-xs uppercase tracking-[0.24em] text-slate-500">View page</span>
                </div>
                <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em] text-white">{capability.name}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-400">{capability.summary}</p>
              </a>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl space-y-8 px-6 pb-24 lg:px-10">
          <div className="max-w-2xl">
            <p className="section-kicker">Deep Feature Sections</p>
            <h2 className="section-title">Every core system surfaced with business value and technical credibility.</h2>
          </div>
          {featureSections.map((feature, index) => (
            <section
              key={feature.eyebrow}
              className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 lg:p-8"
            >
              <div className={`pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-r ${feature.accent} opacity-30 blur-3xl`} />
              <div className={`grid gap-8 ${index % 2 === 0 ? 'lg:grid-cols-[0.95fr_1.05fr]' : 'lg:grid-cols-[1.05fr_0.95fr]'}`}>
                <div className={index % 2 === 0 ? '' : 'lg:order-2'}>
                  <p className="section-kicker">{feature.eyebrow}</p>
                  <h3 className="mt-5 text-3xl font-semibold leading-tight tracking-[-0.04em] text-white sm:text-4xl">
                    {feature.title}
                  </h3>
                  <p className="mt-5 max-w-xl text-base leading-8 text-slate-300">{feature.description}</p>
                  <a
                    href={feature.href}
                    className="mt-8 inline-flex rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-medium text-slate-100 transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.08]"
                  >
                    Explore feature
                  </a>
                </div>
                <div className={index % 2 === 0 ? '' : 'lg:order-1'}>{feature.visual}</div>
              </div>
            </section>
          ))}
        </section>

        <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="max-w-2xl">
            <p className="section-kicker">Why Parallax</p>
            <h2 className="section-title">Beyond templates. Beyond basic tools.</h2>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
            {valuePillars.map((pillar) => (
              <div key={pillar.title} className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6">
                <h3 className="text-2xl font-semibold tracking-[-0.04em] text-white">{pillar.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-400">{pillar.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-y border-white/8 bg-black/20">
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
            <div className="max-w-2xl">
              <p className="section-kicker">Process</p>
              <h2 className="section-title">A clean working model from strategy to evolution.</h2>
            </div>
            <div className="mt-12 grid gap-5 lg:grid-cols-4">
              {processSteps.map(([step, title, description]) => (
                <div key={step} className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6">
                  <p className="font-mono text-sm text-sky-300">{step}</p>
                  <h3 className="mt-5 text-2xl font-semibold tracking-[-0.04em] text-white">{title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-400">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="grid gap-8 rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 lg:grid-cols-[0.95fr_1.05fr] lg:p-10">
            <div>
              <p className="section-kicker">Pricing Preview</p>
              <h2 className="section-title">Custom system tiers for companies building beyond brochure sites.</h2>
              <p className="section-copy">
                Pricing reflects scope, integrations, user flows, and operational complexity. Parallax is positioned as premium infrastructure, not commodity web production.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ['Starter', 'from $6k', 'Focused marketing or foundational system work'],
                ['Growth', 'from $15k', 'Multi-surface builds with deeper workflows and integrations'],
                ['Advanced', 'custom', 'Platform-level architecture for serious operational scale'],
              ].map(([tier, price, copy]) => (
                <div key={tier} className="rounded-[1.5rem] border border-white/10 bg-black/30 p-5">
                  <p className="text-sm uppercase tracking-[0.22em] text-slate-500">{tier}</p>
                  <p className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-white">{price}</p>
                  <p className="mt-4 text-sm leading-7 text-slate-400">{copy}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6">
            <a
              href="/pricing"
              className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-medium text-slate-100 transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.08]"
            >
              View pricing details
            </a>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10 lg:pb-32">
          <div className="relative overflow-hidden rounded-[2.25rem] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] px-8 py-16 text-center lg:px-16">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.18),transparent_32%),radial-gradient(circle_at_80%_40%,rgba(139,92,246,0.16),transparent_28%)]" />
            <div className="relative z-10 mx-auto max-w-3xl">
              <p className="section-kicker justify-center">Final CTA</p>
              <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.05em] text-white sm:text-5xl">
                Build with Parallax.
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-300">
                A private operating layer for growth-minded businesses that need infrastructure, not filler.
              </p>
              <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-sky-400/30 bg-sky-400/12 px-6 py-3.5 text-sm font-medium text-sky-100 shadow-[0_0_40px_rgba(56,189,248,0.2)] transition hover:-translate-y-0.5 hover:border-sky-300/50 hover:bg-sky-400/18"
                >
                  Enter the network
                </a>
                <a
                  href="#capabilities"
                  className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.03] px-6 py-3.5 text-sm font-medium text-slate-200 transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.06]"
                >
                  Review capabilities
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8 text-sm text-slate-500 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div className="flex items-center gap-4">
            <img src={parallaxLogo} alt="Parallax" className="h-7 w-auto object-contain opacity-95" />
            <p>Infrastructure for modern businesses.</p>
          </div>
          <div className="flex flex-wrap gap-5">
            <a className="transition hover:text-white" href="/pricing">Pricing</a>
            <a className="transition hover:text-white" href="/contact">Contact</a>
            <a className="transition hover:text-white" href="/dashboard">Client dashboard</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
