import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./BannerSlider.css";

type BannerItem = {
  id: string;
  title: string;
  text: string;
  ctaText: string;
  href: string;
  imgSrc?: string;
  imgAlt?: string;
  background?: string;
};

type BannerSliderProps = {
  items: BannerItem[];
  autoPlayIntervalMs?: number;
};

const clampSlidesPerView = (width: number) => {
  if (width <= 640) return 1;
  if (width <= 1024) return 2;
  return 3;
};

export const BannerSlider = ({ items, autoPlayIntervalMs = 4000 }: BannerSliderProps) => {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(() => (typeof window === "undefined" ? 1 : clampSlidesPerView(window.innerWidth)));
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isHoveringRef = useRef(false);

  const pages = useMemo(() => {
    if (items.length === 0) return [];
    const chunks: BannerItem[][] = [];
    for (let i = 0; i < items.length; i += slidesPerView) {
      chunks.push(items.slice(i, i + slidesPerView));
    }
    return chunks;
  }, [items, slidesPerView]);

  const totalPages = pages.length;

  const goTo = useCallback((index: number) => {
    setCurrentIndex(() => {
      if (totalPages === 0) return 0;
      const next = (index + totalPages) % totalPages;
      return next;
    });
  }, [totalPages]);

  const next = useCallback(() => {
    goTo(currentIndex + 1);
  }, [currentIndex, goTo]);

  const prev = useCallback(() => {
    goTo(currentIndex - 1);
  }, [currentIndex, goTo]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handler = () => {
      setSlidesPerView(clampSlidesPerView(window.innerWidth));
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  useEffect(() => {
    if (currentIndex >= totalPages) {
      setCurrentIndex(0);
    }
  }, [totalPages, currentIndex]);

  useEffect(() => {
    if (autoPlayIntervalMs <= 0 || totalPages <= 1) return;
    intervalRef.current && clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (!isHoveringRef.current) {
        setCurrentIndex((prev) => (prev + 1) % totalPages);
      }
    }, autoPlayIntervalMs);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [autoPlayIntervalMs, totalPages]);

  if (items.length === 0) {
    return null;
  }

  return (
    <div
      className="banner-slider"
      onMouseEnter={() => {
        isHoveringRef.current = true;
      }}
      onMouseLeave={() => {
        isHoveringRef.current = false;
      }}
      onPointerDown={(event) => {
        const startX = event.clientX;
        const handlePointerUp = (upEvent: PointerEvent) => {
          const delta = upEvent.clientX - startX;
          if (Math.abs(delta) > 40) {
            if (delta < 0) {
              goTo(currentIndex + 1);
            } else {
              goTo(currentIndex - 1);
            }
          }
          window.removeEventListener("pointerup", handlePointerUp);
        };
        window.addEventListener("pointerup", handlePointerUp);
      }}
    >
      <div className="banner-slider__viewport" ref={sliderRef}>
        <div
          className="banner-slider__track"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {pages.map((page, pageIndex) => (
            <div key={`page-${pageIndex}`} className="banner-slider__page" aria-hidden={pageIndex !== currentIndex}>
              <div className="banner-slider__grid">
                {page.map((item) => (
                  <article key={item.id} className="banner-card" style={{ background: item.background ?? "linear-gradient(135deg, #EAF6FF, #FFFFFF)" }}>
                    {item.imgSrc ? (
                      <img src={item.imgSrc} alt={item.imgAlt ?? item.title} loading="lazy" />
                    ) : null}
                    <div className="banner-card__content">
                      <h4>{item.title}</h4>
                      <p>{item.text}</p>
                      <a href={item.href} className="banner-card__cta" aria-label={item.ctaText}>
                        {item.ctaText}
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        className="banner-slider__control banner-slider__control--prev"
        onClick={prev}
        aria-label="Previous banner"
      >
        ◀
      </button>
      <button
        type="button"
        className="banner-slider__control banner-slider__control--next"
        onClick={next}
        aria-label="Next banner"
      >
        ▶
      </button>

      <div className="banner-slider__dots" role="tablist" aria-label="Banner pagination">
        {pages.map((_, index) => (
          <button
            key={`dot-${index}`}
            type="button"
            className={`banner-slider__dot ${index === currentIndex ? "banner-slider__dot--active" : ""}`}
            aria-label={`Go to banner ${index + 1}`}
            aria-pressed={index === currentIndex}
            onClick={() => goTo(index)}
          />
        ))}
      </div>
    </div>
  );
};
