import { useState } from "react";

import { sendContactMessage } from "../api";
import PortfolioChatbot from "../components/PortfolioChatbot";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M12 .7a12 12 0 0 0-3.8 23.4c.6.1.8-.2.8-.6v-2.1c-3.2.7-3.9-1.4-3.9-1.4-.5-1.4-1.3-1.7-1.3-1.7-1.1-.8.1-.8.1-.8 1.2.1 1.8 1.2 1.8 1.2 1 .1 1.6 2.7 4.3 1.9.1-.8.4-1.3.7-1.6-2.6-.3-5.4-1.3-5.4-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.3 11.3 0 0 1 6 0C19 5.6 20 5.9 20 5.9c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1 .8 2.1v3.1c0 .3.2.7.8.6A12 12 0 0 0 12 .7Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M5.2 7.5A1.7 1.7 0 1 0 5.2 4a1.7 1.7 0 0 0 0 3.5ZM3.8 8.9h2.8v11.3H3.8zM11 8.9H8.3v11.3H11v-6c0-1.6.3-3.1 2.3-3.1 2 0 2 1.9 2 3.2v5.9H18V13.7c0-3.1-.7-5.4-4.3-5.4-1.7 0-2.8.9-3.3 1.8h-.1V8.9H11Z" />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M8 3.8h6l4 4v12.4A1.8 1.8 0 0 1 16.2 22H8A1.8 1.8 0 0 1 6.2 20.2V5.6A1.8 1.8 0 0 1 8 3.8Z" />
      <path d="M14 3.8v4h4M9 12h6M9 16h6" />
    </svg>
  );
}

const initialForm = {
  name: "",
  email: "",
  message: "",
};

const contactLinks = [
  {
    label: "GitHub",
    href: "https://github.com/Guevarra-Alpie01",
    icon: <GitHubIcon />,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/guevarra-alpie-m-984103371",
    icon: <LinkedInIcon />,
  },
  {
    label: "CV",
    href: "/static/documents/alpie_resume.docx",
    download: "alpie_resume.docx",
    icon: <DocumentIcon />,
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
        />
      </Reveal>

      <Reveal
        as="form"
        onSubmit={handleSubmit}
        delay={100}
        variant="up"
        className="contact-card mx-auto max-w-3xl rounded-[1.5rem] p-5 md:rounded-[1.75rem] md:p-7"
      >
        <div className="flex justify-center gap-3">
          {contactLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              {...(link.download ? { download: link.download } : {})}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noreferrer" : undefined}
              className="contact-link-icon inline-flex h-12 w-12 items-center justify-center rounded-full text-sand transition hover:text-emberSoft"
              aria-label={link.label}
              title={link.label}
            >
              {link.icon}
            </a>
          ))}
        </div>

        <div className="mt-8 grid gap-4">
          <div>
            <label className="sr-only" htmlFor="contact-name">
              Name
            </label>
            <input
              id="contact-name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="field-shell w-full rounded-2xl px-4 py-3 text-sand focus:border-ember"
              placeholder="Your name"
              required
            />
          </div>

          <div>
            <label className="sr-only" htmlFor="contact-email">
              Email
            </label>
            <input
              id="contact-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="field-shell w-full rounded-2xl px-4 py-3 text-sand focus:border-ember"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="sr-only" htmlFor="contact-message">
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="field-shell min-h-40 w-full rounded-2xl px-4 py-3 text-sand focus:border-ember"
              placeholder="Tell me about the opportunity or project."
              required
            />
          </div>
        </div>

        <div className="contact-action-row mt-6">
          <span className="contact-action-balance" aria-hidden="true" />
          <button
            type="submit"
            disabled={submitting}
            className="contact-submit-button inline-flex items-center justify-center rounded-full bg-ember px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#ff786d] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting ? "Sending..." : "Send Message"}
          </button>
          <PortfolioChatbot
            label="Start Chat"
            iconVariant="bot"
            className="contact-chatbot-trigger"
          />
        </div>

        {successMessage ? (
          <p className="success-text mt-4 text-center text-sm">{successMessage}</p>
        ) : null}
        {errorMessage ? (
          <p className="mt-4 text-center text-sm text-emberSoft">{errorMessage}</p>
        ) : null}
      </Reveal>
    </section>
  );
}
