import { useMemo, useState } from "react";
import "./BuyerDashboard.css";

type Status = "in-progress" | "awaiting" | "revision" | "dispute" | "completed";

type OrderRow = {
  id: string;
  service: string;
  seller: string;
  dueDate: string;
  status: Status;
  amount: number;
};

type SavedService = {
  id: string;
  title: string;
  rating: number;
  price: number;
  image: string;
};

type InvoiceRow = {
  id: string;
  order: string;
  seller: string;
  date: string;
  amount: number;
  status: "paid" | "unpaid" | "refunded";
};

type TeamMember = {
  id: string;
  name: string;
  role: "Owner" | "Manager" | "Viewer";
  email: string;
};

const orders: OrderRow[] = [
  { id: "ORD-2041", service: "Brand identity refresh", seller: "Ava Kim", dueDate: "Apr 18", status: "in-progress", amount: 890 },
  { id: "ORD-1987", service: "Marketing automation setup", seller: "Michael Chen", dueDate: "Apr 14", status: "awaiting", amount: 520 },
  { id: "ORD-1950", service: "Landing page localisation", seller: "Sofia Rossi", dueDate: "Apr 12", status: "revision", amount: 240 },
  { id: "ORD-1932", service: "Product demo video", seller: "David Kim", dueDate: "Apr 10", status: "completed", amount: 780 },
  { id: "ORD-1898", service: "EN→KR support translation", seller: "Hyun Park", dueDate: "Apr 9", status: "in-progress", amount: 310 },
  { id: "ORD-1880", service: "Social media ad set", seller: "Emma Rodriguez", dueDate: "Apr 7", status: "dispute", amount: 165 },
  { id: "ORD-1872", service: "Email nurture sequence", seller: "Priya Sharma", dueDate: "Apr 6", status: "completed", amount: 450 },
  { id: "ORD-1857", service: "App illustration system", seller: "Lucas Patel", dueDate: "Apr 4", status: "in-progress", amount: 1120 },
  { id: "ORD-1849", service: "B2B pitch deck polish", seller: "Nina Alvarez", dueDate: "Apr 3", status: "awaiting", amount: 360 },
  { id: "ORD-1835", service: "SEO content sprint", seller: "Liam Turner", dueDate: "Apr 2", status: "revision", amount: 640 },
  { id: "ORD-1810", service: "Microcopy audit", seller: "Sarah Moore", dueDate: "Apr 1", status: "completed", amount: 120 },
  { id: "ORD-1792", service: "Mobile onboarding UX", seller: "Jiro Tanaka", dueDate: "Mar 29", status: "completed", amount: 1050 },
];

const savedServices: SavedService[] = [
  {
    id: "sv-1",
    title: "Logo + brand kit ready in 10 days",
    rating: 4.9,
    price: 650,
    image: "https://images.unsplash.com/photo-1618005198938-81f6c9e0b859?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "sv-2",
    title: "Webflow landing page bundle",
    rating: 4.8,
    price: 890,
    image: "https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "sv-3",
    title: "Animated explainer video 60s",
    rating: 4.9,
    price: 970,
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "sv-4",
    title: "EN/JP support translation retainer",
    rating: 5.0,
    price: 420,
    image: "https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "sv-5",
    title: "Quarterly SEO content sprint",
    rating: 4.7,
    price: 780,
    image: "https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "sv-6",
    title: "Product marketing copy refresh",
    rating: 4.8,
    price: 540,
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "sv-7",
    title: "Mobile app UI kit with prototypes",
    rating: 4.9,
    price: 1120,
    image: "https://images.unsplash.com/photo-1612036782180-6f0b6c8fe14c?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "sv-8",
    title: "Voice-over for explainer video",
    rating: 4.8,
    price: 310,
    image: "https://images.unsplash.com/photo-1516117172878-fd2c41f4a759?auto=format&fit=crop&w=900&q=80",
  },
];

const invoices: InvoiceRow[] = [
  { id: "INV-5401", order: "ORD-2041", seller: "Ava Kim", date: "Apr 9", amount: 890, status: "paid" },
  { id: "INV-5400", order: "ORD-1987", seller: "Michael Chen", date: "Apr 8", amount: 520, status: "unpaid" },
  { id: "INV-5399", order: "ORD-1950", seller: "Sofia Rossi", date: "Apr 7", amount: 240, status: "paid" },
  { id: "INV-5398", order: "ORD-1932", seller: "David Kim", date: "Apr 6", amount: 780, status: "paid" },
  { id: "INV-5397", order: "ORD-1898", seller: "Hyun Park", date: "Apr 5", amount: 310, status: "refunded" },
  { id: "INV-5396", order: "ORD-1880", seller: "Emma Rodriguez", date: "Apr 4", amount: 165, status: "paid" },
];

const teamMembers: TeamMember[] = [
  { id: "tm-1", name: "Grace Lee", role: "Owner", email: "grace@northstar.co" },
  { id: "tm-2", name: "Alex Morgan", role: "Manager", email: "alex@northstar.co" },
  { id: "tm-3", name: "Mei Chen", role: "Manager", email: "mei@northstar.co" },
  { id: "tm-4", name: "Omar Mbaye", role: "Viewer", email: "omar@northstar.co" },
];

const statusLabel: Record<Status, string> = {
  "in-progress": "In Progress",
  awaiting: "Awaiting files",
  revision: "Revision requested",
  dispute: "Dispute",
  completed: "Completed",
};

const statusClass: Record<Status, string> = {
  "in-progress": "status-tag status-tag--progress",
  awaiting: "status-tag status-tag--awaiting",
  revision: "status-tag status-tag--revision",
  dispute: "status-tag status-tag--dispute",
  completed: "status-tag status-tag--completed",
};

const kpis = [
  {
    id: "kpi-active",
    label: "Active Orders",
    value: "3",
    delta: "+12% WoW",
    icon: "📦",
  },
  {
    id: "kpi-awaiting",
    label: "Awaiting Approval",
    value: "1",
    delta: "-8% WoW",
    icon: "✅",
  },
  {
    id: "kpi-messages",
    label: "Unread Messages",
    value: "4",
    delta: "+2",
    icon: "💬",
  },
  {
    id: "kpi-spend",
    label: "This Month’s Spend",
    value: "$1,230",
    delta: "+$140",
    icon: "💳",
  },
];

const tabs = ["overview", "orders", "requests", "invoices", "team", "settings"] as const;

type TabKey = (typeof tabs)[number];

const tabLabels: Record<TabKey, string> = {
  overview: "Overview",
  orders: "Orders",
  requests: "Requests",
  invoices: "Invoices & Payments",
  team: "Team",
  settings: "Settings",
};

export const BuyerDashboard = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [searchOrders, setSearchOrders] = useState("");
  const [statusFilter, setStatusFilter] = useState<Status | "all">("all");

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesStatus = statusFilter === "all" || order.status === statusFilter;
      const matchesSearch =
        order.service.toLowerCase().includes(searchOrders.toLowerCase()) ||
        order.seller.toLowerCase().includes(searchOrders.toLowerCase()) ||
        order.id.toLowerCase().includes(searchOrders.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [statusFilter, searchOrders]);

  const toggleOrderSelection = (orderId: string) => {
    setSelectedOrders((prev) => (prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]));
  };

  const selectAllOrders = (checked: boolean) => {
    if (checked) {
      setSelectedOrders(filteredOrders.map((order) => order.id));
    } else {
      setSelectedOrders([]);
    }
  };

  return (
    <div className="buyer-dashboard">
      <header className="buyer-dashboard__topbar">
        <div className="buyer-dashboard__logo">kmong</div>
        <div className="buyer-dashboard__search">
          <input type="search" placeholder="Search orders, services, sellers" aria-label="Search buyer workspace" />
        </div>
        <div className="buyer-dashboard__actions">
          <button type="button" className="primary-btn" aria-label="Create request">
            Create Request
          </button>
          <button type="button" className="icon-btn" aria-label="Notifications">
            🔔
          </button>
          <button type="button" className="avatar-btn" aria-label="Account menu">
            <span>GL</span>
          </button>
        </div>
      </header>

      <div className="buyer-dashboard__body">
        <aside className="buyer-dashboard__nav">
          <nav aria-label="Buyer navigation">
            <ul>
              {tabs.map((tab) => (
                <li key={tab}>
                  <button
                    type="button"
                    className={`buyer-dashboard__nav-link ${activeTab === tab ? "is-active" : ""}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tabLabels[tab]}
                  </button>
                </li>
              ))}
              <li><button type="button" className="buyer-dashboard__nav-link">Messages</button></li>
              <li><button type="button" className="buyer-dashboard__nav-link">Saved</button></li>
              <li><button type="button" className="buyer-dashboard__nav-link">Help Center</button></li>
            </ul>
          </nav>
        </aside>

        <main className="buyer-dashboard__main">
          {activeTab === "overview" && (
            <>
              <section className="buyer-section" aria-labelledby="overview-kpis">
                <h2 id="overview-kpis" className="buyer-section__title">Snapshot</h2>
                <div className="kpi-grid">
                  {kpis.map((kpi) => (
                    <article key={kpi.id} className="stat-card">
                      <span className="stat-card__icon" aria-hidden="true">{kpi.icon}</span>
                      <div>
                        <p className="stat-card__label">{kpi.label}</p>
                        <p className="stat-card__value">{kpi.value}</p>
                      </div>
                      <span className="stat-card__delta">{kpi.delta}</span>
                    </article>
                  ))}
                </div>
              </section>

              <section className="buyer-section" aria-labelledby="ongoing-orders">
                <div className="buyer-section__header">
                  <h2 id="ongoing-orders" className="buyer-section__title">Ongoing orders</h2>
                  <button type="button" className="text-link">View all orders</button>
                </div>
                <div className="orders-table__wrapper">
                  <table className="orders-table">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Service</th>
                        <th>Seller</th>
                        <th>Due date</th>
                        <th>Status</th>
                        <th>Amount</th>
                        <th aria-hidden="true" />
                      </tr>
                    </thead>
                    <tbody>
                      {orders.slice(0, 6).map((order) => (
                        <tr key={order.id}>
                          <td>{order.id}</td>
                          <td>{order.service}</td>
                          <td>{order.seller}</td>
                          <td>{order.dueDate}</td>
                          <td><span className={statusClass[order.status]}>{statusLabel[order.status]}</span></td>
                          <td>${order.amount.toLocaleString()}</td>
                          <td>
                            <button type="button" className="table-link">Open</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="buyer-section" aria-labelledby="saved-services">
                <div className="buyer-section__header">
                  <h2 id="saved-services" className="buyer-section__title">Saved services</h2>
                  <button type="button" className="text-link">Compare selected</button>
                </div>
                <div className="saved-carousel">
                  {savedServices.map((service) => (
                    <article key={service.id} className="saved-card">
                      <div className="saved-card__media">
                        <img src={service.image} alt={service.title} loading="lazy" />
                      </div>
                      <div className="saved-card__body">
                        <h3>{service.title}</h3>
                        <div className="saved-card__meta">
                          <span>★ {service.rating.toFixed(1)}</span>
                          <span>From ${service.price}</span>
                        </div>
                        <label className="saved-card__compare">
                          <input type="checkbox" />
                          Compare
                        </label>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section className="buyer-section" aria-labelledby="recent-messages">
                <div className="buyer-section__header">
                  <h2 id="recent-messages" className="buyer-section__title">Recent messages</h2>
                  <button type="button" className="text-link">Open Messages</button>
                </div>
                <ul className="message-list">
                  {orders.slice(0, 4).map((order) => (
                    <li key={`msg-${order.id}`} className="message-item">
                      <div>
                        <p className="message-item__title">{order.seller}</p>
                        <p className="message-item__text">Regarding {order.service}</p>
                      </div>
                      <span className="message-item__badge">2</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="buyer-section" aria-labelledby="quick-actions">
                <h2 id="quick-actions" className="buyer-section__title">Quick actions</h2>
                <div className="quick-actions">
                  <button type="button" className="quick-actions__btn">Post a Request</button>
                  <button type="button" className="quick-actions__btn">Invite Seller</button>
                  <button type="button" className="quick-actions__btn">Reorder</button>
                  <button type="button" className="quick-actions__btn">Add Payment Method</button>
                </div>
              </section>
            </>
          )}

          {activeTab === "orders" && (
            <section className="buyer-section" aria-labelledby="orders-table">
              <div className="buyer-section__header">
                <h2 id="orders-table" className="buyer-section__title">Orders</h2>
                <div className="orders-filters">
                  <input
                    type="search"
                    placeholder="Search orders"
                    value={searchOrders}
                    onChange={(event) => setSearchOrders(event.target.value)}
                    aria-label="Search orders"
                  />
                  <select
                    value={statusFilter}
                    aria-label="Filter by status"
                    onChange={(event) => setStatusFilter(event.target.value as Status | "all")}
                  >
                    <option value="all">All statuses</option>
                    <option value="in-progress">In progress</option>
                    <option value="awaiting">Awaiting files</option>
                    <option value="revision">Revision</option>
                    <option value="dispute">Dispute</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
              <div className="orders-table__wrapper">
                <table className="orders-table orders-table--full">
                  <thead>
                    <tr>
                      <th>
                        <input
                          type="checkbox"
                          checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                          onChange={(event) => selectAllOrders(event.target.checked)}
                          aria-label="Select all orders"
                        />
                      </th>
                      <th>Order ID</th>
                      <th>Service</th>
                      <th>Seller</th>
                      <th>Due date</th>
                      <th>Status</th>
                      <th>Amount</th>
                      <th aria-hidden="true" />
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => {
                      const checked = selectedOrders.includes(order.id);
                      return (
                        <tr key={`orders-${order.id}`} className={checked ? "is-selected" : ""}>
                          <td>
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggleOrderSelection(order.id)}
                              aria-label={`Select order ${order.id}`}
                            />
                          </td>
                          <td>{order.id}</td>
                          <td>{order.service}</td>
                          <td>{order.seller}</td>
                          <td>{order.dueDate}</td>
                          <td><span className={statusClass[order.status]}>{statusLabel[order.status]}</span></td>
                          <td>${order.amount.toLocaleString()}</td>
                          <td>
                            <button type="button" className="table-link">Open</button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {selectedOrders.length > 0 && (
                <div className="orders-bulk-actions">
                  <p>{selectedOrders.length} selected</p>
                  <div>
                    <button type="button" className="ghost-btn">Approve</button>
                    <button type="button" className="ghost-btn">Request revision</button>
                    <button type="button" className="ghost-btn">Mark complete</button>
                  </div>
                </div>
              )}
            </section>
          )}

          {activeTab === "requests" && (
            <section className="buyer-section" aria-labelledby="requests">
              <div className="buyer-section__header">
                <h2 id="requests" className="buyer-section__title">Requests</h2>
                <button type="button" className="primary-btn">Create request</button>
              </div>
              <div className="request-stepper">
                {[
                  "Title",
                  "Brief",
                  "Budget & timeline",
                  "Attachments",
                  "Review & publish",
                ].map((step, index) => (
                  <div key={step} className="request-step">
                    <span className="request-step__index">{index + 1}</span>
                    <div>
                      <p className="request-step__title">{step}</p>
                      <p className="request-step__subtitle">{index === 0 ? "Describe your project goal" : "Provide clear details for freelancers."}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="requests-empty">
                <p>No requests yet.</p>
                <button type="button" className="primary-btn">Post your first request</button>
              </div>
            </section>
          )}

          {activeTab === "invoices" && (
            <section className="buyer-section" aria-labelledby="invoices">
              <h2 id="invoices" className="buyer-section__title">Invoices & payments</h2>
              <div className="balance-summary">
                <article>
                  <p className="balance-summary__label">Available balance</p>
                  <p className="balance-summary__value">$420</p>
                </article>
                <article>
                  <p className="balance-summary__label">Pending</p>
                  <p className="balance-summary__value">$180</p>
                </article>
                <article>
                  <p className="balance-summary__label">Last payment method</p>
                  <p className="balance-summary__value">Visa •••• 4321</p>
                </article>
              </div>
              <div className="orders-table__wrapper">
                <table className="orders-table orders-table--full">
                  <thead>
                    <tr>
                      <th>Invoice #</th>
                      <th>Order</th>
                      <th>Seller</th>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>
                        <span className="sr-only">Download</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((invoice) => (
                      <tr key={invoice.id}>
                        <td>{invoice.id}</td>
                        <td>{invoice.order}</td>
                        <td>{invoice.seller}</td>
                        <td>{invoice.date}</td>
                        <td>${invoice.amount.toLocaleString()}</td>
                        <td><span className={`invoice-badge invoice-badge--${invoice.status}`}>{invoice.status}</span></td>
                        <td>
                          <button type="button" className="table-link">Download</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="payment-methods">
                <h3>Payment methods</h3>
                <div className="payment-methods__grid">
                  {[
                    { label: "Visa ending 4321", default: true },
                    { label: "KBZPay", default: false },
                    { label: "PayPal", default: false },
                  ].map((method) => (
                    <article key={method.label} className="payment-card">
                      <div>
                        <p className="payment-card__title">{method.label}</p>
                        <p className="payment-card__subtitle">{method.default ? "Default" : "Secondary"}</p>
                      </div>
                      <button type="button" className="ghost-btn">Set default</button>
                    </article>
                  ))}
                  <button type="button" className="payment-card payment-card--add">
                    + Add new method
                  </button>
                </div>
              </div>
            </section>
          )}

          {activeTab === "team" && (
            <section className="buyer-section" aria-labelledby="team">
              <div className="buyer-section__header">
                <h2 id="team" className="buyer-section__title">Team</h2>
                <button type="button" className="primary-btn">Invite member</button>
              </div>
              <div className="team-grid">
                {teamMembers.map((member) => (
                  <article key={member.id} className="team-card">
                    <div className="team-card__avatar" aria-hidden="true">{member.name.charAt(0)}</div>
                    <div className="team-card__body">
                      <p className="team-card__name">{member.name}</p>
                      <p className="team-card__role">{member.role}</p>
                      <p className="team-card__email">{member.email}</p>
                    </div>
                    <button type="button" className="ghost-btn">Manage</button>
                  </article>
                ))}
              </div>
            </section>
          )}

          {activeTab === "settings" && (
            <section className="buyer-section" aria-labelledby="settings">
              <h2 id="settings" className="buyer-section__title">Settings</h2>
              <div className="settings-grid">
                <article className="settings-card">
                  <h3>Company info</h3>
                  <p>Northstar Labs</p>
                  <p>85 Battery Street, San Francisco, CA</p>
                  <button type="button" className="text-link">Edit company info</button>
                </article>
                <article className="settings-card">
                  <h3>Notifications</h3>
                  <ul>
                    <li><label><input type="checkbox" defaultChecked /> Email updates</label></li>
                    <li><label><input type="checkbox" /> Push notifications</label></li>
                    <li><label><input type="checkbox" defaultChecked /> Weekly digest</label></li>
                  </ul>
                </article>
                <article className="settings-card">
                  <h3>Security</h3>
                  <p>2FA: Enabled</p>
                  <button type="button" className="text-link">View active sessions</button>
                </article>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};
