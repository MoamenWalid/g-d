import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "gahmi-theme";
const LEGACY_STORAGE_KEY = "gahmi-home-theme";

export type HomeColorScheme = "light" | "dark";

type HomeThemeContextValue = {
  theme: HomeColorScheme;
  setTheme: (t: HomeColorScheme) => void;
  toggleTheme: () => void;
  portalRef: React.RefObject<HTMLDivElement | null>;
};

const HomeThemeContext = createContext<HomeThemeContextValue | null>(null);

function readStoredTheme(): HomeColorScheme | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === "light" || v === "dark") return v;
    const legacy = localStorage.getItem(LEGACY_STORAGE_KEY);
    if (legacy === "light" || legacy === "dark") {
      localStorage.setItem(STORAGE_KEY, legacy);
      return legacy;
    }
  } catch {
    /* ignore */
  }
  return null;
}

function getSystemTheme(): HomeColorScheme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getInitialTheme(): HomeColorScheme {
  return readStoredTheme() ?? getSystemTheme();
}

export function HomeThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<HomeColorScheme>(getInitialTheme);
  const portalRef = useRef<HTMLDivElement | null>(null);

  const setTheme = useCallback((t: HomeColorScheme) => {
    setThemeState(t);
    try {
      localStorage.setItem(STORAGE_KEY, t);
    } catch {
      /* ignore */
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next: HomeColorScheme = prev === "dark" ? "light" : "dark";
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (readStoredTheme() != null) return;
      setThemeState(mq.matches ? "dark" : "light");
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  /** Sync shadcn/Radix portaled UI (Select, Sheet, etc.) with app theme */
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
    return () => {
      document.documentElement.classList.remove("dark");
      document.documentElement.style.removeProperty("color-scheme");
    };
  }, [theme]);

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme, portalRef }),
    [theme, setTheme, toggleTheme],
  );

  return (
    <HomeThemeContext.Provider value={value}>
      <div
        data-app
        data-app-theme={theme}
        className="home-theme-scope min-h-screen"
        style={{
          fontFamily: "'Cairo', sans-serif",
          backgroundColor: "var(--home-shell-bg)",
          color: "var(--home-text-primary)",
        }}
      >
        {children}
        <div
          ref={portalRef}
          id="app-theme-portal-root"
          className="pointer-events-none fixed inset-0 z-[2147483000]"
          aria-hidden
        />
      </div>
    </HomeThemeContext.Provider>
  );
}

export function useHomeTheme() {
  const ctx = useContext(HomeThemeContext);
  if (!ctx) {
    throw new Error("useHomeTheme must be used within HomeThemeProvider");
  }
  return ctx;
}

export function useHomeThemeOptional() {
  return useContext(HomeThemeContext);
}
