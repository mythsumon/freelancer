import { useMemo, useState } from "react";
import "./FreelancerDashboard.css";

type NavItem = {
  id: string;
  label: string;
  icon: string;
  href: string;
};

type Stat = {
  id: string;
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down" | "flat";
  icon: string;
};

type OrderStatus = "In Progress" | "Pending" | "Delivered" | "Revision" | "Cancelled";

type Order = {
  id: string;
  service: string;
  buyer: string;
  date: string;
  status: OrderStatus;
  amount: string;
};

type Service = {
  id: string;
  title: string;
  price: string;
  rating: number;
  reviews: number;
  status: "Active" | "Draft" | "Paused";
  thumbnail: string;
};

type Activity = {
  id: string;
  title: string;
  description: string;
  time: string;
};

type Review = {
  id: string;
  name: string;
  rating: number;
  text: string;
  helpful: number;
  date: string;
};

type Task = {
  id: string;
  label: string;
  done: boolean;
};

type Message = {
  id: string;
  name: string;
  snippet: string;
  unread: number;
  time: string;
  avatar: string;
};

const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: "📊", href: "/dashboard" },
  { id: "services", label: "My Services", icon: "🎨", href: "/services" },
  { id: "orders", label: "Orders", icon: "🧾", href: "/orders" },
  { id: "messages", label: "Messages", icon: "💬", href: "/messages" },
  { id: "earnings", label: "Earnings", icon: "💰", href: "/earnings" },
  { id: "analytics", label: "Analytics", icon: "📈", href: "/analytics" },
  { id: "reviews", label: "Reviews", icon: "⭐", href: "/reviews" },
  { id: "payouts", label: "Payouts", icon: "🏦", href: "/payouts" },
  { id: "settings", label: "Settings", icon: "⚙️", href: "/settings" },
];

const stats: Stat[] = [
  { id: "sales", label: "Total Sales", value: "$3,480", delta: "+12% WoW", trend: "up", icon: "💵" },
  { id: "pending", label: "Pending Orders", value: "4", delta: "2 new", trend: "up", icon: "🕒" },
  { id: "messages", label: "Unread Messages", value: "7", delta: "1 new", trend: "up", icon: "💬" },
  { id: "views", label: "Profile Views", value: "1.2k", delta: "+5%", trend: "up", icon: "👀" },
];

const orders: Order[] = [
  { id: "#1254", service: "Dashboard UI Kit", buyer: "Maya L.", date: "Sep 20", status: "In Progress", amount: "$320" },
  { id: "#1253", service: "Brand Identity", buyer: "Kenji S.", date: "Sep 19", status: "Delivered", amount: "$450" },
  { id: "#1252", service: "Landing Page", buyer: "Sofia R.", date: "Sep 18", status: "Revision", amount: "$220" },
  { id: "#1251", service: "UX Audit", buyer: "Noah E.", date: "Sep 18", status: "Pending", amount: "$180" },
  { id: "#1250", service: "Product Illustrations", buyer: "Lucas P.", date: "Sep 17", status: "Cancelled", amount: "$0" },
  { id: "#1249", service: "Mobile App UI", buyer: "Alicia T.", date: "Sep 16", status: "Delivered", amount: "$390" },
  { id: "#1248", service: "Pitch Deck", buyer: "Chloe M.", date: "Sep 15", status: "In Progress", amount: "$280" },
  { id: "#1247", service: "Website Redesign", buyer: "Diego M.", date: "Sep 14", status: "Delivered", amount: "$410" },
  { id: "#1246", service: "Motion Graphics", buyer: "Priya S.", date: "Sep 14", status: "Pending", amount: "$250" },
  { id: "#1245", service: "UX Strategy", buyer: "Leo F.", date: "Sep 12", status: "Delivered", amount: "$360" },
];

const services: Service[] = [
  {
    id: "svc-1",
    title: "Modern Responsive Website",
    price: "From $150",
    rating: 4.9,
    reviews: 122,
    status: "Active",
    thumbnail: "https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "svc-2",
    title: "Brand Identity & Logo System",
    price: "From $220",
    rating: 5,
    reviews: 98,
    status: "Active",
    thumbnail: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "svc-3",
    title: "Dashboard UI Kit",
    price: "From $180",
    rating: 4.8,
    reviews: 76,
    status: "Draft",
    thumbnail: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=600&q=80",
  },
];

const activities: Activity[] = [
  { id: "act-1", title: "Order delivered", description: "Brand Identity package delivered to Kenji S.", time: "2h ago" },
  { id: "act-2", title: "Revision requested", description: "UX Audit for Maya L.", time: "Yesterday" },
  { id: "act-3", title: "New review", description: "4.9★ from Sofia R. on Landing Page", time: "Sep 18" },
  { id: "act-4", title: "Order created", description: "Dashboard UI Kit ordered by Alicia T.", time: "Sep 16" },
];

const reviews: Review[] = [
  { id: "rev-1", name: "Maya L.", rating: 5, text: "Ava delivered a polished design system that our team shipped in record time.", helpful: 12, date: "Sep 17" },
  { id: "rev-2", name: "Kenji S.", rating: 5, text: "Excellent communication, strong brand thinking, and pixel-perfect delivery.", helpful: 9, date: "Sep 12" },
  { id: "rev-3", name: "Sofia R.", rating: 4, text: "Loved collaborating—she iterated quickly and clarified open questions.", helpful: 6, date: "Sep 10" },
];

const tasks: Task[] = [
  { id: "task-1", label: "Respond to Alicia's message", done: false },
  { id: "task-2", label: "Upload final brand files", done: true },
  { id: "task-3", label: "Verify payout method", done: false },
];

const messages: Message[] = [
  {
    id: "msg-1",
    name: "Maya L.",
    snippet: "Thanks for the latest revisions!",
    unread: 2,
    time: "1h",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80",
  },
  {
    id: "msg-2",
    name: "Kenji S.",
    snippet: "Draft slides look great—can we align on icons?",
    unread: 0,
    time: "3h",
    avatar: "https://images.unsplash.com/photo-1529666225200-3a50e351c8d0?auto=format&fit=crop&w=80&q=80",
  },
  {
    id: "msg-3",
    name: "Sofia R.",
    snippet: "Shared moodboard for the new campaign",
    unread: 1,
    time: "Yesterday",
    avatar: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=80&q=80",
  },
];

export const FreelancerDashboard = () => {
  const [selectedTab, setSelectedTab] = useState<string>("revenue");
  const [orderDrawer, setOrderDrawer] = useState<Order | null>(null);
  const [tasksState, setTasksState] = useState<Task[]>(tasks);

  const revenueSeries = useMemo(
    () => [
      9.5, 10.4, 11.2, 11.6, 12.4, 13.1, 12.8, 13.4, 14.2, 14.6, 15.2, 15.8,
    ],
    []
  );

  const handleTaskToggle = (taskId: string) => {
    setTasksState((prev) => prev.map((task) => (task.id === taskId ? { ...task, done: !task.done } : task)));
  };

  const renderLinePath = () => {
    const maxValue = Math.max(...revenueSeries);
    const minValue = Math.min(...revenueSeries);
    const viewBoxWidth = 600;
    const viewBoxHeight = 160;
    const step = viewBoxWidth / (revenueSeries.length - 1);

    const points = revenueSeries
      .map((value, index) => {
        const x = index * step;
        const normalized = (value - minValue) / (maxValue - minValue || 1);
        const y = viewBoxHeight - normalized * (viewBoxHeight - 10) - 10;
        return `${x},${y}`;
      })
      .join(" ");

    return { points, viewBoxWidth, viewBoxHeight };
  };

  const { points, viewBoxWidth, viewBoxHeight } = renderLinePath();

  return (
    <div className="dashboard-page">
      <aside className="dashboard-sidebar" aria-label="Main navigation">
        <div className="dashboard-logo">kmong</div>
        <nav>
          <ul>
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  className={`dashboard-nav-item ${item.id === "dashboard" ? "dashboard-nav-item--active" : ""}`}
                >
                  <span aria-hidden="true">{item.icon}</span>
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <div className="dashboard-shell">
        <header className="dashboard-topbar">
          <div className="dashboard-breadcrumb">
            <span>Dashboard</span>
          </div>
          <div className="dashboard-search">
            <input type="search" placeholder="Search (⌘+/)" aria-label="Search dashboard" />
          </div>
          <div className="dashboard-topbar__actions">
            <button className="dashboard-btn dashboard-btn--primary" type="button">
              Create Service
            </button>
            <button className="dashboard-icon-btn" type="button" aria-label="Notifications">
              🔔
              <span className="dashboard-icon-btn__badge">3</span>
            </button>
            <button className="dashboard-avatar" type="button" aria-label="Open profile menu">
              <img src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=80&q=80" alt="Ava Kim" />
            </button>
          </div>
        </header>

        <main className="dashboard-main">
          <section className="dashboard-stats" aria-label="Key metrics">
            {stats.map((stat) => (
              <article key={stat.id} className="dashboard-stat-card">
                <div className="dashboard-stat-card__icon" aria-hidden="true">{stat.icon}</div>
                <div className="dashboard-stat-card__content">
                  <span className="dashboard-stat-card__label">{stat.label}</span>
                  <span className="dashboard-stat-card__value">{stat.value}</span>
                  <span
                    className={`dashboard-stat-card__delta dashboard-stat-card__delta--${stat.trend}`}
                    aria-label={stat.delta}
                  >
                    {stat.delta}
                  </span>
                </div>
              </article>
            ))}
          </section>

          <section className="dashboard-grid">
            <article className="dashboard-card dashboard-card--chart" aria-label="Earnings chart">
              <div className="dashboard-card__header">
                <div>
                  <h2>Performance</h2>
                  <p>Last 12 months</p>
                </div>
                <div className="dashboard-tabs" role="tablist" aria-label="Performance metric">
                  {["revenue", "orders", "conversion"].map((tab) => (
                    <button
                      key={tab}
                      role="tab"
                      aria-selected={selectedTab === tab}
                      className={`dashboard-tab ${selectedTab === tab ? "dashboard-tab--active" : ""}`}
                      onClick={() => setSelectedTab(tab)}
                    >
                      {tab === "revenue" ? "Revenue" : tab === "orders" ? "Orders" : "Conversion"}
                    </button>
                  ))}
                </div>
              </div>
              <svg viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`} className="dashboard-chart" role="img">
                <desc>Earnings in USD by month</desc>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="rgba(0,153,255,0.45)" />
                    <stop offset="100%" stopColor="rgba(0,153,255,0.05)" />
                  </linearGradient>
                </defs>
                <polygon
                  points={`0,${viewBoxHeight} ${points} ${viewBoxWidth},${viewBoxHeight}`}
                  fill="url(#revenueGradient)"
                  opacity={0.6}
                />
                <polyline
                  points={points}
                  fill="none"
                  stroke="#0099ff"
                  strokeWidth={3}
                  strokeLinecap="round"
                />
              </svg>
            </article>

            <article className="dashboard-card dashboard-card--activity" aria-label="Recent activity">
              <div className="dashboard-card__header">
                <h2>Activity</h2>
                <button className="dashboard-link" type="button">
                  View all
                </button>
              </div>
              <ol className="dashboard-activity">
                {activities.map((activity) => (
                  <li key={activity.id}>
                    <div className="dashboard-activity__marker" aria-hidden="true" />
                    <div>
                      <p className="dashboard-activity__title">{activity.title}</p>
                      <p className="dashboard-activity__description">{activity.description}</p>
                      <span className="dashboard-activity__time">{activity.time}</span>
                    </div>
                  </li>
                ))}
              </ol>
            </article>
          </section>

          <section className="dashboard-orders" aria-labelledby="orders-title">
            <div className="dashboard-card__header">
              <h2 id="orders-title">Orders</h2>
              <div className="dashboard-orders__filters">
                <select aria-label="Filter by status">
                  <option>Status: All</option>
                  <option>In Progress</option>
                  <option>Pending</option>
                  <option>Delivered</option>
                  <option>Revision</option>
                  <option>Cancelled</option>
                </select>
                <select aria-label="Date range">
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                  <option>This year</option>
                </select>
                <input type="search" placeholder="Search orders" aria-label="Search orders" />
              </div>
            </div>

            <div className="dashboard-orders-table" role="region" aria-label="Orders list">
              <table>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Service</th>
                    <th>Buyer</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Amount</th>
                    <th aria-label="Actions" />
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      tabIndex={0}
                      onClick={() => setOrderDrawer(order)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          setOrderDrawer(order);
                        }
                      }}
                    >
                      <td>{order.id}</td>
                      <td>{order.service}</td>
                      <td>{order.buyer}</td>
                      <td>{order.date}</td>
                      <td>
                        <span className={`dashboard-status dashboard-status--${order.status.replace(/\s+/g, "-").toLowerCase()}`}>
                          {order.status}
                        </span>
                      </td>
                      <td>{order.amount}</td>
                      <td>
                        <button className="dashboard-link" type="button">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="dashboard-orders-list">
              {orders.map((order) => (
                <button
                  key={order.id}
                  className="dashboard-orders-list__item"
                  onClick={() => setOrderDrawer(order)}
                  aria-label={`Open order ${order.id}`}
                >
                  <div>
                    <span className="dashboard-orders-list__service">{order.service}</span>
                    <span className="dashboard-orders-list__buyer">{order.buyer}</span>
                  </div>
                  <div className="dashboard-orders-list__meta">
                    <span>{order.date}</span>
                    <span className={`dashboard-status dashboard-status--${order.status.replace(/\s+/g, "-").toLowerCase()}`}>
                      {order.status}
                    </span>
                    <span>{order.amount}</span>
                  </div>
                </button>
              ))}
            </div>
          </section>

          <section className="dashboard-grid">
            <article className="dashboard-card" aria-labelledby="messages-title">
              <div className="dashboard-card__header">
                <h2 id="messages-title">Messages</h2>
                <button className="dashboard-link" type="button">
                  Open Messages
                </button>
              </div>
              <ul className="dashboard-messages">
                {messages.map((message) => (
                  <li key={message.id}>
                    <div className="dashboard-messages__avatar" aria-hidden="true">
                      <img src={message.avatar} alt="" />
                    </div>
                    <div className="dashboard-messages__content">
                      <div className="dashboard-messages__header">
                        <span className="dashboard-messages__name">{message.name}</span>
                        <span className="dashboard-messages__time">{message.time}</span>
                      </div>
                      <p className="dashboard-messages__snippet">{message.snippet}</p>
                    </div>
                    {message.unread > 0 && <span className="dashboard-messages__badge">{message.unread}</span>}
                  </li>
                ))}
              </ul>
            </article>

            <article className="dashboard-card" aria-labelledby="payouts-title">
              <div className="dashboard-card__header">
                <h2 id="payouts-title">Balance &amp; payouts</h2>
              </div>
              <div className="dashboard-payouts">
                <div>
                  <span className="dashboard-payouts__label">Available balance</span>
                  <span className="dashboard-payouts__value">$1,420</span>
                </div>
                <div>
                  <span className="dashboard-payouts__label">Next payout</span>
                  <span className="dashboard-payouts__value">Sep 28</span>
                </div>
              </div>
              <button className="dashboard-btn dashboard-btn--primary" type="button">Withdraw</button>
            </article>
          </section>

          <section className="dashboard-services" aria-labelledby="services-title">
            <div className="dashboard-card__header">
              <h2 id="services-title">My Services</h2>
              <div className="dashboard-services__actions">
                <button className="dashboard-btn dashboard-btn--ghost" type="button">Create Service</button>
                <button className="dashboard-icon-btn" type="button" aria-label="Change layout">
                  ⋮
                </button>
              </div>
            </div>
            <div className="dashboard-services-grid">
              {services.map((service) => (
                <article key={service.id} className="dashboard-service-card">
                  <div className="dashboard-service-card__media">
                    <img src={service.thumbnail} alt="" loading="lazy" />
                    <span className={`dashboard-service-card__status dashboard-service-card__status--${service.status.toLowerCase()}`}>
                      {service.status}
                    </span>
                  </div>
                  <div className="dashboard-service-card__body">
                    <h3>{service.title}</h3>
                    <div className="dashboard-service-card__rating">
                      <span aria-label={`${service.rating} out of 5 stars`}>★ {service.rating.toFixed(1)}</span>
                      <span aria-hidden="true">({service.reviews})</span>
                    </div>
                    <div className="dashboard-service-card__footer">
                      <span>{service.price}</span>
                      <button className="dashboard-link" type="button">
                        Edit
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="dashboard-grid">
            <article className="dashboard-card" aria-labelledby="reviews-title">
              <div className="dashboard-card__header">
                <h2 id="reviews-title">Reviews</h2>
              </div>
              <div className="dashboard-reviews-summary">
                <span className="dashboard-reviews-summary__score" aria-label="Average 4.9 out of 5">★ 4.9</span>
                <div className="dashboard-reviews-summary__distribution">
                  {[5, 4, 3, 2, 1].map((stars) => (
                    <div key={stars}>
                      <span>{stars}★</span>
                      <div className="dashboard-reviews-summary__track">
                        <div className="dashboard-reviews-summary__fill" style={{ width: `${stars === 5 ? 76 : stars === 4 ? 16 : 8}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <ul className="dashboard-reviews-list">
                {reviews.map((review) => (
                  <li key={review.id}>
                    <div>
                      <strong>{review.name}</strong>
                      <span> · {review.date}</span>
                    </div>
                    <div className="dashboard-reviews-list__rating" aria-label={`${review.rating} out of 5`}>
                      {"★".repeat(review.rating)}
                    </div>
                    <p>{review.text}</p>
                    <button className="dashboard-link" type="button">
                      Helpful? 👍 {review.helpful}
                    </button>
                  </li>
                ))}
              </ul>
            </article>

            <article className="dashboard-card" aria-labelledby="tasks-title">
              <div className="dashboard-card__header">
                <h2 id="tasks-title">Tasks &amp; reminders</h2>
              </div>
              <ul className="dashboard-task-list">
                {tasksState.map((task) => (
                  <li key={task.id}>
                    <label>
                      <input
                        type="checkbox"
                        checked={task.done}
                        onChange={() => handleTaskToggle(task.id)}
                        aria-label={task.label}
                      />
                      <span>{task.label}</span>
                    </label>
                  </li>
                ))}
              </ul>
              <div className="dashboard-progress">
                <div className="dashboard-progress__header">
                  <span>Profile completeness</span>
                  <span>80%</span>
                </div>
                <div className="dashboard-progress__bar" aria-label="Profile 80 percent complete">
                  <div style={{ width: "80%" }} />
                </div>
              </div>
              <ul className="dashboard-checklist">
                <li>✔️ Add portfolio projects</li>
                <li>✔️ Add languages</li>
                <li>⬜ Set payout preference</li>
              </ul>
            </article>
          </section>
        </main>

        <aside className="dashboard-rail" aria-label="Upcoming">
          <section className="dashboard-card" aria-labelledby="calendar-title">
            <h2 id="calendar-title">Calendar</h2>
            <div className="dashboard-calendar">
              <div className="dashboard-calendar__header">
                <span>September 2025</span>
                <div>
                  <button aria-label="Previous month">‹</button>
                  <button aria-label="Next month">›</button>
                </div>
              </div>
              <div className="dashboard-calendar__grid">
                {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
                  <span key={day} className="dashboard-calendar__dow">
                    {day}
                  </span>
                ))}
                {Array.from({ length: 30 }).map((_, index) => {
                  const day = index + 1;
                  const isDue = [8, 16, 21].includes(day);
                  return (
                    <button key={day} className={isDue ? "dashboard-calendar__due" : ""} aria-label={`September ${day}`}>
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="dashboard-card" aria-labelledby="tips-title">
            <div className="dashboard-card__header">
              <h2 id="tips-title">Quick tips</h2>
            </div>
            <ul className="dashboard-tips">
              <li>Update your packages every quarter to stay competitive.</li>
              <li>Ask satisfied buyers for public reviews and case-study quotes.</li>
              <li>Share your profile on LinkedIn to drive new leads.</li>
            </ul>
          </section>

          <section className="dashboard-card" aria-labelledby="shortcuts-title">
            <div className="dashboard-card__header">
              <h2 id="shortcuts-title">Shortcuts</h2>
            </div>
            <ul className="dashboard-shortcuts">
              <li><kbd>⌘</kbd> + <kbd>K</kbd> Quick search</li>
              <li><kbd>⌘</kbd> + <kbd>N</kbd> New service</li>
              <li><kbd>?</kbd> Help center</li>
            </ul>
          </section>
        </aside>
      </div>

      {orderDrawer && (
        <div className="dashboard-drawer" role="dialog" aria-modal="true" aria-label="Order details">
          <div className="dashboard-drawer__content">
            <button className="dashboard-drawer__close" onClick={() => setOrderDrawer(null)} aria-label="Close order details">
              ✕
            </button>
            <h3>Order details</h3>
            <dl className="dashboard-drawer__list">
              <div>
                <dt>Order ID</dt>
                <dd>{orderDrawer.id}</dd>
              </div>
              <div>
                <dt>Service</dt>
                <dd>{orderDrawer.service}</dd>
              </div>
              <div>
                <dt>Buyer</dt>
                <dd>{orderDrawer.buyer}</dd>
              </div>
              <div>
                <dt>Date</dt>
                <dd>{orderDrawer.date}</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd>{orderDrawer.status}</dd>
              </div>
              <div>
                <dt>Amount</dt>
                <dd>{orderDrawer.amount}</dd>
              </div>
            </dl>
            <div className="dashboard-drawer__actions">
              <button className="dashboard-btn dashboard-btn--primary">Open chat</button>
              <button className="dashboard-btn dashboard-btn--ghost" onClick={() => setOrderDrawer(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <nav className="dashboard-bottom-nav" aria-label="Mobile navigation">
        {[
          { id: "home", label: "Home", icon: "🏠" },
          { id: "orders", label: "Orders", icon: "🧾" },
          { id: "messages", label: "Messages", icon: "💬" },
          { id: "services", label: "Services", icon: "🎨" },
          { id: "more", label: "More", icon: "⋯" },
        ].map((item) => (
          <button
            key={item.id}
            className={`dashboard-bottom-nav__item ${item.id === "home" ? "dashboard-bottom-nav__item--active" : ""}`}
            type="button"
          >
            <span aria-hidden="true">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};
