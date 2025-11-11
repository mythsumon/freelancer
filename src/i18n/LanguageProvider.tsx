import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type SupportedLanguage = "en" | "ko" | "my" | "mn";

type TranslationDictionary = Record<string, string>;

const LANGUAGE_STORAGE_KEY = "kmong-language";
const FALLBACK_LANGUAGE: SupportedLanguage = "en";

const translations: Record<SupportedLanguage, TranslationDictionary> = {
  en: {},
  ko: {
    "Home": "홈",
    "Categories": "카테고리",
    "Design": "디자인",
    "Development": "개발",
    "Marketing": "마케팅",
    "Writing": "콘텐츠 작성",
    "Translation": "번역",
    "Video & Animation": "영상 · 애니메이션",
    "Services": "서비스",
    "For Freelancers": "프리랜서 전용",
    "Featured Talent": "추천 인재",
    "Pricing": "요금제",
    "Help Center": "고객센터",
    "Login": "로그인",
    "Sign Up": "회원가입",
    "Log in": "로그인",
    "Post a Request": "요청 등록",
    "Create a Service": "서비스 등록",
    "Search services": "서비스 검색",
    "Cancel": "취소",
    'Try “Logo design” or “Landing page”': '예: "로고 디자인" 또는 "랜딩 페이지"',
    "Clear": "지우기",
    "Search": "검색",
    "Recent searches": "최근 검색어",
    "Brand identity": "브랜드 아이덴티티",
    "Webflow development": "웹플로 개발",
    "Motion graphics": "모션 그래픽",
    "Popular tags": "인기 태그",
    "Logo design": "로고 디자인",
    "Landing page": "랜딩 페이지",
    "UI audit": "UI 진단",
    "Localization": "현지화",
    "All Categories": "전체 카테고리",
    "Find the perfect freelancer for": "당신에게 꼭 맞는 프리랜서를 찾아보세요",
    "the service you’re looking for": "원하는 서비스를 위해",
    "Access a curated community of global talent. Collaborate securely, deliver faster, and scale your business with confidence.":
      "전 세계에서 엄선한 전문가 커뮤니티에 접속하고, 안전하게 협업하며 더 빠르게 결과를 만들고, 사업을 자신 있게 확장하세요.",
    "Verified Sellers": "검증된 판매자",
    "Secure Payments": "안전한 결제",
    "24/7 Support": "24시간 지원",
    "Try ‘Logo design’ or ‘Landing page’": "예: '로고 디자인' 또는 '랜딩 페이지'",
    "Logo Design": "로고 디자인",
    "Website": "웹사이트",
    "Video Edit": "영상 편집",
    "Top Talent": "상위 인재",
    "Hot Deals": "특가 상품",
    "Testimonials": "고객 후기",
    "View Profile": "프로필 보기",
    "Book": "예약하기",
    "-20% today": "오늘 -20%",
    "From": "시작가",
    "View Service": "서비스 보기",
    "Bright grows their product launches": "Bright는 제품 출시를 성장시키고 있습니다",
    "“We scale design deliverables 2x faster with Kmong’s verified freelancers.”": "“크몽의 검증된 프리랜서와 함께 디자인 산출물을 두 배 더 빠르게 확장하고 있어요.”",
    "See Bright case study": "Bright 사례 보기",
    "Bright team collaborating": "협업 중인 Bright 팀",
    "Nexa builds global campaigns": "Nexa는 글로벌 캠페인을 구축합니다",
    "Access on-demand talent across time zones to launch marketing in days, not months.": "몇 달이 아닌 며칠 만에 마케팅을 시작할 수 있도록 시차를 넘나드는 온디맨드 인재를 활용하세요.",
    "Work with campaign pros": "캠페인 전문가와 함께하기",
    "Aurora ships product updates weekly": "Aurora는 매주 제품 업데이트를 출시합니다",
    "Product managers pair with UI engineers and illustrators in a single workspace.": "프로덕트 매니저가 UI 엔지니어와 일러스트레이터와 함께 하나의 워크스페이스에서 협업합니다.",
    "Meet product specialists": "제품 전문가 만나보기",
    "Aurora team brainstorming": "브레인스토밍 중인 Aurora 팀",
    "Velocity onboards multi-lingual support": "Velocity는 다국어 지원팀을 온보딩합니다",
    "Translation gigs keep global customers supported 24/7.": "번역 전문가들이 전 세계 고객을 24시간 지원합니다.",
    "Browse language freelancers": "언어 프리랜서 둘러보기",
    "Orbit produces premium video content": "Orbit은 프리미엄 영상 콘텐츠를 제작합니다",
    "Editing, motion, and sound talent deliver cinematic stories.": "편집, 모션, 사운드 전문가가 영화 같은 스토리를 완성합니다.",
    "Discover video experts": "영상 전문가 알아보기",
    "Orbit studio setup": "Orbit 스튜디오 세팅",
    "Product & Brand Designer": "프로덕트 & 브랜드 디자이너",
    "Full Stack Engineer": "풀스택 엔지니어",
    "Localization Strategist": "현지화 전략가",
    "Product Design": "제품 디자인",
    "Mobile UI": "모바일 UI",
    "Design Systems": "디자인 시스템",
    "Serverless": "서버리스",
    "Ecommerce": "전자상거래",
    "Product Localisation": "제품 현지화",
    "CX Copy": "CX 카피",
    "Support": "고객 지원",
    "Kmong matched us with a product designer who delivered both strategy and craft across time zones.": "크몽 덕분에 전략과 실행을 모두 갖춘 제품 디자이너를 시차에 구애받지 않고 만났어요.",
    "We shipped our marketing automation in half the time thanks to vetted specialists on Kmong.": "검증된 전문가 덕분에 마케팅 자동화를 절반의 시간에 출시했습니다.",
    "Localization and copy were flawless—our NPS lifted 18 points after launch.": "현지화와 카피가 완벽해 출시 후 NPS가 18포인트 상승했습니다.",
    "Read more": "더보기",
    "Branding, UI/UX, graphics & more": "브랜딩, UI/UX, 그래픽 등",
    "Web, mobile, product engineering": "웹, 모바일, 제품 엔지니어링",
    "Growth, social, campaigns & SEO": "성장, SNS, 캠페인 & SEO",
    "Copywriting, blogs, product messaging": "카피라이팅, 블로그, 제품 메시지",
    "Multilingual experts in 30+ languages": "30개 이상 언어의 다국어 전문가",
    "Editing, animation, production": "편집, 애니메이션, 프로덕션",
    "Now available worldwide 🌍": "이제 전 세계에서 이용 가능 🌍",
    "Trusted by over 10,000 clients ✅": "10,000개 이상의 고객사가 신뢰합니다 ✅",
    "Start freelancing today — it’s free 🚀": "지금 바로 프리랜서를 시작하세요 — 무료입니다 🚀",
    "Discover talent by discipline": "분야별로 인재를 찾아보세요",
    "Explore Categories": "카테고리 탐색",
    "View all categories": "모든 카테고리 보기",
    "View All": "전체 보기",
    "Popular Services": "인기 서비스",
    "View all": "모두 보기",
    "How it works": "이용 방법",
    "Search or Post a Request": "검색하거나 요청 등록하기",
    "Find experts or share your project needs with our global community.": "전 세계 커뮤니티에서 전문가를 찾거나 프로젝트 요구 사항을 공유하세요.",
    "Chat & Hire Safely": "안전하게 대화하고 고용하기",
    "Connect directly with freelancers and collaborate securely through our platform.": "프리랜서와 직접 소통하고 플랫폼 내에서 안전하게 협업하세요.",
    "Pay Securely & Get Results": "안전하게 결제하고 결과 받기",
    "Release payments when satisfied and receive professional-quality deliverables.": "만족할 때 결제를 진행하고 전문 품질의 결과물을 받아보세요.",
  },
  my: {},
  mn: {},
};

type LanguageContextValue = {
  language: SupportedLanguage;
  setLanguage: (code: SupportedLanguage | string) => void;
  t: (text: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const resolveLanguage = (code: string | null): SupportedLanguage => {
  if (code === "ko" || code === "my" || code === "mn" || code === "en") {
    return code;
  }
  return FALLBACK_LANGUAGE;
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    if (typeof window === "undefined") {
      return FALLBACK_LANGUAGE;
    }
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return resolveLanguage(stored);
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }, [language]);

  const setLanguage = useCallback((code: SupportedLanguage | string) => {
    setLanguageState(resolveLanguage(code));
  }, []);

  const translationMap = useMemo<TranslationDictionary>(() => {
    return translations[language] ?? translations[FALLBACK_LANGUAGE];
  }, [language]);

  const translate = useCallback(
    (text: string) => {
      if (!text) return text;
      const direct = translationMap[text];
      if (direct) {
        return direct;
      }
      if (language !== FALLBACK_LANGUAGE) {
        const fallback = translations[FALLBACK_LANGUAGE][text];
        if (fallback) {
          return fallback;
        }
      }
      return text;
    },
    [language, translationMap]
  );

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      t: translate,
    }),
    [language, setLanguage, translate]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

