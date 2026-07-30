function WelcomeBanner() {
  return (
    <section className="w-full rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-sm">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-400 sm:text-base">
        Platform overview
      </p>
      <h1 className="mt-3 text-2xl font-semibold leading-tight text-white sm:text-3xl lg:text-4xl">
        Quantum Sensor Fusion Platform
      </h1>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-400 sm:text-base">
        Upload Radar, Thermal and Acoustic sensor data to detect aerial objects
        using AI-powered multi-sensor fusion.
      </p>
    </section>
  )
}

export default WelcomeBanner
