const About = () => {
  return (
    <main className="about-page">
      <section className="about-hero">
        <div className="about-hero-copy">
          <p className="about-kicker">About JNSSI Overseas</p>
          <h1>Built on trust, powered by global trade</h1>
          <p className="about-intro">
            We connect Indian manufacturing strength with worldwide demand through
            disciplined sourcing, transparent communication, and dependable
            delivery.
          </p>

          <div className="about-highlights">
            <article>
              <span>10+</span>
              <p>Countries served</p>
            </article>
            <article>
              <span>2025</span>
              <p>Year established</p>
            </article>
            <article>
              <span>100%</span>
              <p>Quality-first workflow</p>
            </article>
          </div>

          <a href="/contact" className="btn-primary">
            Talk to our team
          </a>
        </div>

        <div className="about-hero-media">
          <img
            src="https://res.cloudinary.com/dyb9hlxzq/image/upload/v1775758011/ship_agrzty.png"
            alt="JNSSI Overseas team and logistics"
          />
        </div>
      </section>

      <section className="about-story">
        <header>
          <p className="about-kicker">Our story</p>
          <h2>From local roots to international reach</h2>
        </header>

        <div className="about-story-grid">
          <article className="about-story-card">
            <h3>How we started</h3>
            <p>
              We began as a focused supplier with one goal: export products that
              reflect Indian quality and craftsmanship without compromise.
            </p>
          </article>
          <article className="about-story-card">
            <h3>How we work today</h3>
            <p>
              Our team handles sourcing, compliance, and logistics end-to-end so
              clients receive a smooth and reliable delivery experience.
            </p>
          </article>
          <article className="about-story-card">
            <h3>What drives us</h3>
            <p>
              Long-term relationships, ethical trade practices, and consistent
              quality continue to guide every shipment we dispatch.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
};

export default About;