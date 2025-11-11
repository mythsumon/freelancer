import { useEffect, useMemo, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { Link } from "react-router-dom";
import { BannerSlider } from "../../components/data-display/BannerSlider";
import { UniversalSelect } from "../../components/inputs/UniversalSelect";
import { useLanguage } from "../../i18n/LanguageProvider";
import "./HomePage.css";

type CategoryVariant = "standard" | "stack" | "isometric";

interface CategoryItem {
  id: number;
  slug: string;
  title: string;
  icon: string;
  description: string;
}

const Category3DTile = ({ category, isMobile, variant }: { category: CategoryItem; isMobile: boolean; variant: CategoryVariant }) => {
  const cardRef = useRef<HTMLAnchorElement | null>(null);
  const frameRef = useRef<number | null>(null);

  const resetTransforms = () => {
    const card = cardRef.current;
    if (!card) return;
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
    card.style.setProperty("--rotateX", "0deg");
    card.style.setProperty("--rotateY", "0deg");
    card.style.setProperty("--translateX", "0px");
    card.style.setProperty("--translateY", "0px");
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLAnchorElement>) => {
    if (isMobile) return;
    const { clientX, clientY } = event;
    if (frameRef.current) return;

    frameRef.current = window.requestAnimationFrame(() => {
      frameRef.current = null;
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const relativeX = clientX - rect.left;
      const relativeY = clientY - rect.top;
      const percentX = Math.min(Math.max(relativeX / rect.width, 0), 1) * 2 - 1;
      const percentY = Math.min(Math.max(relativeY / rect.height, 0), 1) * 2 - 1;
      const rotateX = Math.max(Math.min(-percentY * 6, 6), -6);
      const rotateY = Math.max(Math.min(percentX * 6, 6), -6);
      const translateX = percentX * 14;
      const translateY = percentY * 14;

      card.style.setProperty("--rotateX", `${rotateX}deg`);
      card.style.setProperty("--rotateY", `${rotateY}deg`);
      card.style.setProperty("--translateX", `${translateX}px`);
      card.style.setProperty("--translateY", `${translateY}px`);
    });
  };

  const handlePointerLeave = () => {
    resetTransforms();
    cardRef.current?.classList.remove("category-3d-card--focus");
  };

  const handleFocus = () => {
    cardRef.current?.classList.add("category-3d-card--focus");
  };

  const handleBlur = () => {
    cardRef.current?.classList.remove("category-3d-card--focus");
    resetTransforms();
  };

  const variantClass = `category-3d-card--${variant}`;

  return (
    <Link
      ref={cardRef}
      to={`/category/${category.slug}`}
      className={`category-3d-card ${variantClass}`}
      aria-label={`Open ${category.title} services`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerUp={handlePointerLeave}
      onPointerCancel={handlePointerLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <span className="category-3d-card__stack" aria-hidden="true" />
      <span className="category-3d-card__iso" aria-hidden="true" />
      <span className="category-3d-card__background" aria-hidden="true" />
      <span className="category-3d-card__glow category-3d-card__glow--tl" aria-hidden="true" />
      <span className="category-3d-card__glow category-3d-card__glow--br" aria-hidden="true" />
      <div className="category-3d-card__icon" aria-hidden="true">
        <span>{category.icon}</span>
      </div>
      <div className="category-3d-card__content">
        <h3 className="category-3d-card__title">{category.title}</h3>
        <p className="category-3d-card__subtitle">{category.description}</p>
      </div>
      <span className="category-3d-card__arrow" aria-hidden="true">
        →
      </span>
    </Link>
  );
};

export const HomePage = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("All");
  const [bannerVisible, setBannerVisible] = useState(true);
  const [bannerIndex, setBannerIndex] = useState(0);
  const [bannerFade, setBannerFade] = useState(true);
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [heroPanelTab, setHeroPanelTab] = useState<"talent" | "deals" | "testimonials">("talent");
  const [heroPanelIndex, setHeroPanelIndex] = useState(0);
  const heroPanelHoverRef = useRef(false);
  const heroPanelFrameRef = useRef<number | null>(null);
  const ctaSectionRef = useRef<HTMLDivElement | null>(null);
  const ctaFrameRef = useRef<number | null>(null);

  const categories: CategoryItem[] = useMemo(
    () => [
      { id: 1, slug: "design", title: t("Design"), icon: "🎨", description: t("Branding, UI/UX, graphics & more") },
      { id: 2, slug: "development", title: t("Development"), icon: "💻", description: t("Web, mobile, product engineering") },
      { id: 3, slug: "marketing", title: t("Marketing"), icon: "📈", description: t("Growth, social, campaigns & SEO") },
      { id: 4, slug: "writing", title: t("Writing"), icon: "✍️", description: t("Copywriting, blogs, product messaging") },
      { id: 5, slug: "translation", title: t("Translation"), icon: "🌐", description: t("Multilingual experts in 30+ languages") },
      { id: 6, slug: "video", title: t("Video"), icon: "🎬", description: t("Editing, animation, production") },
    ],
    [t]
  );

  const heroCategoryOptions = useMemo(
    () => [
      { value: "all", label: t("All Categories") },
      ...categories.map((category) => ({ value: category.slug, label: category.title })),
    ],
    [categories, t]
  );

  const [heroCategory, setHeroCategory] = useState<string | null>("all");

  const services = [
    {
      id: 1,
      slug: "modern-minimal-logo",
      title: "Professional Logo Design",
      seller: "Alex Morgan",
      rating: 4.9,
      price: 75,
      location: "UK",
      image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92eee?auto=format&fit=crop&w=900&q=80"
    },
    {
      id: 2,
      slug: "responsive-website-development",
      title: "Responsive Website Development",
      seller: "Tech Solutions",
      rating: 5.0,
      price: 250,
      location: "US",
      image: "https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=900&q=80"
    },
    {
      id: 3,
      slug: "social-media-marketing-strategy",
      title: "Social Media Marketing Strategy",
      seller: "Marketing Pro",
      rating: 4.8,
      price: 150,
      location: "CA",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80"
    },
    {
      id: 4,
      slug: "english-spanish-translation",
      title: "Document Translation (English-Spanish)",
      seller: "Linguist Expert",
      rating: 4.9,
      price: 25,
      location: "ES",
      image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=900&q=80"
    },
    {
      id: 5,
      slug: "youtube-video-editing",
      title: "Video Editing for YouTube",
      seller: "Creative Studio",
      rating: 4.7,
      price: 120,
      location: "AU",
      image: "https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&fit=crop&w=900&q=80"
    },
    {
      id: 6,
      slug: "seo-optimization-package",
      title: "SEO Optimization Package",
      seller: "Digital Growth",
      rating: 5.0,
      price: 200,
      location: "DE",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=900&q=80"
    },
    {
      id: 7,
      slug: "business-branding-kit",
      title: "Business Branding Kit",
      seller: "Design Master",
      rating: 4.8,
      price: 180,
      location: "FR",
      image: "https://images.unsplash.com/photo-1615937657715-bf25a35f5d4b?auto=format&fit=crop&w=900&q=80"
    },
    {
      id: 8,
      slug: "website-copywriting",
      title: "Copywriting for Websites",
      seller: "Word Smith",
      rating: 4.9,
      price: 90,
      location: "IE",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=900&q=80"
    }
  ];

  const steps = useMemo(
    () => [
      {
        id: 1,
        title: t("Search or Post a Request"),
        description: t("Find experts or share your project needs with our global community."),
      },
      {
        id: 2,
        title: t("Chat & Hire Safely"),
        description: t("Connect directly with freelancers and collaborate securely through our platform."),
      },
      {
        id: 3,
        title: t("Pay Securely & Get Results"),
        description: t("Release payments when satisfied and receive professional-quality deliverables."),
      },
    ],
    [t]
  );

  const freelancers = [
    { id: 1, name: "Sarah Johnson", specialty: "UI/UX Designer", rating: 4.9 },
    { id: 2, name: "Michael Chen", specialty: "Full Stack Developer", rating: 5.0 },
    { id: 3, name: "Emma Rodriguez", specialty: "Content Strategist", rating: 4.8 },
    { id: 4, name: "David Kim", specialty: "Motion Designer", rating: 4.9 },
  ];

  const testimonials = [
    { id: 1, quote: "Kmong helped me find the perfect designer for my startup's branding. The quality exceeded expectations!", author: "James Wilson", role: "Startup Founder", rating: 5.0 },
    { id: 2, quote: "As a freelancer, Kmong has been instrumental in growing my client base globally. Highly recommended!", author: "Priya Sharma", role: "Freelance Developer", rating: 4.9 },
    { id: 3, quote: "The secure payment system gives me peace of mind when working with international talent.", author: "Thomas Anderson", role: "Marketing Director", rating: 4.8 },
  ];

  const blogPosts = [
    { id: 1, title: "10 Tips for Managing Remote Teams", excerpt: "Learn how to effectively lead distributed teams across time zones." },
    { id: 2, title: "The Future of Freelance Work", excerpt: "How the gig economy is evolving in 2023 and beyond." },
    { id: 3, title: "Best Practices for Project Briefs", excerpt: "Create clear briefs that lead to better project outcomes." },
  ];

  const tabs = ["All", "Design", "Development", "Marketing", "Writing", "Translation", "Video"];

  const bannerMessages = useMemo(
    () => [
      t("Now available worldwide 🌍"),
      t("Trusted by over 10,000 clients ✅"),
      t("Start freelancing today — it’s free 🚀"),
    ],
    [t]
  );

  useEffect(() => {
    const updateViewport = () => {
      const width = window.innerWidth;
      if (width <= 600) {
        setViewport("mobile");
      } else if (width <= 1024) {
        setViewport("tablet");
      } else {
        setViewport("desktop");
      }
    };
    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  useEffect(() => {
    if (viewport === "mobile" || !bannerVisible) return;
    let timeoutId: number | undefined;
    const intervalId = window.setInterval(() => {
      setBannerFade(false);
      timeoutId = window.setTimeout(() => {
        setBannerIndex((prev) => (prev + 1) % bannerMessages.length);
        setBannerFade(true);
      }, 250);
    }, 3000);

    return () => {
      window.clearInterval(intervalId);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [viewport, bannerVisible, bannerMessages.length]);

  const bannerItems = useMemo(
    () => [
      {
        id: "bright",
        title: t("Bright grows their product launches"),
        text: t("“We scale design deliverables 2x faster with Kmong’s verified freelancers.”"),
        ctaText: t("See Bright case study"),
        href: "#bright-case",
        imgSrc: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
        imgAlt: t("Bright team collaborating"),
      },
      {
        id: "nexa",
        title: t("Nexa builds global campaigns"),
        text: t("Access on-demand talent across time zones to launch marketing in days, not months."),
        ctaText: t("Work with campaign pros"),
        href: "#nexa",
        background: "linear-gradient(140deg, rgba(0,153,255,0.18), rgba(234,246,255,0.95))",
      },
      {
        id: "aurora",
        title: t("Aurora ships product updates weekly"),
        text: t("Product managers pair with UI engineers and illustrators in a single workspace."),
        ctaText: t("Meet product specialists"),
        href: "#aurora",
        imgSrc: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
        imgAlt: t("Aurora team brainstorming"),
      },
      {
        id: "velocity",
        title: t("Velocity onboards multi-lingual support"),
        text: t("Translation gigs keep global customers supported 24/7."),
        ctaText: t("Browse language freelancers"),
        href: "#velocity",
        background: "linear-gradient(135deg, #EAF6FF 0%, #FFFFFF 60%)",
      },
      {
        id: "orbit",
        title: t("Orbit produces premium video content"),
        text: t("Editing, motion, and sound talent deliver cinematic stories."),
        ctaText: t("Discover video experts"),
        href: "#orbit",
        imgSrc: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80",
        imgAlt: t("Orbit studio setup"),
      },
    ],
    [t]
  );

  const heroTopTalent = useMemo(
    () => [
      {
        id: "talent-ava",
        name: "Ava Kim",
        role: "Product & Brand Designer",
        rating: 4.9,
        location: "Singapore",
        flags: "🇸🇬",
        languages: ["EN", "KR"],
        tags: ["Product Design", "Mobile UI", "Design Systems"],
        avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80",
        samples: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400&q=80",
          "https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=400&q=80",
          "https://images.unsplash.com/photo-1612036782180-6f0b6c8fe14c?auto=format&fit=crop&w=400&q=80",
        ],
      },
      {
        id: "talent-michael",
        name: "Michael Chen",
        role: "Full Stack Engineer",
        rating: 5.0,
        location: "United States",
        flags: "🇺🇸",
        languages: ["EN", "ZH"],
        tags: ["Next.js", "Serverless", "Ecommerce"],
        avatar: "https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?auto=format&fit=crop&w=256&q=80",
        samples: [
          "https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=400&q=80",
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80",
          "https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=400&q=80",
        ],
      },
      {
        id: "talent-sofia",
        name: "Sofia Rossi",
        role: "Localization Strategist",
        rating: 5.0,
        location: "Italy",
        flags: "🇮🇹",
        languages: ["EN", "IT", "ES"],
        tags: ["Product Localisation", "CX Copy", "Support"],
        avatar: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=256&q=80",
        samples: [
          "https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&fit=crop&w=400&q=80",
          "https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=400&q=80",
          "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80",
        ],
      },
    ],
    []
  );

  const heroHotDeals = useMemo(
    () => [
      {
        id: "deal-brand",
        title: "Brand identity + guidelines in 14 days",
        price: 950,
        oldPrice: 1180,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92eee?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "deal-webflow",
        title: "Webflow sales funnel bundle",
        price: 780,
        oldPrice: 960,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "deal-motion",
        title: "60s product explainer video",
        price: 640,
        oldPrice: 820,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=900&q=80",
      },
    ],
    []
  );

  const heroTestimonials = useMemo(
    () => [
      {
        id: "test-1",
        quote: "Kmong matched us with a product designer who delivered both strategy and craft across time zones.",
        reviewer: "Grace Lee",
        company: "Northstar Labs",
        avatar: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=256&q=80",
      },
      {
        id: "test-2",
        quote: "We shipped our marketing automation in half the time thanks to vetted specialists on Kmong.",
        reviewer: "Omar Mbaye",
        company: "AtlasPay",
        avatar: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=256&q=80",
      },
      {
        id: "test-3",
        quote: "Localization and copy were flawless—our NPS lifted 18 points after launch.",
        reviewer: "Mei Chen",
        company: "Lumen Apps",
        avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80",
      },
    ],
    []
  );

  const activeHeroSlides = useMemo(() => {
    if (heroPanelTab === "talent") return heroTopTalent;
    if (heroPanelTab === "deals") return heroHotDeals;
    return heroTestimonials;
  }, [heroPanelTab, heroTopTalent, heroHotDeals, heroTestimonials]);

  useEffect(() => {
    setHeroPanelIndex(0);
  }, [heroPanelTab]);

  useEffect(() => {
    if (activeHeroSlides.length <= 1) return;
    const interval = window.setInterval(() => {
      if (!heroPanelHoverRef.current) {
        setHeroPanelIndex((prev) => (prev + 1) % activeHeroSlides.length);
      }
    }, 4000);
    return () => window.clearInterval(interval);
  }, [activeHeroSlides.length]);

  useEffect(() => {
    const section = ctaSectionRef.current;
    if (!section) return;

    const setTransforms = (
      rotateX: number,
      rotateY: number,
      translateX: number,
      translateY: number
    ) => {
      section.style.setProperty("--cta-rotateX", `${rotateX}deg`);
      section.style.setProperty("--cta-rotateY", `${rotateY}deg`);
      section.style.setProperty("--cta-translateX", `${translateX}px`);
      section.style.setProperty("--cta-translateY", `${translateY}px`);
    };

    const resetTransforms = () => {
      if (ctaFrameRef.current) {
        cancelAnimationFrame(ctaFrameRef.current);
        ctaFrameRef.current = null;
      }
      setTransforms(0, 0, 0, 0);
    };

    resetTransforms();

    if (viewport === "mobile") {
      return resetTransforms;
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (ctaFrameRef.current) return;
      ctaFrameRef.current = window.requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const offsetX = event.clientX - rect.left;
        const offsetY = event.clientY - rect.top;
        const percentX = offsetX / rect.width - 0.5;
        const percentY = offsetY / rect.height - 0.5;
        const rotateX = Math.max(Math.min(-percentY * 6, 3.2), -3.2);
        const rotateY = Math.max(Math.min(percentX * 6, 3.2), -3.2);
        const translateX = percentX * 18;
        const translateY = percentY * 18;
        setTransforms(rotateX, rotateY, translateX, translateY);
        ctaFrameRef.current = null;
      });
    };

    const handlePointerLeave = () => {
      resetTransforms();
    };

    section.addEventListener("pointermove", handlePointerMove);
    section.addEventListener("pointerleave", handlePointerLeave);
    section.addEventListener("pointerup", handlePointerLeave);
    section.addEventListener("pointercancel", handlePointerLeave);

    return () => {
      section.removeEventListener("pointermove", handlePointerMove);
      section.removeEventListener("pointerleave", handlePointerLeave);
      section.removeEventListener("pointerup", handlePointerLeave);
      section.removeEventListener("pointercancel", handlePointerLeave);
      resetTransforms();
    };
  }, [viewport]);

  return (
    <div className="home-page">
      {/* Announcement banner */}
      {bannerVisible && (
        <div style={{ backgroundColor: "#EAF6FF", color: "#0099FF", padding: "8px 0" }}>
          <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.95rem", fontWeight: 600 }}>
            <span
              style={{
                opacity: viewport === "mobile" || !bannerFade ? 0.3 : 1,
                transition: "opacity 0.4s ease",
              }}
            >
              {viewport === "mobile" ? bannerMessages[0] : bannerMessages[bannerIndex]}
            </span>
            {viewport !== "mobile" && (
            <button 
              style={{
                background: "transparent",
                border: "none",
                  color: "#0099FF",
                cursor: "pointer",
                fontSize: "1.2rem",
                  padding: "0 8px",
              }}
                aria-label="Dismiss announcement"
                onClick={() => setBannerVisible(false)}
            >
              ×
            </button>
            )}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-left">
            <div className="hero-heading">
              <h1 className="hero-title">
                {t("Find the perfect freelancer for")}{" "}
                <span className="hero-highlight">{t("the service you’re looking for")}</span>
              </h1>
              <p className="hero-subtitle">
                {t("Access a curated community of global talent. Collaborate securely, deliver faster, and scale your business with confidence.")}
              </p>
            </div>

            <div className="hero-chips">
              {["Verified Sellers", "Secure Payments", "24/7 Support"].map((chip) => (
                <span key={chip} className="hero-chip">
                  {t(chip)}
                </span>
              ))}
            </div>
              
            <div className="hero-actions">
              <form className="hero-search" onSubmit={(event) => event.preventDefault()}>
                <div className="hero-search__select">
                  <UniversalSelect
                    id="hero-category"
                    options={heroCategoryOptions}
                    value={heroCategory ?? undefined}
                    onChange={setHeroCategory}
                    placeholder={t("All Categories")}
                    size="lg"
                  />
                </div>
                  <input
                    type="text"
                    placeholder={t("Try ‘Logo design’ or ‘Landing page’")}
                  className="hero-search__input"
                />
                <button type="submit" className="hero-search__button">
                  {t("Search")}
                  </button>
              </form>

              <div className="hero-tags">
                {["Logo Design", "Website", "Marketing", "Translation", "Video Edit"].map((tag) => (
                  <button key={tag} type="button" className="hero-tag">
                    {t(tag)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="hero-panel" onMouseEnter={() => (heroPanelHoverRef.current = true)} onMouseLeave={() => (heroPanelHoverRef.current = false)}>
            <div className="hero-panel__halo" aria-hidden="true" />
            <div className="hero-panel__header" role="tablist" aria-label="Hero content">
              {[
                { id: "talent", label: t("Top Talent"), icon: "⭐" },
                { id: "deals", label: t("Hot Deals"), icon: "%" },
                { id: "testimonials", label: t("Testimonials"), icon: "💬" },
              ].map(({ id, label, icon }) => (
                    <button 
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={heroPanelTab === id}
                  className={`hero-panel__tab ${heroPanelTab === id ? "is-active" : ""}`}
                  onClick={() => setHeroPanelTab(id as typeof heroPanelTab)}
                >
                  <span aria-hidden="true" className="hero-panel__tab-icon">{icon}</span>
                  {label}
                    </button>
                  ))}
                </div>

            <div className="hero-panel__slider">
              <div className="hero-panel__slides" style={{ transform: `translateX(-${heroPanelIndex * 100}%)` }}>
                {activeHeroSlides.map((item, index) => (
                  <div
                    key={(item as any).id ?? index}
                    className="hero-panel__slide"
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${index + 1} of ${activeHeroSlides.length}`}
                  >
                    {heroPanelTab === "talent" && "name" in item && (
                      <article className="hero-talent-card">
                        <div className="hero-talent-card__row">
                          <div className="hero-talent-card__avatar">
                            <img src={item.avatar} alt={`${item.name} avatar`} loading="lazy" />
              </div>
                          <div>
                            <h3>{item.name}</h3>
                            <p>{t(item.role)}</p>
                            <div className="hero-talent-card__chips">
                              <span>★ {item.rating.toFixed(1)}</span>
                              <span>{item.languages.join(" / ")}</span>
                              <span>{item.flags}</span>
            </div>
                          </div>
                        </div>
                        <div className="hero-talent-card__tags">
                          {item.tags.map((tag) => (
                            <span key={`${item.id}-${tag}`}>{t(tag)}</span>
                          ))}
                        </div>
                        <div className="hero-talent-card__gallery">
                          {item.samples.map((sample, sampleIndex) => (
                            <img key={`${item.id}-sample-${sampleIndex}`} src={sample} alt={`${item.name} sample ${sampleIndex + 1}`} loading="lazy" />
                          ))}
                        </div>
                        <div className="hero-talent-card__actions">
                          <Link to="/freelancer/ava-kim" className="primary-btn" aria-label={`View ${item.name} profile`}>
                            {t("View Profile")}
                          </Link>
                          <button type="button" className="ghost-btn" aria-label={`Book ${item.name}`}>
                            {t("Book")}
                          </button>
                        </div>
                      </article>
                    )}

                    {heroPanelTab === "deals" && "price" in item && (
                      <article className="hero-deal-card">
                        <div className="hero-deal-card__media">
                          <img src={item.image} alt={item.title} loading="lazy" />
                          <span className="hero-deal-card__badge">{t("-20% today")}</span>
                  </div>
                        <div className="hero-deal-card__body">
                          <h3>{t(item.title)}</h3>
                          <div className="hero-deal-card__pricing">
                            <span className="hero-deal-card__price">{t("From")} ${item.price}</span>
                            <s>${item.oldPrice}</s>
                  </div>
                          <div className="hero-deal-card__actions">
                            <Link to="/services" className="primary-btn" aria-label="View service">
                              {t("View Service")}
                            </Link>
                            <button type="button" className="hero-deal-card__save" aria-label="Save deal">
                              ♥
                            </button>
                </div>
                  </div>
                      </article>
                    )}

                    {heroPanelTab === "testimonials" && "quote" in item && (
                      <article className="hero-testimonial-card">
                        <span className="hero-testimonial-card__quote" aria-hidden="true">❝</span>
                        <p className="hero-testimonial-card__text">{t(item.quote)}</p>
                        <div className="hero-testimonial-card__footer">
                          <div className="hero-testimonial-card__reviewer">
                            <img src={item.avatar} alt={item.reviewer} loading="lazy" />
                            <div>
                              <p>{item.reviewer}</p>
                              <span>{t(item.company)}</span>
                  </div>
                </div>
                          <div className="hero-testimonial-card__meta">
                            <span>★★★★★</span>
                            <button type="button" className="text-link">{t("Read more")}</button>
                  </div>
                  </div>
                      </article>
                    )}
                </div>
                ))}
              </div>
            </div>

            {activeHeroSlides.length > 1 && (
              <div className="hero-panel__dots" role="tablist" aria-label="Hero panel slides">
                {activeHeroSlides.map((_, index) => (
                  <button
                    key={`hero-panel-dot-${index}`}
                    type="button"
                    className={`hero-panel__dot ${index === heroPanelIndex ? "is-active" : ""}`}
                    aria-label={`Go to hero slide ${index + 1}`}
                    aria-pressed={index === heroPanelIndex}
                    onClick={() => setHeroPanelIndex(index)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="explore-categories">
        <div className="container">
          <div className="explore-categories__header">
            <div>
              <p className="explore-categories__eyebrow">{t("Discover talent by discipline")}</p>
              <h2 className="explore-categories__title">{t("Explore Categories")}</h2>
            </div>
            <Link to="/categories" className="explore-categories__view-all" aria-label={t("View all categories")}>
              {t("View All")} →
            </Link>
          </div>
          <div className="explore-categories__grid">
            {categories.map((category, index) => {
              const variant: CategoryVariant = index % 3 === 1 ? "stack" : index % 3 === 2 ? "isometric" : "standard";
              return <Category3DTile key={category.id} category={category} isMobile={viewport === "mobile"} variant={variant} />;
            })}
          </div>
        </div>
      </section>

      {/* Popular Services */}
      <section style={{ padding: "64px 0" }}>
        <div className="container">
          <div
            style={{
            display: "flex",
            justifyContent: "space-between",
              alignItems: "center",
            gap: "16px",
              marginBottom: "24px",
              flexWrap: "wrap"
            }}
          >
            <h2
              style={{
              fontSize: "clamp(1.8rem, 3vw, 2.2rem)",
              margin: 0
              }}
            >
              {t("Popular Services")}
            </h2>
            <Link
              to="/services"
              style={{
              display: "inline-flex",
              alignItems: "center",
                gap: "8px",
                padding: "10px 18px",
              borderRadius: "999px",
                border: "1px solid #EAF2F7",
                background: "#FFFFFF",
                color: "#0099FF",
                fontWeight: 600,
                textDecoration: "none",
                boxShadow: "0 6px 18px rgba(0, 153, 255, 0.08)",
                transition: "background 0.2s ease, transform 0.2s ease"
              }}
              onMouseEnter={(event) => {
                event.currentTarget.style.background = "#EAF6FF";
                event.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.background = "#FFFFFF";
                event.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {t("View all")}
              <span aria-hidden="true" style={{ fontSize: "1.1rem" }}>→</span>
            </Link>
              </div>
          
          <div style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            marginBottom: "24px"
          }}>
            {tabs.map((tab) => (
              <button
                key={tab}
                style={{
                  borderRadius: "999px",
                  padding: "0.6rem 1.4rem",
                  border: "1px solid #eaf2f7",
                  background: "#ffffff",
                  color: tab === activeTab ? "#0099ff" : "#707070",
                  cursor: "pointer",
                  transition: "background 0.2s ease, color 0.2s ease, border 0.2s ease",
                  fontWeight: 500
                }}
                onClick={() => setActiveTab(tab)}
              >
                {t(tab)}
              </button>
            ))}
          </div>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px"
          }}>
            {services.map((service) => (
              <Link
                key={service.id} 
                to={`/service/${service.slug}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div
                style={{
                  background: "#ffffff",
                  borderRadius: "16px",
                  boxShadow: "0 10px 24px rgba(0,0,0,0.06)",
                  overflow: "hidden",
                  transition: "transform 0.2s ease, border 0.2s ease, box-shadow 0.2s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.borderColor = "#0099ff";
                  e.currentTarget.style.boxShadow = "0 18px 40px rgba(0, 153, 255, 0.16)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "transparent";
                  e.currentTarget.style.boxShadow = "0 10px 24px rgba(0,0,0,0.06)";
                }}
              >
                  <div style={{ position: "relative", aspectRatio: "16 / 9", overflow: "hidden" }}>
                    <img
                      src={service.image}
                      alt={service.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block"
                      }}
                      loading="lazy"
                    />
                  </div>
                <div style={{
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px"
                }}>
                  <h3 style={{
                    fontSize: "1.05rem",
                    fontWeight: 600,
                    margin: 0,
                    color: "#0a0a0a",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden"
                  }}>
                    {service.title}
                  </h3>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px"
                  }}>
                    <div style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      background: "#eaf6ff",
                      color: "#0099ff",
                      display: "grid",
                      placeItems: "center",
                      fontWeight: 600,
                      fontSize: "0.8rem"
                    }}>
                      {service.seller.charAt(0)}
                    </div>
                    <div style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px"
                    }}>
                      <span style={{
                        fontWeight: 500,
                        fontSize: "0.9rem"
                      }}>
                        {service.seller}
                      </span>
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        fontSize: "0.85rem",
                        color: "#707070"
                      }}>
                        <span style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          fontWeight: 600,
                          color: "#0099ff"
                        }}>
                          <span style={{ color: "#ffb400" }}>★</span> {service.rating}
                        </span>
                        <span style={{
                          fontSize: "0.5rem",
                          verticalAlign: "middle"
                        }}>
                          •
                        </span>
                        <span>{service.location}</span>
                      </div>
                    </div>
                  </div>
                  <div style={{
                    fontWeight: 600,
                    color: "#0a0a0a",
                    marginTop: "auto"
                  }}>
                    {t("From")} ${service.price}
                  </div>
                </div>
              </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: "64px 0" }}>
        <div className="container">
          <h2 style={{
            fontSize: "clamp(1.8rem, 3vw, 2.2rem)",
            marginBottom: "24px",
            textAlign: "center"
          }}>
            {t("How it works")}
          </h2>
          
          <div style={{
            display: "grid",
            gap: "24px",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))"
          }}>
            {steps.map((step) => (
              <div 
                key={step.id} 
                style={{
                  background: "#ffffff",
                  borderRadius: "16px",
                  padding: "40px",
                  boxShadow: "0 10px 24px rgba(0,0,0,0.06)",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "16px"
                }}
              >
                <div style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  background: "#eaf6ff",
                  color: "#0099ff",
                  display: "grid",
                  placeItems: "center",
                  fontWeight: 700,
                  fontSize: "1.25rem"
                }}>
                  {step.id}
                </div>
                <h3 style={{
                  margin: 0,
                  fontSize: "1.25rem"
                }}>
                  {step.title}
                </h3>
                <p style={{
                  margin: 0,
                  color: "#707070"
                }}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Partner Showcase */}
      <section
        aria-label="Sponsored partner banners"
        style={{
          background: "#FFFFFF",
          padding: "64px 0",
        }}
      >
        <div className="container" style={{ maxWidth: "1280px", margin: "0 auto", padding: viewport === "mobile" ? "0 16px" : viewport === "tablet" ? "0 24px" : "0 32px", textAlign: "center" }}>
          <h3 style={{ color: "#444", fontSize: viewport === "mobile" ? "0.95rem" : "1.05rem", fontWeight: 600, marginBottom: "24px", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
            <img
              src="https://dummyimage.com/32x32/EAF6FF/0099FF&text=🌐"
              alt="Global partners"
              style={{ width: "28px", height: "28px", objectFit: "contain", borderRadius: "8px" }}
            />
            Trusted by teams worldwide
          </h3>
          <BannerSlider items={bannerItems} />
          <p style={{
            marginTop: "40px",
            color: "#555",
            fontSize: viewport === "mobile" ? "0.95rem" : "1rem",
            fontWeight: 500
          }}>
            Over <span style={{ color: "#0099FF", fontWeight: 700 }}>12,000+</span> businesses collaborate on <span style={{ fontWeight: 700, color: "#0099FF" }}>Kmong</span>
          </p>
        </div>
      </section>

      {/* Featured Freelancers */}
      <section style={{ padding: "64px 0" }}>
        <div className="container">
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            marginBottom: "24px"
          }}>
          <h2 style={{
            fontSize: "clamp(1.8rem, 3vw, 2.2rem)",
              margin: 0
          }}>
            Featured Freelancers
          </h2>
            <Link
              to="/freelancers"
              style={{
                color: "#0099ff",
                fontWeight: 600,
                textDecoration: "none"
              }}
            >
              See more →
            </Link>
          </div>
          
          <div style={{
            position: "relative",
            overflow: "hidden"
          }}>
            <div style={{
              display: "grid",
              gridAutoFlow: "column",
              gridAutoColumns: "minmax(280px, 1fr)",
              gap: "24px",
              overflowX: "auto",
              paddingBottom: "12px",
              scrollSnapType: "x mandatory",
              scrollbarWidth: "thin"
            }}>
              {freelancers.map((freelancer) => (
                <Link
                  to="/freelancer/ava-kim"
                  key={freelancer.id} 
                  style={{
                    scrollSnapAlign: "start",
                    background: "#ffffff",
                    borderRadius: "16px",
                    boxShadow: "0 10px 24px rgba(0,0,0,0.06)",
                    overflow: "hidden",
                    position: "relative",
                    textDecoration: "none",
                    color: "inherit"
                  }}
                >
                  <div style={{
                    height: "120px",
                    background: "linear-gradient(135deg, #eaf6ff, #fff)",
                    position: "relative"
                  }}></div>
                  <div style={{
                    position: "absolute",
                    top: "70px",
                    left: "24px",
                    width: "72px",
                    height: "72px",
                    borderRadius: "50%",
                    border: "4px solid #ffffff",
                    background: "#eaf6ff",
                    color: "#0099ff",
                    display: "grid",
                    placeItems: "center",
                    fontWeight: 700,
                    fontSize: "1.5rem"
                  }}>
                    {freelancer.name.charAt(0)}
                  </div>
                  <div style={{
                    padding: "calc(24px + 36px) 24px 24px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                    textAlign: "center"
                  }}>
                    <h3 style={{
                      margin: 0,
                      fontSize: "1.25rem"
                    }}>
                      {freelancer.name}
                    </h3>
                    <p style={{
                      margin: 0,
                      color: "#707070",
                      fontSize: "0.95rem"
                    }}>
                      {freelancer.specialty}
                    </p>
                    <div style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      fontWeight: 600,
                      color: "#0099ff",
                      justifyContent: "center"
                    }}>
                      <span style={{ color: "#ffb400" }}>★</span> {freelancer.rating}
                    </div>
                    <span style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "999px",
                      padding: "0.5rem 1.25rem",
                      fontWeight: 500,
                      background: "linear-gradient(140deg, #0099ff 0%, #66c3ff 100%)",
                      color: "#ffffff",
                      alignSelf: "center"
                    }}>
                      View Profile
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: "64px 0" }}>
        <div className="container">
          <div style={{
            display: "grid",
            gap: "24px",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))"
          }}>
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id} 
                style={{
                  background: "#ffffff",
                  borderRadius: "16px",
                  padding: "40px",
                  boxShadow: "0 10px 24px rgba(0,0,0,0.06)"
                }}
              >
                <blockquote style={{
                  margin: 0,
                  fontSize: "1.05rem",
                  lineHeight: "1.5",
                  position: "relative"
                }}>
                  "{testimonial.quote}"
                </blockquote>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  marginTop: "24px"
                }}>
                  <div style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    background: "#eaf6ff",
                    color: "#0099ff",
                    display: "grid",
                    placeItems: "center",
                    fontWeight: 700
                  }}>
                    {testimonial.author.charAt(0)}
                  </div>
                  <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px"
                  }}>
                    <strong style={{
                      margin: 0
                    }}>
                      {testimonial.author}
                    </strong>
                    <p style={{
                      margin: 0,
                      color: "#707070",
                      fontSize: "0.9rem"
                    }}>
                      {testimonial.role}
                    </p>
                    <div style={{
                      display: "flex",
                      gap: "2px"
                    }}>
                      {[...Array(5)].map((_, i) => (
                        <span 
                          key={i} 
                          style={{ 
                            color: i < Math.floor(testimonial.rating) ? "#ffb400" : "#e0e0e0" 
                          }}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section
        ref={ctaSectionRef}
        className={`cta-3d ${viewport === "mobile" ? "cta-3d--mobile" : ""}`}
      >
        <div className="cta-3d__gradient" aria-hidden="true" />
        <div className="cta-3d__gloss" aria-hidden="true" />
        <div className="cta-3d__shimmer" aria-hidden="true" />
        <div className="cta-3d__noise" aria-hidden="true" />
        <div className="cta-3d__blob cta-3d__blob--tl" aria-hidden="true" />
        <div className="cta-3d__blob cta-3d__blob--br" aria-hidden="true" />
        <div className="cta-3d__blob cta-3d__blob--center" aria-hidden="true" />
        <div className="cta-3d__shape cta-3d__shape--pill" aria-hidden="true" />
        <div className="cta-3d__shape cta-3d__shape--disk" aria-hidden="true" />
        <div className="cta-3d__shape cta-3d__shape--card" aria-hidden="true" />
        <div className="container">
          <div className="cta-3d__content">
            <h2 className="cta-3d__title">Start your project today.</h2>
            <div className="cta-3d__actions">
              <Link
                to="/freelancers"
                className="cta-3d__button cta-3d__button--primary"
                aria-label="Find a freelancer"
              >
                Find a Freelancer
              </Link>
              <Link
                to="/for-freelancers"
                className="cta-3d__button cta-3d__button--secondary"
                aria-label="Become a seller"
              >
                Become a Seller
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Blog / Insights */}
      <section style={{ padding: "64px 0" }}>
        <div className="container">
          <h2 style={{
            fontSize: "clamp(1.8rem, 3vw, 2.2rem)",
            marginBottom: "24px"
          }}>
            Latest Insights
          </h2>
          
          <div style={{
            display: "grid",
            gap: "24px",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))"
          }}>
            {blogPosts.map((post) => (
              <div 
                key={post.id} 
                style={{
                  background: "#ffffff",
                  borderRadius: "16px",
                  boxShadow: "0 10px 24px rgba(0,0,0,0.06)",
                  overflow: "hidden"
                }}
              >
                <div style={{
                  height: "160px",
                  background: "linear-gradient(135deg, #eaf6ff, #fff)"
                }}></div>
                <div style={{
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px"
                }}>
                  <h3 style={{
                    margin: 0,
                    fontSize: "1.1rem"
                  }}>
                    {post.title}
                  </h3>
                  <p style={{
                    margin: 0,
                    color: "#707070",
                    fontSize: "0.95rem"
                  }}>
                    {post.excerpt}
                  </p>
                  <button style={{
                    background: "none",
                    border: "none",
                    color: "#0099ff",
                    fontWeight: 500,
                    padding: 0,
                    marginTop: "auto",
                    cursor: "pointer",
                    textAlign: "left",
                    alignSelf: "flex-start"
                  }}>
                    Read more →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section style={{ padding: "64px 0" }}>
        <div className="container">
          <div style={{
            background: "#ffffff",
            borderRadius: "24px",
            border: "1px solid #eaf2f7",
            boxShadow: "0 10px 24px rgba(0,0,0,0.06)",
            padding: "48px",
            display: "grid",
            gap: "16px",
            textAlign: "center",
            position: "relative"
          }}>
            <div style={{
              content: "",
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: "4px",
              background: "#0099ff",
              borderRadius: "24px 0 0 24px"
            }}></div>
            <h2 style={{
              margin: 0,
              fontSize: "1.5rem"
            }}>
              Get tips & updates
            </h2>
            <p style={{
              color: "#707070",
              maxWidth: "500px",
              margin: "0 auto"
            }}>
              Subscribe to our newsletter for the latest news and resources.
            </p>
            
            <form style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
              justifyContent: "center",
              margin: "16px 0"
            }}>
              <input 
                type="email" 
                placeholder="Your email address" 
                style={{
                  flex: "1 1 260px",
                  borderRadius: "16px",
                  border: "1px solid #eaf2f7",
                  padding: "0.85rem 1rem",
                  fontSize: "1rem",
                  maxWidth: "360px"
                }}
                aria-label="Email address"
              />
              <button 
                type="submit" 
                style={{
                  borderRadius: "16px",
                  padding: "0.85rem 1rem",
                  background: "#0099ff",
                  color: "#ffffff",
                  border: "none",
                  fontWeight: 600,
                  cursor: "pointer",
                  maxWidth: "360px"
                }}
              >
                Subscribe
              </button>
            </form>
            
            <p style={{
              color: "#707070",
              fontSize: "0.85rem",
              margin: 0
            }}>
              By subscribing, you agree to our Privacy Policy and consent to receive updates.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};