import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FreelancerDashboard.css";

type Section =
  | "Dashboard"
  | "My Services"
  | "Orders"
  | "Messages"
  | "Earnings"
  | "Analytics"
  | "Reviews"
  | "Payouts"
  | "Settings";

type Stat = {
  id: string;
  label: string;
  value: string;
  delta: string;
  deltaType: "up" | "down";
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

type ServiceStatus = "Active" | "Draft" | "Paused";

type Service = {
  id: string;
  title: string;
  price: string;
  rating: number;
  reviews: number;
  status: ServiceStatus;
  thumbnail: string;
};

type Activity = {
  id: string;
  time: string;
  title: string;
  description: string;
};

type Review = {
  id: string;
  name: string;
  rating: number;
  date: string;
  text: string;
  helpful: number;
};

const stats: Stat[] = [
  { id: "sales", label: "Total Sales", value: "$3,480", delta: "+12% WoW", deltaType: "up", icon: "💳" },
  { id: "pending", label: "Pending Orders", value: "4", delta: "-1 vs last week", deltaType: "down", icon: "📦" },
  { id: "messages", label: "Unread Messages", value: "7", delta: "+3 today", deltaType: "up", icon: "💬" },
  { id: "views", label: "Profile Views", value: "1.2k", delta: "+24%", deltaType: "up", icon: "👁️" },
];

const orders: Order[] = [
  { id: "#A1024", service: "Brand identity & logo", buyer: "Lena W.", date: "Sep 22", status: "In Progress", amount: "$340" },
  { id: "#A1023", service: "Responsive website design", buyer: "Noah P.", date: "Sep 21", status: "Delivered", amount: "$420" },
  { id: "#A1022", service: "Dashboard UI kit", buyer: "Jamal K.", date: "Sep 20", status: "Pending", amount: "$180" },
  { id: "#A1021", service: "Marketing landing page", buyer: "Sofia R.", date: "Sep 19", status: "Revision", amount: "$210" },
  { id: "#A1020", service: "Mobile app prototype", buyer: "Kenji S.", date: "Sep 17", status: "Delivered", amount: "$450" },
  { id: "#A1019", service: "Pitch deck polish", buyer: "Maria D.", date: "Sep 16", status: "Cancelled", amount: "$0" },
  { id: "#A1018", service: "Email design set", buyer: "Chris L.", date: "Sep 14", status: "Delivered", amount: "$95" },
  { id: "#A1017", service: "Product onboarding flow", buyer: "Ella T.", date: "Sep 13", status: "In Progress", amount: "$370" },
  { id: "#A1016", service: "Design system audit", buyer: "Arjun B.", date: "Sep 11", status: "Pending", amount: "$250" },
  { id: "#A1015", service: "Brand refresh", buyer: "Natalie C.", date: "Sep 9", status: "Delivered", amount: "$320" },
];

const services: Service[] = [
  {
    id: "svc-1",
    title: "Modern responsive website design",
    price: "From $150",
    rating: 4.9,
    reviews: 122,
    status: "Active",
    thumbnail: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "svc-2",
    title: "Brand identity and logo package",
    price: "From $220",
    rating: 5,
    reviews: 98,
    status: "Active",
    thumbnail: "https://images.unsplash.com/photo-1612036782180-6f0b6c8fe14c?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "svc-3",
    title: "Dashboard UI kit & design system",
    price: "From $180",
    rating: 4.8,
    reviews: 76,
    status: "Draft",
    thumbnail: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=900&q=80",
  },
];

const activities: Activity[] = [
  { id: "act-1", time: "2h ago", title: "Order delivered", description: "You delivered order #A1023 to Noah P." },
  { id: "act-2", time: "5h ago", title: "Revision requested", description: "Sofia R. requested a revision for #A1021." },
  { id: "act-3", time: "1d ago", title: "New review", description: "Kenji S. rated " + "★★★★★" + " on the mobile app prototype." },
  { id: "act-4", time: "1d ago", title: "New order", description: "Lena W. purchased Brand identity & logo." },
];

const reviews: Review[] = [
  {
    id: "rev-1",
    name: "Maya L.",
    rating: 5,
    date: "Sep 18, 2024",
    text: "Stellar collaboration throughout the sprint. Final assets were delivered perfectly organized.",
    helpful: 6,
  },
  {
    id: "rev-2",
    name: "Noah E.",
    rating: 5,
    date: "Sep 14, 2024",
    text: "Ava translated complex requirements into a polished UX. Already planning the next project together!",
    helpful: 4,
  },
  {
    id: "rev-3",
    name: "Sofia R.",
    rating: 4,
    date: "Sep 10, 2024",
    text: "Great visuals and communication. Minor tweaks needed but handled quickly.",
    helpful: 2,
  },
];

const tasks = [
  { id: "task-1", label: "Respond to Noah's revision", done: false },
  { id: "task-2", label: "Upload final files for #A1020", done: true },
  { id: "task-3", label: "Verify payout method", done: false },
];

const checklist = [
  { id: "chk-1", label: "Add portfolio project", done: true },
  { id: "chk-2", label: "Update languages", done: false },
  { id: "chk-3", label: "Set payout schedule", done: false },
];

const calendarDays = [
  { day: 24, type: "event" },
  { day: 27, type: "due" },
  { day: 29, type: "event" },
];

const tips = [
  "Keep response times under 1 hour to boost search ranking.",
  "Add work-in-progress snapshots to reassure clients during delivery.",
  "Promote your service on LinkedIn every Monday for more views.",
];

const shortcuts = [
  { keys: "Cmd /", label: "Quick search" },
  { keys: "Shift N", label: "New service" },
  { keys: "G + O", label: "Go to orders" },
];

const inboxPreview = [
  { id: "chat-ava", name: "Ava Kim", lastMessage: "Got the files. Looks great!", time: "2:34 PM" },
  { id: "chat-john", name: "John D.", lastMessage: "Can we revise the color scheme?", time: "10:22 AM" },
  { id: "chat-sofia", name: "Sofia R.", lastMessage: "Sending the updated copy now", time: "Yesterday" },
  { id: "chat-leo", name: "Leo Park", lastMessage: "Thank you! Will review tonight.", time: "Mon" },
];

const statusColor: Record<OrderStatus, string> = {
  "In Progress": "status--progress",
  Pending: "status--pending",
  Delivered: "status--success",
  Revision: "status--warn",
  Cancelled: "status--danger",
};

const revenuePoints = [3200, 3050, 3380, 3560, 3440, 3700, 3920, 4100, 3980, 4200, 4380, 4480];

const sections: { label: Section; icon: string }[] = [
  { label: "Dashboard", icon: "🏠" },
  { label: "My Services", icon: "🛠️" },
  { label: "Orders", icon: "📦" },
  { label: "Messages", icon: "💬" },
  { label: "Earnings", icon: "💰" },
  { label: "Analytics", icon: "📊" },
  { label: "Reviews", icon: "⭐" },
  { label: "Payouts", icon: "🏦" },
  { label: "Settings", icon: "⚙️" },
];

export const FreelancerDashboard = () => {
  const navigate = useNavigate();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [activeRevenueTab, setActiveRevenueTab] = useState("revenue");
  const [serviceAction, setServiceAction] = useState<Service | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<Section>("Dashboard");

  useEffect(() => {
    const query = window.matchMedia("(max-width: 768px)");
    const handler = (event: MediaQueryListEvent | MediaQueryList) => setIsMobile(event.matches);
    handler(query);
    query.addEventListener("change", handler);
    return () => query.removeEventListener("change", handler);
  }, []);

  const revenuePath = useMemo(() => {
    const max = Math.max(...revenuePoints);
    const min = Math.min(...revenuePoints);
    const range = max - min || 1;
    return revenuePoints
      .map((point, index) => {
        const x = (index / (revenuePoints.length - 1)) * 100;
        const y = 100 - ((point - min) / range) * 100;
        return `${x},${y}`;
      })
      .join(" ");
  }, []);

  const totalTasks = checklist.length;
  const completedTasks = checklist.filter((item) => item.done).length;
  const progressPct = Math.round((completedTasks / totalTasks) * 100);

  const renderDashboard = () => (
    <>
      <section className="stat-grid" aria-label="Key metrics">
        {stats.map((stat) => (
          <article key={stat.id} className="stat-card">
            <div className="stat-card__icon" aria-hidden="true">{stat.icon}</div>
            <div className="stat-card__label">{stat.label}</div>
            <div className="stat-card__value">{stat.value}</div>
            <div className={`stat-card__delta ${stat.deltaType === "up" ? "stat-card__delta--up" : "stat-card__delta--down"}`}>
              {stat.delta}
            </div>
          </article>
        ))}
      </section>

      <section className="dashboard-grid">
        <article className="card chart-card" aria-labelledby="revenue-title">
          <div className="card-header">
            <div>
              <h2 id="revenue-title">Revenue</h2>
              <p>Last 12 months</p>
            </div>
            <div className="tab-group" role="tablist" aria-label="Revenue metrics">
              {["revenue", "orders", "conversion"].map((tab) => (
                <button
                  key={tab}
                  role="tab"
                  aria-selected={activeRevenueTab === tab}
                  className={`tab ${activeRevenueTab === tab ? "tab--active" : ""}`}
                  onClick={() => setActiveRevenueTab(tab)}
                >
                  {tab === "revenue" ? "Revenue" : tab === "orders" ? "Orders" : "Conversion"}
                </button>
              ))}
            </div>
          </div>
          <div className="line-chart" role="img" aria-label="Revenue trend rising from $3,200 to $4,480 over 12 months">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none">
              <linearGradient id="revenue-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(0,153,255,0.32)" />
                <stop offset="100%" stopColor="rgba(0,153,255,0.05)" />
              </linearGradient>
              <polyline
                fill="none"
                stroke="rgba(0,153,255,0.9)"
                strokeWidth="2"
                strokeLinecap="round"
                points={revenuePath}
              />
              <polygon
                fill="url(#revenue-gradient)"
                points={`0,100 ${revenuePath} 100,100`}
              />
            </svg>
          </div>
        </article>

        <article className="card activity-card" aria-label="Recent activity">
          <div className="card-header">
            <h2>Activity feed</h2>
            <button className="link-button" type="button">View all</button>
          </div>
          <ol className="activity-timeline">
            {activities.map((activity) => (
              <li key={activity.id}>
                <span className="timeline-dot" aria-hidden="true" />
                <div>
                  <h3>{activity.title}</h3>
                  <p>{activity.description}</p>
                  <span className="timeline-time">{activity.time}</span>
                </div>
              </li>
            ))}
          </ol>
        </article>
      </section>

      {renderOrdersTable()}
      {renderMessagesOverview()}
      {renderReviewsAndTasks()}
      {renderPayoutsRail()}
    </>
  );

  const renderOrdersTable = () => (
    <section className="orders-section" aria-labelledby="orders-title">
      <div className="card orders-card">
        <div className="card-header">
          <div>
            <h2 id="orders-title">Recent orders</h2>
            <p>Track progress across all engagements.</p>
          </div>
          <div className="orders-toolbar">
            <select aria-label="Filter by status">
              <option value="all">All statuses</option>
              <option value="In Progress">In Progress</option>
              <option value="Pending">Pending</option>
              <option value="Delivered">Delivered</option>
              <option value="Revision">Revision</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <input type="search" placeholder="Search orders" aria-label="Search orders" />
          </div>
        </div>

        <div className="orders-table" role="table" aria-label="Orders table">
          <div className="orders-row orders-row--head" role="row">
            {["Order ID", "Service", "Buyer", "Date", "Status", "Amount", ""].map((col) => (
              <span key={col} role="columnheader">{col}</span>
            ))}
          </div>
          {orders.map((order) => (
            <button
              key={order.id}
              className="orders-row"
              role="row"
              onClick={() => setSelectedOrder(order)}
            >
              <span role="cell">{order.id}</span>
              <span role="cell" className="orders-service">{order.service}</span>
              <span role="cell">{order.buyer}</span>
              <span role="cell">{order.date}</span>
              <span role="cell">
                <span className={`status-tag ${statusColor[order.status]}`}>
                  {order.status}
                </span>
              </span>
              <span role="cell">{order.amount}</span>
              <span role="cell" className="orders-action">View</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );

  const renderMessagesOverview = () => (
    <section className="dashboard-grid">
      <article className="card messages-card" aria-label="Messages overview">
        <div className="card-header">
          <h2>Messages</h2>
          <button className="link-button" type="button">Open inbox</button>
        </div>
        <ul className="messages-list">
          {[
            { id: "msg-1", name: "Noah P.", snippet: "Thanks for the wireframes!", unread: 2 },
            { id: "msg-2", name: "Lena W.", snippet: "Shared a reference moodboard.", unread: 0 },
            { id: "msg-3", name: "Chris L.", snippet: "Can we extend the timeline by 2 days?", unread: 1 },
          ].map((message) => (
            <li key={message.id}>
              <div className="avatar" aria-hidden="true">{message.name.charAt(0)}</div>
              <div>
                <span className="messages-name">{message.name}</span>
                <span className="messages-snippet">{message.snippet}</span>
              </div>
              {message.unread > 0 && <span className="messages-unread" aria-label={`${message.unread} unread messages`}>{message.unread}</span>}
            </li>
          ))}
        </ul>
      </article>

      <article className="card services-card" aria-labelledby="services-title">
        <div className="card-header">
          <h2 id="services-title">My Services</h2>
          <button className="link-button" type="button">Create new</button>
        </div>
        <div className="services-grid">
          {services.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-card__media">
                <img src={service.thumbnail} alt={service.title} loading="lazy" />
                <span className={`service-status service-status--${service.status.toLowerCase()}`}>{service.status}</span>
              </div>
              <div className="service-card__body">
                <h3>{service.title}</h3>
                <div className="service-card__rating" aria-label={`${service.rating} out of 5 stars`}>
                  ★ {service.rating.toFixed(1)} <span aria-hidden="true">({service.reviews})</span>
                </div>
                <div className="service-card__footer">
                  <span>{service.price}</span>
                  <div className="service-card__actions" role="group" aria-label="Service actions">
                    <button type="button">Edit</button>
                    <button type="button">Duplicate</button>
                    <button type="button" onClick={() => setServiceAction(service)}>More</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </article>
    </section>
  );

  const renderReviewsAndTasks = () => (
    <section className="dashboard-grid">
      <article className="card reviews-card" aria-labelledby="reviews-summary-title">
        <div className="card-header">
          <div>
            <h2 id="reviews-summary-title">Reviews</h2>
            <p>Average rating ★4.9 across 230 evaluations.</p>
          </div>
        </div>
        <div className="reviews-distribution">
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className="reviews-bar">
              <span>{star}★</span>
              <div className="reviews-bar__track">
                <div className="reviews-bar__fill" style={{ width: `${star === 5 ? 78 : star === 4 ? 15 : star === 3 ? 5 : 2}%` }} />
              </div>
              <span>{star === 5 ? "78%" : star === 4 ? "15%" : star === 3 ? "5%" : "2%"}</span>
            </div>
          ))}
        </div>
        <ul className="reviews-list">
          {reviews.map((review) => (
            <li key={review.id}>
              <div className="reviews-meta">
                <strong>{review.name}</strong>
                <span>{"★".repeat(review.rating)}</span>
                <span>{review.date}</span>
              </div>
              <p>{review.text}</p>
              <button className="link-button" type="button">
                Helpful? {review.helpful}
              </button>
            </li>
          ))}
        </ul>
      </article>

      <article className="card tasks-card" aria-labelledby="tasks-title">
        <div className="card-header">
          <h2 id="tasks-title">Tasks</h2>
        </div>
        <ul className="tasks-list">
          {tasks.map((task) => (
            <li key={task.id}>
              <label>
                <input type="checkbox" defaultChecked={task.done} />
                <span>{task.label}</span>
              </label>
            </li>
          ))}
        </ul>

        <div className="progress-card" aria-label="Profile completeness">
          <div className="progress-card__header">
            <h3>Profile completeness</h3>
            <span>{progressPct}%</span>
          </div>
          <div className="progress-bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progressPct}>
            <div style={{ width: `${progressPct}%` }} />
          </div>
          <ul className="progress-checklist">
            {checklist.map((item) => (
              <li key={item.id}>
                <span aria-hidden="true">{item.done ? "✔" : "○"}</span>
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </section>
  );

  const renderPayoutsRail = () => (
    <section className="dashboard-grid">
      <article className="card payouts-card" aria-labelledby="payout-title">
        <div className="card-header">
          <h2 id="payout-title">Balance</h2>
          <button className="link-button" type="button">View payout history</button>
        </div>
        <div className="payout-balance">
          <div>
            <span className="payout-amount">$1,420</span>
            <span className="payout-label">Available balance</span>
          </div>
          <button className="primary-btn" type="button">Withdraw</button>
        </div>
        <div className="payout-meta">
          <span>Next payout</span>
          <strong>Sep 28, 2024</strong>
        </div>
        <div className="payout-meta">
          <span>Pending clearance</span>
          <strong>$560</strong>
        </div>
      </article>

      <aside className="utility-rail" aria-label="Upcoming & tips">
        <div className="card calendar-card">
          <div className="card-header">
            <h2>September</h2>
            <button className="icon-btn" type="button" aria-label="Next month">➜</button>
          </div>
          <div className="calendar-grid">
            {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
              <span key={`head-${day}`} className="calendar-head">{day}</span>
            ))}
            {Array.from({ length: 30 }, (_, idx) => idx + 1).map((day) => {
              const marker = calendarDays.find((item) => item.day === day);
              return (
                <span key={day} className={`calendar-day ${marker ? `calendar-day--${marker.type}` : ""}`}>
                  {day}
                </span>
              );
            })}
          </div>
        </div>

        <div className="card tips-card">
          <div className="card-header">
            <h2>Quick tips</h2>
          </div>
          <ul>
            {tips.map((tip, index) => (
              <li key={`tip-${index}`}>{tip}</li>
            ))}
          </ul>
        </div>

        <div className="card shortcuts-card">
          <div className="card-header">
            <h2>Shortcuts</h2>
          </div>
          <ul>
            {shortcuts.map((shortcut) => (
              <li key={shortcut.keys}>
                <kbd>{shortcut.keys}</kbd>
                <span>{shortcut.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </section>
  );

  const renderServicesPage = () => (
    <section className="dashboard-grid">
      <article className="card services-card" aria-label="Service management">
        <div className="card-header">
          <div>
            <h2>My Services</h2>
            <p>Manage packages and keep your storefront fresh.</p>
          </div>
          <div className="orders-toolbar">
            <input type="search" placeholder="Search services" aria-label="Search services" />
            <button className="primary-btn" type="button">Create service</button>
          </div>
        </div>
        <div className="services-grid">
          {services.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-card__media">
                <img src={service.thumbnail} alt={service.title} loading="lazy" />
                <span className={`service-status service-status--${service.status.toLowerCase()}`}>{service.status}</span>
              </div>
              <div className="service-card__body">
                <h3>{service.title}</h3>
                <div className="service-card__rating" aria-label={`${service.rating} out of 5 stars`}>
                  ★ {service.rating.toFixed(1)} <span aria-hidden="true">({service.reviews})</span>
                </div>
                <div className="service-card__footer">
                  <span>{service.price}</span>
                  <div className="service-card__actions" role="group" aria-label="Service actions">
                    <button type="button">Edit</button>
                    <button type="button">Duplicate</button>
                    <button type="button" onClick={() => setServiceAction(service)}>More</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </article>

      <article className="card" aria-label="Service performance insights">
        <div className="card-header">
          <h2>Performance</h2>
          <button className="link-button" type="button">View analytics</button>
        </div>
        <ul className="progress-checklist">
          <li><span aria-hidden="true">★</span> Top service: Modern responsive website design</li>
          <li><span aria-hidden="true">👁️</span> 1.2k views this month</li>
          <li><span aria-hidden="true">💬</span> Response time: 58 minutes</li>
          <li><span aria-hidden="true">📈</span> Conversion rate up 8%</li>
        </ul>
      </article>
    </section>
  );

  const renderMessagesPage = () => (
    <section className="dashboard-grid">
      <article className="card messages-card" aria-label="Inbox preview">
        <div className="card-header">
          <div>
            <h2>Inbox</h2>
            <p>Continue conversations with active clients.</p>
          </div>
          <button className="primary-btn" type="button" onClick={() => navigate("/messages")}>New message</button>
        </div>
        <ul className="messages-list">
          {inboxPreview.map((chat) => (
            <li key={chat.id}>
              <div className="avatar" aria-hidden="true">{chat.name.charAt(0)}</div>
              <div>
                <span className="messages-name">{chat.name}</span>
                <span className="messages-snippet">{chat.lastMessage}</span>
              </div>
              <span className="messages-snippet">{chat.time}</span>
            </li>
          ))}
        </ul>
        <button className="link-button" type="button">Open full messages</button>
      </article>

      <article className="card" aria-label="Smart replies">
        <div className="card-header">
          <h2>Smart replies</h2>
        </div>
        <div className="progress-checklist">
          <button className="link-button" type="button">“I’ll send an update in a few hours.”</button>
          <button className="link-button" type="button">“Thanks! I’ll review the files today.”</button>
          <button className="link-button" type="button">“Let’s schedule a quick call tomorrow.”</button>
        </div>
      </article>
    </section>
  );

  const renderEarningsPage = () => (
    <section className="dashboard-grid">
      <article className="card chart-card" aria-label="Earnings overview">
        <div className="card-header">
          <div>
            <h2>Earnings summary</h2>
            <p>Monthly breakdown of revenue streams.</p>
          </div>
          <div className="tab-group">
            <button className="tab tab--active" type="button">Revenue</button>
            <button className="tab" type="button">Orders</button>
            <button className="tab" type="button">Tips</button>
          </div>
        </div>
        <div className="line-chart" role="img" aria-label="Earnings trend chart placeholder" />
        <div className="payout-meta">
          <span>This month</span>
          <strong>$3,480 collected · $560 pending</strong>
        </div>
      </article>

      <article className="card" aria-label="Top services by revenue">
        <div className="card-header">
          <h2>Top earning services</h2>
        </div>
        <ul className="progress-checklist">
          <li><span aria-hidden="true">1</span> Website design · $1,480</li>
          <li><span aria-hidden="true">2</span> Brand identity · $1,120</li>
          <li><span aria-hidden="true">3</span> Dashboard UI kit · $880</li>
        </ul>
      </article>
    </section>
  );

  const renderAnalyticsPage = () => (
    <section className="dashboard-grid">
      <article className="card chart-card" aria-label="Traffic analytics">
        <div className="card-header">
          <div>
            <h2>Traffic sources</h2>
            <p>Where potential clients discovered you.</p>
          </div>
          <button className="link-button" type="button">Download report</button>
        </div>
        <div className="line-chart" role="img" aria-label="Analytics placeholder" />
        <ul className="progress-checklist">
          <li>Kmong marketplace · 62%</li>
          <li>Direct referrals · 21%</li>
          <li>LinkedIn · 11%</li>
          <li>Other · 6%</li>
        </ul>
      </article>

      <article className="card" aria-label="Conversion metrics">
        <div className="card-header">
          <h2>Conversion insights</h2>
        </div>
        <ul className="progress-checklist">
          <li>Profile view to message · 7.2%</li>
          <li>Message to order · 38%</li>
          <li>Order completion · 98%</li>
        </ul>
      </article>
    </section>
  );

  const renderReviewsPage = () => (
    <section className="dashboard-grid">
      <article className="card reviews-card" aria-label="Latest reviews">
        <div className="card-header">
          <div>
            <h2>Client reviews</h2>
            <p>Highlight positive feedback and respond quickly.</p>
          </div>
          <button className="link-button" type="button">Manage reviews</button>
        </div>
        <ul className="reviews-list">
          {reviews.map((review) => (
            <li key={review.id}>
              <div className="reviews-meta">
                <strong>{review.name}</strong>
                <span>{"★".repeat(review.rating)}</span>
                <span>{review.date}</span>
              </div>
              <p>{review.text}</p>
              <div className="orders-toolbar">
                <button className="link-button" type="button">Reply</button>
                <button className="link-button" type="button">Mark helpful ({review.helpful})</button>
              </div>
            </li>
          ))}
        </ul>
      </article>

      <article className="card" aria-label="Review insights">
        <div className="card-header">
          <h2>Highlights</h2>
        </div>
        <ul className="progress-checklist">
          <li>5★ reviews: 187</li>
          <li>Keywords: “communication”, “quality”, “speed”</li>
          <li>Follow-up reminders enabled</li>
        </ul>
      </article>
    </section>
  );

  const renderPayoutsPage = () => (
    <section className="dashboard-grid">
      <article className="card payouts-card" aria-label="Payout center">
        <div className="card-header">
          <div>
            <h2>Payouts</h2>
            <p>Manage withdrawal methods and schedule.</p>
          </div>
          <button className="primary-btn" type="button">Withdraw funds</button>
        </div>
        <div className="payout-balance">
          <div>
            <span className="payout-amount">$1,420</span>
            <span className="payout-label">Available balance</span>
          </div>
          <div>
            <span>Next payout</span>
            <strong>Sep 28, 2024</strong>
          </div>
        </div>
        <ul className="progress-checklist">
          <li>Stripe · Primary · Instant payouts enabled</li>
          <li>PayPal · Backup · Pending verification</li>
        </ul>
      </article>

      <article className="card" aria-label="Payout history">
        <div className="card-header">
          <h2>Recent payouts</h2>
        </div>
        <ul className="progress-checklist">
          <li>Aug 28 · $1,120 · Completed</li>
          <li>Jul 28 · $980 · Completed</li>
          <li>Jun 28 · $860 · Completed</li>
        </ul>
      </article>
    </section>
  );

  const renderSettingsPage = () => (
    <section className="dashboard-grid">
      <article className="card" aria-label="Profile settings">
        <div className="card-header">
          <h2>Profile settings</h2>
        </div>
        <form className="settings-form">
          <label>
            Display name
            <input type="text" defaultValue="Ava Kim" />
          </label>
          <label>
            Email
            <input type="email" defaultValue="ava@studio.com" />
          </label>
          <label>
            Time zone
            <select defaultValue="GMT+8">
              <option value="GMT+8">GMT+8 (Singapore)</option>
              <option value="GMT+9">GMT+9 (Seoul)</option>
              <option value="GMT-5">GMT-5 (New York)</option>
            </select>
          </label>
          <div className="settings-actions">
            <button className="link-button" type="button">Cancel</button>
            <button className="primary-btn" type="submit">Save changes</button>
          </div>
        </form>
      </article>

      <article className="card" aria-label="Notifications">
        <div className="card-header">
          <h2>Notifications</h2>
        </div>
        <div className="settings-toggles">
          <label>
            <input type="checkbox" defaultChecked />
            Email notifications
          </label>
          <label>
            <input type="checkbox" defaultChecked />
            Push notifications
          </label>
          <label>
            <input type="checkbox" />
            Weekly digest
          </label>
        </div>
      </article>
    </section>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "Dashboard":
        return renderDashboard();
      case "My Services":
        return renderServicesPage();
      case "Orders":
        return renderOrdersTable();
      case "Messages":
        return renderMessagesPage();
      case "Earnings":
        return renderEarningsPage();
      case "Analytics":
        return renderAnalyticsPage();
      case "Reviews":
        return renderReviewsPage();
      case "Payouts":
        return renderPayoutsPage();
      case "Settings":
        return renderSettingsPage();
      default:
        return null;
    }
  };

  const shouldShowOrderDrawer = selectedOrder && (activeSection === "Dashboard" || activeSection === "Orders");
  const shouldShowServiceSheet = serviceAction && (activeSection === "Dashboard" || activeSection === "My Services");

  return (
    <div className={`dashboard ${isMobile ? "dashboard--mobile" : ""}`}>
      <aside
        className={`dashboard-sidebar ${!isMobile ? "" : sidebarOpen ? "dashboard-sidebar--open" : "dashboard-sidebar--hidden"}`}
        aria-label="Sidebar navigation"
      >
        <div className="sidebar-header">
          <span className="sidebar-logo">kmong</span>
          {isMobile && (
            <button className="sidebar-close" onClick={() => setSidebarOpen(false)} aria-label="Close navigation">
              ✕
            </button>
          )}
        </div>
        <nav className="sidebar-nav">
          {sections.map((item) => (
            <button
              key={item.label}
              className={`sidebar-nav__item ${activeSection === item.label ? "sidebar-nav__item--active" : ""}`}
              type="button"
              onClick={() => {
                setActiveSection(item.label);
                if (isMobile) setSidebarOpen(false);
              }}
            >
              <span aria-hidden="true">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <p>Need help?</p>
          <button className="link-button" type="button">View support center →</button>
        </div>
      </aside>

      <div className="dashboard-main">
        <header className="dashboard-topbar" aria-label="Dashboard header">
          {isMobile && (
            <button className="topbar-menu" aria-label="Open navigation" onClick={() => setSidebarOpen(true)}>
              ☰
            </button>
          )}
          <div className="topbar-breadcrumb">{activeSection}</div>
          <div className="topbar-search">
            <input type="search" placeholder="Search..." aria-label="Search" />
            <kbd>⌘</kbd>
            <kbd>/</kbd>
          </div>
          <div className="topbar-actions" role="group" aria-label="Header actions">
            <button className="primary-btn" type="button">Create Service</button>
            <button className="icon-btn" type="button" aria-label="Notifications">
              🔔
              <span className="icon-badge" aria-hidden="true">3</span>
            </button>
            <button className="avatar-btn" type="button" aria-label="Open profile menu">
              <img src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=120&q=80" alt="Ava" />
            </button>
          </div>
        </header>

        <main className="dashboard-content">{renderContent()}</main>
      </div>

      {isMobile && (
        <nav className="dashboard-bottom-tabs" aria-label="Mobile navigation">
          {["Dashboard", "Orders", "Messages", "My Services", "Settings"].map((label, index) => (
            <button
              key={label}
              className={`bottom-tab ${activeSection === label ? "bottom-tab--active" : ""}`}
              type="button"
              onClick={() => setActiveSection(label as Section)}
            >
              <span aria-hidden="true">{sections.find((item) => item.label === label)?.icon ?? "⋯"}</span>
              <span>{index === 4 ? "More" : label}</span>
            </button>
          ))}
        </nav>
      )}

      {shouldShowOrderDrawer && selectedOrder && (
        <div className="drawer" role="dialog" aria-modal="true" aria-label="Order details">
          <div className="drawer__panel">
            <button className="drawer__close" aria-label="Close order" onClick={() => setSelectedOrder(null)}>
              ✕
            </button>
            <h2>Order summary</h2>
            <dl className="drawer__summary">
              <div>
                <dt>Order ID</dt>
                <dd>{selectedOrder.id}</dd>
              </div>
              <div>
                <dt>Service</dt>
                <dd>{selectedOrder.service}</dd>
              </div>
              <div>
                <dt>Buyer</dt>
                <dd>{selectedOrder.buyer}</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd>
                  <span className={`status-tag ${statusColor[selectedOrder.status]}`}>{selectedOrder.status}</span>
                </dd>
              </div>
              <div>
                <dt>Amount</dt>
                <dd>{selectedOrder.amount}</dd>
              </div>
              <div>
                <dt>Last update</dt>
                <dd>Sep 22, 2024 • 4:20 PM</dd>
              </div>
            </dl>
            <div className="drawer__section">
              <h3>Client message</h3>
              <p>
                “Excited to see the final concept. Please prioritize the mobile layout and include a dark theme option.”
              </p>
            </div>
            <div className="drawer__section">
              <h3>Action</h3>
              <div className="drawer__actions">
                <button className="primary-btn" type="button">Open project workspace</button>
                <button className="link-button" type="button">Download files</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {shouldShowServiceSheet && serviceAction && (
        <div className="bottom-sheet" role="dialog" aria-modal="true" aria-label="Service actions">
          <div className="bottom-sheet__inner">
            <button className="bottom-sheet__close" aria-label="Close service actions" onClick={() => setServiceAction(null)}>
              ✕
            </button>
            <h3>{serviceAction.title}</h3>
            <ul>
              <li><button type="button">Edit service</button></li>
              <li><button type="button">Duplicate</button></li>
              <li><button type="button">Pause</button></li>
              <li><button type="button">Share link</button></li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
