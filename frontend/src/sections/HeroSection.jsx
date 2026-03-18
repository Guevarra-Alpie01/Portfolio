function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M12 .7a12 12 0 0 0-3.8 23.4c.6.1.8-.2.8-.6v-2.1c-3.2.7-3.9-1.4-3.9-1.4-.5-1.4-1.3-1.7-1.3-1.7-1.1-.8.1-.8.1-.8 1.2.1 1.8 1.2 1.8 1.2 1 .1 1.6 2.7 4.3 1.9.1-.8.4-1.3.7-1.6-2.6-.3-5.4-1.3-5.4-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.3 11.3 0 0 1 6 0C19 5.6 20 5.9 20 5.9c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1 .8 2.1v3.1c0 .3.2.7.8.6A12 12 0 0 0 12 .7Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5a2.49 2.49 0 1 0 0 4.98 2.49 2.49 0 0 0 0-4.98ZM3 8.98h3.96V21H3V8.98Zm7.02 0H13.8v1.64h.05c.52-.99 1.8-2.03 3.7-2.03 3.95 0 4.68 2.6 4.68 5.98V21h-3.96v-5.7c0-1.36-.02-3.11-1.9-3.11-1.9 0-2.2 1.49-2.2 3.02V21h-3.95V8.98Z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M3.5 6.5h17a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-17a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1Z" />
      <path d="m4.5 7.5 7.5 6 7.5-6" />
    </svg>
  );
}

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/Guevarra-Alpie01",
    icon: <GitHubIcon />,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/guevarra-alpie-m-984103371",
    icon: <LinkedInIcon />,
  },
  {
    label: "Email",
    href: "mailto:alpieguevarra12@gmail.com",
    icon: <EmailIcon />,
  },
];

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
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                  aria-label={link.label}
                  title={link.label}
                  className="social-icon-button chip-outline inline-flex h-11 w-11 items-center justify-center rounded-full text-sand transition hover:text-emberSoft"
                >
                  <span className="sr-only">{link.label}</span>
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
