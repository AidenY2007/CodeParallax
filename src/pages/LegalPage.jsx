export default function LegalPage({ title }) {
  return (
    <div className="min-h-screen bg-[#080d18] px-6 pt-32 pb-20">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
          {title}
        </h1>
      </div>
    </div>
  )
}
