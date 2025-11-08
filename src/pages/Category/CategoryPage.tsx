import { useState, useEffect, useMemo } from "react";
import { UniversalSelect } from "../../components/inputs/UniversalSelect";
import "./CategoryPage.css";

// Dummy data
const subcategories = [
  { id: 1, name: "Logo Design", count: 1240 },
  { id: 2, name: "Branding", count: 890 },
  { id: 3, name: "UI/UX", count: 756 },
  { id: 4, name: "Banner Design", count: 634 },
  { id: 5, name: "Social Media", count: 521 },
  { id: 6, name: "Presentation", count: 432 },
  { id: 7, name: "Illustration", count: 389 },
  { id: 8, name: "Packaging", count: 298 },
];

interface ServiceItem {
  id: number;
  slug: string;
  title: string;
  seller: string;
  rating: number;
  price: number;
  location: string;
  levelLabel: string;
  levelId: "top" | "level2" | "level1" | "new";
  tags: string[];
  image: string;
  delivery: "24h" | "3d" | "7d" | "14d";
  language: "en" | "kr" | "es" | "fr" | "de";
  proVerified: boolean;
}

const services: ServiceItem[] = [
  {
    id: 1,
    slug: "modern-minimal-logo",
    title: "Professional Logo Design with Multiple Variations",
    seller: "Alex Morgan",
    rating: 4.9,
    price: 75,
    location: "UK",
    levelLabel: "Top Rated",
    levelId: "top",
    tags: ["Logo", "Branding"],
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80",
    delivery: "3d",
    language: "en",
    proVerified: true,
  },
  {
    id: 2,
    slug: "modern-ui-ux-design",
    title: "Modern UI/UX Design for Mobile App",
    seller: "Design Studio",
    rating: 5.0,
    price: 250,
    location: "US",
    levelLabel: "Level 2",
    levelId: "level2",
    tags: ["UI/UX", "Mobile"],
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=900&q=80",
    delivery: "7d",
    language: "en",
    proVerified: true,
  },
  {
    id: 3,
    slug: "social-branding-package",
    title: "Social Media Branding Package",
    seller: "Creative Co",
    rating: 4.8,
    price: 150,
    location: "CA",
    levelLabel: "Level 2",
    levelId: "level2",
    tags: ["Social Media", "Branding"],
    image: "https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=900&q=80",
    delivery: "7d",
    language: "en",
    proVerified: false,
  },
  {
    id: 4,
    slug: "ecommerce-banner-design",
    title: "Banner Design for E-commerce",
    seller: "Banner Expert",
    rating: 4.7,
    price: 85,
    location: "AU",
    levelLabel: "Level 1",
    levelId: "level1",
    tags: ["Banner", "E-commerce"],
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80",
    delivery: "3d",
    language: "en",
    proVerified: false,
  },
  {
    id: 5,
    slug: "corporate-presentation-design",
    title: "Corporate Presentation Design",
    seller: "Slide Master",
    rating: 4.9,
    price: 120,
    location: "DE",
    levelLabel: "Top Rated",
    levelId: "top",
    tags: ["Presentation", "Corporate"],
    image: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=900&q=80",
    delivery: "7d",
    language: "de",
    proVerified: true,
  },
  {
    id: 6,
    slug: "minimalist-logo-design",
    title: "Minimalist Logo Design",
    seller: "Simple Design",
    rating: 4.8,
    price: 65,
    location: "FR",
    levelLabel: "Level 1",
    levelId: "level1",
    tags: ["Logo", "Minimal"],
    image: "https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=900&q=80",
    delivery: "3d",
    language: "fr",
    proVerified: false,
  },
  {
    id: 7,
    slug: "brand-identity-package",
    title: "Complete Brand Identity Package",
    seller: "Brand Wizard",
    rating: 5.0,
    price: 350,
    location: "ES",
    levelLabel: "Top Rated",
    levelId: "top",
    tags: ["Branding", "Identity"],
    image: "https://images.unsplash.com/photo-1612036782180-6f0b6c8fe14c?auto=format&fit=crop&w=900&q=80",
    delivery: "14d",
    language: "es",
    proVerified: true,
  },
  {
    id: 8,
    slug: "app-icon-design",
    title: "App Icon Design",
    seller: "Icon Creator",
    rating: 4.7,
    price: 45,
    location: "JP",
    levelLabel: "Level 1",
    levelId: "level1",
    tags: ["UI/UX", "Icon"],
    image: "https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?auto=format&fit=crop&w=900&q=80",
    delivery: "3d",
    language: "en",
    proVerified: false,
  },
  {
    id: 9,
    slug: "instagram-story-templates",
    title: "Instagram Story Templates",
    seller: "Social Pro",
    rating: 4.9,
    price: 95,
    location: "KR",
    levelLabel: "Level 2",
    levelId: "level2",
    tags: ["Social Media", "Instagram"],
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
    delivery: "7d",
    language: "kr",
    proVerified: true,
  },
  {
    id: 10,
    slug: "business-card-stationery",
    title: "Business Card and Stationery Design",
    seller: "Print Master",
    rating: 4.8,
    price: 75,
    location: "SG",
    levelLabel: "Level 2",
    levelId: "level2",
    tags: ["Branding", "Print"],
    image: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=900&q=80",
    delivery: "3d",
    language: "en",
    proVerified: false,
  },
  {
    id: 11,
    slug: "product-packaging-design",
    title: "Product Packaging Design",
    seller: "Package Designer",
    rating: 4.7,
    price: 200,
    location: "NL",
    levelLabel: "Level 1",
    levelId: "level1",
    tags: ["Packaging", "Product"],
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=900&q=80",
    delivery: "14d",
    language: "en",
    proVerified: false,
  },
  {
    id: 12,
    slug: "illustrative-logo-design",
    title: "Illustrative Logo Design",
    seller: "Artistic Designs",
    rating: 4.9,
    price: 110,
    location: "SE",
    levelLabel: "Level 1",
    levelId: "level1",
    tags: ["Logo", "Illustration"],
    image: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=900&q=80",
    delivery: "7d",
    language: "en",
    proVerified: false,
  },
];

const sortOptions = [
  { value: "popularity", label: "Popularity" },
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Rating" },
];

const deliveryTimes = [
  { id: "24h", label: "24 hours" },
  { id: "3d", label: "3 days" },
  { id: "7d", label: "7 days" },
  { id: "14d", label: "14 days" },
];

const sellerLevels = [
  { id: "top", label: "Top Rated" },
  { id: "level2", label: "Level 2" },
  { id: "level1", label: "Level 1" },
  { id: "new", label: "New Seller" },
];

const languages = [
  { id: "en", label: "English" },
  { id: "kr", label: "Korean" },
  { id: "es", label: "Spanish" },
  { id: "fr", label: "French" },
  { id: "de", label: "German" },
];

export const CategoryPage = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [mobileSortOpen, setMobileSortOpen] = useState(false);
  const [selectedSubcategories, setSelectedSubcategories] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [selectedDelivery, setSelectedDelivery] = useState<string[]>([]);
  const [selectedSellerLevels, setSelectedSellerLevels] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [proVerifiedOnly, setProVerifiedOnly] = useState(false);
  const [sortBy, setSortBy] = useState("popularity");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [heroIndex, setHeroIndex] = useState(0);

  const tagIdMap = useMemo(() => {
    const map = new Map<string, number>();
    subcategories.forEach((sub) => {
      map.set(sub.name.toLowerCase(), sub.id);
    });
    return map;
  }, []);

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesSubcategory =
        selectedSubcategories.length === 0 ||
        service.tags.some((tag) => {
          const tagId = tagIdMap.get(tag.toLowerCase());
          return tagId ? selectedSubcategories.includes(tagId) : false;
        });

      const matchesLevel =
        selectedSellerLevels.length === 0 || selectedSellerLevels.includes(service.levelId);

      const matchesDelivery =
        selectedDelivery.length === 0 || selectedDelivery.includes(service.delivery);

      const matchesLanguage =
        selectedLanguages.length === 0 || selectedLanguages.includes(service.language);

      const matchesPro = !proVerifiedOnly || service.proVerified;

      const matchesPrice = service.price >= priceRange[0] && service.price <= priceRange[1];

      return (
        matchesSubcategory &&
        matchesLevel &&
        matchesDelivery &&
        matchesLanguage &&
        matchesPro &&
        matchesPrice
      );
    });
  }, [selectedSubcategories, selectedSellerLevels, selectedDelivery, selectedLanguages, proVerifiedOnly, priceRange, tagIdMap]);

  const cardsPerPage = 9;
  const totalPages = Math.ceil(filteredServices.length / cardsPerPage);
  const paginatedServices = useMemo(() => {
    const start = (currentPage - 1) * cardsPerPage;
    return filteredServices.slice(start, start + cardsPerPage);
  }, [cardsPerPage, currentPage, filteredServices]);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const heroSlides = useMemo(() => (
    [
      {
        id: "hero-1",
        title: "Designers delivering global brands",
        subtitle: "Collaborate with senior creatives trusted by startups and Fortune 500 teams.",
        image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80",
      },
      {
        id: "hero-2",
        title: "UI/UX systems built with speed",
        subtitle: "Ship product design sprints, audit flows, and launch prototypes in days.",
        image: "https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=1400&q=80",
      },
      {
        id: "hero-3",
        title: "Creative assets ready for any channel",
        subtitle: "Motion, social packs, and marketing visuals tailored for global campaigns.",
        image: "https://images.unsplash.com/photo-1501526011028-5c6a284e1d86?auto=format&fit=crop&w=1400&q=80",
      },
    ]
  ), []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroSlides.length);
    }, 4500);
    return () => window.clearInterval(interval);
  }, [heroSlides.length]);

  const toggleSubcategory = (id: number) => {
    setSelectedSubcategories(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toggleDelivery = (id: string) => {
    setSelectedDelivery(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toggleSellerLevel = (id: string) => {
    setSelectedSellerLevels(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toggleLanguage = (id: string) => {
    setSelectedLanguages(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const resetFilters = () => {
    setSelectedSubcategories([]);
    setPriceRange([0, 500]);
    setSelectedDelivery([]);
    setSelectedSellerLevels([]);
    setSelectedLanguages([]);
    setProVerifiedOnly(false);
  };

  const applyFilters = () => {
    setMobileFiltersOpen(false);
    // In a real app, this would trigger a new API call
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setMobileSortOpen(false);
    // In a real app, this would trigger a new API call
  };

  return (
    <div className="category-page">
      {/* Category Header */}
      <section className="category-header">
        <div className="container">
          <nav className="breadcrumbs">
            <a href="/">Home</a>
            <span className="separator">›</span>
            <span className="current">Design</span>
          </nav>
          
          <div className="category-info">
            <h1>Design</h1>
            <p className="category-description">Logos, UI/UX, banners, and more. Work with experienced designers trusted by global brands.</p>
            
            <div className="category-tags">
              {["Logo", "Branding", "UI/UX", "Banner", "Social Media", "Presentation"].map((tag) => (
                <button key={tag} className="tag-pill">
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="category-hero">
            <div className="category-hero__slider">
              {heroSlides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`category-hero__slide ${index === heroIndex ? "category-hero__slide--active" : ""}`}
                  aria-hidden={index !== heroIndex}
                >
                  <img src={slide.image} alt={slide.title} loading="lazy" />
                  <div className="category-hero__overlay" />
                  <div className="category-hero__content">
                    <h2>{slide.title}</h2>
                    <p>{slide.subtitle}</p>
                    <a href="#results" className="category-hero__cta" aria-label="Browse design services">
                      Browse services
                    </a>
                  </div>
                </div>
              ))}
              <button
                type="button"
                className="category-hero__control category-hero__control--prev"
                aria-label="Previous hero slide"
                onClick={() => setHeroIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
              >
                ◀
              </button>
              <button
                type="button"
                className="category-hero__control category-hero__control--next"
                aria-label="Next hero slide"
                onClick={() => setHeroIndex((prev) => (prev + 1) % heroSlides.length)}
              >
                ▶
              </button>
            </div>
            <div className="category-hero__dots" role="tablist" aria-label="Design hero slides">
              {heroSlides.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  className={`category-hero__dot ${index === heroIndex ? "category-hero__dot--active" : ""}`}
                  aria-label={`View hero slide ${index + 1}`}
                  aria-pressed={index === heroIndex}
                  onClick={() => setHeroIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Filter + Sort Bar */}
      <section className="filter-bar">
        <div className="container">
          <div className="filter-bar-content">
            <button 
              className="filter-trigger mobile-only"
              onClick={() => setMobileFiltersOpen(true)}
            >
              Filters
            </button>
            
            <div className="results-count">
              {filteredServices.length} services
            </div>
            
            <div className="sort-dropdown">
              <span className="sort-label">Sort by:</span>
              <div className="sort-select">
                <UniversalSelect
                  id="sort-select"
                  options={sortOptions}
                  value={sortBy}
                  onChange={(value) => setSortBy(value ?? sortOptions[0].value)}
                  size="md"
                />
              </div>
            </div>
            
            <button 
              className="sort-trigger mobile-only"
              onClick={() => setMobileSortOpen(true)}
            >
              Sort
            </button>
          </div>
        </div>
      </section>

      <div className="category-wrapper" id="results">
        <div className="category-content">
          {/* Desktop Filters Sidebar */}
          <aside className="filters-sidebar desktop-only">
            <div className="filters-section">
              <h3 className="filters-title">Subcategory</h3>
              <div className="checkbox-group">
                {subcategories.map(sub => (
                  <label key={sub.id} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={selectedSubcategories.includes(sub.id)}
                      onChange={() => toggleSubcategory(sub.id)}
                    />
                    <span className="checkmark"></span>
                    {sub.name} <span className="count">({sub.count})</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="filters-section">
              <h3 className="filters-title">Price Range</h3>
              <div className="price-inputs">
                <div className="price-input-group">
                  <label htmlFor="min-price">Min</label>
                  <input
                    type="number"
                    id="min-price"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                  />
                </div>
                <span className="price-separator">-</span>
                <div className="price-input-group">
                  <label htmlFor="max-price">Max</label>
                  <input
                    type="number"
                    id="max-price"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  />
                </div>
              </div>
            </div>
            
            <div className="filters-section">
              <h3 className="filters-title">Delivery Time</h3>
              <div className="checkbox-group">
                {deliveryTimes.map(time => (
                  <label key={time.id} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={selectedDelivery.includes(time.id)}
                      onChange={() => toggleDelivery(time.id)}
                    />
                    <span className="checkmark"></span>
                    {time.label}
                  </label>
                ))}
              </div>
            </div>
            
            <div className="filters-section">
              <h3 className="filters-title">Seller Level</h3>
              <div className="checkbox-group">
                {sellerLevels.map(level => (
                  <label key={level.id} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={selectedSellerLevels.includes(level.id)}
                      onChange={() => toggleSellerLevel(level.id)}
                    />
                    <span className="checkmark"></span>
                    {level.label}
                  </label>
                ))}
              </div>
            </div>
            
            <div className="filters-section">
              <h3 className="filters-title">Language</h3>
              <div className="checkbox-group">
                {languages.map(lang => (
                  <label key={lang.id} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={selectedLanguages.includes(lang.id)}
                      onChange={() => toggleLanguage(lang.id)}
                    />
                    <span className="checkmark"></span>
                    {lang.label}
                  </label>
                ))}
              </div>
            </div>
            
            <div className="filters-section">
              <label className="toggle-label">
                <span>Pro Verified Only</span>
                <div 
                  className={`toggle ${proVerifiedOnly ? 'on' : ''}`}
                  onClick={() => setProVerifiedOnly(!proVerifiedOnly)}
                >
                  <div className="toggle-thumb"></div>
                </div>
              </label>
            </div>
            
            <div className="filters-actions">
              <button className="btn ghost" onClick={resetFilters}>
                Clear All
              </button>
            </div>
          </aside>

          {/* Service Grid */}
          <div className="category-service-grid">
            {isLoading
              ? Array.from({ length: cardsPerPage }).map((_, index) => (
                  <div key={`skeleton-${index}`} className="category-card category-card--skeleton">
                    <div className="category-card__media">
                      <div className="skeleton-media" />
                    </div>
                    <div className="category-card__body">
                      <span className="skeleton-line" />
                      <span className="skeleton-line" />
                      <div className="skeleton-tags">
                        <span />
                        <span />
                      </div>
                    </div>
                    <div className="category-card__footer">
                      <span className="skeleton-line skeleton-line--short" />
                      <span className="skeleton-chip" />
                    </div>
                  </div>
                ))
              : paginatedServices.map((service) => (
                  <article key={service.id} className="category-card">
                    <div className="category-card__media">
                      <img src={service.image} alt={service.title} loading="lazy" />
                      <div className="category-card__badges" aria-hidden="true">
                        <span className="category-chip">★ {service.rating.toFixed(1)}</span>
                        <span className="category-chip">{service.location}</span>
                      </div>
                    </div>
                    <div className="category-card__body">
                      <h3>{service.title}</h3>
                      <p>
                        {`Work with ${service.seller} on ${service.tags.slice(0, 2).join(" & ")}${service.tags.length > 2 ? "…" : ""}`}
                      </p>
                      <div className="category-card__tags">
                        {service.tags.map((tag) => (
                          <span key={`${service.id}-${tag}`}>{tag}</span>
                        ))}
                      </div>
                    </div>
                    <div className="category-card__footer">
                      <span>
                        <span className="category-card__footer-label">From</span> <span className="category-card__footer-price">${service.price}</span>
                      </span>
                      <a className="category-card__cta" href={`/service/${service.slug}`} aria-label={`View ${service.title}`}>
                        View
                      </a>
                    </div>
                  </article>
                ))}
          </div>

          {!isLoading && totalPages > 0 && (
            <nav className="category-pagination" aria-label="Pagination">
              <div className="category-pagination__inner">
                <button
                  type="button"
                  className="category-pagination__prev"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                >
                  ← Prev
                </button>
                {Array.from({ length: totalPages }).map((_, index) => {
                  const page = index + 1;
                  const isActive = page === currentPage;
                  return (
                    <button
                      type="button"
                      key={`page-${page}`}
                      className={`category-pagination__dot ${isActive ? "category-pagination__dot--active" : ""}`}
                      aria-current={isActive ? "page" : undefined}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  );
                })}
                <button
                  type="button"
                  className="category-pagination__next"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                >
                  Next →
                </button>
              </div>
            </nav>
          )}

          {!isLoading && currentPage < totalPages && (
            <div className="category-pagination__mobile">
              <button
                type="button"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              >
                Load more
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      <div className={`drawer-overlay ${mobileFiltersOpen ? 'open' : ''}`} onClick={() => setMobileFiltersOpen(false)}>
        <div className="drawer" onClick={e => e.stopPropagation()}>
          <div className="drawer-header">
            <h2>Filters</h2>
            <button className="close-btn" onClick={() => setMobileFiltersOpen(false)}>×</button>
          </div>
          
          <div className="drawer-content">
            <div className="drawer-section">
              <h3 className="drawer-section-title">Subcategory</h3>
              <div className="checkbox-group">
                {subcategories.map(sub => (
                  <label key={sub.id} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={selectedSubcategories.includes(sub.id)}
                      onChange={() => toggleSubcategory(sub.id)}
                    />
                    <span className="checkmark"></span>
                    {sub.name} <span className="count">({sub.count})</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="drawer-section">
              <h3 className="drawer-section-title">Price Range</h3>
              <div className="price-inputs">
                <div className="price-input-group">
                  <label htmlFor="mobile-min-price">Min</label>
                  <input
                    type="number"
                    id="mobile-min-price"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                  />
                </div>
                <span className="price-separator">-</span>
                <div className="price-input-group">
                  <label htmlFor="mobile-max-price">Max</label>
                  <input
                    type="number"
                    id="mobile-max-price"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  />
                </div>
              </div>
            </div>
            
            <div className="drawer-section">
              <h3 className="drawer-section-title">Delivery Time</h3>
              <div className="checkbox-group">
                {deliveryTimes.map(time => (
                  <label key={time.id} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={selectedDelivery.includes(time.id)}
                      onChange={() => toggleDelivery(time.id)}
                    />
                    <span className="checkmark"></span>
                    {time.label}
                  </label>
                ))}
              </div>
            </div>
            
            <div className="drawer-section">
              <h3 className="drawer-section-title">Seller Level</h3>
              <div className="checkbox-group">
                {sellerLevels.map(level => (
                  <label key={level.id} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={selectedSellerLevels.includes(level.id)}
                      onChange={() => toggleSellerLevel(level.id)}
                    />
                    <span className="checkmark"></span>
                    {level.label}
                  </label>
                ))}
              </div>
            </div>
            
            <div className="drawer-section">
              <h3 className="drawer-section-title">Language</h3>
              <div className="checkbox-group">
                {languages.map(lang => (
                  <label key={lang.id} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={selectedLanguages.includes(lang.id)}
                      onChange={() => toggleLanguage(lang.id)}
                    />
                    <span className="checkmark"></span>
                    {lang.label}
                  </label>
                ))}
              </div>
            </div>
            
            <div className="drawer-section">
              <label className="toggle-label">
                <span>Pro Verified Only</span>
                <div 
                  className={`toggle ${proVerifiedOnly ? 'on' : ''}`}
                  onClick={() => setProVerifiedOnly(!proVerifiedOnly)}
                >
                  <div className="toggle-thumb"></div>
                </div>
              </label>
            </div>
          </div>
          
          <div className="drawer-footer">
            <button className="btn ghost" onClick={resetFilters}>
              Reset
            </button>
            <button className="btn primary" onClick={applyFilters}>
              Apply
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sort Bottom Sheet */}
      <div className={`bottom-sheet-overlay ${mobileSortOpen ? 'open' : ''}`} onClick={() => setMobileSortOpen(false)}>
        <div className="bottom-sheet" onClick={e => e.stopPropagation()}>
          <div className="bottom-sheet-header">
            <h2>Sort By</h2>
            <button className="close-btn" onClick={() => setMobileSortOpen(false)}>×</button>
          </div>
          
          <div className="bottom-sheet-content">
            {sortOptions.map(option => (
              <label key={option.value} className="radio-label">
                <input
                  type="radio"
                  name="sort"
                  checked={sortBy === option.value}
                  onChange={() => handleSortChange(option.value)}
                />
                <span className="radio-checkmark"></span>
                {option.label}
              </label>
            ))}
          </div>
          
          <div className="bottom-sheet-footer">
            <button className="btn primary" onClick={() => setMobileSortOpen(false)}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};