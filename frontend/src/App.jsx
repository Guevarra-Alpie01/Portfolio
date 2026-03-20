import { useEffect, useState } from "react";

import AboutSection from "./sections/AboutSection";
import CustomCursor from "./components/CustomCursor";
import ContactSection from "./sections/ContactSection";
import HeroSection from "./sections/HeroSection";
import ProjectsSection from "./sections/ProjectsSection";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
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

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  return (
    <div className="min-h-screen bg-ink px-3 py-4 text-sand sm:px-4 md:px-8 md:py-6 lg:px-10">
      <CustomCursor />
      <div className="mx-auto max-w-7xl">
        <header className="glass-shell sticky top-3 z-50 mb-4 rounded-[1.5rem] px-4 py-4 md:mb-6 md:rounded-full md:px-8">
          <div className="grid gap-3 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-6">
            <div className="flex items-center justify-between gap-3 md:justify-start">
              <a
                href="#home"
                className="text-[0.66rem] font-bold uppercase tracking-[0.24em] text-sand sm:text-[0.72rem] sm:tracking-[0.3em] md:text-sm md:tracking-[0.38em]"
              >
                Alpie Guevarra
              </a>
              <button
                type="button"
                onClick={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
                className="theme-toggle inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sand md:hidden"
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                aria-pressed={theme === "light"}
              >
                <span className="sr-only">
                  Switch to {theme === "dark" ? "light" : "dark"} mode
                </span>
                {theme === "dark" ? <SunIcon /> : <MoonIcon />}
              </button>
            </div>

            <nav className="flex items-center justify-center gap-3 overflow-x-auto whitespace-nowrap pb-1 text-[0.68rem] text-mist [scrollbar-width:none] sm:gap-4 sm:text-xs md:flex-wrap md:justify-center md:gap-6 md:pb-0 md:text-sm">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="nav-link shrink-0 transition"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="hidden md:flex md:justify-end">
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
            </div>
          </div>
        </header>

        <main className="space-y-4 md:space-y-6">
          <HeroSection />
          <AboutSection />
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
