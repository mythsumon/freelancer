import { useMemo, useState, useEffect } from "react";
import "./ProfilePage.css";

type PortfolioItem = {
  id: string;
  title: string;
  category: string;
  year: string;
  cover: string;
  description: string;
  gallery: string[];
};

type Service = {
  id: string;
  title: string;
  summary: string;
  rating: number;
  reviews: number;
  price: number;
  thumbnail: string;
};

type Review = {
  id: string;
  name: string;
  avatar: string;
  flag: string;
  country: string;
  rating: number;
  date: string;
  text: string;
  images?: string[];
  helpful: number;
};

type Certification = {
  id: string;
  name: string;
  issuer: string;
  year: string;
};

type Education = {
  id: string;
  school: string;
  degree: string;
  field: string;
  year: string;
};

type RelatedFreelancer = {
  id: string;
  name: string;
  title: string;
  rating: number;
  avatar: string;
};

const portfolioItems: PortfolioItem[] = [
  {
    id: "p1",
    title: "Global SaaS Dashboard Redesign",
    category: "Product Design",
    year: "2024",
    cover: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&q=80",
    description:
      "Led a full redesign for a B2B SaaS dashboard with a modular design system, improving task completion rates by 32%.",
    gallery: [
      "https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1600&q=80",
    ],
  },
  {
    id: "p2",
    title: "Fintech Brand Identity System",
    category: "Brand Design",
    year: "2023",
    cover: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80",
    description:
      "Crafted a comprehensive identity system including typography, color, motion, and marketing templates for a fintech startup.",
    gallery: [
      "https://images.unsplash.com/photo-1612036782180-6f0b6c8fe14c?auto=format&fit=crop&w=1600&q=80",
    ],
  },
  {
    id: "p3",
    title: "Travel App Mobile UI Kit",
    category: "Mobile UI",
    year: "2024",
    cover: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
    description:
      "Delivered a reusable mobile UI kit with 120+ components, atomic spacing scale, and dark/light themes for a travel platform.",
    gallery: [
      "https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=1600&q=80",
    ],
  },
  {
    id: "p4",
    title: "AI Health Companion Website",
    category: "Web UI",
    year: "2023",
    cover: "https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&fit=crop&w=1200&q=80",
    description:
      "Designed a marketing website for an AI health companion with accessibility-first patterns and motion specifications.",
    gallery: [
      "https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1600&q=80",
    ],
  },
  {
    id: "p5",
    title: "E-commerce Brand Playbook",
    category: "Brand Strategy",
    year: "2022",
    cover: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
    description:
      "Documented a brand playbook spanning voice, tone, photography, and in-store experiences for a lifestyle retailer.",
    gallery: [
      "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?auto=format&fit=crop&w=1600&q=80",
    ],
  },
  {
    id: "p6",
    title: "Motion Micro-Interactions",
    category: "Motion Design",
    year: "2024",
    cover: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=1200&q=80",
    description:
      "Built a library of UI motion patterns with Lottie exports and documentation for engineering handoff.",
    gallery: [
      "https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1600&q=80",
    ],
  },
];

const services: Service[] = [
  {
    id: "s1",
    title: "I will design a modern responsive website",
    summary: "High-converting marketing or product pages tailored to your goals.",
    rating: 4.9,
    reviews: 122,
    price: 150,
    thumbnail: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "s2",
    title: "I will craft a brand identity and logo",
    summary: "Strategic discovery + visual identity system for global rollout.",
    rating: 5,
    reviews: 98,
    price: 220,
    thumbnail: "https://images.unsplash.com/photo-1612036782180-6f0b6c8fe14c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "s3",
    title: "I will build a clean dashboard UI kit",
    summary: "Scalable design system with reusable components and tokens.",
    rating: 4.8,
    reviews: 76,
    price: 180,
    thumbnail: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&q=80",
  },
];

const skills = ["Figma", "Adobe XD", "React", "Tailwind", "Photoshop", "Branding", "Motion Design", "Illustrator", "Webflow", "Design Systems"];

const reviews: Review[] = [
  {
    id: "r1",
    name: "Maya L.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    flag: "🇺🇸",
    country: "United States",
    rating: 5,
    date: "Jan 2025",
    text: "Ava elevated our SaaS experience with a thoughtful design system and detailed documentation that made engineering handoff effortless.",
    images: ["https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=600&q=80"],
    helpful: 18,
  },
  {
    id: "r2",
    name: "Kenji S.",
    avatar: "https://images.unsplash.com/photo-1529666225200-3a50e351c8d0?auto=format&fit=crop&w=200&q=80",
    flag: "🇯🇵",
    country: "Japan",
    rating: 5,
    date: "Dec 2024",
    text: "Excellent communication despite the time zone difference. The brand toolkit gave us clarity across marketing and product.",
    helpful: 11,
  },
  {
    id: "r3",
    name: "Sofia R.",
    avatar: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=200&q=80",
    flag: "🇪🇸",
    country: "Spain",
    rating: 4,
    date: "Nov 2024",
    text: "Loved the collaborative workshops. Ava ensured every stakeholder's feedback informed the final design.",
    images: [
      "https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=600&q=80",
    ],
    helpful: 7,
  },
  {
    id: "r4",
    name: "Noah E.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    flag: "🇩🇪",
    country: "Germany",
    rating: 5,
    date: "Oct 2024",
    text: "From kickoff to delivery, Ava guided our team with clarity. The final assets helped us launch in record time.",
    helpful: 9,
  },
];

const certifications: Certification[] = [
  { id: "c1", name: "Google UX Design Professional Certificate", issuer: "Google", year: "2023" },
  { id: "c2", name: "Adobe Certified Professional – Visual Design", issuer: "Adobe", year: "2022" },
];

const education: Education[] = [
  { id: "e1", school: "National University of Singapore", degree: "B.Des", field: "Visual Communication", year: "2018" },
  { id: "e2", school: "IDEO U", degree: "Certificate", field: "Design Thinking", year: "2021" },
];

const relatedFreelancers: RelatedFreelancer[] = [
  {
    id: "rf1",
    name: "Lena Park",
    title: "Product Designer",
    rating: 4.8,
    avatar: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "rf2",
    name: "Diego Martinez",
    title: "Brand Strategist",
    rating: 4.9,
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "rf3",
    name: "Priya Sharma",
    title: "UX Researcher",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "rf4",
    name: "Markus Chen",
    title: "Motion Designer",
    rating: 4.7,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
  },
];

export const ProfilePage = () => {
  const [selectedPortfolio, setSelectedPortfolio] = useState<PortfolioItem | null>(null);
  const [selectedReviewFilter, setSelectedReviewFilter] = useState<string>("all");
  const [reviewSort, setReviewSort] = useState<string>("newest");
  const [activeReviewImage, setActiveReviewImage] = useState<string | null>(null);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedPortfolio(null);
        setActiveReviewImage(null);
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const filteredReviews = useMemo(() => {
    let result = [...reviews];

    if (selectedReviewFilter === "5") {
      result = result.filter((review) => review.rating === 5);
    } else if (selectedReviewFilter === "4") {
      result = result.filter((review) => review.rating === 4);
    } else if (selectedReviewFilter === "images") {
      result = result.filter((review) => review.images && review.images.length > 0);
    }

    if (reviewSort === "highest") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (reviewSort === "lowest") {
      result.sort((a, b) => a.rating - b.rating);
    } else if (reviewSort === "helpful") {
      result.sort((a, b) => b.helpful - a.helpful);
    } else {
      // newest
      result.sort((a, b) => reviews.indexOf(a) - reviews.indexOf(b));
    }

    return result;
  }, [selectedReviewFilter, reviewSort]);

  return (
    <div className="profile-page">
      <section className="profile-hero" aria-label="Freelancer hero">
        <div className="profile-hero__background" aria-hidden="true" />
        <div className="container profile-hero__content">
          <div className="profile-hero__main">
            <div className="profile-avatar" aria-hidden="true">
              <img src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80" alt="Ava Kim" />
            </div>
            <div className="profile-identity">
              <div className="profile-badge-row">
                <span className="profile-badge">Top Rated</span>
              </div>
              <h1>Ava Kim</h1>
              <p className="profile-tagline">UI/UX Designer &amp; Brand Specialist</p>
              <div className="profile-location" aria-label="Based in Singapore">
                <span role="img" aria-label="Singapore flag">🇸🇬</span> Singapore · EN, KR
              </div>
              <div className="profile-rating">
                <span aria-label="Rated 4.9 out of 5 stars">★ 4.9</span> <span className="profile-rating__count" aria-hidden="true">(230)</span>
                <button className="profile-link" type="button">See all reviews</button>
              </div>
              <div className="profile-actions" role="group" aria-label="Primary actions">
                <button className="profile-btn profile-btn--primary">Hire Me</button>
                <button className="profile-btn profile-btn--ghost">Contact</button>
              </div>
              <div className="profile-social" aria-label="Social links">
                <a href="#" aria-label="LinkedIn profile" className="profile-social__link">in</a>
                <a href="#" aria-label="Behance portfolio" className="profile-social__link">Be</a>
                <a href="#" aria-label="Dribbble shots" className="profile-social__link">Dr</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container profile-summary">
        <section className="profile-summary__about" aria-labelledby="about-title">
          <h2 id="about-title">About Ava</h2>
          <p>
            I design digital experiences that balance clarity, delight, and measurable business results. Over the past seven years I’ve helped SaaS, fintech, and retail teams ship award-winning products.
          </p>
          <p>
            My process combines deep discovery, collaborative workshops, and design systems thinking so that teams stay aligned long after launch.
          </p>
          <ul className="profile-specialties">
            <li>Product design &amp; UX strategy</li>
            <li>Brand systems &amp; marketing</li>
            <li>Design Ops &amp; documentation</li>
          </ul>
          <div className="profile-stat-chips" role="list">
            <span role="listitem" className="profile-chip">Member since 2020</span>
            <span role="listitem" className="profile-chip">Response time ~1h</span>
            <span role="listitem" className="profile-chip">180+ projects</span>
            <span role="listitem" className="profile-chip">★ 4.9 average</span>
          </div>
          <button className="profile-btn profile-btn--ghost" type="button">Download Resume</button>
        </section>

        <aside className="profile-summary__info" aria-labelledby="info-title">
          <h2 id="info-title" className="sr-only">Professional info</h2>
          <div className="profile-info-card">
            <dl>
              <div>
                <dt>Location</dt>
                <dd>Singapore (GMT+8)</dd>
              </div>
              <div>
                <dt>Languages</dt>
                <dd>English, Korean</dd>
              </div>
              <div>
                <dt>Working hours</dt>
                <dd>Mon–Fri · 9am – 6pm (GMT+8)</dd>
              </div>
              <div className="profile-info__verifications">
                <dt>Verifications</dt>
                <dd>
                  <span className="profile-chip profile-chip--soft">ID Verified</span>
                  <span className="profile-chip profile-chip--soft">Email Verified</span>
                </dd>
              </div>
            </dl>
            <div className="profile-availability">
              <span className="availability-dot" aria-hidden="true" />
              Open to new projects
            </div>
          </div>
        </aside>
      </div>

      <section className="profile-section" aria-labelledby="portfolio-title">
        <div className="container profile-section__header">
          <div>
            <h2 id="portfolio-title">Portfolio</h2>
            <p>Selected projects showcasing strategy, systems, and craftsmanship.</p>
          </div>
          <button className="profile-link" type="button">Request full case studies</button>
        </div>
        <div className="container">
          <div className="profile-portfolio-grid">
            {portfolioItems.map((item) => (
              <button
                key={item.id}
                className="portfolio-card"
                onClick={() => setSelectedPortfolio(item)}
                aria-label={`View project ${item.title}`}
              >
                <div className="portfolio-card__image">
                  <img src={item.cover} alt={item.title} loading="lazy" />
                  <div className="portfolio-card__overlay" aria-hidden="true">
                    <span>View Project</span>
                  </div>
                </div>
                <div className="portfolio-card__meta">
                  <div className="portfolio-card__tags">
                    <span>{item.category}</span>
                    <span>{item.year}</span>
                  </div>
                  <h3>{item.title}</h3>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="profile-section" aria-labelledby="services-title">
        <div className="container profile-section__header">
          <div>
            <h2 id="services-title">My Services</h2>
            <p>Preconfigured packages you can hire me for.</p>
          </div>
        </div>
        <div className="container">
          <div className="profile-services-grid">
            {services.map((service) => (
              <article key={service.id} className="profile-service-card">
                <div className="profile-service-card__media">
                  <img src={service.thumbnail} alt={service.title} loading="lazy" />
                </div>
                <div className="profile-service-card__body">
                  <h3>{service.title}</h3>
                  <p>{service.summary}</p>
                  <div className="profile-service-card__rating" aria-label={`${service.rating} out of 5 stars`}>
                    ★ {service.rating.toFixed(1)} <span aria-hidden="true">({service.reviews})</span>
                  </div>
                  <div className="profile-service-card__footer">
                    <span className="profile-service-card__price">From ${service.price}</span>
                    <button className="profile-btn profile-btn--primary profile-btn--sm" type="button">View Details</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="profile-section__actions">
            <button className="profile-btn profile-btn--ghost" type="button">View All Services</button>
          </div>
        </div>
      </section>

      <section className="profile-section" aria-labelledby="skills-title">
        <div className="container profile-section__header">
          <h2 id="skills-title">Skills &amp; Tools</h2>
        </div>
        <div className="container">
          <div className="profile-skills">
            {skills.map((skill) => (
              <span key={skill} className="profile-skill-pill">{skill}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="profile-section" aria-labelledby="reviews-title">
        <div className="container profile-section__header profile-section__header--stack">
          <div>
            <h2 id="reviews-title">Client Reviews</h2>
            <div className="profile-reviews-summary">
              <span className="profile-reviews-summary__score" aria-label="4.9 out of 5 stars">★ 4.9</span>
              <span className="profile-reviews-summary__count">230 reviews</span>
            </div>
          </div>
          <div className="profile-distribution">
            {[5, 4, 3, 2, 1].map((stars) => (
              <div key={stars} className="profile-distribution__item">
                <span>{stars}★</span>
                <div className="profile-distribution__track">
                  <div className="profile-distribution__fill" style={{ width: `${stars === 5 ? 80 : stars === 4 ? 14 : 6}%` }} />
                </div>
                <span>{stars === 5 ? "80%" : stars === 4 ? "14%" : "6%"}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="container profile-review-controls">
          <div className="profile-filter-chips" role="group" aria-label="Review filters">
            {[
              { id: "all", label: "All" },
              { id: "5", label: "5★" },
              { id: "4", label: "4★" },
              { id: "images", label: "With images" },
              { id: "recent", label: "Recent" },
            ].map((filter) => (
              <button
                key={filter.id}
                className={`profile-chip ${selectedReviewFilter === filter.id ? "profile-chip--active" : ""}`}
                type="button"
                onClick={() => setSelectedReviewFilter(filter.id)}
                aria-pressed={selectedReviewFilter === filter.id}
              >
                {filter.label}
              </button>
            ))}
          </div>
          <label className="profile-sort" htmlFor="review-sort">
            Sort by
            <select
              id="review-sort"
              value={reviewSort}
              onChange={(event) => setReviewSort(event.target.value)}
            >
              <option value="newest">Newest</option>
              <option value="highest">Highest rated</option>
              <option value="lowest">Lowest rated</option>
              <option value="helpful">Most helpful</option>
            </select>
          </label>
        </div>

        <div className="container profile-review-list">
          {filteredReviews.map((review) => (
            <article key={review.id} className="profile-review-card">
              <div className="profile-review-card__header">
                <img src={review.avatar} alt={review.name} loading="lazy" />
                <div>
                  <div className="profile-review-card__meta">
                    <span className="profile-review-card__name">{review.name}</span>
                    <span className="profile-review-card__rating" aria-label={`${review.rating} out of 5 stars`}>
                      {"★".repeat(review.rating)}
                    </span>
                  </div>
                  <div className="profile-review-card__submeta">
                    <span>{review.flag} {review.country}</span>
                    <span aria-hidden="true">•</span>
                    <span>{review.date}</span>
                  </div>
                </div>
              </div>
              <p>{review.text}</p>
              {review.images && (
                <div className="profile-review-images">
                  {review.images.map((image, index) => (
                    <button
                      key={`${review.id}-img-${index}`}
                      onClick={() => setActiveReviewImage(image)}
                      className="profile-review-image"
                      aria-label={`Open review image ${index + 1}`}
                    >
                      <img src={image} alt="Review attachment" loading="lazy" />
                    </button>
                  ))}
                </div>
              )}
              <div className="profile-review-card__actions">
                <button type="button" className="profile-link">Reply</button>
                <button type="button" className="profile-link">Helpful? 👍 {review.helpful}</button>
              </div>
            </article>
          ))}
          <button className="profile-btn profile-btn--ghost" type="button">Load more</button>
        </div>
      </section>

      <section className="profile-section" aria-labelledby="certifications-title">
        <div className="container profile-section__header">
          <h2 id="certifications-title">Certifications &amp; Education</h2>
        </div>
        <div className="container profile-credentials">
          <div className="profile-credential-card" aria-label="Certifications">
            <h3>Certifications</h3>
            <ul>
              {certifications.map((cert) => (
                <li key={cert.id}>
                  <div className="profile-credential__icon" aria-hidden="true">🏅</div>
                  <div>
                    <span className="profile-credential__title">{cert.name}</span>
                    <span className="profile-credential__meta">{cert.issuer} · {cert.year}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="profile-credential-card" aria-label="Education">
            <h3>Education</h3>
            <ul>
              {education.map((entry) => (
                <li key={entry.id}>
                  <div className="profile-credential__icon" aria-hidden="true">🎓</div>
                  <div>
                    <span className="profile-credential__title">{entry.school}</span>
                    <span className="profile-credential__meta">{entry.degree} · {entry.field} · {entry.year}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="profile-contact-cta" aria-labelledby="contact-title">
        <div className="container profile-contact-cta__inner">
          <h2 id="contact-title">Work with Ava on your next project</h2>
          <p>Share a brief and I’ll respond within one business day with next steps.</p>
          <div className="profile-contact-cta__actions">
            <button className="profile-btn profile-btn--primary">Hire Me</button>
            <button className="profile-btn profile-btn--outline">Send Message</button>
          </div>
        </div>
      </section>

      <section className="profile-section" aria-labelledby="related-title">
        <div className="container profile-section__header">
          <h2 id="related-title">Related Freelancers</h2>
        </div>
        <div className="container">
          <div className="profile-related-scroll" role="list">
            {relatedFreelancers.map((freelancer) => (
              <article key={freelancer.id} className="profile-related-card" role="listitem">
                <img src={freelancer.avatar} alt={freelancer.name} loading="lazy" />
                <div>
                  <h3>{freelancer.name}</h3>
                  <p>{freelancer.title}</p>
                  <span className="profile-related-card__rating">★ {freelancer.rating}</span>
                </div>
                <button className="profile-btn profile-btn--ghost profile-btn--sm" type="button">Hire</button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="profile-sticky-bar">
        <div className="profile-sticky-bar__content">
          <div>
            <strong>Ready to collaborate?</strong>
            <span>Typical response within 1 hour</span>
          </div>
          <button className="profile-btn profile-btn--primary">Hire Ava</button>
        </div>
      </div>

      {selectedPortfolio && (
        <div className="profile-modal" role="dialog" aria-modal="true" aria-label={`${selectedPortfolio.title} details`}>
          <div className="profile-modal__content">
            <button className="profile-modal__close" aria-label="Close project" onClick={() => setSelectedPortfolio(null)}>
              ✕
            </button>
            <h3>{selectedPortfolio.title}</h3>
            <p className="profile-modal__meta">{selectedPortfolio.category} · {selectedPortfolio.year}</p>
            <p>{selectedPortfolio.description}</p>
            <div className="profile-modal__gallery">
              {selectedPortfolio.gallery.map((image, index) => (
                <img key={`${selectedPortfolio.id}-gallery-${index}`} src={image} alt="Portfolio detail" loading="lazy" />
              ))}
            </div>
          </div>
        </div>
      )}

      {activeReviewImage && (
        <div className="profile-modal" role="dialog" aria-modal="true" aria-label="Review image preview" onClick={() => setActiveReviewImage(null)}>
          <div className="profile-modal__content profile-modal__content--image" onClick={(event) => event.stopPropagation()}>
            <button className="profile-modal__close" aria-label="Close image" onClick={() => setActiveReviewImage(null)}>
              ✕
            </button>
            <img src={activeReviewImage} alt="Review attachment" />
          </div>
        </div>
      )}
    </div>
  );
};
