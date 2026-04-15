import { useState } from "react";

const ContactUs = () => {
  const formspreeEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formspreeEndpoint) {
      setSubmitStatus({
        type: "error",
        message: "Form is not configured yet. Please try again shortly.",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: "", message: "" });

    try {
      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      setSubmitStatus({
        type: "success",
        message: "Thanks! We received your inquiry and will contact you soon.",
      });
      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch {
      setSubmitStatus({
        type: "error",
        message: "Could not send your message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="contact-page">
      <section className="contact-hero">
        <p className="contact-kicker">Contact us</p>
        <h1>Let's discuss your next export requirement</h1>
        <p className="contact-hero-text">
          Whether you need product sourcing, shipping support, or partnership
          details, our team is ready to assist.
        </p>
      </section>

      <section className="contact-layout">
        <aside className="contact-info-panel">
          <h2>Reach us directly</h2>
          <p>
            We reply quickly and guide you through the next steps from inquiry
            to dispatch.
          </p>

          <div className="contact-info-list">
            <a href="mailto:jnssioverseas@gmail.com">
              <span>Email</span>
              <strong>jnssioverseas@gmail.com</strong>
            </a>
            <a href="tel:+919084399069">
              <span>Phone</span>
              <strong>+91 90843 99069</strong>
            </a>
            <div>
              <span>Working hours</span>
              <strong>Mon - Sat, 9:00 AM - 7:00 PM</strong>
            </div>
          </div>
        </aside>

        <section className="contact-form-panel">
          <h2>Send us a message</h2>
          <form className="contact-form-modern" onSubmit={handleSubmit}>
            <div className="contact-grid-two">
              <input
                name="name"
                placeholder="Full name"
                value={form.name}
                onChange={handleChange}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone number"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              name="subject"
              placeholder="Subject"
              value={form.subject}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Tell us about your requirement"
              value={form.message}
              onChange={handleChange}
              required
            />
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send inquiry"}
            </button>
            {submitStatus.message && (
              <p className={`contact-form-status ${submitStatus.type}`}>
                {submitStatus.message}
              </p>
            )}
          </form>
        </section>
      </section>
    </main>
  );
};

export default ContactUs;