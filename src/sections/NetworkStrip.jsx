const TAGS = [
  'Secure by default',
  'Intelligent systems',
  'Automated workflows',
  'Infinitely scalable',
  'Fully integrated',
  'Custom infrastructure',
  'Built for growth',
  'Premium engineering',
  'Beyond templates',
  'Production ready',
]

const repeated = [...TAGS, ...TAGS]

export default function NetworkStrip() {
  return (
    <section className="relative py-10 border-y border-white/5 overflow-hidden bg-[#09091a]/40">
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#07070f] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#07070f] to-transparent z-10 pointer-events-none" />

      <div className="flex whitespace-nowrap animate-marquee">
        {repeated.map((tag, i) => (
          <span key={i} className="inline-flex items-center gap-3 mx-8">
            <span
              className="w-1 h-1 rounded-full flex-shrink-0"
              style={{
                backgroundColor: ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981'][i % 4],
                opacity: 0.7,
              }}
            />
            <span className="text-sm text-slate-500 tracking-widest font-medium uppercase">
              {tag}
            </span>
          </span>
        ))}
      </div>
    </section>
  )
}
