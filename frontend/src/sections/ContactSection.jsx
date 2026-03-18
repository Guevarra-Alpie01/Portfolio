import { useState } from "react";

import { sendContactMessage } from "../api";
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
    <section id="contact" className="section-shell px-6 py-10 md:px-10">
      <SectionHeading
        eyebrow="Contact"
        title="Let’s talk about internships, junior roles, or collaborative projects."
        description="This form submits directly to the Django REST API and stores each message inside SQLite."
      />

      <div className="grid gap-8 lg:grid-cols-[0.75fr_1fr]">
        <div className="rounded-[1.75rem] border border-white/10 bg-black/20 p-6">
          <p className="text-lg font-semibold text-sand">Why this section matters</p>
          <p className="mt-4 text-sm leading-7 text-mist">
            Recruiters or collaborators can leave a message without relying on
            external APIs, which keeps the project compatible with PythonAnywhere's
            free plan and easy to deploy.
          </p>
          <div className="mt-6 space-y-3 text-sm text-mist">
            <p>Email responses can be handled manually from the Django admin.</p>
            <p>All submissions are stored in SQLite.</p>
            <p>The API returns validation errors for incomplete input.</p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-[1.75rem] border border-white/10 bg-black/20 p-6"
        >
          <div className="grid gap-5">
            <label className="grid gap-2 text-sm text-mist">
              Name
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sand outline-none transition focus:border-ember"
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
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sand outline-none transition focus:border-ember"
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
                className="min-h-36 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sand outline-none transition focus:border-ember"
                placeholder="Tell me about the opportunity or project."
                required
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-6 rounded-full bg-ember px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#ff786d] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting ? "Sending..." : "Send Message"}
          </button>

          {successMessage ? (
            <p className="mt-4 text-sm text-green-300">{successMessage}</p>
          ) : null}
          {errorMessage ? (
            <p className="mt-4 text-sm text-emberSoft">{errorMessage}</p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
