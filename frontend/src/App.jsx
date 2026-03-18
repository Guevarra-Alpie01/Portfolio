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
  return (
    <div className="min-h-screen bg-ink px-4 py-6 text-sand md:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6 rounded-full border border-white/10 bg-black/20 px-5 py-4 backdrop-blur md:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <a href="#home" className="text-sm font-bold uppercase tracking-[0.4em] text-sand">
              Student Portfolio
            </a>
            <nav className="flex flex-wrap gap-4 text-sm text-mist">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="transition hover:text-emberSoft"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </header>

        <main className="space-y-6">
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ContactSection />
        </main>

        <footer className="px-2 py-8 text-center text-sm text-mist">
          Built with Django, Django REST Framework, React, Tailwind CSS, and SQLite.
        </footer>
      </div>
    </div>
  );
}
