import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { fetchProjects } from "../api";
import ErrorState from "../components/ErrorState";
import LoadingState from "../components/LoadingState";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";

function GalleryLightbox({ altLabel, images, index, onClose, onNavigate }) {
  const count = images.length;
  if (index === null || index < 0 || index >= count || typeof document === "undefined") {
    return null;
  }

  const src = images[index];

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Fullscreen screenshot"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/88 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <button
        type="button"
        aria-label="Close fullscreen view"
        className="absolute right-4 top-4 z-[102] rounded-full border border-white/25 bg-deep/90 px-3 py-1.5 text-sm font-semibold text-sand transition hover:border-emberSoft/60 hover:text-emberSoft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emberSoft"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        Close
      </button>

      {count > 1 ? (
        <>
          <button
            type="button"
            aria-label="Previous image"
            className="absolute left-3 top-1/2 z-[102] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-neutral-950/92 text-xl font-bold leading-none text-white shadow-[0_2px_16px_rgba(0,0,0,0.55)] ring-2 ring-black/35 transition hover:border-amber-100 hover:bg-neutral-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-200"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate(-1);
            }}
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next image"
            className="absolute right-3 top-1/2 z-[102] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-neutral-950/92 text-xl font-bold leading-none text-white shadow-[0_2px_16px_rgba(0,0,0,0.55)] ring-2 ring-black/35 transition hover:border-amber-100 hover:bg-neutral-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-200"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate(1);
            }}
          >
            ›
          </button>
        </>
      ) : null}

      <img
        src={src}
        alt={`${altLabel} — screenshot ${index + 1} of ${count} (fullscreen)`}
        className="max-h-[min(100dvh,100vh)] max-w-full cursor-default object-contain"
        onClick={(e) => e.stopPropagation()}
      />
    </div>,
    document.body,
  );
}

function ProjectCarousel({ altLabel, images }) {
  const [slide, setSlide] = useState(0);
  const [lightbox, setLightbox] = useState(null);
  const count = images?.length ?? 0;

  useEffect(() => {
    if (lightbox === null) {
      return undefined;
    }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e) => {
      if (e.key === "Escape") {
        setLightbox(null);
        return;
      }
      if (count < 2) {
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setLightbox((i) => (i === null ? null : (i - 1 + count) % count));
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setLightbox((i) => (i === null ? null : (i + 1) % count));
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox, count]);

  if (!count) {
    return null;
  }

  const goPrev = () => setSlide((i) => (i - 1 + count) % count);
  const goNext = () => setSlide((i) => (i + 1) % count);

  const moveLightbox = (delta) => {
    setLightbox((i) => (i === null ? null : (i + delta + count) % count));
  };

  return (
    <>
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-slate-950/35">
        <div className="relative isolate h-[188px] w-full sm:h-[212px]">
          <button
            type="button"
            className="absolute inset-x-11 inset-y-2 z-[1] flex cursor-pointer items-center justify-center rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emberSoft max-sm:inset-x-10 max-sm:inset-y-1.5"
            aria-label={`Open screenshot ${slide + 1} of ${count} full size`}
            onClick={() => setLightbox(slide)}
          >
            <img
              src={images[slide]}
              alt={`${altLabel} — screenshot ${slide + 1} of ${count}`}
              loading="lazy"
              className="pointer-events-none max-h-full max-w-full object-contain"
            />
          </button>
          {count > 1 ? (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
                aria-label="Previous image"
                className="absolute left-1.5 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-neutral-950/92 text-lg font-bold leading-none text-white shadow-[0_2px_16px_rgba(0,0,0,0.55)] ring-2 ring-black/40 transition hover:border-amber-100 hover:bg-neutral-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-200 sm:h-11 sm:w-11 sm:text-xl"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
                aria-label="Next image"
                className="absolute right-1.5 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-neutral-950/92 text-lg font-bold leading-none text-white shadow-[0_2px_16px_rgba(0,0,0,0.55)] ring-2 ring-black/40 transition hover:border-amber-100 hover:bg-neutral-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-200 sm:h-11 sm:w-11 sm:text-xl"
              >
                ›
              </button>
              <div className="pointer-events-none absolute bottom-2 left-0 right-0 z-10 flex justify-center gap-1.5">
                {images.map((url, dotIndex) => (
                  <button
                    key={`${dotIndex}-${url}`}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSlide(dotIndex);
                    }}
                    aria-label={`Show image ${dotIndex + 1}`}
                    className={`pointer-events-auto h-1.5 rounded-full shadow-[0_1px_6px_rgba(0,0,0,0.55)] transition ${
                      slide === dotIndex
                        ? "w-6 bg-emberSoft ring-2 ring-black/35"
                        : "w-1.5 bg-white/95 ring-1 ring-black/30 hover:bg-white"
                    }`}
                  />
                ))}
              </div>
            </>
          ) : null}
        </div>
      </div>

      <GalleryLightbox
        altLabel={altLabel}
        images={images}
        index={lightbox}
        onClose={() => setLightbox(null)}
        onNavigate={moveLightbox}
      />
    </>
  );
}

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
      <Reveal>
        <SectionHeading
          eyebrow="Projects"
          title="Highlighted projects"
          description="These are my projects—each card shows what I built, the stack behind it, and where to dig into the repo."
        />
      </Reveal>

      {loading ? <LoadingState label="projects" /> : null}
      {error ? <ErrorState message={error} /> : null}

      {!loading && !error ? (
        <div className="grid gap-4 md:gap-5 xl:grid-cols-3">
          {projects.map((project, index) => {
            const media =
              Array.isArray(project.gallery_image_urls) && project.gallery_image_urls.length > 0
                ? project.gallery_image_urls
                : [];

            return (
              <Reveal
                key={project.id}
                delay={index * 110}
                className="card-shell overflow-hidden rounded-[1.75rem]"
                data-cursor="card"
              >
                <div className="min-h-40 bg-gradient-to-br from-ember/30 via-transparent to-white/10 p-5 sm:min-h-48 sm:p-6">
                  {media.length ? (
                    <div className="flex h-full flex-col justify-between gap-3">
                      <ProjectCarousel altLabel={project.title} images={media} />
                      <div className="flex items-end justify-end pt-1">
                        <span className="chip-outline rounded-full px-3 py-1 text-xs uppercase tracking-[0.3em] text-emberSoft">
                          Featured Project
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex h-full items-end">
                      <span className="chip-outline rounded-full px-3 py-1 text-xs uppercase tracking-[0.3em] text-emberSoft">
                        Featured Project
                      </span>
                    </div>
                  )}
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
                        className="chip-outline rounded-full px-3 py-1 text-xs text-sand"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                    <a
                      href={project.github_link}
                      target="_blank"
                      rel="noreferrer"
                      className="accent-link inline-flex text-sm font-semibold text-emberSoft transition"
                    >
                      View GitHub Repository
                    </a>
                    {project.live_link ? (
                      <a
                        href={project.live_link}
                        target="_blank"
                        rel="noreferrer"
                        className="accent-link inline-flex text-sm font-semibold text-emberSoft transition"
                      >
                        Visit live site
                      </a>
                    ) : null}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      ) : null}
    </section>
  );
}
