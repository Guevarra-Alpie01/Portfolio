import { useEffect, useState } from "react";

import { fetchSkills } from "../api";
import ErrorState from "../components/ErrorState";
import LoadingState from "../components/LoadingState";
import SectionHeading from "../components/SectionHeading";

const skillCategories = [
  {
    title: "Programming Languages I Use",
    description: "Core languages I use to build interfaces, logic, and backend functionality.",
    skills: ["Python", "JavaScript", "HTML", "CSS"],
  },
  {
    title: "Frameworks and Styling Tools",
    description: "Frameworks and UI tools I use to structure and style full-stack projects.",
    skills: ["Django", "Bootstrap", "Tailwind CSS"],
  },
  {
    title: "Tools",
    description: "Tools I use for version control, project workflow, and collaboration.",
    skills: ["Git / GitHub"],
  },
  {
    title: "Databases",
    description: "Database systems I use for storing, managing, and querying application data.",
    skills: ["PostgreSQL", "MySQL", "SQLite"],
  },
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

  const skillsByName = new Map(skills.map((skill) => [skill.name, skill]));
  const categorizedSkills = skillCategories
    .map((category) => ({
      ...category,
      items: category.skills
        .map((skillName) => skillsByName.get(skillName))
        .filter(Boolean),
    }))
    .filter((category) => category.items.length > 0);

  return (
    <section id="skills" className="section-shell px-5 py-8 sm:px-6 sm:py-10 md:px-10">
      <SectionHeading
        eyebrow="Skills"
        title="Skills grouped by languages, frameworks, tools, and databases."
        description="This section pulls data from the Django REST API and organizes the technologies I use into clearer categories."
      />

      {loading ? <LoadingState label="skills" /> : null}
      {error ? <ErrorState message={error} /> : null}

      {!loading && !error ? (
        <div className="space-y-5">
          {categorizedSkills.map((category) => (
            <section key={category.title} className="card-shell rounded-[1.6rem] p-5 sm:p-6">
              <div className="mb-5">
                <h3 className="text-lg font-semibold text-sand sm:text-xl">
                  {category.title}
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-mist">
                  {category.description}
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {category.items.map((skill) => (
                  <article
                    key={skill.id}
                    className="nested-shell rounded-[1.35rem] p-4 sm:p-5"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <h4 className="text-base font-semibold text-sand">
                        {skill.name}
                      </h4>
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
            </section>
          ))}
        </div>
      ) : null}
    </section>
  );
}
