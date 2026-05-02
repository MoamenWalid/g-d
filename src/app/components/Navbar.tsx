import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { HomeThemeToggle } from "./HomeThemeToggle";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "الرئيسية", href: "#home" },
    { label: "الخدمات", href: "#services" },
    { label: "أعمالنا", href: "#portfolio" },
    { label: "الأسعار", href: "#pricing" },
    { label: "عن الشركة", href: "#why-us" },
    { label: "الأسئلة الشائعة", href: "#faq" },
  ];

  const linkColor = scrolled ? "var(--home-nav-link)" : "var(--home-nav-link-hero)";

  return (
    <nav
      className="fixed top-0 right-0 left-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "var(--home-nav-bg-scrolled)" : "transparent",
        boxShadow: scrolled ? "var(--home-nav-shadow)" : "none",
        backdropFilter: scrolled ? "blur(12px)" : "none",
      }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <a href="#home" className="group flex items-center gap-3">
            <img src="/imgs/logo.png" alt="logo" className="w-[150px]" />
          </a>

          <div className="hidden items-center gap-8 lg:flex">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium transition-opacity duration-200 hover:opacity-80"
                style={{ color: linkColor, fontFamily: "'Cairo', sans-serif" }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-4 lg:flex">
            <HomeThemeToggle />
            <a
              href="#services"
              className="text-sm font-semibold transition-opacity duration-200"
              style={{ color: "var(--home-nav-link-accent)", fontFamily: "'Cairo', sans-serif" }}
            >
              عرض الخدمات
            </a>
            <a
              href="#pricing"
              className="rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{
                background: "var(--home-gradient-brand)",
                fontFamily: "'Cairo', sans-serif",
                boxShadow: "var(--home-cta-shadow)",
              }}
            >
              ابدأ الآن ←
            </a>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <HomeThemeToggle />
            <button
              type="button"
              className="rounded-xl p-2 transition-colors duration-200"
              style={{ color: "var(--home-nav-mobile-btn)" }}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"}
            >
              {menuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div
            className="mt-2 rounded-2xl p-4 pb-6 lg:hidden"
            style={{
              background: "var(--home-nav-menu-bg)",
              boxShadow: "var(--home-nav-menu-shadow)",
            }}
          >
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block border-b py-3 text-sm font-medium transition-opacity duration-200 last:border-b-0 hover:opacity-70"
                style={{
                  color: "var(--home-nav-link)",
                  borderColor: "var(--home-nav-menu-border)",
                  fontFamily: "'Cairo', sans-serif",
                }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#pricing"
              className="mt-4 block w-full rounded-xl px-5 py-3 text-center text-sm font-semibold text-white"
              style={{
                background: "var(--home-gradient-brand)",
                fontFamily: "'Cairo', sans-serif",
              }}
              onClick={() => setMenuOpen(false)}
            >
              ابدأ الآن ←
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
