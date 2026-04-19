import { useState } from "react";
import Flags from "./indexBody/Flags";
import Services from "./indexBody/services-cards";
import WhyUs from "./indexBody/whyUs";
import Hero from "./indexBody/Hero";
import { formspreeEndpoint } from "../../config/forms.js";
import { countryCodes } from "../../config/countryCodes.js";
import '../../index.css';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;



const Body = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        countrySearch: "India (+91)",
        countryCode: "+91",
        phone: "",
        subject: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "countrySearch") {
            const query = value.trim().toLowerCase();
            const match = countryCodes.find((country) => {
                const label = `${country.name} (${country.dial})`.toLowerCase();
                return (
                    label === query ||
                    country.name.toLowerCase() === query ||
                    country.dial.toLowerCase() === query
                );
            });

            setForm({
                ...form,
                countrySearch: value,
                countryCode: match ? match.dial : form.countryCode,
            });
            return;
        }

        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const localPhone = form.phone.replace(/\D/g, "");
        const selectedCountry = countryCodes.find(
            (country) =>
                form.countrySearch.trim().toLowerCase() ===
                    `${country.name} (${country.dial})`.toLowerCase() ||
                form.countrySearch.trim().toLowerCase() === country.name.toLowerCase() ||
                form.countrySearch.trim().toLowerCase() === country.dial.toLowerCase()
        );

        if (!selectedCountry) {
            setSubmitStatus({
                type: "error",
                message: "Please select a valid country or country code from the list.",
            });
            return;
        }

        if (!emailRegex.test(form.email.trim())) {
            setSubmitStatus({
                type: "error",
                message: "Please enter a valid email address.",
            });
            return;
        }

        if (!/^\d{4,14}$/.test(localPhone)) {
            setSubmitStatus({
                type: "error",
                message: "Phone number must contain 4 to 14 digits.",
            });
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus({ type: "", message: "" });

        try {
            const payload = {
                ...form,
                countryCode: selectedCountry.dial,
                countrySearch: `${selectedCountry.name} (${selectedCountry.dial})`,
                phone: `${selectedCountry.dial} ${localPhone}`.trim(),
            };

            const response = await fetch(formspreeEndpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                let message = "Could not send your message. Please check your details.";
                try {
                    const data = await response.json();
                    if (Array.isArray(data?.errors) && data.errors[0]?.message) {
                        message = data.errors[0].message;
                    }
                } catch {
                    // Keep fallback message when server response is not JSON.
                }
                throw new Error(message);
            }

            setSubmitStatus({
                type: "success",
                message: "Thanks! We received your inquiry and will contact you soon.",
            });
            setForm({
                name: "",
                email: "",
                countrySearch: "India (+91)",
                countryCode: "+91",
                phone: "",
                subject: "",
                message: "",
            });
        } catch (error) {
            setSubmitStatus({
                type: "error",
                message: error.message || "Could not send your message. Please try again.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="body">
        <Hero />

        <Flags />
        <Services />
        <WhyUs />
        <section className="contact-page home-contact">
            <section className="contact-layout">
                <aside className="contact-info-panel">
                    <h2>Reach us directly</h2>
                    <p>
                        We reply quickly and guide you through the next steps from inquiry
                        to dispatch.
                    </p>

                    <div className="contact-info-list">
                        <a href="mailto:support@jnssioverseas.info">
                            <span>Email</span>
                            <strong>support@jnssioverseas.info</strong>
                        </a>
                        <a href="tel:+919084399069">
                            <span>Phone</span>
                            <strong>+91 90843 99069</strong>
                        </a>
                        <div>
                            <span>Working hours</span>
                            <strong>Mon - Sat, IST (GMT +5:30) 9:00 AM - 7:00 PM</strong>
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
                            <div className="phone-group">
                                <input
                                    type="text"
                                    name="countrySearch"
                                    list="country-code-list-home"
                                    placeholder="Country or code"
                                    value={form.countrySearch}
                                    onChange={handleChange}
                                    aria-label="Country name or code"
                                    required
                                />
                                <datalist id="country-code-list-home">
                                    {countryCodes.map((country) => (
                                        <option
                                            key={`${country.name}-${country.dial}`}
                                            value={`${country.name} (${country.dial})`}
                                        />
                                    ))}
                                </datalist>
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Phone number (without country code)"
                                    value={form.phone}
                                    onChange={handleChange}
                                    inputMode="numeric"
                                    pattern="[0-9]{4,14}"
                                    title="Enter 4 to 14 digits."
                                    required
                                />
                            </div>
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
        </section>

        </div>

    )
}

export default Body;