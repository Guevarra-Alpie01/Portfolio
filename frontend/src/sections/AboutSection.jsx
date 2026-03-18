import Reveal from "../components/Reveal";

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5 19.2c1.7-3 4-4.5 7-4.5s5.3 1.5 7 4.5" />
    </svg>
  );
}

function LayoutIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M4 5.5h16v13H4z" />
      <path d="M10 5.5v13M4 10.5h6" />
    </svg>
  );
}

function GitBranchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="7" cy="5.5" r="2" />
      <circle cx="17" cy="18.5" r="2" />
      <circle cx="17" cy="8.5" r="2" />
      <path d="M9 5.5h5a3 3 0 0 1 3 3v0M7 7.5v7a4 4 0 0 0 4 4h4" />
    </svg>
  );
}

function PythonIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M11.5 2c-3.8 0-3.6 1.7-3.6 1.7v1.8h3.7v.5H6.5S4 5.7 4 9.5 6.2 13 6.2 13h1.3v-1.8s-.1-2.2 2.2-2.2h3.7s2.1 0 2.1-2.1V3.8S15.8 2 11.5 2Zm-2 1.2a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8Z" />
      <path d="M12.5 22c3.8 0 3.6-1.7 3.6-1.7v-1.8h-3.7V18h5.1s2.5.3 2.5-3.5S17.8 11 17.8 11h-1.3v1.8s.1 2.2-2.2 2.2h-3.7S8.5 15 8.5 17.1v3.1S8.2 22 12.5 22Zm2-1.2a.9.9 0 1 1 0-1.8.9.9 0 0 1 0 1.8Z" />
    </svg>
  );
}

function JavaScriptIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M3 3h18v18H3V3Zm9.6 14.5c1.7 0 2.8-.9 2.8-2.4 0-1.4-.8-2.1-2.2-2.7l-.5-.2c-.7-.3-1-.4-1-.8 0-.3.3-.6.8-.6.6 0 1 .2 1.5.6l.7-.9c-.6-.6-1.4-.9-2.3-.9-1.5 0-2.6.9-2.6 2.2 0 1.4 1.1 2 2.1 2.4l.5.2c.8.3 1.2.5 1.2.9 0 .5-.4.8-1.1.8s-1.3-.3-1.9-.9l-.8.9c.7.9 1.7 1.4 2.8 1.4ZM8.7 17.5c1.5 0 2.6-.8 2.6-2.6v-5.2H9.9v5.1c0 .8-.3 1.1-.9 1.1-.5 0-.8-.2-1.1-.7l-1 .7c.4.9 1.1 1.6 2.3 1.6Z" />
    </svg>
  );
}

function HtmlIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="m4 3 1.6 18L12 22l6.4-1L20 3H4Zm11.7 4-.2 2.2H9l.2 2.2h6l-.6 6.3-2.6.7-2.6-.7-.2-2.4h2.1l.1.9.6.2.6-.2.2-2H7.3L6.8 7h8.9Z" />
    </svg>
  );
}

function CssIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="m4 3 1.6 18L12 22l6.4-1L20 3H4Zm11.3 4-.3 2.2H10l.1 2.2h4.7l-.5 5.9-2.3.7-2.4-.7-.1-2h2.1l.1.7.4.1.5-.1.2-2.4H8.2L7.9 7h7.4Z" />
    </svg>
  );
}

function DjangoIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M10.2 3h3.4v12.6c-1.7.3-3 .4-4.3.4-4 0-6.1-1.8-6.1-5.3 0-3.4 2.2-5.6 5.6-5.6.5 0 .9 0 1.4.1V3Zm0 5c-.4-.1-.7-.1-1.1-.1-1.7 0-2.7 1-2.7 2.8 0 1.7.9 2.7 2.6 2.7.4 0 .7 0 1.1-.1V8Zm9.3-2.7v7.7c0 2.6-.2 3.9-1 5-.8 1-2 1.7-3.8 2.2l-3.2-1.5c1.7-.4 2.9-1 3.5-1.8.7-.9.9-2 .9-4.8V5.3h3.6Zm-3.6-5.2h3.6v3.7h-3.6V.1Z" />
    </svg>
  );
}

function TailwindIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M6 9.8c.9-2.1 2.2-3.1 4-3.1 2.7 0 3 2 4.4 2 1 0 1.8-.6 2.6-1.9-.9 2.1-2.2 3.1-4 3.1-2.7 0-3-2-4.4-2-1 0-1.8.6-2.6 1.9Zm4 5.5c.9-2.1 2.2-3.1 4-3.1 2.7 0 3 2 4.4 2 1 0 1.8-.6 2.6-1.9-.9 2.1-2.2 3.1-4 3.1-2.7 0-3-2-4.4-2-1 0-1.8.6-2.6 1.9Zm-8 0c.9-2.1 2.2-3.1 4-3.1 2.7 0 3 2 4.4 2 1 0 1.8-.6 2.6-1.9-.9 2.1-2.2 3.1-4 3.1-2.7 0-3-2-4.4-2-1 0-1.8.6-2.6 1.9Z" />
    </svg>
  );
}

function BootstrapIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M5.7 4.5c.1-1 1-1.8 2-1.8h8.6c1 0 1.9.8 2 1.8l.7 10.4c.1 1-.5 1.9-1.4 2.3l-4.4 2a2.6 2.6 0 0 1-2.2 0l-4.4-2a2.1 2.1 0 0 1-1.4-2.3l.5-10.4Zm5.2 2.6v3h2c1 0 1.6-.5 1.6-1.5 0-1-.6-1.5-1.8-1.5h-1.8Zm0 4.7v3.1h2.1c1.3 0 2-.5 2-1.6s-.7-1.5-2-1.5h-2.1Z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M12 .7a12 12 0 0 0-3.8 23.4c.6.1.8-.2.8-.6v-2.1c-3.2.7-3.9-1.4-3.9-1.4-.5-1.4-1.3-1.7-1.3-1.7-1.1-.8.1-.8.1-.8 1.2.1 1.8 1.2 1.8 1.2 1 .1 1.6 2.7 4.3 1.9.1-.8.4-1.3.7-1.6-2.6-.3-5.4-1.3-5.4-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.3 11.3 0 0 1 6 0C19 5.6 20 5.9 20 5.9c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1 .8 2.1v3.1c0 .3.2.7.8.6A12 12 0 0 0 12 .7Z" />
    </svg>
  );
}

function DatabaseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <ellipse cx="12" cy="5.5" rx="6.5" ry="2.8" />
      <path d="M5.5 5.5v5c0 1.5 2.9 2.8 6.5 2.8s6.5-1.3 6.5-2.8v-5" />
      <path d="M5.5 10.5v5c0 1.5 2.9 2.8 6.5 2.8s6.5-1.3 6.5-2.8v-5" />
    </svg>
  );
}

function PostgreSqlIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7.4 10.4c0-3 1.7-5.1 4.2-5.1 2.7 0 4.7 2.2 4.7 5.3 0 2.8-1.4 4.7-3.6 5.1v2.8l-2.3-1.6-2.2 1.1v-2.8c-.5-.2-.9-.5-1.3-.9-.8-.8-1.4-2.1-1.4-3.9Z" />
      <path d="M9.7 10.5c0-1.8.7-2.8 1.9-2.8 1.1 0 2 .9 2 2.5 0 1.8-.8 2.8-2 2.8-1.2 0-1.9-1-1.9-2.5Z" />
      <path d="M16 9.8c.9-.1 1.7-.3 2.3-.8" />
    </svg>
  );
}

function MySqlIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4.8 13.8c2.4-3.6 5.1-5.2 8-5 2.5.2 4.6 1.7 6.4 4.5" />
      <path d="M10.6 8.9c-.1 1.4.2 2.6.9 3.7" />
      <path d="M14.8 8.9c.8.7 1.5 1.7 2 2.8" />
      <path d="M18.4 13.4c.6.7.8 1.6.6 2.6" />
      <path d="M8.6 14.3c1.6 0 2.9.6 3.7 1.8" />
      <path d="M6.3 15.2c-.5 1.1-.4 2.1.3 3" />
    </svg>
  );
}

function SqliteIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <ellipse cx="12" cy="5.4" rx="5.5" ry="2.2" />
      <path d="M6.5 5.4v7.8c0 1.2 2.5 2.2 5.5 2.2s5.5-1 5.5-2.2V5.4" />
      <path d="M6.5 9.2c0 1.2 2.5 2.2 5.5 2.2s5.5-1 5.5-2.2" />
      <path d="M9.3 19.1h5.4" />
      <path d="M10.2 16.9v2.2M13.8 16.9v2.2" />
    </svg>
  );
}

const aboutHighlights = [
  {
    label: "Backend",
    description: "Django and Python APIs with database-backed logic.",
    icon: <UserIcon />,
  },
  {
    label: "Frontend",
    description: "Responsive interfaces with simple, clean structure.",
    icon: <LayoutIcon />,
  },
  {
    label: "Workflow",
    description: "Version control and practical project delivery.",
    icon: <GitBranchIcon />,
  },
];

const skillGroups = [
  {
    title: "Programming Languages",
    items: [
      { label: "Python", icon: <PythonIcon /> },
      { label: "JavaScript", icon: <JavaScriptIcon /> },
      { label: "HTML", icon: <HtmlIcon /> },
      { label: "CSS", icon: <CssIcon /> },
    ],
  },
  {
    title: "Frameworks",
    items: [
      { label: "Django", icon: <DjangoIcon /> },
      { label: "Tailwind", icon: <TailwindIcon /> },
      { label: "Bootstrap", icon: <BootstrapIcon /> },
    ],
  },
  {
    title: "Tools",
    items: [{ label: "GitHub", icon: <GitHubIcon /> }],
  },
  {
    title: "Databases",
    items: [
      { label: "PostgreSQL", icon: <PostgreSqlIcon /> },
      { label: "MySQL", icon: <MySqlIcon /> },
      { label: "SQLite", icon: <SqliteIcon /> },
    ],
  },
];

function SkillChip({ label, icon }) {
  return (
    <div
      className="nested-shell flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-sand sm:text-sm"
      title={label}
      aria-label={label}
    >
      <span className="text-emberSoft">{icon}</span>
      <span>{label}</span>
    </div>
  );
}

export default function AboutSection() {
  return (
    <section id="about" className="grid gap-4 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-stretch md:gap-6">
      <Reveal
        as="article"
        variant="left"
        className="section-shell flex h-full flex-col rounded-[1.75rem] px-5 py-8 sm:px-6 sm:py-10 md:px-8"
      >
        <div>
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-emberSoft sm:text-xs sm:tracking-[0.35em]">
            About Me
          </p>
          <h2 className="mt-3 max-w-md text-2xl font-semibold leading-tight text-sand sm:text-3xl">
            A full-stack developer focused on modern web apps from interface to database.
          </h2>
          <p className="mt-4 max-w-lg text-sm leading-7 text-mist sm:text-base sm:leading-8">
            I build practical web applications using Django, Python, JavaScript,
            and modern frontend tools. My goal is to create clean user experiences
            backed by reliable logic, organized workflows, and solid database design.
          </p>
        </div>

        <div className="mt-6 space-y-3">
          {aboutHighlights.map((item, index) => (
            <Reveal
              key={item.label}
              delay={index * 90}
              className="nested-shell flex items-start gap-3 rounded-[1.15rem] px-4 py-3"
            >
              <span className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full text-emberSoft chip-outline">
                {item.icon}
              </span>
              <div>
                <h3 className="text-sm font-semibold text-sand sm:text-base">
                  {item.label}
                </h3>
                <p className="mt-1 text-xs leading-6 text-mist sm:text-sm">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Reveal>

      <Reveal
        as="article"
        variant="right"
        delay={120}
        className="section-shell flex h-full flex-col rounded-[1.75rem] px-5 py-8 sm:px-6 sm:py-10 md:px-8"
      >
        <div>
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-emberSoft sm:text-xs sm:tracking-[0.35em]">
            Skills
          </p>
          <h2 className="mt-3 text-2xl font-semibold leading-tight text-sand sm:text-3xl">
            Skills
          </h2>
        </div>

        <div className="mt-6 space-y-4">
          {skillGroups.map((group, groupIndex) => (
            <Reveal
              key={group.title}
              delay={groupIndex * 100}
              className="card-shell rounded-[1.3rem] p-4 sm:p-5"
            >
              <h3 className="text-sm font-semibold text-sand sm:text-base">
                {group.title}
              </h3>
              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {group.items.map((item, itemIndex) => (
                  <Reveal key={item.label} delay={itemIndex * 70}>
                    <SkillChip label={item.label} icon={item.icon} />
                  </Reveal>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
