import { useEffect, useState } from "react";

import AboutSection from "./sections/AboutSection";
import CustomCursor from "./components/CustomCursor";
import ContactSection from "./sections/ContactSection";
import HeroSection from "./sections/HeroSection";
import ProjectsSection from "./sections/ProjectsSection";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

const THEME_PREFERENCE_KEY = "portfolio-theme-preference";

function getSystemTheme() {
  if (typeof window === "undefined") {
    return "dark";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function SiteLogo() {
  return (
    <img
      src="/static/final-logo.png"
      alt=""
      width={156}
      height={156}
      decoding="async"
      className="site-logo"
    />
  );
}

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
  const [themePreference, setThemePreference] = useState(() => {
    if (typeof window === "undefined") {
      return "system";
    }

    return (
      window.localStorage.getItem(THEME_PREFERENCE_KEY) ||
      window.localStorage.getItem("portfolio-theme") ||
      "system"
    );
  });
  const [systemTheme, setSystemTheme] = useState(getSystemTheme);
  const [activeSection, setActiveSection] = useState("home");
  const theme = themePreference === "system" ? systemTheme : themePreference;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleThemeChange = (event) => {
      setSystemTheme(event.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleThemeChange);
    setSystemTheme(mediaQuery.matches ? "dark" : "light");

    return () => mediaQuery.removeEventListener("change", handleThemeChange);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("portfolio-theme", theme);
    window.localStorage.setItem(THEME_PREFERENCE_KEY, themePreference);
  }, [theme, themePreference]);

  useEffect(() => {
    const sectionIds = navLinks.map((link) => link.href.slice(1));
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length) {
      return undefined;
    }

    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + 140;
      let nextActiveSection = sectionIds[0];

      sections.forEach((section) => {
        if (section.offsetTop <= scrollPosition) {
          nextActiveSection = section.id;
        }
      });

      setActiveSection((current) =>
        current === nextActiveSection ? current : nextActiveSection,
      );
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  function handleThemeToggle() {
    setThemePreference((currentPreference) => {
      if (currentPreference === "system") {
        return theme === "dark" ? "light" : "dark";
      }

      return "system";
    });
  }

  const nextThemeLabel =
    themePreference === "system"
      ? `Switch to ${theme === "dark" ? "light" : "dark"} mode`
      : "Use system theme";

  function renderThemeButton() {
    return (
      <button
        type="button"
        onClick={handleThemeToggle}
        className="theme-toggle inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sand sm:h-11 sm:w-11"
        aria-label={nextThemeLabel}
        title={nextThemeLabel}
        aria-pressed={themePreference !== "system"}
      >
        <span className="sr-only">{nextThemeLabel}</span>
        {theme === "dark" ? <SunIcon /> : <MoonIcon />}
      </button>
    );
  }

  return (
    <div className="min-h-screen bg-ink px-3 py-4 text-sand sm:px-4 md:px-8 md:py-6 lg:px-10">
      <CustomCursor />
      <div className="mx-auto max-w-7xl">
        <header className="nav-shell sticky top-3 z-50 mb-4 px-4 py-3 md:mb-6 md:px-5 md:py-4">
          <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2 sm:gap-3 md:gap-6">
            <div className="flex items-center">
              <a
                href="#home"
                className="inline-flex items-center justify-center"
                aria-label="Go to home"
              >
                <SiteLogo />
              </a>
            </div>

            <nav className="nav-compact flex min-w-0 items-center justify-center gap-1 text-mist sm:gap-2 md:gap-4 md:text-sm">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setActiveSection(link.href.slice(1))}
                  className={`nav-link shrink-0 transition ${
                    activeSection === link.href.slice(1) ? "is-active" : ""
                  }`.trim()}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center justify-end">
              {renderThemeButton()}
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
