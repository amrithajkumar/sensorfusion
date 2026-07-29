function WelcomeBanner() {
  return (
    <section className="w-full rounded-2xl bg-white p-6 shadow-sm">
      <p className="text-sm font-medium sm:text-base">Good Afternoon !!</p>
      <h1 className="mt-2 text-2xl font-semibold leading-tight sm:text-3xl lg:text-4xl">
        Quantum Sensor Fusion Platform
      </h1>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed sm:text-base">
        Upload Radar, Thermal and Acoustic sensor data to detect aerial objects
        using AI-powered multi-sensor fusion.
      </p>
    </section>
  )
}

export default WelcomeBanner
