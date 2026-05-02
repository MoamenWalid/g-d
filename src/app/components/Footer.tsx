import { ShoppingBag, Mail, Phone, MapPin, Instagram, Twitter, Facebook, Youtube } from "lucide-react";

const footerLinks = {
  الخدمات: [
    { label: "تصميم الشعار", href: "#services" },
    { label: "تخصيص المتجر", href: "#services" },
    { label: "تفعيل القالب", href: "#services" },
    { label: "الهوية البصرية", href: "#services" },
    { label: "الصيانة الشهرية", href: "#services" },
  ],
  الشركة: [
    { label: "عن الشركة", href: "#why-us" },
    { label: "أعمالنا", href: "#portfolio" },
    { label: "الأسعار", href: "#pricing" },
    { label: "المدونة", href: "#" },
    { label: "وظائف", href: "#" },
  ],
  الدعم: [
    { label: "أسئلة شائعة", href: "#faq" },
    { label: "تواصل معنا", href: "#contact" },
    { label: "محادثة واتساب", href: "https://wa.me/966500000000" },
    { label: "سياسة الخصوصية", href: "/policies#privacy" },
    { label: "شروط الخدمة", href: "/policies#terms" },
    { label: "سياسة الاسترجاع", href: "/policies#refund" },
  ],
};

const socials = [
  { icon: Instagram, label: "Instagram", href: "#", color: "#E1306C" },
  { icon: Twitter, label: "Twitter / X", href: "#", color: "#1DA1F2" },
  { icon: Facebook, label: "Facebook", href: "#", color: "#1877F2" },
  { icon: Youtube, label: "YouTube", href: "#", color: "#FF0000" },
];

export function Footer() {
  return (
    <footer style={{ background: "var(--home-footer-bg)" }}>
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <a href="#home" className="mb-5 flex items-center gap-3">
              <div
                className="flex size-10 items-center justify-center rounded-xl"
                style={{ background: "var(--home-gradient-brand)" }}
              >
                <ShoppingBag className="size-5 text-white" />
              </div>
              <div>
                <span className="block font-bold" style={{ color: "var(--home-footer-text)", fontFamily: "'Cairo', sans-serif", fontSize: "1.1rem" }}>
                  الجاهمي ديزاين
                </span>
                <span className="block text-xs" style={{ color: "var(--home-footer-text-muted)", fontFamily: "'Cairo', sans-serif" }}>
                  شريكك في متجر سلة
                </span>
              </div>
            </a>

            <p className="mb-6 max-w-xs" style={{ color: "var(--home-footer-text-muted)", fontFamily: "'Cairo', sans-serif", lineHeight: 1.8, fontSize: "0.9rem" }}>
              نتخصص في تصميم وبناء متاجر سلة عالية التحويل. من الشعار حتى الإطلاق، نحن هنا لك.
            </p>

            <div className="mb-6 space-y-3">
              {[
                { icon: Mail, text: "hello@elgahmi.design" },
                { icon: Phone, text: "+966 50 000 0000" },
                { icon: MapPin, text: "الرياض، المملكة العربية السعودية" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3">
                  <div
                    className="flex size-8 flex-shrink-0 items-center justify-center rounded-lg"
                    style={{ background: "var(--home-footer-icon-bg)" }}
                  >
                    <item.icon className="size-4" style={{ color: "var(--home-brand)" }} />
                  </div>
                  <span className="text-sm" style={{ color: "var(--home-footer-text-faint)", fontFamily: "'Cairo', sans-serif" }}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-9 items-center justify-center rounded-xl transition-all duration-300 hover:scale-110"
                  style={{
                    background: "var(--home-footer-social-bg)",
                    border: "1px solid var(--home-footer-social-border)",
                    color: "var(--home-footer-social-color)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = `${social.color}20`;
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = `${social.color}60`;
                    (e.currentTarget as HTMLAnchorElement).style.color = social.color;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "var(--home-footer-social-bg)";
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--home-footer-social-border)";
                    (e.currentTarget as HTMLAnchorElement).style.color = "var(--home-footer-social-color)";
                  }}
                  aria-label={social.label}
                >
                  <social.icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="mb-5 font-bold" style={{ color: "var(--home-footer-text)", fontFamily: "'Cairo', sans-serif", fontSize: "0.95rem" }}>
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm transition-colors duration-200"
                      style={{ color: "var(--home-footer-text-faint)", fontFamily: "'Cairo', sans-serif" }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.color = "var(--home-footer-link-hover)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.color = "var(--home-footer-text-faint)";
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t" style={{ borderColor: "var(--home-footer-border)" }}>
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 sm:flex-row lg:px-8">
          <p className="text-center text-sm sm:text-right" style={{ color: "var(--home-footer-text-ghost)", fontFamily: "'Cairo', sans-serif" }}>
            © 2025 الجاهمي ديزاين. جميع الحقوق محفوظة. صُنع بـ ❤️ لبائعي سلة.
          </p>
          <div className="flex items-center gap-2">
            <div
              className="rounded-full px-3 py-1 text-xs font-medium"
              style={{ background: "var(--home-footer-badge-teal-bg)", color: "var(--home-brand-secondary)", fontFamily: "'Cairo', sans-serif" }}
            >
              🇸🇦 المملكة العربية السعودية
            </div>
            <div
              className="rounded-full px-3 py-1 text-xs font-medium"
              style={{ background: "var(--home-footer-badge-purple-bg)", color: "var(--home-footer-badge-purple-text)", fontFamily: "'Cairo', sans-serif" }}
            >
              ✓ شريك معتمد
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
