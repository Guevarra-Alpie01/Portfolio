import { useState } from "react";

import { sendContactMessage } from "../api";
import PortfolioChatbot from "../components/PortfolioChatbot";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";

const initialForm = {
  name: "",
  email: "",
  message: "",
};

const contactLinks = [
  {
    label: "GitHub",
    href: "https://github.com/Guevarra-Alpie01",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/guevarra-alpie-m-984103371",
  },
  {
    label: "CV",
    href: "/documents/alpie-guevarra-cv.txt",
  },
];

export default function ContactSection() {
  const [formData, setFormData] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await sendContactMessage(formData);
      setSuccessMessage(response.message);
      setFormData(initialForm);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="contact" className="section-shell px-5 py-8 sm:px-6 sm:py-10 md:px-10">
      <Reveal>
        <SectionHeading
          eyebrow="Contact"
          title="Start a conversation."
          description="For full-stack roles, freelance work, or collaborative builds."
        />
      </Reveal>

      <div className="grid gap-6 xl:grid-cols-[0.82fr_1.18fr]">
        <div className="grid gap-5">
          <Reveal
            className="contact-intro-card card-shell rounded-[1.5rem] p-5 md:rounded-[1.75rem] md:p-6"
            variant="left"
          >
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-emberSoft">
              Open To Work
            </p>
            <h3 className="mt-4 max-w-[12ch] text-2xl font-semibold leading-tight text-sand sm:text-[2rem]">
              Full-stack roles, freelance work, and product collaboration.
            </h3>
            <p className="mt-4 max-w-md text-sm leading-7 text-mist">
              Send a direct message, or open the assistant for quick portfolio answers.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                  className="contact-link-chip inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium text-sand transition hover:text-emberSoft"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={100} variant="left">
            <PortfolioChatbot />
          </Reveal>
        </div>

        <Reveal
          as="form"
          onSubmit={handleSubmit}
          delay={110}
          variant="right"
          className="card-shell rounded-[1.5rem] p-5 md:rounded-[1.75rem] md:p-6"
        >
          <div className="mb-6">
            <p className="text-lg font-semibold text-sand">Send a message</p>
            <p className="mt-2 text-sm leading-6 text-mist">
              A short note and a reply email are enough.
            </p>
          </div>

          <div className="grid gap-5">
            <label className="grid gap-2 text-sm text-mist">
              Name
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="field-shell rounded-2xl px-4 py-3 text-sand focus:border-ember"
                placeholder="Your name"
                required
              />
            </label>

            <label className="grid gap-2 text-sm text-mist">
              Email
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="field-shell rounded-2xl px-4 py-3 text-sand focus:border-ember"
                placeholder="you@example.com"
                required
              />
            </label>

            <label className="grid gap-2 text-sm text-mist">
              Message
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="field-shell min-h-36 rounded-2xl px-4 py-3 text-sand focus:border-ember"
                placeholder="Tell me about the opportunity or project."
                required
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-ember px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#ff786d] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
          >
            {submitting ? "Sending..." : "Send Message"}
          </button>

          {successMessage ? (
            <p className="success-text mt-4 text-sm">{successMessage}</p>
          ) : null}
          {errorMessage ? (
            <p className="mt-4 text-sm text-emberSoft">{errorMessage}</p>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}
