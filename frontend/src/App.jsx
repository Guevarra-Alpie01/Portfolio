import { useState } from "react";

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

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  function handleNavClick() {
    setMenuOpen(false);
  }

  return (
    <div className="min-h-screen bg-ink px-3 py-4 text-sand sm:px-4 md:px-8 md:py-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <header className="mb-4 rounded-[1.75rem] border border-white/10 bg-black/20 px-4 py-4 backdrop-blur md:mb-6 md:rounded-full md:px-8">
          <div className="flex items-center justify-between gap-4">
            <a
              href="#home"
              onClick={handleNavClick}
              className="pr-3 text-[0.7rem] font-bold uppercase tracking-[0.28em] text-sand sm:text-sm sm:tracking-[0.35em] md:tracking-[0.4em]"
            >
              Student Portfolio
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((current) => !current)}
              className="inline-flex h-11 items-center justify-center rounded-full border border-white/10 px-4 text-sand transition hover:border-emberSoft hover:text-emberSoft md:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.18em]">
                {menuOpen ? "Close" : "Menu"}
              </span>
            </button>
            <nav className="hidden flex-wrap gap-6 text-sm text-mist md:flex">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleNavClick}
                  className="transition hover:text-emberSoft"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {menuOpen ? (
            <nav
              id="mobile-nav"
              className="mt-4 grid gap-2 border-t border-white/10 pt-4 text-sm text-mist md:hidden"
            >
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleNavClick}
                  className="rounded-2xl border border-white/10 px-4 py-3 transition hover:border-emberSoft hover:text-emberSoft"
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
          Built with Django, Django REST Framework, React, Tailwind CSS, and SQLite.
        </footer>
      </div>
    </div>
  );
}
