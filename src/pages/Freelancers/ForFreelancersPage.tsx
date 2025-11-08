import { Link } from "react-router-dom";
import "./ForFreelancersPage.css";

const features = [
  {
    id: "feat-1",
    title: "Global discovery",
    description: "Showcase your expertise to clients across 70+ countries and receive project briefs that match your skills.",
    icon: "🌍",
  },
  {
    id: "feat-2",
    title: "Project control",
    description: "Accept, negotiate, and manage proposals with transparent timelines, milestones, and file collaboration.",
    icon: "🗂️",
  },
  {
    id: "feat-3",
    title: "Secure payments",
    description: "Get paid in your preferred currency with milestone protection, escrow, and automated invoicing.",
    icon: "💳",
  },
  {
    id: "feat-4",
    title: "Grow your brand",
    description: "Build a polished profile, gather verified reviews, and join exclusive talent collections.",
    icon: "🚀",
  },
];

const steps = [
  {
    id: "step-1",
    title: "Create your profile",
    body: "Craft a portfolio-driven profile that highlights your services, pricing, and availability.",
  },
  {
    id: "step-2",
    title: "Respond to briefs",
    body: "Receive curated requests, send proposals, and collaborate with clients in a unified workspace.",
  },
  {
    id: "step-3",
    title: "Deliver & get paid",
    body: "Track milestones, deliver assets securely, and release funds instantly after approval.",
  },
];

const testimonials = [
  {
    id: "t1",
    quote: "Kmong opened doors to international clients I never would have met otherwise. The built-in project tools let me focus on the design work I love.",
    name: "Lena Park",
    title: "Brand & Motion Designer · Seoul",
    avatar: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "t2",
    quote: "Payment protection and milestone tracking give both sides confidence. My repeat-business rate jumped by 40% after joining.",
    name: "Noah Ellis",
    title: "Product Designer · Berlin",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
  },
];

const faqs = [
  {
    id: "faq-1",
    question: "How do I get verified?",
    answer:
      "Submit your ID, portfolio links, and at least one client reference. The review typically completes within 48 hours.",
  },
  {
    id: "faq-2",
    question: "What fees does Kmong charge?",
    answer:
      "We only charge a 10% service fee per completed project. There are no subscription or listing fees.",
  },
  {
    id: "faq-3",
    question: "Can I set my own rates?",
    answer:
      "Absolutely. Publish service packages with fixed pricing or quote custom projects using milestone budgets.",
  },
  {
    id: "faq-4",
    question: "How are disputes handled?",
    answer:
      "Our support team offers mediation, milestone reviews, and optional escrow releases to keep both parties protected.",
  },
];

export const ForFreelancersPage = () => {
  return (
    <div className="freelancers-page">
      <div className="freelancers-hero">
        <div className="freelancers-hero__bg" aria-hidden="true" />
        <section className="container">
          <div className="freelancers-hero__card">
            <div className="freelancers-hero__avatar" aria-hidden="true">
              <img
                src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80"
                alt=""
              />
            </div>
            <div className="freelancers-hero__content">
              <div className="freelancers-hero__badge">Made for global freelancers</div>
              <h1>Grow your freelancing business with Kmong</h1>
              <p>
                Join a trusted marketplace where premium clients find, hire, and collaborate with world-class independent talent.
                Build your brand, manage projects end-to-end, and get paid securely in one streamlined workflow.
              </p>
              <div className="freelancers-hero__actions" role="group" aria-label="Primary actions">
                <Link to="/signup" className="freelancers-btn freelancers-btn--primary">
                  Start freelancing
                </Link>
                <Link to="/freelancer/ava-kim" className="freelancers-btn freelancers-btn--ghost">
                  View sample profile
                </Link>
              </div>
              <div className="freelancers-hero__stats">
                <div>
                  <span className="freelancers-hero__stat">90K+</span>
                  <span className="freelancers-hero__label">Global freelancers</span>
                </div>
                <div>
                  <span className="freelancers-hero__stat">$120M</span>
                  <span className="freelancers-hero__label">Payments secured</span>
                </div>
                <div>
                  <span className="freelancers-hero__stat">4.9★</span>
                  <span className="freelancers-hero__label">Average rating</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="container freelancers-about" aria-labelledby="about-title">
        <div className="freelancers-about__card">
          <div className="freelancers-about__intro">
            <h2 id="about-title">Designed for ambitious independents</h2>
            <p>
              Kmong pairs powerful workflow tools with human support so you can focus on the craft that sets you apart. From
              onboarding to payouts, every touchpoint is tailored to help you deliver your best work.
            </p>
          </div>
          <div className="freelancers-about__chips" role="list">
            <span role="listitem">Set custom packages &amp; rates</span>
            <span role="listitem">Collaborate with integrated briefs</span>
            <span role="listitem">Showcase verified reviews</span>
            <span role="listitem">Withdraw earnings instantly</span>
          </div>
        </div>
      </section>

      <section className="freelancers-section" aria-labelledby="feature-title">
        <div className="container freelancers-section__header">
          <div>
            <h2 id="feature-title">Why freelancers join Kmong</h2>
            <p>Everything you need to move from first contact to final payment without context switching.</p>
          </div>
        </div>
        <div className="container freelancers-feature-grid">
          {features.map((feature) => (
            <article key={feature.id} className="freelancers-feature-card">
              <div className="freelancers-feature-card__icon" aria-hidden="true">
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="freelancers-section" aria-labelledby="steps-title">
        <div className="container freelancers-section__header">
          <h2 id="steps-title">How it works</h2>
          <p>Launch your freelancing presence in three guided steps.</p>
        </div>
        <div className="container freelancers-steps">
          {steps.map((step, index) => (
            <div key={step.id} className="freelancers-step">
              <span className="freelancers-step__number">0{index + 1}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="freelancers-section" aria-labelledby="tools-title">
        <div className="container freelancers-section__header">
          <div>
            <h2 id="tools-title">Tools built around your workflow</h2>
            <p>Powerful features help you stay organized, communicate clearly, and deliver consistently.</p>
          </div>
        </div>
        <div className="container freelancers-tools">
          <div className="freelancers-tools__card">
            <h3>Project Workspace</h3>
            <ul>
              <li>Timeline, milestones, and file-sharing in one dashboard</li>
              <li>Real-time comments with translation for international teams</li>
              <li>Automated reminders and status updates</li>
            </ul>
          </div>
          <div className="freelancers-tools__card">
            <h3>Business Suite</h3>
            <ul>
              <li>Invoice templates and tax-ready statements</li>
              <li>Analytics to track revenue, repeat clients, and feedback</li>
              <li>Integrations with Figma, Slack, and Google Drive</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="freelancers-section" aria-labelledby="testimonial-title">
        <div className="container freelancers-section__header">
          <h2 id="testimonial-title">Trusted by top freelancers</h2>
        </div>
        <div className="container freelancers-testimonials">
          {testimonials.map((testimonial) => (
            <blockquote key={testimonial.id} className="freelancers-testimonial">
              <div className="freelancers-testimonial__author">
                <img src={testimonial.avatar} alt={testimonial.name} loading="lazy" />
                <div>
                  <cite>{testimonial.name}</cite>
                  <span>{testimonial.title}</span>
                </div>
              </div>
              <p>“{testimonial.quote}”</p>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="freelancers-section" aria-labelledby="cta-title">
        <div className="container freelancers-cta">
          <div className="freelancers-cta__inner">
            <h2 id="cta-title">Ready to join the Kmong talent collective?</h2>
            <p>Publish your profile today and connect with companies building the next wave of products.</p>
            <div className="freelancers-cta__actions">
              <Link to="/signup" className="freelancers-btn freelancers-btn--primary">
                Create my account
              </Link>
              <Link to="/freelancer/ava-kim" className="freelancers-btn freelancers-btn--outline">
                Explore freelancer stories
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="freelancers-section" aria-labelledby="faq-title">
        <div className="container freelancers-section__header">
          <h2 id="faq-title">Frequently asked questions</h2>
        </div>
        <div className="container freelancers-faq">
          {faqs.map((faq) => (
            <details key={faq.id} className="freelancers-faq__item">
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
};
