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
    <footer
      style={{ background: "#0d0a1a" }}
    >
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#home" className="flex items-center gap-3 mb-5">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #6C5CE7, #00CEC9)" }}
              >
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <div>
                <span
                  className="block font-bold"
                  style={{ color: "white", fontFamily: "'Cairo', sans-serif", fontSize: "1.1rem" }}
                >
                  الجاهمي ديزاين
                </span>
                <span
                  className="block text-xs"
                  style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Cairo', sans-serif" }}
                >
                  شريكك في متجر سلة
                </span>
              </div>
            </a>

            <p
              className="mb-6 max-w-xs"
              style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Cairo', sans-serif", lineHeight: 1.8, fontSize: "0.9rem" }}
            >
              نتخصص في تصميم وبناء متاجر سلة عالية التحويل. من الشعار حتى الإطلاق، نحن هنا لك.
            </p>

            {/* Contact info */}
            <div className="space-y-3 mb-6">
              {[
                { icon: Mail, text: "hello@elgahmi.design" },
                { icon: Phone, text: "+966 50 000 0000" },
                { icon: MapPin, text: "الرياض، المملكة العربية السعودية" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(108,92,231,0.2)" }}
                  >
                    <item.icon className="w-4 h-4" style={{ color: "#6C5CE7" }} />
                  </div>
                  <span
                    className="text-sm"
                    style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Cairo', sans-serif" }}
                  >
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.6)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = social.color + "20";
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = social.color + "60";
                    (e.currentTarget as HTMLAnchorElement).style.color = social.color;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.07)";
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.1)";
                    (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.6)";
                  }}
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4
                className="font-bold mb-5"
                style={{ color: "white", fontFamily: "'Cairo', sans-serif", fontSize: "0.95rem" }}
              >
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm transition-colors duration-200"
                      style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'Cairo', sans-serif" }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.color = "#00CEC9";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.45)";
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

      {/* Bottom bar */}
      <div
        className="border-t"
        style={{ borderColor: "rgba(255,255,255,0.07)" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className="text-sm text-center sm:text-right"
            style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Cairo', sans-serif" }}
          >
            © 2025 الجاهمي ديزاين. جميع الحقوق محفوظة. صُنع بـ ❤️ لبائعي سلة.
          </p>
          <div className="flex items-center gap-2">
            <div
              className="px-3 py-1 rounded-full text-xs font-medium"
              style={{ background: "rgba(0,206,201,0.15)", color: "#00CEC9", fontFamily: "'Cairo', sans-serif" }}
            >
              🇸🇦 المملكة العربية السعودية
            </div>
            <div
              className="px-3 py-1 rounded-full text-xs font-medium"
              style={{ background: "rgba(108,92,231,0.15)", color: "#a29bfe", fontFamily: "'Cairo', sans-serif" }}
            >
              ✓ شريك معتمد
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
