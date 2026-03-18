export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-mesh px-6 py-10 shadow-glow md:px-10 md:py-14"
    >
      <div className="absolute -right-20 top-8 h-56 w-56 rounded-full border border-ember/30" />
      <div className="absolute bottom-0 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-ember/10 blur-3xl" />
      <div className="grid items-center gap-10 md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emberSoft">
            Full-Stack Developer in Progress
          </p>
          <h1 className="mt-4 max-w-2xl text-4xl font-extrabold leading-tight text-sand md:text-6xl">
            Building clean products, thoughtful interfaces, and reliable backend systems.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-mist md:text-lg">
            I am a graduating student focused on turning solid programming
            fundamentals into real-world full-stack products with Django, React,
            Tailwind CSS, and SQLite.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="rounded-full bg-ember px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#ff786d]"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-sand transition hover:border-emberSoft hover:text-emberSoft"
            >
              Contact Me
            </a>
          </div>
        </div>

        <div className="section-shell relative mx-auto w-full max-w-md p-6">
          <div className="rounded-[2rem] border border-white/10 bg-black/25 p-6">
            <div className="mx-auto flex h-56 w-56 items-center justify-center rounded-full border border-white/20 bg-gradient-to-br from-ember/30 via-white/10 to-transparent text-center shadow-glow">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-emberSoft">
                  Available For
                </p>
                <p className="mt-3 text-2xl font-bold text-sand">
                  Junior Dev Roles
                </p>
              </div>
            </div>
            <div className="mt-6 grid gap-3 text-sm text-mist">
              <div className="flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3">
                <span>Focus</span>
                <span className="font-semibold text-sand">Full-Stack Web</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3">
                <span>Backend</span>
                <span className="font-semibold text-sand">Django + DRF</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3">
                <span>Frontend</span>
                <span className="font-semibold text-sand">React + Tailwind</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
