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
    <section className="py-20" style={{ background: "white" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 text-sm font-semibold"
            style={{ background: "rgba(0,206,201,0.1)", color: "#00CEC9", fontFamily: "'Cairo', sans-serif" }}
          >
            <Handshake className="w-4 h-4" />
            شركاؤنا
          </div>
          <h2
            className="mb-4"
            style={{
              fontFamily: "'Cairo', sans-serif",
              fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)",
              fontWeight: 800,
              color: "#2D3436",
            }}
          >
            موثوقون من قادة{" "}
            <span style={{ background: "linear-gradient(135deg, #6C5CE7, #00CEC9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              الصناعة
            </span>
          </h2>
          <p
            className="max-w-lg mx-auto"
            style={{ color: "#636e72", fontFamily: "'Cairo', sans-serif", lineHeight: 1.8 }}
          >
            نعمل مع أفضل المنصات والخدمات في منظومة التجارة الإلكترونية السعودية.
          </p>
        </div>

        {/* Partner logos */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {partners.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              className="flex flex-col items-center justify-center p-4 rounded-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
              style={{
                background: "#F8F9FC",
                border: "1px solid rgba(108,92,231,0.08)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.background = "white";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 32px rgba(108,92,231,0.15)";
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(108,92,231,0.25)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.background = "#F8F9FC";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(108,92,231,0.08)";
              }}
            >
              <span className="text-3xl mb-2 transition-transform duration-300 group-hover:scale-125">{p.emoji}</span>
              <span
                className="font-bold text-xs text-center"
                style={{ color: "#2D3436", fontFamily: "'Cairo', sans-serif" }}
              >
                {p.name}
              </span>
              <span
                className="text-xs text-center mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{ color: "#6C5CE7", fontFamily: "'Cairo', sans-serif", fontSize: "0.7rem" }}
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
