import {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: (event?: React.MouseEvent<HTMLElement>) => void;
}

// ─── GSAP global declaration ──────────────────────────────────────────────────

declare global {
  interface Window {
    gsap?: {
      to: (target: unknown, vars: Record<string, unknown>) => void;
    };
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getInitialTheme(): Theme {
  try {
    const saved = localStorage.getItem("theme") as Theme | null;
    if (saved === "dark" || saved === "light") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  } catch {
    return "light";
  }
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
  try {
    localStorage.setItem("theme", theme);
  } catch {
    // localStorage may be unavailable in some environments
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
});

// ─── Provider ─────────────────────────────────────────────────────────────────

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const isAnimating = useRef(false);

  // Apply persisted theme on mount — before first paint
  useEffect(() => {
    applyTheme(theme);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleTheme = useCallback(
    (event?: React.MouseEvent<HTMLElement>) => {
      if (isAnimating.current) return;

      const nextTheme: Theme = theme === "light" ? "dark" : "light";
      const x = event ? `${event.clientX}px` : "50%";
      const y = event ? `${event.clientY}px` : "50%";
      const gsap = window.gsap;

      // ── Fallback: no GSAP ───────────────────────────────────────────────
      if (!gsap) {
        document.documentElement.classList.add("theme-transition");
        setTheme(nextTheme);
        applyTheme(nextTheme);
        setTimeout(() => {
          document.documentElement.classList.remove("theme-transition");
        }, 400);
        return;
      }

      isAnimating.current = true;

      // ── Step 1: Enable scoped CSS transitions ───────────────────────────
      document.documentElement.classList.add("theme-transition");

      // ── Step 2: Create overlay fresh — fully removed after animation ────
      const overlay = document.createElement("div");
      Object.assign(overlay.style, {
        position: "fixed",
        inset: "0",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        zIndex: "999999",
        pointerEvents: "none",
        backgroundColor: nextTheme === "dark" ? "#0D0E1A" : "#F8F9FC",
        clipPath: `circle(0% at ${x} ${y})`,
        willChange: "clip-path",
      });
      document.body.appendChild(overlay);

      // ── Step 3: Radial reveal expand ────────────────────────────────────
      gsap.to(overlay, {
        clipPath: `circle(150% at ${x} ${y})`,
        duration: 0.65,
        ease: "power2.inOut",
        onComplete: () => {
          // Theme switch while overlay covers the entire screen — no flicker
          setTheme(nextTheme);
          applyTheme(nextTheme);

          // ── Step 4: Fade out, then fully remove overlay + cleanup ────────
          gsap.to(overlay, {
            opacity: 0,
            duration: 0.28,
            ease: "power1.out",
            onComplete: () => {
              overlay.remove();
              document.documentElement.classList.remove("theme-transition");
              isAnimating.current = false;
            },
          });
        },
      });
    },
    [theme]
  );

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useTheme = () => useContext(ThemeContext);
