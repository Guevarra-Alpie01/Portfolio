import { useState } from "react";

import { sendContactMessage } from "../api";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";

const initialForm = {
  name: "",
  email: "",
  message: "",
};

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
          title="Let's talk about full-stack roles, freelance work, or collaborative projects."
          description="This form submits directly to the Django REST API and stores each message inside SQLite."
        />
      </Reveal>

      <div className="grid gap-8 lg:grid-cols-[0.75fr_1fr]">
        <Reveal
          className="card-shell rounded-[1.5rem] p-5 md:rounded-[1.75rem] md:p-6"
          variant="left"
        >
          <p className="text-lg font-semibold text-sand">Why this section matters</p>
          <p className="mt-4 text-sm leading-7 text-mist">
            Recruiters, clients, or collaborators can leave a message directly
            through the portfolio without relying on third-party form services.
          </p>
          <div className="mt-6 space-y-3 text-sm text-mist">
            <p>Messages can be reviewed from the Django admin.</p>
            <p>Submissions are stored in the local database.</p>
            <p>The API returns validation errors for incomplete input.</p>
          </div>
        </Reveal>

        <Reveal
          as="form"
          onSubmit={handleSubmit}
          delay={110}
          variant="right"
          className="card-shell rounded-[1.5rem] p-5 md:rounded-[1.75rem] md:p-6"
        >
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
