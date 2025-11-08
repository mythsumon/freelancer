import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./ServicesPage.css";

interface Service {
  id: number;
  slug: string;
  title: string;
  category: string;
  tags: string[];
  seller: string;
  level: string;
  rating: number;
  reviewCount: number;
  price: number;
  location: string;
  image: string;
}

const allServices: Service[] = [
  {
    id: 1,
    slug: "modern-minimal-logo",
    title: "Modern Minimal Logo & Brand Icon",
    category: "Design",
    tags: ["Logo", "Branding", "Identity"],
    seller: "Ava Kim",
    level: "Top Rated",
    rating: 4.9,
    reviewCount: 128,
    price: 75,
    location: "SG",
    image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92eee?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    slug: "responsive-website-development",
    title: "Responsive Website Development (Webflow / React)",
    category: "Development",
    tags: ["Web", "React", "Webflow"],
    seller: "Tech Solutions",
    level: "Level 2",
    rating: 5.0,
    reviewCount: 96,
    price: 320,
    location: "US",
    image: "https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    slug: "social-media-marketing-strategy",
    title: "Full Social Media Marketing Strategy & Calendar",
    category: "Marketing",
    tags: ["Social", "Strategy", "Ads"],
    seller: "Growth Studio",
    level: "Level 2",
    rating: 4.8,
    reviewCount: 82,
    price: 210,
    location: "CA",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 4,
    slug: "ux-research-sprint",
    title: "UX Research Sprint & Usability Testing",
    category: "Design",
    tags: ["UX", "Research", "Interviews"],
    seller: "Insight Lab",
    level: "Top Rated",
    rating: 4.9,
    reviewCount: 64,
    price: 280,
    location: "UK",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 5,
    slug: "brand-story-copywriting",
    title: "Brand Story & Website Copywriting Bundle",
    category: "Writing",
    tags: ["Copy", "Website", "Brand"],
    seller: "Word Lab",
    level: "Level 1",
    rating: 4.9,
    reviewCount: 74,
    price: 180,
    location: "IE",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 6,
    slug: "product-explainer-video",
    title: "Animated Product Explainer Video (60s)",
    category: "Video",
    tags: ["Animation", "Video", "Explainer"],
    seller: "Motion Forge",
    level: "Top Rated",
    rating: 4.7,
    reviewCount: 52,
    price: 390,
    location: "AU",
    image: "https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 7,
    slug: "seo-optimization-package",
    title: "Technical SEO Audit & Optimization",
    category: "Marketing",
    tags: ["SEO", "Audit", "Optimization"],
    seller: "Digital Growth",
    level: "Level 2",
    rating: 5.0,
    reviewCount: 118,
    price: 240,
    location: "DE",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 8,
    slug: "mobile-app-ui-kit",
    title: "Mobile App UI Kit (iOS & Android)",
    category: "Design",
    tags: ["UI Kit", "Mobile", "Figma"],
    seller: "Studio Pixel",
    level: "Level 1",
    rating: 4.8,
    reviewCount: 45,
    price: 160,
    location: "KR",
    image: "https://images.unsplash.com/photo-1612036782180-6f0b6c8fe14c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 9,
    slug: "presentation-design-suite",
    title: "Executive Presentation Design Suite",
    category: "Design",
    tags: ["Presentation", "Slides", "Pitch"],
    seller: "Slide Studio",
    level: "Level 2",
    rating: 4.9,
    reviewCount: 68,
    price: 220,
    location: "DE",
    image: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 10,
    slug: "translation-english-korean",
    title: "Professional English ↔ Korean Translation",
    category: "Translation",
    tags: ["Translation", "Editing", "Localization"],
    seller: "Linguist Hub",
    level: "Top Rated",
    rating: 5.0,
    reviewCount: 132,
    price: 95,
    location: "KR",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 11,
    slug: "ecommerce-store-setup",
    title: "E-commerce Store Setup & Conversion Optimization",
    category: "Development",
    tags: ["Shopify", "E-commerce", "Conversion"],
    seller: "Commerce Lab",
    level: "Top Rated",
    rating: 4.9,
    reviewCount: 88,
    price: 340,
    location: "US",
    image: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 12,
    slug: "podcast-editing-package",
    title: "Podcast Editing & Mastering Package",
    category: "Audio",
    tags: ["Podcast", "Editing", "Mastering"],
    seller: "Sound Craft",
    level: "Level 1",
    rating: 4.8,
    reviewCount: 40,
    price: 140,
    location: "SE",
    image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=1200&q=80",
  },
];

const categories = ["All", "Design", "Development", "Marketing", "Writing", "Translation", "Video", "Audio"];

export const ServicesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");

  const visibleServices = useMemo(() => {
    return allServices.filter((service) => {
      const matchesCategory = selectedCategory === "All" || service.category === selectedCategory;
      const query = search.trim().toLowerCase();
      const matchesSearch =
        query.length === 0 ||
        service.title.toLowerCase().includes(query) ||
        service.seller.toLowerCase().includes(query) ||
        service.tags.some((tag) => tag.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [search, selectedCategory]);

  return (
    <div className="services-page">
      <section className="services-hero">
        <div className="container">
          <div className="services-hero__content">
            <div className="services-hero__text">
              <h1>Discover premium services curated for your next project</h1>
              <p>
                Explore vetted freelancers across design, development, marketing, and more. Find the exact service you need and collaborate with global talent.
              </p>
            </div>
            <div className="services-hero__meta">
              <div className="services-hero__stat">
                <span>900+</span>
                <p>Verified services</p>
              </div>
              <div className="services-hero__stat">
                <span>4.9★</span>
                <p>Average rating</p>
              </div>
              <div className="services-hero__stat">
                <span>120+</span>
                <p>Countries represented</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="services-controls">
        <div className="container">
          <div className="services-controls__bar">
            <div className="services-search">
              <label htmlFor="services-search" className="sr-only">
                Search services
              </label>
              <input
                id="services-search"
                type="search"
                placeholder="Search by title, skill, or seller"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
              <span aria-hidden="true">🔍</span>
            </div>
            <div className="services-category-chips" role="tablist" aria-label="Service categories">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={selectedCategory === category}
                  className={selectedCategory === category ? "is-active" : ""}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="services-grid-section">
        <div className="container">
          {visibleServices.length === 0 ? (
            <div className="services-empty" role="status" aria-live="polite">
              <div className="services-empty__icon" aria-hidden="true">🔍</div>
              <h2>No services found</h2>
              <p>Try adjusting your search terms or switching categories.</p>
            </div>
          ) : (
            <div className="services-grid">
              {visibleServices.map((service) => (
                <article key={service.id} className="services-card">
                  <Link
                    to={`/service/${service.slug}`}
                    className="services-card__link"
                    aria-label={`View service: ${service.title}`}
                  >
                    <div className="services-card__media">
                      <img src={service.image} alt={service.title} loading="lazy" />
                      <div className="services-card__badges" aria-hidden="true">
                        <span className="services-chip">★ {service.rating.toFixed(1)}</span>
                        <span className="services-chip">{service.location}</span>
                      </div>
                    </div>
                    <div className="services-card__body">
                      <h3>{service.title}</h3>
                      <div className="services-card__seller">
                        <span className="avatar" aria-hidden="true">{service.seller.charAt(0)}</span>
                        <div>
                          <span className="seller-name">{service.seller}</span>
                          <span className="seller-level">{service.level}</span>
                        </div>
                      </div>
                      <div className="services-card__tags">
                        {service.tags.map((tag) => (
                          <span key={`${service.id}-${tag}`}>{tag}</span>
                        ))}
                      </div>
                    </div>
                    <div className="services-card__footer">
                      <div>
                        <strong>From ${service.price}</strong>
                        <p>Rated {service.rating.toFixed(1)} ({service.reviewCount} reviews)</p>
                      </div>
                      <span className="services-card__cta">View</span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
