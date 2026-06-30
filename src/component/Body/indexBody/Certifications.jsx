import '../../../index.css';

const certificates = [
  {
    name: 'IEC Certificate',
    subtitle: 'Import Export Code',
    description: 'Registered for seamless international trade and export operations.',
    icon: (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <rect x="10" y="8" width="44" height="48" rx="8" fill="none" stroke="currentColor" strokeWidth="3" />
        <path d="M22 24h20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M22 34h14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M22 44h10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M42 16v12l6-3" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: 'MSME Certificate',
    subtitle: 'Micro Small & Medium Enterprise',
    description: 'Recognized for trusted business operations and government support eligibility.',
    icon: (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d="M16 20h32v24H16z" fill="none" stroke="currentColor" strokeWidth="3" />
        <path d="M20 20V12h24v8" fill="none" stroke="currentColor" strokeWidth="3" />
        <path d="M24 28h16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M24 36h10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'GST Certificate',
    subtitle: 'Goods & Services Tax',
    description: 'Compliant with tax registration for reliable business documentation.',
    icon: (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <circle cx="32" cy="32" r="22" fill="none" stroke="currentColor" strokeWidth="3" />
        <path d="M24 24h12a8 8 0 1 1 0 16H24z" fill="none" stroke="currentColor" strokeWidth="3" />
        <path d="M24 40h16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  },
];

function Certifications() {
  return (
    <section className="certifications-section">
      <div className="certifications-container">
        <div className="certifications-intro">
          <p className="tag-label">Our Credentials</p>
          <h2 className="section-heading">Certified for trusted global trade</h2>
          <p className="certifications-copy">
            We operate with recognized registrations that support compliant sourcing,
            exporting, and dependable business partnerships.
          </p>
        </div>

        <div className="certifications-grid">
          {certificates.map((certificate) => (
            <article className="certification-card" key={certificate.name}>
              <div className="certification-badge">{certificate.icon}</div>
              <div className="certification-content">
                <h3>{certificate.name}</h3>
                <p>{certificate.subtitle}</p>
                <span>{certificate.description}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Certifications;
