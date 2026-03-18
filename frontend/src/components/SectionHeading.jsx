export default function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mb-8">
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emberSoft">
        {eyebrow}
      </p>
      <h2 className="section-title mt-3">{title}</h2>
      <p className="section-subtitle">{description}</p>
    </div>
  );
}
