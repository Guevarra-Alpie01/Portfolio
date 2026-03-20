export default function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mb-6 md:mb-8">
      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-emberSoft sm:text-xs sm:tracking-[0.35em]">
        {eyebrow}
      </p>
      <h2 className="section-title mt-3">{title}</h2>
      {description ? <p className="section-subtitle">{description}</p> : null}
    </div>
  );
}
