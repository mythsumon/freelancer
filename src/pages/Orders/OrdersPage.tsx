import "../common/WorkspacePage.css";

const orderData = [
  {
    id: "#A1024",
    service: "Brand identity & logo",
    buyer: "Lena W.",
    date: "Sep 22",
    status: "In Production",
    payment: "$340",
  },
  { id: "#A1023", service: "Responsive website design", buyer: "Noah P.", date: "Sep 21", status: "Delivered", payment: "$420" },
  { id: "#A1022", service: "Dashboard UI kit", buyer: "Jamal K.", date: "Sep 20", status: "Pending", payment: "$180" },
  { id: "#A1021", service: "Marketing landing page", buyer: "Sofia R.", date: "Sep 19", status: "Revision", payment: "$210" },
  { id: "#A1020", service: "Mobile app prototype", buyer: "Kenji S.", date: "Sep 17", status: "Completed", payment: "$450" },
  { id: "#A1019", service: "Pitch deck polish", buyer: "Maria D.", date: "Sep 16", status: "Cancelled", payment: "$0" },
  { id: "#A1018", service: "Email design set", buyer: "Chris L.", date: "Sep 14", status: "Delivered", payment: "$95" },
];

const statusVariant: Record<string, string> = {
  "In Production": "status-pill--success",
  Delivered: "status-pill--success",
  Completed: "status-pill--success",
  Pending: "status-pill--pending",
  Revision: "status-pill--warn",
  Cancelled: "status-pill--danger",
};

export const OrdersPage = () => {
  return (
    <div className="page-shell">
      <div className="page-container">
        <header className="page-header">
          <div>
            <h1>Orders</h1>
            <p className="page-description">
              Track current and past engagements, manage delivery timelines, and keep clients updated in one place.
            </p>
          </div>
          <div className="page-actions">
            <div className="filters-row">
              <select aria-label="Filter by status">
                <option>All statuses</option>
                <option>In production</option>
                <option>Pending</option>
                <option>Delivered</option>
                <option>Revision</option>
                <option>Cancelled</option>
              </select>
              <input type="date" aria-label="From date" />
              <input type="date" aria-label="To date" />
            </div>
            <button className="page-btn page-btn--primary" type="button">
              Export CSV
            </button>
          </div>
        </header>

        <section className="page-card">
          <div className="page-card__header">
            <div>
              <h2>Current workload</h2>
              <p>Overview of this month’s orders and progress.</p>
            </div>
            <div className="chip-group">
              <button className="chip chip--active" type="button">
                This month
              </button>
              <button className="chip" type="button">
                Quarter
              </button>
              <button className="chip" type="button">
                Year
              </button>
            </div>
          </div>
          <div className="page-grid page-grid--three">
            <div className="page-card" style={{ gap: "8px" }}>
              <span style={{ color: "var(--text-sub)", fontWeight: 600 }}>Active orders</span>
              <strong style={{ fontSize: "2rem" }}>7</strong>
              <span style={{ color: "var(--success)", fontWeight: 600 }}>+2 vs last week</span>
            </div>
            <div className="page-card" style={{ gap: "8px" }}>
              <span style={{ color: "var(--text-sub)", fontWeight: 600 }}>Avg. response time</span>
              <strong style={{ fontSize: "2rem" }}>58m</strong>
              <span style={{ color: "var(--brand)", fontWeight: 600 }}>Top 5% on Kmong</span>
            </div>
            <div className="page-card" style={{ gap: "8px" }}>
              <span style={{ color: "var(--text-sub)", fontWeight: 600 }}>On-time delivery</span>
              <strong style={{ fontSize: "2rem" }}>96%</strong>
              <span style={{ color: "var(--success)", fontWeight: 600 }}>Goal 95%</span>
            </div>
          </div>
        </section>

        <section className="page-table" aria-label="Orders table">
          <table>
            <thead>
              <tr>
                <th>Order</th>
                <th>Service</th>
                <th>Buyer</th>
                <th>Date</th>
                <th>Status</th>
                <th>Amount</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orderData.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.service}</td>
                  <td>{order.buyer}</td>
                  <td>{order.date}</td>
                  <td>
                    <span className={`status-pill ${statusVariant[order.status] ?? ""}`}>{order.status}</span>
                  </td>
                  <td>{order.payment}</td>
                  <td>
                    <button className="page-btn page-btn--ghost" type="button">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

