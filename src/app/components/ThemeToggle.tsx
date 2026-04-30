import { motion, AnimatePresence } from "motion/react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.button
      onClick={(e) => toggleTheme(e)}
      aria-label={isDark ? "التبديل إلى الوضع الفاتح" : "التبديل إلى الوضع الداكن"}
      whileTap={{ scale: 0.88 }}
      className="relative flex-shrink-0 rounded-full overflow-hidden focus:outline-none"
      style={{
        width: 60,
        height: 30,
        background: isDark
          ? "linear-gradient(135deg, #1e1e38 0%, #2d1b69 100%)"
          : "linear-gradient(135deg, #f0edff 0%, #e8fffe 100%)",
        border: isDark
          ? "1.5px solid rgba(157,143,255,0.28)"
          : "1.5px solid rgba(108,92,231,0.22)",
        boxShadow: isDark
          ? "0 2px 14px rgba(157,143,255,0.18), inset 0 1px 0 rgba(255,255,255,0.06)"
          : "0 2px 14px rgba(108,92,231,0.14), inset 0 1px 0 rgba(255,255,255,0.9)",
        cursor: "pointer",
      }}
    >
      {/* Track background icons — faded, decorative */}
      <div
        className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none"
        aria-hidden="true"
      >
        <Moon
          className="w-3 h-3"
          style={{ color: isDark ? "#9D8FFF" : "#c4b5fd", opacity: 0.5 }}
        />
        <Sun
          className="w-3 h-3"
          style={{ color: "#f59e0b", opacity: 0.4 }}
        />
      </div>

      {/* Sliding knob */}
      <motion.div
        className="absolute top-[2px] flex items-center justify-center rounded-full"
        style={{ width: 25, height: 25, left: 2 }}
        animate={{ x: isDark ? 0 : 29 }}
        transition={{ type: "spring", stiffness: 420, damping: 30 }}
      >
        <motion.div
          className="w-full h-full rounded-full flex items-center justify-center shadow-md"
          animate={{
            background: isDark
              ? "linear-gradient(135deg, #9D8FFF 0%, #6C5CE7 100%)"
              : "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
            boxShadow: isDark
              ? "0 2px 10px rgba(157,143,255,0.55)"
              : "0 2px 10px rgba(245,158,11,0.55)",
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
                style={{ display: "flex" }}
              >
                <Moon className="w-3 h-3 text-white" />
              </motion.span>
            ) : (
              <motion.span
                key="sun"
                initial={{ rotate: 30, opacity: 0, scale: 0.6 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: -30, opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.2 }}
                style={{ display: "flex" }}
              >
                <Sun className="w-3 h-3 text-white" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </motion.button>
  );
}
