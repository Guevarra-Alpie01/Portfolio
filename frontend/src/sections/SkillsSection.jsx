import { useEffect, useState } from "react";

import { fetchSkills } from "../api";
import ErrorState from "../components/ErrorState";
import LoadingState from "../components/LoadingState";
import SectionHeading from "../components/SectionHeading";

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

  return (
    <section id="skills" className="section-shell px-6 py-10 md:px-10">
      <SectionHeading
        eyebrow="Skills"
        title="Technologies I use to build full-stack applications."
        description="This section fetches skill data from the Django REST API and presents it as a quick confidence snapshot."
      />

      {loading ? <LoadingState label="skills" /> : null}
      {error ? <ErrorState message={error} /> : null}

      {!loading && !error ? (
        <div className="grid gap-4 md:grid-cols-2">
          {skills.map((skill) => (
            <article
              key={skill.id}
              className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5"
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-base font-semibold text-sand">{skill.name}</h3>
                <span className="text-sm font-semibold text-emberSoft">
                  {skill.level}%
                </span>
              </div>
              <div className="mt-4 h-2 rounded-full bg-white/10">
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
