import { useEffect, useState } from "react";

import { fetchProjects } from "../api";
import ErrorState from "../components/ErrorState";
import LoadingState from "../components/LoadingState";
import SectionHeading from "../components/SectionHeading";

export default function ProjectsSection() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadProjects() {
      try {
        const data = await fetchProjects();
        if (isMounted) {
          setProjects(data);
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

    loadProjects();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section id="projects" className="section-shell px-5 py-8 sm:px-6 sm:py-10 md:px-10">
      <SectionHeading
        eyebrow="Projects"
        title="Selected work focused on practical, portfolio-ready solutions."
        description="Projects are fetched from the backend so you can update them later through Django admin or the database."
      />

      {loading ? <LoadingState label="projects" /> : null}
      {error ? <ErrorState message={error} /> : null}

      {!loading && !error ? (
        <div className="grid gap-4 md:gap-5 xl:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.id}
              className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/20"
            >
              <div className="min-h-40 bg-gradient-to-br from-ember/30 via-transparent to-white/10 p-5 sm:min-h-48 sm:p-6">
                <div className="flex h-full items-end">
                  <span className="rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.3em] text-emberSoft">
                    Featured Project
                  </span>
                </div>
              </div>
              <div className="p-5 sm:p-6">
                <h3 className="text-xl font-semibold text-sand">{project.title}</h3>
                <p className="mt-3 text-sm leading-7 text-mist">
                  {project.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tech_stack_items.map((item) => (
                    <span
                      key={`${project.id}-${item}`}
                      className="rounded-full border border-white/10 px-3 py-1 text-xs text-sand"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <a
                  href={project.github_link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex text-sm font-semibold text-emberSoft transition hover:text-white"
                >
                  View GitHub Repository
                </a>
              </div>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
}
