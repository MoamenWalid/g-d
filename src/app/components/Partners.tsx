import { motion } from "motion/react";
import { Handshake } from "lucide-react";

const partners = [
  { id: 1, name: "Salla", emoji: "🛒", desc: "شريك رسمي" },
  { id: 2, name: "Zid", emoji: "⚡", desc: "شريك المنصة" },
  { id: 3, name: "Tabby", emoji: "💳", desc: "شريك الدفع" },
  { id: 4, name: "Tamara", emoji: "🏦", desc: "شريك التمويل" },
  { id: 5, name: "Aramex", emoji: "📦", desc: "شريك الشحن" },
  { id: 6, name: "SMSA", emoji: "🚚", desc: "شريك اللوجستيات" },
  { id: 7, name: "PayTabs", emoji: "💰", desc: "بوابة دفع" },
  { id: 8, name: "Unifonic", emoji: "📱", desc: "شريك الرسائل" },
];

export function Partners() {
  return (
    <section className="py-20" style={{ background: "var(--home-section-surface)" }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12 text-center">
          <div
            className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
            style={{ background: "var(--home-teal-soft-bg)", color: "var(--home-brand-secondary)", fontFamily: "'Cairo', sans-serif" }}
          >
            <Handshake className="size-4" />
            شركاؤنا
          </div>
          <h2
            className="mb-4"
            style={{
              fontFamily: "'Cairo', sans-serif",
              fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)",
              fontWeight: 800,
              color: "var(--home-text-primary)",
            }}
          >
            موثوقون من قادة{" "}
            <span
              style={{
                background: "var(--home-gradient-text)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              الصناعة
            </span>
          </h2>
          <p className="mx-auto max-w-lg" style={{ color: "var(--home-text-secondary)", fontFamily: "'Cairo', sans-serif", lineHeight: 1.8 }}>
            نعمل مع أفضل المنصات والخدمات في منظومة التجارة الإلكترونية السعودية.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
          {partners.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              className="home-partner-tile group flex cursor-pointer flex-col items-center justify-center rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1"
            >
              <span className="mb-2 text-3xl transition-transform duration-300 group-hover:scale-125">{p.emoji}</span>
              <span className="text-center text-xs font-bold" style={{ color: "var(--home-text-primary)", fontFamily: "'Cairo', sans-serif" }}>
                {p.name}
              </span>
              <span
                className="mt-0.5 text-center text-xs opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                style={{ color: "var(--home-brand)", fontFamily: "'Cairo', sans-serif", fontSize: "0.7rem" }}
              >
                {p.desc}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
