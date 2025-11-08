import "../common/WorkspacePage.css";

const payouts = [
  { id: "p1", amount: "$620", date: "Sep 14, 2024", method: "Bank transfer • DBS" },
  { id: "p2", amount: "$1,120", date: "Aug 30, 2024", method: "Wise • USD" },
  { id: "p3", amount: "$880", date: "Aug 12, 2024", method: "PayPal" },
];

export const EarningsPage = () => {
  return (
    <div className="page-shell">
      <div className="page-container">
        <header className="page-header">
          <div>
            <h1>Earnings</h1>
            <p className="page-description">
              Review revenue trends, monitor upcoming payouts, and download statements for your bookkeeping.
            </p>
          </div>
          <div className="page-actions">
            <button className="page-btn page-btn--ghost" type="button">
              Download statement
            </button>
            <button className="page-btn page-btn--primary" type="button">
              Withdraw funds
            </button>
          </div>
        </header>

        <section className="page-grid page-grid--three">
          <article className="page-card" style={{ gap: "10px" }}>
            <span style={{ color: "var(--text-sub)", fontWeight: 600 }}>Available balance</span>
            <strong style={{ fontSize: "2.4rem" }}>$1,420</strong>
            <span style={{ color: "var(--brand)", fontWeight: 600 }}>Next payout Sep 28</span>
          </article>
          <article className="page-card" style={{ gap: "10px" }}>
            <span style={{ color: "var(--text-sub)", fontWeight: 600 }}>Month-to-date revenue</span>
            <strong style={{ fontSize: "2.4rem" }}>$3,480</strong>
            <span style={{ color: "var(--success)", fontWeight: 600 }}>+12% vs last month</span>
          </article>
          <article className="page-card" style={{ gap: "10px" }}>
            <span style={{ color: "var(--text-sub)", fontWeight: 600 }}>Average order value</span>
            <strong style={{ fontSize: "2.4rem" }}>$282</strong>
            <span style={{ color: "var(--text-sub)", fontWeight: 600 }}>Across 12 completed orders</span>
          </article>
        </section>

        <section className="page-card">
          <div className="page-card__header">
            <div>
              <h2>Revenue trend</h2>
              <p>Last 6 months sales performance.</p>
            </div>
            <div className="toggle-group">
              <button className="active" type="button">
                Revenue
              </button>
              <button type="button">Orders</button>
              <button type="button">Conversion</button>
            </div>
          </div>
          <svg viewBox="0 0 600 220" style={{ width: "100%", height: "220px" }}>
            <defs>
              <linearGradient id="earningsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(0,153,255,0.32)" />
                <stop offset="100%" stopColor="rgba(0,153,255,0.05)" />
              </linearGradient>
            </defs>
            <polyline
              fill="none"
              stroke="rgba(0,153,255,0.85)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              points="20,170 120,110 220,140 320,90 420,120 520,70"
            />
            <polygon fill="url(#earningsGradient)" points="20,170 120,110 220,140 320,90 420,120 520,70 520,200 20,200" />
          </svg>
        </section>

        <section className="page-card">
          <div className="page-card__header">
            <div>
              <h2>Payout history</h2>
              <p>Recent transfers to your preferred methods.</p>
            </div>
            <button className="page-btn page-btn--ghost" type="button">
              View all
            </button>
          </div>
          <ul className="timeline-compact">
            {payouts.map((payout) => (
              <li key={payout.id}>
                <div>
                  <strong>{payout.amount}</strong>
                  <p style={{ margin: "4px 0 0", color: "var(--text-sub)" }}>{payout.method}</p>
                </div>
                <span style={{ color: "var(--text-sub)" }}>{payout.date}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

