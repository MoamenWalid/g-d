import { motion, AnimatePresence } from "motion/react";
import { Sun, Moon } from "lucide-react";
import { useHomeTheme } from "../context/HomeThemeContext";

export function HomeThemeToggle() {
  const { theme, toggleTheme } = useHomeTheme();
  const isDark = theme === "dark";

  return (
    <motion.button
      type="button"
      onClick={() => toggleTheme()}
      aria-label={isDark ? "التبديل إلى الوضع الفاتح" : "التبديل إلى الوضع الداكن"}
      whileTap={{ scale: 0.88 }}
      className="relative shrink-0 overflow-hidden rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--home-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--home-shell-bg)]"
      style={{
        width: 60,
        height: 30,
        background: "var(--home-toggle-track-bg)",
        border: "1.5px solid var(--home-toggle-track-border)",
        boxShadow: "var(--home-toggle-track-shadow)",
        cursor: "pointer",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-between px-2"
        aria-hidden
      >
        <Moon
          className="size-3"
          style={{ color: "var(--home-toggle-icon-moon)", opacity: 0.5 }}
        />
        <Sun
          className="size-3 opacity-40"
          style={{ color: "var(--home-toggle-icon-sun)" }}
        />
      </div>

      <motion.div
        className="absolute top-[2px] flex items-center justify-center rounded-full"
        style={{ width: 25, height: 25, left: 2 }}
        animate={{ x: isDark ? 0 : 29 }}
        transition={{ type: "spring", stiffness: 420, damping: 30 }}
      >
        <motion.div
          className="flex size-full items-center justify-center rounded-full shadow-md"
          style={{
            background: "var(--home-toggle-knob-bg)",
            boxShadow: "var(--home-toggle-knob-shadow)",
          }}
          transition={{ duration: 0.35 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isDark ? (
              <motion.span
                key="moon"
                initial={{ rotate: -30, opacity: 0, scale: 0.6 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 30, opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.2 }}
                className="flex"
              >
                <Moon className="size-3 text-white" />
              </motion.span>
            ) : (
              <motion.span
                key="sun"
                initial={{ rotate: 30, opacity: 0, scale: 0.6 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: -30, opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.2 }}
                className="flex"
              >
                <Sun className="size-3 text-white" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </motion.button>
  );
}
