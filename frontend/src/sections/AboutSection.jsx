import SectionHeading from "../components/SectionHeading";

const strengths = [
  {
    title: "Curious builder",
    description:
      "I enjoy understanding how systems fit together, from database models to interface details.",
  },
  {
    title: "Team-ready mindset",
    description:
      "I write readable code, document decisions, and build features with maintainability in mind.",
  },
  {
    title: "Practical problem solver",
    description:
      "I like building projects that solve real student and business problems using dependable tools.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="section-shell px-6 py-10 md:px-10">
      <SectionHeading
        eyebrow="About Me"
        title="A graduating student preparing for professional full-stack work."
        description="This portfolio is designed to highlight both technical growth and the ability to deliver polished, end-to-end web experiences."
      />

      <div className="grid gap-5 md:grid-cols-3">
        {strengths.map((item) => (
          <article
            key={item.title}
            className="rounded-[1.75rem] border border-white/10 bg-black/20 p-6"
          >
            <h3 className="text-lg font-semibold text-sand">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-mist">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
