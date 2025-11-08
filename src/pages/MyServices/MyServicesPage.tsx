import "../common/WorkspacePage.css";

const services = [
  {
    id: "svc-01",
    title: "Modern responsive website design",
    price: "From $150",
    rating: "★ 4.9 (122)",
    status: "Active",
    description: "End-to-end web design for SaaS, marketing, and e-commerce experiences with responsive breakpoints.",
  },
  {
    id: "svc-02",
    title: "Brand identity and logo package",
    price: "From $220",
    rating: "★ 5.0 (98)",
    status: "Active",
    description: "Discovery workshop, logo suite, brand guidelines, and launch assets tailored to your audience.",
  },
  {
    id: "svc-03",
    title: "Dashboard UI kit & design system",
    price: "From $180",
    rating: "★ 4.8 (76)",
    status: "Draft",
    description: "Reusable component library with documentation and tokens for product teams scaling fast.",
  },
];

export const MyServicesPage = () => {
  return (
    <div className="page-shell">
      <div className="page-container">
        <header className="page-header">
          <div>
            <h1>My Services</h1>
            <p className="page-description">
              Manage the offerings clients can book instantly. Keep your listings polished to drive more views and orders.
            </p>
          </div>
          <div className="page-actions">
            <div className="page-search">
              <span aria-hidden="true">🔍</span>
              <input placeholder="Search services" aria-label="Search services" />
            </div>
            <button className="page-btn page-btn--ghost" type="button">
              Duplicate
            </button>
            <button className="page-btn page-btn--primary" type="button">
              Create new service
            </button>
          </div>
        </header>

        <section className="page-grid page-grid--three">
          {services.map((service) => (
            <article key={service.id} className="page-card">
              <div className="page-card__header">
                <div>
                  <h2>{service.title}</h2>
                  <p>{service.description}</p>
                </div>
                <span className={`status-pill ${service.status === "Active" ? "status-pill--success" : "status-pill--pending"}`}>
                  {service.status}
                </span>
              </div>
              <div className="section-divider" />
              <div className="two-column">
                <div>
                  <strong>{service.price}</strong>
                  <p style={{ margin: "6px 0 0", color: "var(--text-sub)" }}>{service.rating}</p>
                </div>
                <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end", alignItems: "center" }}>
                  <button className="page-btn page-btn--ghost" type="button">
                    Edit
                  </button>
                  <button className="page-btn page-btn--ghost" type="button">
                    Preview
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="page-card">
          <div className="page-card__header">
            <div>
              <h2>Service checklist</h2>
              <p>Complete these items to boost your search placement.</p>
            </div>
          </div>
          <div className="two-column">
            <label>
              <input type="checkbox" defaultChecked /> Add a demo project or portfolio link
            </label>
            <label>
              <input type="checkbox" /> Record a 30-second intro video
            </label>
            <label>
              <input type="checkbox" /> Offer an add-on upsell option
            </label>
            <label>
              <input type="checkbox" defaultChecked /> Customize your delivery timeline
            </label>
          </div>
        </section>
      </div>
    </div>
  );
};

