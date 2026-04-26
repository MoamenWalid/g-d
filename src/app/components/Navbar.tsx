import { useState, useEffect } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";

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

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(255,255,255,0.97)" : "transparent",
        boxShadow: scrolled ? "0 2px 24px rgba(108,92,231,0.10)" : "none",
        backdropFilter: scrolled ? "blur(12px)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <img src='/imgs/logo.png' alt="logo" className="w-[150px]" />
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium transition-colors duration-200 hover:opacity-80"
                style={{
                  color: scrolled ? "#2D3436" : "#fff",
                  fontFamily: "'Cairo', sans-serif",
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="#services"
              className="text-sm font-semibold transition-colors duration-200"
              style={{ color: "#6C5CE7", fontFamily: "'Cairo', sans-serif" }}
            >
              عرض الخدمات
            </a>
            <a
              href="#pricing"
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #6C5CE7, #00CEC9)",
                fontFamily: "'Cairo', sans-serif",
                boxShadow: "0 4px 15px rgba(108,92,231,0.35)",
              }}
            >
              ابدأ الآن ←
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 rounded-xl transition-colors duration-200"
            style={{ color: "#2D3436" }}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div
            className="lg:hidden pb-6 rounded-2xl mt-2 p-4"
            style={{ background: "rgba(255,255,255,0.98)", boxShadow: "0 8px 32px rgba(108,92,231,0.15)" }}
          >
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block py-3 text-sm font-medium border-b last:border-b-0 transition-colors duration-200 hover:opacity-70"
                style={{
                  color: "#2D3436",
                  borderColor: "#F8F9FC",
                  fontFamily: "'Cairo', sans-serif",
                }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#pricing"
              className="mt-4 block w-full text-center px-5 py-3 rounded-xl text-sm font-semibold text-white"
              style={{
                background: "linear-gradient(135deg, #6C5CE7, #00CEC9)",
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
