import { useEffect, useState } from "react";

import AboutSection from "./sections/AboutSection";
import ContactSection from "./sections/ContactSection";
import HeroSection from "./sections/HeroSection";
import ProjectsSection from "./sections/ProjectsSection";
import SkillsSection from "./sections/SkillsSection";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.5v2.3M12 19.2v2.3M21.5 12h-2.3M4.8 12H2.5M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6M18.7 18.7l-1.6-1.6M6.9 6.9 5.3 5.3" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M20 14.2A8.2 8.2 0 1 1 9.8 4a6.9 6.9 0 1 0 10.2 10.2Z" />
    </svg>
  );
}

export default function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") {
      return "dark";
    }
    return window.localStorage.getItem("portfolio-theme") || "dark";
  });
  const [menuOpen, setMenuOpen] = useState(false);

  function handleNavClick() {
    setMenuOpen(false);
  }

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  return (
    <div className="min-h-screen bg-ink px-3 py-4 text-sand sm:px-4 md:px-8 md:py-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <header className="glass-shell sticky top-3 z-50 mb-4 rounded-[1.75rem] px-4 py-4 md:mb-6 md:rounded-full md:px-8">
          <div className="flex items-center justify-between gap-4">
            <a
              href="#home"
              onClick={handleNavClick}
              className="pr-3 text-[0.7rem] font-bold uppercase tracking-[0.28em] text-sand sm:text-sm sm:tracking-[0.35em] md:tracking-[0.4em]"
            >
              Alpie Guevarra
            </a>
            <div className="flex items-center gap-3">
              <nav className="hidden flex-wrap gap-6 text-sm text-mist md:flex">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={handleNavClick}
                    className="nav-link transition"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
              <button
                type="button"
                onClick={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
                className="theme-toggle inline-flex h-11 w-11 items-center justify-center rounded-full text-sand"
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                aria-pressed={theme === "light"}
              >
                <span className="sr-only">
                  Switch to {theme === "dark" ? "light" : "dark"} mode
                </span>
                {theme === "dark" ? <SunIcon /> : <MoonIcon />}
              </button>
              <button
                type="button"
                onClick={() => setMenuOpen((current) => !current)}
                className="theme-toggle inline-flex h-11 items-center justify-center rounded-full px-4 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-sand hover:text-emberSoft md:hidden"
                aria-expanded={menuOpen}
                aria-controls="mobile-nav"
                aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              >
                {menuOpen ? "Close" : "Menu"}
              </button>
            </div>
          </div>

          {menuOpen ? (
            <nav
              id="mobile-nav"
              className="mt-4 grid gap-2 pt-4 text-sm text-mist md:hidden"
              style={{ borderTop: "1px solid var(--border-soft)" }}
            >
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleNavClick}
                  className="theme-toggle rounded-2xl px-4 py-3 transition hover:text-emberSoft"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          ) : null}
        </header>

        <main className="space-y-4 md:space-y-6">
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ContactSection />
        </main>

        <footer className="px-2 py-6 text-center text-xs text-mist sm:text-sm md:py-8">
          Full-stack portfolio for Alpie Guevarra.
        </footer>
      </div>
    </div>
  );
}
