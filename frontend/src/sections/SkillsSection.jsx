import { useEffect, useState } from "react";

import { fetchSkills } from "../api";
import ErrorState from "../components/ErrorState";
import LoadingState from "../components/LoadingState";
import SectionHeading from "../components/SectionHeading";

const featuredSkillOrder = [
  "Python",
  "Django",
  "Bootstrap",
  "Tailwind CSS",
  "HTML",
  "CSS",
  "JavaScript",
  "MySQL",
  "PostgreSQL",
  "SQLite",
  "Git / GitHub",
];

export default function SkillsSection() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadSkills() {
      try {
        const data = await fetchSkills();
        if (isMounted) {
          setSkills(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadSkills();
    return () => {
      isMounted = false;
    };
  }, []);

  const orderedSkills = featuredSkillOrder
    .map((skillName) => skills.find((skill) => skill.name === skillName))
    .filter(Boolean);
  const displaySkills = orderedSkills.length ? orderedSkills : skills;

  return (
    <section id="skills" className="section-shell px-5 py-8 sm:px-6 sm:py-10 md:px-10">
      <SectionHeading
        eyebrow="Skills"
        title="Technologies I use across frontend, backend, databases, and version control."
        description="This section fetches skill data from the Django REST API and focuses on the stack I use for full-stack development."
      />

      {loading ? <LoadingState label="skills" /> : null}
      {error ? <ErrorState message={error} /> : null}

      {!loading && !error ? (
        <div className="grid gap-4 md:grid-cols-2">
          {displaySkills.map((skill) => (
            <article
              key={skill.id}
              className="card-shell rounded-[1.4rem] p-4 sm:p-5"
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-base font-semibold text-sand">{skill.name}</h3>
                <span className="text-sm font-semibold text-emberSoft">
                  {skill.level}%
                </span>
              </div>
              <div className="progress-track mt-4 h-2 rounded-full">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-ember to-emberSoft"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
}
