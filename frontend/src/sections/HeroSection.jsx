export default function HeroSection() {
  return (
    <section
      id="home"
      className="hero-shell relative overflow-hidden rounded-[1.9rem] bg-mesh px-5 py-8 shadow-glow sm:px-6 sm:py-10 md:rounded-[2.5rem] md:px-10 md:py-14"
    >
      <div className="absolute -right-24 top-6 h-40 w-40 rounded-full border border-ember/30 sm:h-48 sm:w-48 md:-right-20 md:top-8 md:h-56 md:w-56" />
      <div className="absolute bottom-0 left-1/2 h-24 w-24 -translate-x-1/2 rounded-full bg-ember/10 blur-3xl sm:h-28 sm:w-28 md:h-32 md:w-32" />
      <div className="grid items-center gap-8 md:grid-cols-[1.2fr_0.8fr] md:gap-10">
        <div>
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-emberSoft sm:text-xs sm:tracking-[0.35em]">
            Full-Stack Developer
          </p>
          <h1 className="mt-4 max-w-2xl text-[2.6rem] font-extrabold leading-[0.95] text-sand sm:text-5xl md:text-6xl">
            Building full-stack web applications with clean interfaces and dependable backend systems.
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-mist sm:text-base sm:leading-8 md:mt-6 md:text-lg">
            I am Alpie Guevarra, a full-stack developer focused on Django,
            Python, Bootstrap, Tailwind CSS, HTML, CSS, and JavaScript with
            database experience in MySQL, PostgreSQL, and SQLite plus version
            control using Git and GitHub.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
            <a
              href="#projects"
              className="inline-flex w-full items-center justify-center rounded-full bg-ember px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#ff786d] sm:w-auto"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="ghost-button inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-sand transition hover:text-emberSoft sm:w-auto"
            >
              Contact Me
            </a>
          </div>
        </div>

        <div className="section-shell relative mx-auto w-full max-w-md p-4 sm:p-5 md:p-6">
          <div className="nested-shell rounded-[1.6rem] p-4 sm:rounded-[1.8rem] sm:p-5 md:rounded-[2rem] md:p-6">
            <div className="profile-shell mx-auto w-full max-w-[18rem] rounded-[2rem] p-4 text-center">
              <div className="profile-image-shell mx-auto aspect-[4/5] w-full overflow-hidden rounded-[1.7rem]">
                <img
                  src="/images/alpie.jpg"
                  alt="Alpie Guevarra"
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <p className="mt-4 text-xl font-bold text-sand sm:text-2xl">
                Alpie Guevarra
              </p>
            </div>
            <div className="mt-5 grid gap-3 text-sm text-mist md:mt-6">
              <div className="info-row-shell flex flex-col gap-1 rounded-2xl px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                <span>Backend</span>
                <span className="font-semibold text-sand">Django + Python</span>
              </div>
              <div className="info-row-shell flex flex-col gap-1 rounded-2xl px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                <span>Frontend</span>
                <span className="font-semibold text-sand">Bootstrap + Tailwind</span>
              </div>
              <div className="info-row-shell flex flex-col gap-1 rounded-2xl px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                <span>Database</span>
                <span className="font-semibold text-sand">MySQL, PostgreSQL, SQLite</span>
              </div>
              <div className="info-row-shell flex flex-col gap-1 rounded-2xl px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                <span>Version Control</span>
                <span className="font-semibold text-sand">Git + GitHub</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
