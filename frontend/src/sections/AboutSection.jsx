import SectionHeading from "../components/SectionHeading";

const strengths = [
  {
    title: "Backend development",
    description:
      "I build full-stack applications with Django and Python backed by MySQL, PostgreSQL, and SQLite databases.",
  },
  {
    title: "Frontend development",
    description:
      "I create responsive interfaces using HTML, CSS, JavaScript, Bootstrap, and Tailwind CSS with a focus on clean user experiences.",
  },
  {
    title: "Workflow and delivery",
    description:
      "I use Git and GitHub to manage version control, keep projects organized, and collaborate with a reliable development workflow.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="section-shell px-5 py-8 sm:px-6 sm:py-10 md:px-10">
      <SectionHeading
        eyebrow="About Me"
        title="A full-stack developer focused on modern web apps from interface to database."
        description="This portfolio highlights practical experience across backend development, responsive frontend work, database design, and version-controlled delivery."
      />

      <div className="grid gap-4 md:grid-cols-3 md:gap-5">
        {strengths.map((item) => (
          <article
            key={item.title}
            className="card-shell rounded-[1.5rem] p-5 md:rounded-[1.75rem] md:p-6"
          >
            <h3 className="text-lg font-semibold text-sand">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-mist">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
