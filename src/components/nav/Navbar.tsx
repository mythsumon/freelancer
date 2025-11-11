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
import { useLanguage } from "../../i18n/LanguageProvider";

const DESKTOP_BREAKPOINT = 1024;

const palette = {
  primary: "var(--color-primary)",
  primaryDark: "var(--color-primary-dark)",
  primaryHover: "var(--color-primary-hover)",
  surface: "rgba(255, 255, 255, 0.72)",
  surfaceStrong: "rgba(249, 251, 254, 0.9)",
  glass: "rgba(255, 255, 255, 0.82)",
  border: "var(--color-border)",
  textMain: "var(--color-text-main)",
  textSecondary: "var(--color-text-secondary)",
  divider: "var(--color-divider)",
};

type DrawerNavItem = {
  label: string;
  to?: string;
  children?: Array<{ label: string; to: string }>;
};

type TranslateFn = (text: string) => string;

const drawerNavBaseItems: DrawerNavItem[] = [
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

type LanguageOption = {
  code: string;
  label: string;
  nativeLabel: string;
  flag: string;
};

const languageOptions: LanguageOption[] = [
  { code: "en", label: "English", nativeLabel: "English", flag: "🇺🇸" },
  { code: "ko", label: "Korean", nativeLabel: "한국어", flag: "🇰🇷" },
  { code: "my", label: "Burmese", nativeLabel: "မြန်မာ", flag: "🇲🇲" },
  { code: "mn", label: "Mongolian", nativeLabel: "Монгол", flag: "🇲🇳" },
];

const getLanguageByCode = (code: string) =>
  languageOptions.find((option) => option.code === code) ?? languageOptions[0];

const focusableSelectors = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "textarea:not([disabled])",
  "select:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(", ");

export const Navbar = () => {
  const { language, setLanguage, t } = useLanguage();
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
        language={language}
        onLanguageChange={setLanguage}
        t={t}
      />
    );
  }

  return (
    <>
      <MobileHeader
        onMenuToggle={() => setIsMenuOpen((prev) => !prev)}
        onSearchToggle={() => setIsSearchOpen(true)}
        isMenuOpen={isMenuOpen}
        language={language}
        onLanguageChange={setLanguage}
        t={t}
      />
      <MobileDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        openSection={openSection}
        onToggleSection={(section) =>
          setOpenSection((current) => (current === section ? null : section))
        }
        t={t}
      />
      <MobileSearchSheet
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        language={language}
        t={t}
      />
    </>
  );
};

const DesktopNavbar = ({
  onOpenSearch,
  isSearchOpen,
  closeSearch,
  language,
  onLanguageChange,
  t,
}: {
  onOpenSearch: () => void;
  isSearchOpen: boolean;
  closeSearch: () => void;
  language: string;
  onLanguageChange: (code: string) => void;
  t: TranslateFn;
}) => {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        backgroundColor: palette.surface,
        backdropFilter: "blur(14px)",
        borderBottom: `1px solid ${palette.border}`,
        boxShadow: "0 6px 20px rgba(120, 150, 190, 0.15)",
        padding: "18px 0",
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
          style={{ fontWeight: 700, fontSize: "1.25rem", color: palette.primaryDark }}
        >
          kmong
        </Link>

        <nav
          style={{ display: "flex", alignItems: "center", gap: "24px" }}
          aria-label="Primary"
        >
          <Link
            to="/categories"
            style={{ color: palette.textSecondary, fontWeight: 500, textDecoration: "none" }}
          >
            {t("Categories")}
          </Link>
          <Link
            to="/services"
            style={{ color: palette.textSecondary, fontWeight: 500, textDecoration: "none" }}
          >
            {t("Services")}
          </Link>
          <Link
            to="/for-freelancers"
            style={{ color: palette.textSecondary, fontWeight: 500, textDecoration: "none" }}
          >
            {t("For Freelancers")}
          </Link>
          <Link
            to="/freelancers"
            style={{ color: palette.textSecondary, fontWeight: 500, textDecoration: "none" }}
          >
            {t("Featured Talent")}
          </Link>
          <Link
            to="/pricing"
            style={{ color: palette.textSecondary, fontWeight: 500, textDecoration: "none" }}
          >
            {t("Pricing")}
          </Link>
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <button
            onClick={onOpenSearch}
            style={{
              height: "44px",
              width: "44px",
              borderRadius: "999px",
              border: `1px solid ${palette.border}`,
              background: "rgba(255,255,255,0.6)",
              display: "grid",
              placeItems: "center",
              color: palette.primaryDark,
              cursor: "pointer",
            }}
            aria-label="Open search"
          >
            <span aria-hidden="true">🔍</span>
          </button>
          <LanguageSelector value={language} onChange={onLanguageChange} />
          <Link
            to="/login"
            style={{
              background: "transparent",
              border: `1px solid ${palette.border}`,
              borderRadius: "999px",
              padding: "8px 16px",
              color: palette.primaryDark,
              fontWeight: 600,
              cursor: "pointer",
              textDecoration: "none",
            }}
          >
            {t("Login")}
          </Link>
          <Link
            to="/signup"
            style={{
              background: palette.primary,
              border: "none",
              borderRadius: "999px",
              padding: "8px 24px",
              color: "#ffffff",
              fontWeight: 600,
              cursor: "pointer",
              textDecoration: "none",
            }}
          >
            {t("Sign Up")}
          </Link>
        </div>
      </div>
      <MobileSearchSheet
        isOpen={isSearchOpen}
        onClose={closeSearch}
        language={language}
        t={t}
        isDesktop
      />
    </header>
  );
};

const MobileHeader = ({
  onMenuToggle,
  onSearchToggle,
  isMenuOpen,
  language,
  onLanguageChange,
  t,
}: {
  onMenuToggle: () => void;
  onSearchToggle: () => void;
  isMenuOpen: boolean;
  language: string;
  onLanguageChange: (code: string) => void;
  t: TranslateFn;
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
          style={{ fontWeight: 700, fontSize: "1.2rem", color: palette.primaryDark }}
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
            border: `1px solid ${palette.border}`,
            background: "rgba(255,255,255,0.75)",
            display: "grid",
            placeItems: "center",
            color: palette.primaryDark,
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
          <LanguageSelector value={language} onChange={onLanguageChange} variant="chip" />
          <Link
            to="/login"
            style={{
              borderRadius: "999px",
              border: `1px solid ${palette.border}`,
              padding: "8px 16px",
              background: "rgba(255,255,255,0.78)",
              color: palette.primaryDark,
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            {t("Log in")}
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
              background: palette.primary,
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
  t,
}: {
  isOpen: boolean;
  onClose: () => void;
  openSection: string | null;
  onToggleSection: (section: string) => void;
  t: TranslateFn;
}) => {
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const drawerNavItems = useMemo(
    () =>
      drawerNavBaseItems.map((item) => ({
        ...item,
        label: t(item.label),
        children: item.children?.map((child) => ({
          ...child,
          label: t(child.label),
        })),
      })),
    [t]
  );

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
              background: palette.primary,
              color: "#ffffff",
              fontWeight: 600,
              textDecoration: "none",
              marginBottom: "12px",
            }}
          >
            {t("Sign Up")}
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
              border: `1px solid ${palette.border}`,
              background: palette.surfaceStrong,
              color: palette.primaryDark,
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            {t("Log in")}
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
                          color: palette.textSecondary,
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
            borderTop: `1px solid ${palette.border}`,
            display: "grid",
            gap: "12px",
            background: palette.surfaceStrong,
          }}
        >
          <button
            onClick={() => {
              handleNavigate("/requests/new");
            }}
            style={{
              borderRadius: "16px",
              border: "none",
              background: palette.primary,
              color: "#ffffff",
              fontWeight: 600,
              padding: "16px",
              cursor: "pointer",
              boxShadow: "0 12px 28px rgba(92, 168, 255, 0.28)",
            }}
          >
            {t("Post a Request")}
          </button>
          <button
            onClick={() => {
              handleNavigate("/freelancer/create-service");
            }}
            style={{
              borderRadius: "16px",
              border: `1px solid ${palette.border}`,
              background: "rgba(255,255,255,0.75)",
              color: palette.primaryDark,
              fontWeight: 600,
              padding: "16px",
              cursor: "pointer",
            }}
          >
            {t("Create a Service")}
          </button>
        </div>
      </aside>
    </div>
  );
};

const LanguageSelector = ({
  value,
  onChange,
  variant = "desktop",
}: {
  value: string;
  onChange: (code: string) => void;
  variant?: "desktop" | "chip";
}) => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const activeLanguage = getLanguageByCode(value);

  useEffect(() => {
    if (!open) return;
    const handlePointer = (event: MouseEvent | TouchEvent) => {
      if (
        menuRef.current?.contains(event.target as Node) ||
        triggerRef.current?.contains(event.target as Node)
      ) {
        return;
      }
      setOpen(false);
    };
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", handlePointer);
    document.addEventListener("touchstart", handlePointer);
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("mousedown", handlePointer);
      document.removeEventListener("touchstart", handlePointer);
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [open]);

  const baseButtonStyles =
    variant === "chip"
      ? {
          borderRadius: "999px",
          border: `1px solid ${palette.border}`,
          padding: "8px 14px",
          background: "rgba(255,255,255,0.75)",
          color: palette.primaryDark,
          fontWeight: 600,
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
        }
      : {
          background: "transparent",
          border: `1px solid ${palette.border}`,
          borderRadius: "999px",
          padding: "8px 16px",
          color: palette.primaryDark,
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          gap: "10px",
          fontWeight: 600,
        };

  return (
    <div style={{ position: "relative" }}>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        style={baseButtonStyles}
      >
        <span aria-hidden="true">{activeLanguage.flag}</span>
        <span>{variant === "chip" ? activeLanguage.code.toUpperCase() : activeLanguage.label}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          aria-hidden="true"
          style={{
            transition: "transform 0.2s ease",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </button>
      {open ? (
        <div
          ref={menuRef}
          role="listbox"
          aria-label="Select language"
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            right: 0,
            minWidth: "160px",
            background: "rgba(255, 255, 255, 0.92)",
            borderRadius: "16px",
            border: `1px solid ${palette.border}`,
            boxShadow: "0 24px 48px rgba(120, 150, 190, 0.22)",
            padding: "8px",
            zIndex: 80,
            display: "grid",
            gap: "4px",
          }}
        >
          {languageOptions.map((option) => {
            const isActive = option.code === activeLanguage.code;
            return (
              <button
                key={option.code}
                type="button"
                role="option"
                aria-selected={isActive}
                onClick={() => {
                  onChange(option.code);
                  setOpen(false);
                  triggerRef.current?.focus();
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  borderRadius: "12px",
                  border: "none",
                  padding: "10px 12px",
                  textAlign: "left",
                  cursor: "pointer",
                  background: isActive ? "rgba(92, 168, 255, 0.16)" : "transparent",
                  color: palette.textMain,
                  fontWeight: isActive ? 600 : 500,
                }}
              >
                <span aria-hidden="true" style={{ fontSize: "1.2rem" }}>
                  {option.flag}
                </span>
                <span style={{ display: "grid" }}>
                  <span>{option.label}</span>
                  <span style={{ fontSize: "0.8rem", color: palette.textSecondary }}>{option.nativeLabel}</span>
                </span>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

const MobileSearchSheet = ({
  isOpen,
  onClose,
  isDesktop = false,
  language,
  t,
}: {
  isOpen: boolean;
  onClose: () => void;
  isDesktop?: boolean;
  language?: string;
  t: TranslateFn;
}) => {
  const sheetRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const activeLanguage = useMemo(
    () => getLanguageByCode(language ?? "en"),
    [language]
  );
  const recentSearches = useMemo(
    () => [t("Brand identity"), t("Webflow development"), t("Motion graphics")],
    [t]
  );
  const popularTags = useMemo(
    () => [t("Logo design"), t("Landing page"), t("UI audit"), t("Localization")],
    [t]
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
          paddingTop: "calc(env(safe-area-inset-top, 0px) + 16px)",
          paddingBottom: "24px",
          paddingInline: "24px",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "16px",
            gap: "12px",
          }}
        >
          <span
            style={{
              fontSize: "0.95rem",
              fontWeight: 600,
              color: "#0a0a0a",
            }}
          >
            {t("Search services")}
          </span>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              onClose();
            }}
            style={{
              border: "none",
              background: "transparent",
              color: palette.primaryDark,
              fontWeight: 600,
              fontSize: "0.95rem",
              cursor: "pointer",
            }}
          >
            {t("Cancel")}
          </button>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "12px",
            color: palette.textSecondary,
            fontSize: "0.9rem",
          }}
        >
          <span aria-hidden="true">{activeLanguage.flag}</span>
          <span>
            {activeLanguage.label} · {activeLanguage.nativeLabel}
          </span>
        </div>
        <form onSubmit={handleSubmit} style={{ marginBottom: "24px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "rgba(248, 251, 255, 0.92)",
              border: `1px solid ${palette.border}`,
              borderRadius: "999px",
              padding: "8px 16px",
              gap: "12px",
              boxShadow: "0 14px 32px rgba(120, 150, 190, 0.16)",
            }}
          >
            <span aria-hidden="true" style={{ color: palette.primaryDark }}>
              🔍
            </span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t('Try “Logo design” or “Landing page”')}
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                background: "transparent",
                fontSize: "1rem",
                color: palette.textMain,
              }}
              aria-label="Search services"
            />
            <button
              type="button"
              onClick={() => setQuery("")}
              style={{
                border: "none",
                background: "transparent",
                color: palette.textSecondary,
                cursor: "pointer",
              }}
              >
                {t("Clear")}
            </button>
            <button
              type="submit"
              style={{
                border: "none",
                background: palette.primary,
                color: "#ffffff",
                fontWeight: 600,
                borderRadius: "999px",
                padding: "10px 18px",
                cursor: "pointer",
                boxShadow: "0 12px 28px rgba(92, 168, 255, 0.28)",
              }}
              >
                {t("Search")}
            </button>
          </div>
        </form>

        <section aria-label="Recent searches" style={{ marginBottom: "24px" }}>
          <h3
            style={{
              fontSize: "0.95rem",
              fontWeight: 600,
              color: palette.textSecondary,
              marginBottom: "12px",
            }}
          >
            {t("Recent searches")}
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
                  border: `1px solid ${palette.border}`,
                  background: "rgba(255,255,255,0.78)",
                  padding: "8px 14px",
                  color: palette.textMain,
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
              color: palette.textSecondary,
              marginBottom: "12px",
            }}
          >
            {t("Popular tags")}
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
                  border: `1px solid ${palette.border}`,
                  background: "rgba(210, 229, 248, 0.6)",
                  padding: "8px 14px",
                  color: palette.primaryDark,
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