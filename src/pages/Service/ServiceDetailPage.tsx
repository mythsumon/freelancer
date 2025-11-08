import { useMemo, useState, useEffect, useCallback } from "react";
import "./ServiceDetailPage.css";

type MediaType = "image" | "video";

interface MediaItem {
  id: string;
  type: MediaType;
  src: string;
  alt: string;
  poster?: string;
}

interface PackageFeature {
  label: string;
  included: boolean;
}

interface ServicePackage {
  id: string;
  name: string;
  price: number;
  summary: string;
  delivery: string;
  revisions: string;
  features: PackageFeature[];
}

interface Addon {
  id: string;
  name: string;
  description: string;
  price: number;
}

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  country: string;
  flag: string;
  date: string;
  dateISO: string;
  text: string;
  images?: string[];
  helpfulCount: number;
}

const RECENT_MONTH_WINDOW = 4;

const mediaItems: MediaItem[] = [
  {
    id: "m1",
    type: "image",
    src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80",
    alt: "Minimal logo presentation mockup",
  },
  {
    id: "m2",
    type: "image",
    src: "https://images.unsplash.com/photo-1618004821443-3100f0dd3d2b?auto=format&fit=crop&w=1200&q=80",
    alt: "Brand guidelines booklet",
  },
  {
    id: "m3",
    type: "video",
    src: "https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4",
    alt: "Logo animation showcase video",
    poster: "https://images.unsplash.com/photo-1612036782180-6f0b6c8fe14c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "m4",
    type: "image",
    src: "https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=1200&q=80",
    alt: "Stationery branding mockups",
  },
  {
    id: "m5",
    type: "image",
    src: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80",
    alt: "Social media templates preview",
  },
  {
    id: "m6",
    type: "image",
    src: "https://images.unsplash.com/photo-1604328706150-2250c8135230?auto=format&fit=crop&w=1200&q=80",
    alt: "Logo exploration on grid",
  },
];

const overviewContent = {
  intro:
    "Crafting brand-first visual identities tailored for ambitious startups and established businesses. I combine thoughtful strategy, typography, and modern aesthetics to deliver logo systems that scale globally.",
  deliverables: [
    "Primary logo + responsive variations",
    "Typography & color system recommendations",
    "Brand usage guidelines PDF",
    "Exported files for print & digital",
  ],
  inclusions: [
    "High-resolution files (PNG, SVG, EPS, PDF)",
    "Color, monochrome & inverted variations",
    "Brand discovery workshop",
    "Usage rights for global commercial use",
  ],
  exclusions: [
    "Trademark filing",
    "Full marketing collateral design",
    "Copywriting services",
  ],
};

const packages: ServicePackage[] = [
  {
    id: "basic",
    name: "Basic",
    price: 75,
    summary: "One logo concept, two refinement rounds, 3-day delivery.",
    delivery: "3 days delivery",
    revisions: "2 revisions",
    features: [
      { label: "1 custom logo concept", included: true },
      { label: "High-res PNG & JPG files", included: true },
      { label: "Vector source file (AI/SVG)", included: false },
      { label: "Brand style guide", included: false },
      { label: "Commercial usage rights", included: true },
      { label: "Social media kit", included: false },
    ],
  },
  {
    id: "standard",
    name: "Standard",
    price: 150,
    summary: "Two logo concepts, source files, and expanded deliverables.",
    delivery: "3 days delivery",
    revisions: "4 revisions",
    features: [
      { label: "2 custom logo concepts", included: true },
      { label: "High-res PNG & JPG files", included: true },
      { label: "Vector source file (AI/SVG)", included: true },
      { label: "Brand style guide (6 pages)", included: true },
      { label: "Commercial usage rights", included: true },
      { label: "Social media kit", included: false },
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: 290,
    summary: "Three logo systems, brand guide, and priority support.",
    delivery: "2 days delivery",
    revisions: "Unlimited revisions",
    features: [
      { label: "3 custom logo systems", included: true },
      { label: "High-res PNG & JPG files", included: true },
      { label: "Vector source file (AI/SVG)", included: true },
      { label: "Brand style guide (15 pages)", included: true },
      { label: "Commercial usage rights", included: true },
      { label: "Social media kit", included: true },
    ],
  },
];

const addons: Addon[] = [
  {
    id: "addon-24h",
    name: "24-hour delivery",
    description: "Skip the queue with a guaranteed 24-hour turnaround.",
    price: 40,
  },
  {
    id: "addon-social",
    name: "Social media kit",
    description: "Profile + cover designs tailored for your core platforms.",
    price: 25,
  },
  {
    id: "addon-stationery",
    name: "Stationery set",
    description: "Business card, letterhead, and envelope layouts.",
    price: 35,
  },
  {
    id: "addon-revision",
    name: "Extra revision round",
    description: "Add an additional full revision round for peace of mind.",
    price: 10,
  },
];

const faqs: FaqItem[] = [
  {
    id: "faq-1",
    question: "What file formats will I receive?",
    answer:
      "You'll receive print-ready PDFs, high-resolution PNG/JPG exports, and original vector source files (Adobe Illustrator + SVG) depending on the package you select.",
  },
  {
    id: "faq-2",
    question: "Do you include commercial usage rights?",
    answer:
      "Yes, all packages include full commercial usage rights so you can use the logo across digital, print, and merchandise globally without limitations.",
  },
  {
    id: "faq-3",
    question: "How does the revision process work?",
    answer:
      "After delivering the initial concepts, we collaborate through structured revision rounds focusing on typography, iconography, and color adjustments until aligned with your brief.",
  },
  {
    id: "faq-4",
    question: "Can you help file a trademark?",
    answer:
      "Trademark filing requires legal expertise, so I don't file on behalf of clients. I do provide guidance on how to prepare your files for a trademark specialist.",
  },
  {
    id: "faq-5",
    question: "What do you need from me to get started?",
    answer:
      "You'll receive an intake questionnaire covering brand name, tagline, target audience, style inspiration, and any existing assets or mood boards you’d like to share.",
  },
  {
    id: "faq-6",
    question: "Do you offer refunds?",
    answer:
      "If the initial discovery phase reveals we're not the right fit, I'm happy to refund before delivering the first concepts. Once work has begun, partial refunds are assessed case-by-case.",
  },
];

const reviews: Review[] = [
  {
    id: "rev-1",
    name: "Maya L.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80",
    rating: 5,
    country: "United States",
    flag: "🇺🇸",
    date: "Jan 2025",
    dateISO: "2025-01-18",
    text: "Ava captured our brand story beautifully. The logo system feels premium and works across our app, website, and investor decks seamlessly.",
    images: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=400&q=80",
    ],
    helpfulCount: 12,
  },
  {
    id: "rev-2",
    name: "Kenji S.",
    avatar: "https://images.unsplash.com/photo-1529665222841-152a0b5d7c88?auto=format&fit=crop&w=256&q=80",
    rating: 5,
    country: "Japan",
    flag: "🇯🇵",
    date: "Dec 2024",
    dateISO: "2024-12-05",
    text: "Communication was smooth despite the time difference. The brand guide is thorough and gave our devs clear direction.",
    helpfulCount: 8,
  },
  {
    id: "rev-3",
    name: "Sofia R.",
    avatar: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=256&q=80",
    rating: 4,
    country: "Spain",
    flag: "🇪🇸",
    date: "Nov 2024",
    dateISO: "2024-11-14",
    text: "Loved the visual exploration. We requested an extra revision to adjust colors which was handled quickly. Highly recommend the premium package.",
    images: [
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=400&q=80",
    ],
    helpfulCount: 5,
  },
  {
    id: "rev-4",
    name: "Noah E.",
    avatar: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=256&q=80",
    rating: 5,
    country: "Germany",
    flag: "🇩🇪",
    date: "Oct 2024",
    dateISO: "2024-10-22",
    text: "The brand audit session uncovered insights we hadn't considered. Final assets rolled out perfectly across our retail stores.",
    helpfulCount: 6,
  },
  {
    id: "rev-5",
    name: "Chloe M.",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80",
    rating: 5,
    country: "Singapore",
    flag: "🇸🇬",
    date: "Sep 2024",
    dateISO: "2024-09-09",
    text: "Fast response time, crystal clear process, and beautiful results. The social kit add-on was worth every dollar.",
    helpfulCount: 9,
  },
  {
    id: "rev-6",
    name: "Lucas P.",
    avatar: "https://images.unsplash.com/photo-1518674660708-0a5f7e1be9d2?auto=format&fit=crop&w=256&q=80",
    rating: 5,
    country: "Brazil",
    flag: "🇧🇷",
    date: "Aug 2024",
    dateISO: "2024-08-17",
    text: "Easily one of the best freelance experiences we've had. Ava provided several polished directions and helped us choose the perfect mark.",
    helpfulCount: 7,
  },
];

const reviewCountryOptions = [
  "All",
  ...Array.from(new Set(reviews.map((review) => review.country))).sort(),
];

type ReviewFilterKey = "all" | "with-images" | "country" | "recent";

type ReviewSortKey = "newest" | "highest" | "lowest";

const reviewFilterChips: { label: string; value: ReviewFilterKey }[] = [
  { label: "All", value: "all" },
  { label: "With images", value: "with-images" },
  { label: "By country", value: "country" },
  { label: "Recent", value: "recent" },
];

const ratingDistribution = [
  { stars: 5, percentage: 87 },
  { stars: 4, percentage: 10 },
  { stars: 3, percentage: 2 },
  { stars: 2, percentage: 1 },
  { stars: 1, percentage: 0 },
];

const scopeDeliverables = {
  youllGet: [
    "Primary, secondary & icon logos",
    "Editable source files (AI, SVG)",
    "Brand usage guideline PDF",
    "Color palette & typography system",
  ],
  youllNeed: [
    "Brand name & tagline",
    "Vision & tone of voice notes",
    "Inspiration or moodboards",
    "Any existing assets or constraints",
  ],
};

export const ServiceDetailPage = () => {
  const [activeTab, setActiveTab] = useState<"overview" | "portfolio" | "faqs" | "reviews">("overview");
  const [selectedPackageId, setSelectedPackageId] = useState<string>("standard");
  const [selectedExtras, setSelectedExtras] = useState<Record<string, boolean>>({ "addon-social": true });
  const [activeMedia, setActiveMedia] = useState<MediaItem>(mediaItems[0]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isReviewFiltersOpen, setIsReviewFiltersOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxMedia, setLightboxMedia] = useState<MediaItem | null>(null);
  const [reviewFilters, setReviewFilters] = useState({ withImages: false, recent: false });
  const [selectedCountryFilter, setSelectedCountryFilter] = useState<string>("All");
  const [reviewSort, setReviewSort] = useState<ReviewSortKey>("newest");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const updateIsMobile = (mq: MediaQueryListEvent | MediaQueryList) => setIsMobile(mq.matches);
    updateIsMobile(mediaQuery);
    mediaQuery.addEventListener("change", updateIsMobile);
    return () => mediaQuery.removeEventListener("change", updateIsMobile);
  }, []);

  useEffect(() => {
    if (!isCompareOpen && !isLightboxOpen && !isReviewFiltersOpen) {
      return;
    }
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsCompareOpen(false);
        setIsLightboxOpen(false);
        setIsReviewFiltersOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isCompareOpen, isLightboxOpen, isReviewFiltersOpen]);

  const selectedPackage = useMemo(
    () => packages.find((pkg) => pkg.id === selectedPackageId) ?? packages[0],
    [selectedPackageId]
  );

  useEffect(() => {
    setSelectedExtras({ "addon-social": true });
  }, [selectedPackageId]);

  const extrasTotal = useMemo(
    () =>
      Object.entries(selectedExtras)
        .filter(([, value]) => value)
        .reduce((acc, [id]) => {
          const addon = addons.find((item) => item.id === id);
          return addon ? acc + addon.price : acc;
        }, 0),
    [selectedExtras]
  );

  const orderTotal = selectedPackage.price + extrasTotal;

  const filteredReviews = useMemo(() => {
    const monthsAgo = new Date();
    monthsAgo.setMonth(monthsAgo.getMonth() - RECENT_MONTH_WINDOW);

    let result = [...reviews];

    if (reviewFilters.withImages) {
      result = result.filter((review) => (review.images?.length ?? 0) > 0);
    }

    if (reviewFilters.recent) {
      result = result.filter((review) => new Date(review.dateISO) >= monthsAgo);
    }

    if (selectedCountryFilter !== "All") {
      result = result.filter((review) => review.country === selectedCountryFilter);
    }

    const sorted = [...result].sort((a, b) => {
      if (reviewSort === "highest") {
        return b.rating - a.rating;
      }

      if (reviewSort === "lowest") {
        return a.rating - b.rating;
      }

      return new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime();
    });

    return sorted;
  }, [reviewFilters, reviewSort, selectedCountryFilter]);

  const handleAddonToggle = (id: string) => {
    setSelectedExtras((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleReviewFilter = (key: "withImages" | "recent") => {
    setReviewFilters((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const resetReviewFilters = () => {
    setReviewFilters({ withImages: false, recent: false });
    setSelectedCountryFilter("All");
  };

  const handleFilterChipClick = (variant: ReviewFilterKey) => {
    if (variant === "all") {
      resetReviewFilters();
      return;
    }

    if (variant === "country") {
      setIsReviewFiltersOpen(true);
      return;
    }

    if (variant === "with-images") {
      toggleReviewFilter("withImages");
      return;
    }

    toggleReviewFilter("recent");
  };

  const handleCountrySelect = (country: string) => {
    setSelectedCountryFilter(country);
  };

  const handleBackNavigation = useCallback(() => {
    if (window.history.length > 1) {
      window.history.back();
      return;
    }
    window.location.href = "/";
  }, []);

  const handleReportService = useCallback(() => {
    setToastMessage("Thanks, we'll review this service.");
    setTimeout(() => setToastMessage(null), 2800);
  }, []);

  const handleCopyLink = useCallback(() => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        setToastMessage("Link copied to clipboard");
        setTimeout(() => setToastMessage(null), 2800);
      })
      .catch(() => {
        setToastMessage("Unable to copy link");
        setTimeout(() => setToastMessage(null), 2800);
      });
  }, []);

  const openLightbox = (media: MediaItem) => {
    setLightboxMedia(media);
    setIsLightboxOpen(true);
  };

  const handleHelpfulClick = () => {
    setToastMessage("Thanks for your feedback!");
    setTimeout(() => setToastMessage(null), 2200);
  };

  const renderPackageFeatures = (pkg: ServicePackage) => (
    <ul className="package-features">
      {pkg.features.map((feature) => (
        <li
          key={`${pkg.id}-${feature.label}`}
          className={`package-feature ${feature.included ? "" : "package-feature--excluded"}`}
        >
          {feature.label}
        </li>
      ))}
    </ul>
  );

  const packageTabs = (
    <div className="package-tabs" role="tablist" aria-label="Packages">
      {packages.map((pkg) => {
        const isActive = pkg.id === selectedPackageId;
        return (
          <button
            key={pkg.id}
            role="tab"
            aria-selected={isActive}
            aria-controls={`package-panel-${pkg.id}`}
            id={`package-tab-${pkg.id}`}
            className={`package-tab ${isActive ? "package-tab--active" : ""}`}
            onClick={() => setSelectedPackageId(pkg.id)}
          >
            {pkg.name}
          </button>
        );
      })}
    </div>
  );

  const packagePanel = (
    <div
      id={`package-panel-${selectedPackage.id}`}
      role="tabpanel"
      aria-labelledby={`package-tab-${selectedPackage.id}`}
    >
      <div className="package-price">${selectedPackage.price}</div>
      <p className="package-summary">{selectedPackage.summary}</p>
      {renderPackageFeatures(selectedPackage)}
      <div className="package-meta">
        <span>{selectedPackage.delivery}</span>
        <span>{selectedPackage.revisions}</span>
      </div>
    </div>
  );

  const orderCallToAction = (
    <>
      <button className="primary-button" onClick={() => setToastMessage("Package added to cart!")}>
        Continue
      </button>
      <div className="order-summary-note" role="note">
        <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
          <path
            d="M9.99998 18.3334C5.3979 18.3334 1.66665 14.6021 1.66665 10C1.66665 5.39795 5.3979 1.66669 9.99998 1.66669C14.6021 1.66669 18.3333 5.39795 18.3333 10C18.3333 14.6021 14.6021 18.3334 9.99998 18.3334ZM9.16665 13.3334V15H10.8333V13.3334H9.16665ZM9.16665 5.00002V11.6667H10.8333V5.00002H9.16665Z"
            fill="var(--color-primary)"
          />
        </svg>
        Secure payments powered by Kmong Protect
      </div>
      <div className="trust-badges">
        <span className="trust-badge">SSL Secured</span>
        <span className="trust-badge">24/7 Support</span>
        <span className="trust-badge">Buyer Guarantee</span>
      </div>
      <button className="compare-link" onClick={() => setIsCompareOpen(true)}>
        Compare packages
      </button>
    </>
  );

  return (
    <div className="service-detail-page">
      {isMobile && (
        <header className="service-detail__mobile-header" aria-label="Service navigation bar">
          <div className="mobile-header__left">
            <button className="mobile-icon-button" onClick={handleBackNavigation} aria-label="Go back">
              <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M15 18l-6-6 6-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <span className="mobile-header__title" title="I will design a modern minimal logo for your brand">
              I will design a modern minimal logo for your brand
            </span>
          </div>
          <div className="mobile-header__actions">
            <button className="mobile-icon-button" onClick={handleCopyLink} aria-label="Share service">
              <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18 8a3 3 0 1 0-2.82-4H15a3 3 0 0 0 .17 1H9a3 3 0 1 0 0 2h6.17A3 3 0 0 0 18 8Zm-6 8a3 3 0 0 0-5.83 1H6a3 3 0 1 0 0 2h.17A3 3 0 0 0 12 16Zm8 1a3 3 0 0 0-3 3h-1a3 3 0 1 0 0 2h1a3 3 0 1 0 3-5Z" fill="currentColor" />
              </svg>
            </button>
            <button className="mobile-icon-button" onClick={handleReportService} aria-label="Report service">
              <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 21a1 1 0 0 0 1-1V4.83l1.59 1.58a1 1 0 0 0 1.41-1.41l-3.3-3.29a1.49 1.49 0 0 0-.47-.32 1 1 0 0 0-.78 0 1.49 1.49 0 0 0-.47.32l-3.3 3.29A1 1 0 0 0 8.41 6.4L10 4.83V20a1 1 0 0 0 1 1Z" fill="currentColor" />
              </svg>
            </button>
          </div>
        </header>
      )}
      <div className="service-detail__hero">
        <div className="service-detail__container">
          <div className="service-detail__main">
            <nav aria-label="Breadcrumb">
              <ol className="breadcrumb">
                <li>
                  <a href="/">Home</a>
                </li>
                <span className="breadcrumb__separator">›</span>
                <li>
                  <a href="/category/design">Design</a>
                </li>
                <span className="breadcrumb__separator">›</span>
                <li>
                  <a href="/category/design/logo">Logo Design</a>
                </li>
                <span className="breadcrumb__separator">›</span>
                <li aria-current="page">I will design a modern minimal logo for your brand</li>
              </ol>
            </nav>

            <header>
              <h1 className="service-detail__title">I will design a modern minimal logo for your brand</h1>
              <div className="seller-meta" role="group" aria-label="Seller information">
                <img
                  className="seller-meta__avatar"
                  src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80"
                  alt="Ava K. portrait"
                  loading="lazy"
                />
                <div className="seller-meta__info">
                  <span className="seller-meta__name">Ava K.</span>
                  <div className="seller-meta__tags">
                    <span aria-label="Rating 4.9 out of 5 stars">★ 4.9 (128)</span>
                    <span>
                      <span role="img" aria-label="Singapore">
                        🇸🇬
                      </span>{" "}
                      Singapore
                    </span>
                    <span>Languages: EN, KR</span>
                  </div>
                </div>
                <div className="seller-meta__contact">
                  <button className="ghost-button" onClick={() => setToastMessage("Opening contact modal...")}>
                    Contact
                  </button>
                </div>
              </div>
            </header>

            <section className="gallery" aria-label="Service media gallery">
              <div
                className={`gallery__main ${activeMedia.type === "video" ? "gallery__main--video" : ""}`}
                role="button"
                tabIndex={0}
                aria-label="Open media lightbox"
                onClick={() => openLightbox(activeMedia)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    openLightbox(activeMedia);
                  }
                }}
              >
                {activeMedia.type === "image" ? (
                  <img src={activeMedia.src} alt={activeMedia.alt} loading="lazy" />
                ) : (
                  <>
                    <video src={activeMedia.src} poster={activeMedia.poster} controls={false} muted loop />
                    <div className="gallery__play-icon" aria-hidden="true">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="#ffffff">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </>
                )}
              </div>
              <div className="gallery__thumbnails" role="list">
                {mediaItems.map((media) => (
                  <button
                    key={media.id}
                    className={`thumbnail ${media.id === activeMedia.id ? "thumbnail--active" : ""}`}
                    onClick={() => setActiveMedia(media)}
                    role="listitem"
                    aria-label={`Show ${media.alt}`}
                  >
                    {media.type === "image" ? (
                      <img src={media.src} alt="" loading="lazy" />
                    ) : (
                      <video src={media.src} poster={media.poster} muted />
                    )}
                  </button>
                ))}
              </div>
              {isMobile && (
                <div className="gallery__dots" role="tablist" aria-label="Gallery pagination">
                  {mediaItems.map((media, index) => {
                    const isActive = media.id === activeMedia.id;
                    return (
                      <button
                        key={`${media.id}-dot`}
                        className={`gallery-dot ${isActive ? "gallery-dot--active" : ""}`}
                        onClick={() => setActiveMedia(media)}
                        role="tab"
                        aria-selected={isActive}
                        aria-label={`Show media ${index + 1}: ${media.alt}`}
                      >
                        <span className="sr-only">{media.alt}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </section>

            <section className="overview-section" aria-labelledby="overview-title">
              <div className="tabs" role="tablist" aria-label="Service sections">
                {(["overview", "portfolio", "faqs", "reviews"] as const).map((tabKey) => {
                  const labelMap = {
                    overview: "Overview",
                    portfolio: "Portfolio",
                    faqs: "FAQs",
                    reviews: "Reviews",
                  };
                  const isActive = activeTab === tabKey;
                  return (
                    <button
                      key={tabKey}
                      role="tab"
                      id={`tab-${tabKey}`}
                      aria-controls={`panel-${tabKey}`}
                      aria-selected={isActive}
                      className={`tab ${isActive ? "tab--active" : ""}`}
                      onClick={() => setActiveTab(tabKey)}
                    >
                      {labelMap[tabKey]}
                    </button>
                  );
                })}
              </div>

              {activeTab === "overview" && (
                <article id="panel-overview" role="tabpanel" aria-labelledby="tab-overview">
                  <h2 id="overview-title">Overview</h2>
                  <p>{overviewContent.intro}</p>
                  <h3>Deliverables</h3>
                  <ul>
                    {overviewContent.deliverables.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <h3>What&apos;s included</h3>
                  <ul>
                    {overviewContent.inclusions.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <h3>What&apos;s not included</h3>
                  <ul>
                    {overviewContent.exclusions.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              )}

              {activeTab === "portfolio" && (
                <article id="panel-portfolio" role="tabpanel" aria-labelledby="tab-portfolio">
                  <h2>Portfolio</h2>
                  <p>
                    Explore recent identity launches spanning SaaS, hospitality, and retail projects. Each engagement pairs strategy with refined execution to ensure the logo system scales across print and digital touchpoints.
                  </p>
                  <div className="portfolio-grid">
                    {mediaItems.map((media) => (
                      <figure className="portfolio-card" key={`portfolio-${media.id}`}>
                        {media.type === "image" ? (
                          <img src={media.src} alt={media.alt} loading="lazy" />
                        ) : (
                          <video src={media.src} poster={media.poster} muted loop playsInline aria-label={media.alt} />
                        )}
                        <figcaption>{media.alt}</figcaption>
                      </figure>
                    ))}
                  </div>
                </article>
              )}

              {activeTab === "faqs" && (
                <article id="panel-faqs" role="tabpanel" aria-labelledby="tab-faqs">
                  <h2>FAQs</h2>
                  <p>Browse quick answers before diving deeper below.</p>
                  <div className="tab-faqs">
                    {faqs.slice(0, 3).map((faq) => (
                      <div key={`tab-${faq.id}`} className="tab-faqs__item">
                        <h3>{faq.question}</h3>
                        <p>{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </article>
              )}

              {activeTab === "reviews" && (
                <article id="panel-reviews" role="tabpanel" aria-labelledby="tab-reviews">
                  <h2>Reviews</h2>
                  <p>See what recent clients say about working together. Scroll down for in-depth feedback and visual showcases.</p>
                  <ul className="tab-reviews__stats">
                    <li>
                      <strong>4.9</strong>
                      <span>Average rating across {reviews.length}+ projects</span>
                    </li>
                    <li>
                      <strong>87%</strong>
                      <span>Five-star reviews mentioning brand strategy</span>
                    </li>
                    <li>
                      <strong>72 hrs</strong>
                      <span>Typical turnaround for first concepts</span>
                    </li>
                  </ul>
                </article>
              )}
            </section>

            <section className="scope-card" aria-labelledby="scope-title">
              <h2 id="scope-title">Scope &amp; Deliverables</h2>
              <div className="scope-grid">
                <div className="scope-list">
                  <h4>You&apos;ll get</h4>
                  {scopeDeliverables.youllGet.map((item) => (
                    <span key={item} className="scope-item">
                      {item}
                    </span>
                  ))}
                </div>
                <div className="scope-list">
                  <h4>I&apos;ll need from you</h4>
                  {scopeDeliverables.youllNeed.map((item) => (
                    <span key={item} className="scope-item">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            <section className="addons-card" aria-labelledby="addons-title">
              <h2 id="addons-title">Add-ons</h2>
              <p>Enhance your package with optional extras.</p>
              <div className="addons-list">
                {addons.map((addon) => (
                  <label key={addon.id} className="addon-item">
                    <input
                      type="checkbox"
                      checked={!!selectedExtras[addon.id]}
                      onChange={() => handleAddonToggle(addon.id)}
                      aria-label={`${addon.name} for $${addon.price}`}
                    />
                    <div className="addon-description">
                      <h5>{addon.name}</h5>
                      <span>{addon.description}</span>
                    </div>
                    <span>+${addon.price}</span>
                  </label>
                ))}
              </div>
              <div aria-live="polite" style={{ marginTop: 16, color: "var(--color-subtext)" }}>
                Extras total: ${extrasTotal}
              </div>
            </section>

            <section className="faq-section" aria-labelledby="faqs-title">
              <h2 id="faqs-title">Frequently Asked Questions</h2>
              <div className="accordion">
                {faqs.map((faq) => (
                  <details key={faq.id} className="accordion-item">
                    <summary className="accordion-summary">
                      {faq.question}
                      <span aria-hidden="true">+</span>
                    </summary>
                    <div className="accordion-content">{faq.answer}</div>
                  </details>
                ))}
              </div>
            </section>

            <section className="reviews-section" aria-labelledby="reviews-title">
              <h2 id="reviews-title">Client reviews</h2>
              <div className="reviews-summary">
                <div className="reviews-score">
                  <span className="reviews-score__value">4.9</span>
                  <span className="reviews-score__count">128 reviews</span>
                  <div aria-hidden="true" className="reviews-score__stars">
                    {"★★★★★"}
                  </div>
                </div>
                <div className="rating-distribution">
                  {ratingDistribution.map((item) => (
                    <div className="rating-bar" key={item.stars}>
                      <span>{item.stars}★</span>
                      <div className="rating-bar__track">
                        <div className="rating-bar__fill" style={{ width: `${item.percentage}%` }} />
                      </div>
                      <span>{item.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="reviews-controls">
                <div className="reviews-filters" role="group" aria-label="Review filters">
                  {reviewFilterChips.map((chip) => {
                    const isActive =
                      chip.value === "all"
                        ? !reviewFilters.withImages && !reviewFilters.recent && selectedCountryFilter === "All"
                        : chip.value === "with-images"
                        ? reviewFilters.withImages
                        : chip.value === "recent"
                        ? reviewFilters.recent
                        : selectedCountryFilter !== "All";

                    return (
                      <button
                        key={chip.value}
                        className={`chip ${isActive ? "chip--active" : ""}`}
                        type="button"
                        aria-pressed={isActive}
                        onClick={() => handleFilterChipClick(chip.value)}
                      >
                        {chip.label}
                        {chip.value === "country" && selectedCountryFilter !== "All" && (
                          <span className="chip__badge">{selectedCountryFilter}</span>
                        )}
                      </button>
                    );
                  })}
                </div>
                <div className="reviews-controls__right">
                  <button
                    className="filter-trigger"
                    type="button"
                    onClick={() => setIsReviewFiltersOpen(true)}
                    aria-haspopup="dialog"
                    aria-expanded={isReviewFiltersOpen}
                  >
                    Filters
                  </button>
                  <div className="reviews-sort">
                    <label htmlFor="review-sort">Sort by</label>
                    <select
                      id="review-sort"
                      value={reviewSort}
                      onChange={(event) => setReviewSort(event.target.value as ReviewSortKey)}
                    >
                      <option value="newest">Newest</option>
                      <option value="highest">Highest rated</option>
                      <option value="lowest">Lowest rated</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="reviews-list">
                {filteredReviews.length === 0 && (
                  <div className="reviews-empty" role="status">
                    No reviews match your filters yet. Try resetting them to read every testimonial.
                    <button className="text-button" type="button" onClick={resetReviewFilters}>
                      Reset filters
                    </button>
                  </div>
                )}

                {filteredReviews.map((review) => (
                  <article key={review.id} className="review-card">
                    <div className="review-card__header">
                      <img src={review.avatar} alt={`${review.name} avatar`} className="review-card__avatar" loading="lazy" />
                      <div className="review-card__meta">
                        <div className="review-card__title">
                          <span>{review.name}</span>
                          <span aria-label={`${review.rating} star rating`}>{"★".repeat(review.rating)}</span>
                        </div>
                        <div className="review-card__details">
                          <span>
                            <span role="img" aria-label={review.country}>
                              {review.flag}
                            </span>{" "}
                            {review.country}
                          </span>
                          <span>{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="review-card__body">{review.text}</div>
                    {review.images && review.images.length > 0 && (
                      <div className="review-card__media">
                        {review.images.map((image, index) => (
                          <img
                            key={`${review.id}-img-${index}`}
                            src={image}
                            alt={`Review from ${review.name}`}
                            loading="lazy"
                            onClick={() =>
                              openLightbox({
                                id: `${review.id}-img-${index}`,
                                type: "image",
                                src: image,
                                alt: `Review from ${review.name}`,
                              })
                            }
                          />
                        ))}
                      </div>
                    )}
                    <div className="review-card__actions">
                      <button
                        className="text-button"
                        onClick={handleHelpfulClick}
                        aria-label={`Mark review from ${review.name} as helpful`}
                      >
                        👍 Helpful ({review.helpfulCount})
                      </button>
                      <button className="text-button" onClick={handleCopyLink}>
                        Share
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="seller-section" aria-labelledby="seller-title">
              <div className="seller-card">
                <div>
                  <h2 id="seller-title">About the seller</h2>
                  <div className="seller-profile">
                    <img
                      src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80"
                      alt="Ava K."
                      loading="lazy"
                    />
                    <div className="seller-profile__info">
                      <span className="seller-profile__name">Ava Kim</span>
                      <span className="seller-profile__tagline">Brand Identity Designer · 7 years experience</span>
                      <button className="text-button" onClick={() => setToastMessage("Viewing profile...")}>
                        View profile
                      </button>
                    </div>
                    <button className="ghost-button" onClick={() => setToastMessage("Contacting seller...")}>
                      Contact
                    </button>
                  </div>
                </div>
                <div className="seller-stats">
                  <div className="seller-stat">
                    <span className="seller-stat__label">Orders completed</span>
                    <span className="seller-stat__value">540+</span>
                  </div>
                  <div className="seller-stat">
                    <span className="seller-stat__label">Avg. response time</span>
                    <span className="seller-stat__value">1 hour</span>
                  </div>
                  <div className="seller-stat">
                    <span className="seller-stat__label">Member since</span>
                    <span className="seller-stat__value">2019</span>
                  </div>
                  <div className="seller-stat">
                    <span className="seller-stat__label">Languages</span>
                    <span className="seller-stat__value">English, Korean</span>
                  </div>
                </div>
                <div>
                  <h3>Skills</h3>
                  <div className="seller-skills">
                    {["Logo design", "Brand strategy", "Typography", "Naming workshops", "Art direction", "Visual guidelines"].map((skill) => (
                      <span key={skill} className="skill-pill">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="seo-section" aria-labelledby="seo-title">
              <h2 id="seo-title">About this service</h2>
              <p>
                Building brands that resonate across cultures demands clarity, empathy, and a strong visual voice. My process blends strategic workshops with hands-on experimentation to deliver identity systems ready for global rollout. Expect actionable deliverables that empower your marketing, product, and leadership teams to launch confidently.
              </p>
              <details className="seo-section__toggle">
                <summary>Read more</summary>
                <p>
                  Over the past seven years, I&apos;ve partnered with founders, venture-backed startups, and Fortune 500 teams to craft brands that unlock growth. From naming explorations to digital brand systems, every engagement prioritizes collaboration and documentation so your team stays aligned long after launch.
                </p>
              </details>
            </section>
          </div>

          <aside className="service-detail__sidebar" aria-label="Order summary">
            <div className="service-detail__sticky">
              <div className="package-card">
                {packageTabs}
                {packagePanel}
                <div aria-live="polite">Selected extras: ${extrasTotal}</div>
                <div style={{ fontWeight: 600, fontSize: "1.1rem" }}>Total: ${orderTotal}</div>
                {orderCallToAction}
              </div>
            </div>
          </aside>
        </div>
      </div>

      <div className={`bottom-sticky-bar`} aria-hidden={!isMobile}>
        <div className="bottom-sticky-bar__content">
          <div>
            <strong>${orderTotal}</strong>
            <div style={{ fontSize: "0.85rem", color: "var(--color-subtext)" }}>Includes selected extras</div>
          </div>
          <button className="primary-button" onClick={() => setToastMessage("Package added to cart!")}>
            Continue
          </button>
        </div>
      </div>

      {isReviewFiltersOpen && (
        <>
          <div
            className="filters-sheet-backdrop"
            role="presentation"
            onClick={() => setIsReviewFiltersOpen(false)}
          />
          <div
            className="filters-sheet filters-sheet--open"
            role="dialog"
            aria-modal="true"
            aria-label="Review filters"
          >
            <div className="filters-sheet__header">
              <span className="filters-sheet__title">Filter reviews</span>
              <button
                className="filters-sheet__close"
                onClick={() => setIsReviewFiltersOpen(false)}
                aria-label="Close review filters"
                type="button"
              >
                ✕
              </button>
            </div>
            <div className="filters-sheet__section">
              <h4>General</h4>
              <label className="filters-sheet__option">
                <input
                  type="checkbox"
                  checked={reviewFilters.withImages}
                  onChange={() => toggleReviewFilter("withImages")}
                />
                With images
              </label>
              <label className="filters-sheet__option">
                <input
                  type="checkbox"
                  checked={reviewFilters.recent}
                  onChange={() => toggleReviewFilter("recent")}
                />
                Recent
              </label>
            </div>
            <div className="filters-sheet__section">
              <h4>Country</h4>
              <div className="filters-sheet__header-actions">
                <button className="ghost-button" type="button" onClick={() => setIsReviewFiltersOpen(false)}>
                  Close
                </button>
                {selectedCountryFilter !== "All" && (
                  <button type="button" className="text-button" onClick={() => setSelectedCountryFilter("All")}>
                    Clear
                  </button>
                )}
              </div>
              <div className="filters-sheet__options-grid">
                {reviewCountryOptions.map((country) => (
                  <label key={country} className="filters-sheet__option filters-sheet__option--radio">
                    <input
                      type="radio"
                      name="country-filter"
                      value={country}
                      checked={selectedCountryFilter === country}
                      onChange={() => handleCountrySelect(country)}
                    />
                    {country}
                  </label>
                ))}
              </div>
            </div>
            <div className="filters-sheet__actions">
              <button className="ghost-button" type="button" onClick={resetReviewFilters}>
                Reset
              </button>
              <button className="primary-button" type="button" onClick={() => setIsReviewFiltersOpen(false)}>
                Done
              </button>
            </div>
          </div>
        </>
      )}

      {isCompareOpen && (
        <div className="modal-backdrop" role="presentation" onClick={() => setIsCompareOpen(false)}>
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="compare-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal__header">
              <h2 id="compare-modal-title" className="modal__title">
                Compare packages
              </h2>
              <button className="modal__close" onClick={() => setIsCompareOpen(false)} aria-label="Close compare packages">
                ✕
              </button>
            </div>
            <div className="modal__body">
              <table className="compare-table">
                <thead>
                  <tr>
                    <th>Features</th>
                    {packages.map((pkg) => (
                      <th key={`head-${pkg.id}`}>
                        {pkg.name} <div style={{ fontWeight: 500 }}>${pkg.price}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Delivery</td>
                    {packages.map((pkg) => (
                      <td key={`delivery-${pkg.id}`}>{pkg.delivery}</td>
                    ))}
                  </tr>
                  <tr>
                    <td>Revisions</td>
                    {packages.map((pkg) => (
                      <td key={`revisions-${pkg.id}`}>{pkg.revisions}</td>
                    ))}
                  </tr>
                  {["1 custom logo concept", "2 custom logo concepts", "3 custom logo systems"].map((feature, index) => (
                    <tr key={`concepts-${feature}`}>
                      <td>{index === 0 ? "Concepts" : ""}</td>
                      {packages.map((pkg) => (
                        <td key={`${pkg.id}-concepts`}>{pkg.features[index].included ? "✓" : "✕"}</td>
                      ))}
                    </tr>
                  ))}
                  <tr>
                    <td>Source files</td>
                    {packages.map((pkg) => (
                      <td key={`${pkg.id}-source`}>{pkg.features.find((f) => f.label.includes("Vector"))?.included ? "✓" : "✕"}</td>
                    ))}
                  </tr>
                  <tr>
                    <td>Brand guide</td>
                    {packages.map((pkg) => (
                      <td key={`${pkg.id}-guide`}>{pkg.features.find((f) => f.label.toLowerCase().includes("guide"))?.included ? "✓" : "✕"}</td>
                    ))}
                  </tr>
                  <tr>
                    <td>Commercial rights</td>
                    {packages.map((pkg) => (
                      <td key={`${pkg.id}-rights`}>{pkg.features.find((f) => f.label.includes("Commercial"))?.included ? "✓" : "✕"}</td>
                    ))}
                  </tr>
                  <tr>
                    <td>Social media kit</td>
                    {packages.map((pkg) => (
                      <td key={`${pkg.id}-social`}>{pkg.features.find((f) => f.label.includes("Social"))?.included ? "✓" : "✕"}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {isLightboxOpen && (
        <div
          className="lightbox lightbox--open"
          role="dialog"
          aria-modal="true"
          aria-label="Media preview"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div className="lightbox__content" onClick={(event) => event.stopPropagation()}>
            <button className="lightbox__close" onClick={() => setIsLightboxOpen(false)} aria-label="Close lightbox">
              ✕
            </button>
            {lightboxMedia?.type === "image" && lightboxMedia?.src ? (
              <img className="lightbox__img" src={lightboxMedia.src} alt={lightboxMedia.alt} />
            ) : null}
            {lightboxMedia?.type === "video" && lightboxMedia?.src ? (
              <video
                className="lightbox__video"
                src={lightboxMedia.src}
                poster={lightboxMedia.poster}
                controls
                autoPlay
              />
            ) : null}
          </div>
        </div>
      )}

      <div className={`toast ${toastMessage ? "toast--visible" : ""}`} role="status" aria-live="polite">
        {toastMessage}
      </div>
    </div>
  );
};

