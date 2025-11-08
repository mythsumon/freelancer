import { Link, useNavigate } from "react-router-dom";
import type { FormEvent, MouseEvent as ReactMouseEvent } from "react";
import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const DESKTOP_BREAKPOINT = 1024;

type DrawerNavItem = {
  label: string;
  to?: string;
  children?: Array<{ label: string; to: string }>;
};

const drawerNavItems: DrawerNavItem[] = [
  { label: "Home", to: "/" },
  {
    label: "Categories",
    children: [
      { label: "Design", to: "/category/design" },
      { label: "Development", to: "/category/development" },
      { label: "Marketing", to: "/category/marketing" },
      { label: "Writing", to: "/category/writing" },
      { label: "Translation", to: "/category/translation" },
      { label: "Video & Animation", to: "/category/video" },
    ],
  },
  { label: "Services", to: "/services" },
  { label: "For Freelancers", to: "/for-freelancers" },
  { label: "Featured Talent", to: "/freelancers" },
  { label: "Pricing", to: "/pricing" },
  { label: "Help Center", to: "/support" },
];

const focusableSelectors = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "textarea:not([disabled])",
  "select:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(", ");

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === "undefined") {
      return true;
    }
    return window.innerWidth >= DESKTOP_BREAKPOINT;
  });

  useEffect(() => {
    const handleResize = () => {
      const nextIsDesktop = window.innerWidth >= DESKTOP_BREAKPOINT;
      setIsDesktop(nextIsDesktop);
      if (nextIsDesktop) {
        setIsMenuOpen(false);
        setIsSearchOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const lockScroll = isMenuOpen || isSearchOpen;
  useEffect(() => {
    if (lockScroll) {
      const previous = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previous;
      };
    }
    return;
  }, [lockScroll]);

  if (isDesktop) {
    return (
      <DesktopNavbar
        onOpenSearch={() => setIsSearchOpen(true)}
        isSearchOpen={isSearchOpen}
        closeSearch={() => setIsSearchOpen(false)}
      />
    );
  }

  return (
    <>
      <MobileHeader
        onMenuToggle={() => setIsMenuOpen((prev) => !prev)}
        onSearchToggle={() => setIsSearchOpen(true)}
        isMenuOpen={isMenuOpen}
      />
      <MobileDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        openSection={openSection}
        onToggleSection={(section) =>
          setOpenSection((current) => (current === section ? null : section))
        }
      />
      <MobileSearchSheet
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
};

const DesktopNavbar = ({
  onOpenSearch,
  isSearchOpen,
  closeSearch,
}: {
  onOpenSearch: () => void;
  isSearchOpen: boolean;
  closeSearch: () => void;
}) => {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(0, 153, 255, 0.1)",
        padding: "16px 0",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "32px",
        }}
      >
        <Link
          to="/"
          style={{ fontWeight: 700, fontSize: "1.25rem", color: "#0099ff" }}
        >
          kmong
        </Link>

        <nav
          style={{ display: "flex", alignItems: "center", gap: "24px" }}
          aria-label="Primary"
        >
          <Link
            to="/categories"
            style={{ color: "#707070", fontWeight: 500, textDecoration: "none" }}
          >
            Categories
          </Link>
          <Link
            to="/services"
            style={{ color: "#707070", fontWeight: 500, textDecoration: "none" }}
          >
            Services
          </Link>
          <Link
            to="/for-freelancers"
            style={{ color: "#707070", fontWeight: 500, textDecoration: "none" }}
          >
            For Freelancers
          </Link>
          <Link
            to="/freelancers"
            style={{ color: "#707070", fontWeight: 500, textDecoration: "none" }}
          >
            Featured Talent
          </Link>
          <Link
            to="/pricing"
            style={{ color: "#707070", fontWeight: 500, textDecoration: "none" }}
          >
            Pricing
          </Link>
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <button
            onClick={onOpenSearch}
            style={{
              height: "44px",
              width: "44px",
              borderRadius: "999px",
              border: "1px solid #eaf2f7",
              background: "transparent",
              display: "grid",
              placeItems: "center",
              color: "#0099ff",
              cursor: "pointer",
            }}
            aria-label="Open search"
          >
            <span aria-hidden="true">🔍</span>
          </button>
          <button
            style={{
              background: "transparent",
              border: "1px solid #eaf2f7",
              borderRadius: "999px",
              padding: "8px 16px",
              color: "#0099ff",
              cursor: "pointer",
            }}
            aria-label="Select language"
          >
            EN ▼
          </button>
          <Link
            to="/login"
            style={{
              background: "transparent",
              border: "1px solid #eaf2f7",
              borderRadius: "999px",
              padding: "8px 16px",
              color: "#0099ff",
              fontWeight: 600,
              cursor: "pointer",
              textDecoration: "none",
            }}
          >
            Login
          </Link>
          <Link
            to="/signup"
            style={{
              background: "#0099ff",
              border: "none",
              borderRadius: "999px",
              padding: "8px 24px",
              color: "#ffffff",
              fontWeight: 600,
              cursor: "pointer",
              textDecoration: "none",
            }}
          >
            Sign Up
          </Link>
        </div>
      </div>
      <MobileSearchSheet
        isOpen={isSearchOpen}
        onClose={closeSearch}
        isDesktop
      />
    </header>
  );
};

const MobileHeader = ({
  onMenuToggle,
  onSearchToggle,
  isMenuOpen,
}: {
  onMenuToggle: () => void;
  onSearchToggle: () => void;
  isMenuOpen: boolean;
}) => {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        background: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(0,153,255,0.12)",
        paddingTop: "calc(env(safe-area-inset-top, 0px) + 8px)",
        paddingBottom: "8px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 16px",
          height: "56px",
          gap: "12px",
        }}
      >
        <Link
          to="/"
          style={{ fontWeight: 700, fontSize: "1.2rem", color: "#0099ff" }}
          aria-label="Go to homepage"
        >
          kmong
        </Link>

        <button
          onClick={onSearchToggle}
          style={{
            height: "44px",
            width: "44px",
            borderRadius: "22px",
            border: "1px solid #eaf2f7",
            background: "#ffffff",
            display: "grid",
            placeItems: "center",
            color: "#0099ff",
            cursor: "pointer",
          }}
          aria-label="Open search"
        >
          <span aria-hidden="true">🔍</span>
        </button>

        <div
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
          aria-label="Actions"
        >
          <button
            style={{
              borderRadius: "999px",
              border: "1px solid #eaf2f7",
              padding: "8px 14px",
              background: "#ffffff",
              color: "#0099ff",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            EN ▼
          </button>
          <Link
            to="/login"
            style={{
              borderRadius: "999px",
              border: "1px solid #eaf2f7",
              padding: "8px 16px",
              background: "#ffffff",
              color: "#0099ff",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Log in
          </Link>
          <button
            onClick={onMenuToggle}
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation menu"
            style={{
              height: "44px",
              width: "44px",
              borderRadius: "22px",
              border: "none",
              background: "#0099ff",
              color: "#ffffff",
              fontSize: "20px",
              cursor: "pointer",
              transition: "transform 0.2s ease",
            }}
          >
            <span aria-hidden="true">{isMenuOpen ? "×" : "☰"}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

const MobileDrawer = ({
  isOpen,
  onClose,
  openSection,
  onToggleSection,
}: {
  isOpen: boolean;
  onClose: () => void;
  openSection: string | null;
  onToggleSection: (section: string) => void;
}) => {
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) return;
    const drawerEl = drawerRef.current;
    if (!drawerEl) return;
    const focusable = drawerEl.querySelectorAll<HTMLElement>(focusableSelectors);
    focusable[0]?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
      if (event.key === "Tab" && focusable.length > 0) {
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey) {
          if (document.activeElement === first) {
            event.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            event.preventDefault();
            first.focus();
          }
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleOverlayClick = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (event.target === overlayRef.current) {
      onClose();
    }
  };

  const handleNavigate = useCallback(
    (to?: string) => {
      if (!to) return;
      navigate(to);
      onClose();
    },
    [navigate, onClose]
  );

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      style={{
        position: "fixed",
        inset: 0,
        background: isOpen ? "rgba(10, 10, 10, 0.4)" : "transparent",
        transition: "background 150ms ease",
        pointerEvents: isOpen ? "auto" : "none",
        zIndex: 50,
      }}
      aria-hidden={!isOpen}
    >
      <aside
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width: "88vw",
          maxWidth: "420px",
          background: "#ffffff",
          borderTopLeftRadius: "24px",
          borderBottomLeftRadius: "24px",
          boxShadow: "0 20px 48px rgba(0,0,0,0.18)",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 220ms ease-out",
          display: "flex",
          flexDirection: "column",
          paddingTop: "calc(env(safe-area-inset-top, 0px) + 24px)",
        }}
      >
        <div style={{ padding: "0 24px 16px" }}>
          <Link
            to="/signup"
            onClick={() => onClose()}
            style={{
              display: "block",
              width: "100%",
              textAlign: "center",
              padding: "14px 18px",
              borderRadius: "999px",
              background: "#0099ff",
              color: "#ffffff",
              fontWeight: 600,
              textDecoration: "none",
              marginBottom: "12px",
            }}
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            onClick={() => onClose()}
            style={{
              display: "block",
              width: "100%",
              textAlign: "center",
              padding: "14px 18px",
              borderRadius: "999px",
              border: "1px solid #eaf2f7",
              background: "#ffffff",
              color: "#0099ff",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Log in
          </Link>
        </div>

        <nav
          aria-label="Mobile navigation links"
          style={{
            overflowY: "auto",
            flex: 1,
            padding: "8px 0 24px",
          }}
        >
          {drawerNavItems.map((item) => {
            const hasChildren = Boolean(item.children?.length);
            const isOpenSection = openSection === item.label;
            return (
              <Fragment key={item.label}>
                <button
                  onClick={() =>
                    hasChildren
                      ? onToggleSection(item.label)
                      : handleNavigate(item.to)
                  }
                  aria-expanded={hasChildren ? isOpenSection : undefined}
                  style={{
                    width: "100%",
                    border: "none",
                    background: "transparent",
                    textAlign: "left",
                    padding: "14px 24px",
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: "#0a0a0a",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    cursor: "pointer",
                  }}
                >
                  <span>{item.label}</span>
                  {hasChildren ? (
                    <span
                      aria-hidden="true"
                      style={{
                        display: "inline-block",
                        transform: isOpenSection
                          ? "rotate(90deg)"
                          : "rotate(0deg)",
                        transition: "transform 180ms ease",
                      }}
                    >
                      ▸
                    </span>
                  ) : (
                    <span aria-hidden="true">›</span>
                  )}
                </button>
                {hasChildren && (
                  <div
                    style={{
                      maxHeight: isOpenSection ? "500px" : "0",
                      overflow: "hidden",
                      transition: "max-height 240ms ease",
                    }}
                  >
                    {item.children?.map((child) => (
                      <button
                        key={child.label}
                        onClick={() => handleNavigate(child.to)}
                        style={{
                          width: "100%",
                          border: "none",
                          background: "transparent",
                          textAlign: "left",
                          padding: "12px 40px",
                          fontSize: "0.95rem",
                          color: "#5e6a74",
                          cursor: "pointer",
                        }}
                      >
                        {child.label}
                      </button>
                    ))}
                  </div>
                )}
              </Fragment>
            );
          })}
        </nav>

        <div
          style={{
            padding: "16px 24px calc(env(safe-area-inset-bottom, 0px) + 24px)",
            borderTop: "1px solid #eaf2f7",
            display: "grid",
            gap: "12px",
            background: "#ffffff",
          }}
        >
          <button
            onClick={() => {
              handleNavigate("/requests/new");
            }}
            style={{
              borderRadius: "16px",
              border: "1px solid #0099ff",
              background: "#0099ff",
              color: "#ffffff",
              fontWeight: 600,
              padding: "16px",
            }}
          >
            Post a Request
          </button>
          <button
            onClick={() => {
              handleNavigate("/freelancer/create-service");
            }}
            style={{
              borderRadius: "16px",
              border: "1px solid #eaf2f7",
              background: "#ffffff",
              color: "#0099ff",
              fontWeight: 600,
              padding: "16px",
            }}
          >
            Create a Service
          </button>
        </div>
      </aside>
    </div>
  );
};

const MobileSearchSheet = ({
  isOpen,
  onClose,
  isDesktop = false,
}: {
  isOpen: boolean;
  onClose: () => void;
  isDesktop?: boolean;
}) => {
  const sheetRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const recentSearches = useMemo(
    () => ["Brand identity", "Webflow development", "Motion graphics"],
    []
  );
  const popularTags = useMemo(
    () => ["Logo design", "Landing page", "UI audit", "Localization"],
    []
  );

  useEffect(() => {
    if (!isOpen) return;
    const firstFocusable = sheetRef.current?.querySelector<HTMLElement>(
      focusableSelectors
    );
    firstFocusable?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
      if (event.key === "Tab") {
        const focusable = sheetRef.current?.querySelectorAll<HTMLElement>(
          focusableSelectors
        );
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey) {
          if (document.activeElement === first) {
            event.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            event.preventDefault();
            first.focus();
          }
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    navigate(`/search?q=${encodeURIComponent(trimmed)}`);
    onClose();
    setQuery("");
  };

  return (
    <div
      aria-hidden={!isOpen}
      style={{
        position: "fixed",
        inset: 0,
        background: isOpen ? "rgba(10, 10, 10, 0.4)" : "transparent",
        transition: "background 150ms ease",
        pointerEvents: isOpen ? "auto" : "none",
        zIndex: isDesktop ? 30 : 60,
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-label="Search"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          background: "#ffffff",
          borderBottomLeftRadius: isDesktop ? "24px" : "20px",
          borderBottomRightRadius: isDesktop ? "24px" : "20px",
          transform: isOpen ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 220ms ease-out",
          paddingTop: "calc(env(safe-area-inset-top, 0px) + 24px)",
          paddingBottom: "24px",
          paddingInline: "24px",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <form onSubmit={handleSubmit} style={{ marginBottom: "24px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "#f7fbff",
              border: "1px solid #eaf2f7",
              borderRadius: "999px",
              padding: "8px 16px",
              gap: "12px",
            }}
          >
            <span aria-hidden="true" style={{ color: "#0099ff" }}>
              🔍
            </span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder='Try “Logo design” or “Landing page”'
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                background: "transparent",
                fontSize: "1rem",
                color: "#0a0a0a",
              }}
              aria-label="Search services"
            />
            <button
              type="button"
              onClick={() => setQuery("")}
              style={{
                border: "none",
                background: "transparent",
                color: "#707070",
                cursor: "pointer",
              }}
            >
              Clear
            </button>
            <button
              type="submit"
              style={{
                border: "none",
                background: "#0099ff",
                color: "#ffffff",
                fontWeight: 600,
                borderRadius: "999px",
                padding: "10px 18px",
                cursor: "pointer",
              }}
            >
              Search
            </button>
          </div>
        </form>

        <section aria-label="Recent searches" style={{ marginBottom: "24px" }}>
          <h3
            style={{
              fontSize: "0.95rem",
              fontWeight: 600,
              color: "#707070",
              marginBottom: "12px",
            }}
          >
            Recent searches
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
            {recentSearches.map((item) => (
              <button
                key={item}
                onClick={() => {
                  navigate(`/search?q=${encodeURIComponent(item)}`);
                  onClose();
                }}
                style={{
                  borderRadius: "999px",
                  border: "1px solid #eaf2f7",
                  background: "#ffffff",
                  padding: "8px 14px",
                  color: "#0a0a0a",
                  cursor: "pointer",
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        <section aria-label="Popular tags">
          <h3
            style={{
              fontSize: "0.95rem",
              fontWeight: 600,
              color: "#707070",
              marginBottom: "12px",
            }}
          >
            Popular tags
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
            {popularTags.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  navigate(`/search?q=${encodeURIComponent(tag)}`);
                  onClose();
                }}
                style={{
                  borderRadius: "999px",
                  border: "1px solid #eaf2f7",
                  background: "#eaf6ff",
                  padding: "8px 14px",
                  color: "#0099ff",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                #{tag}
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};