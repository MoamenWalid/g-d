import { motion } from "motion/react";
import { ArrowLeft, MessageCircle } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-28" style={{ background: "var(--home-hero-bg)" }}>
      <div
        className="absolute top-0 left-0 rounded-full opacity-20 blur-3xl"
        style={{ width: "24rem", height: "24rem", background: "var(--home-hero-blob-purple)" }}
      />
      <div
        className="absolute right-0 bottom-0 rounded-full opacity-20 blur-3xl"
        style={{ width: "24rem", height: "24rem", background: "var(--home-hero-blob-teal)" }}
      />
      <div
        className="absolute top-1/2 left-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10 blur-2xl"
        style={{ background: "var(--home-hero-blob-white)" }}
      />

      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "radial-gradient(var(--home-hero-dot-pattern) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div
            className="mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold"
            style={{
              background: "rgba(255,255,255,0.08)",
              borderColor: "rgba(255,255,255,0.2)",
              color: "var(--home-brand-secondary)",
              fontFamily: "'Cairo', sans-serif",
            }}
          >
            <span className="size-2 animate-pulse rounded-full" style={{ background: "var(--home-brand-secondary)" }} />
            نقبل عملاء جدد الآن
          </div>

          <h2
            className="mb-6 text-white"
            style={{
              fontFamily: "'Cairo', sans-serif",
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              fontWeight: 800,
              lineHeight: 1.2,
            }}
          >
            هل أنت مستعد لتنمية{" "}
            <span
              style={{
                background: "linear-gradient(135deg, var(--home-brand-muted), var(--home-brand-secondary))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              متجرك على سلة؟
            </span>
          </h2>

          <p
            className="mx-auto mb-12 max-w-2xl"
            style={{
              color: "var(--home-text-inverse-muted)",
              fontFamily: "'Cairo', sans-serif",
              lineHeight: 1.8,
              fontSize: "1.1rem",
            }}
          >
            انضم إلى أكثر من 200 صاحب متجر ناجح وثقوا بـ Elgahmi Design لتحويل متاجرهم على سلة.
            لنبني شيئاً استثنائياً معاً — سريعاً واحترافياً وبنتائج ملموسة.
          </p>

          <div className="mb-12 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="#pricing"
              className="inline-flex items-center justify-center gap-2 rounded-2xl px-10 py-5 font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              style={{
                background: "var(--home-gradient-brand)",
                boxShadow: "var(--home-cta-shadow-lg)",
                fontFamily: "'Cairo', sans-serif",
                fontSize: "1rem",
              }}
            >
              ابدأ الآن <ArrowLeft className="size-5" />
            </a>
            <a
              href="https://wa.me/966500000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border px-10 py-5 font-bold text-white transition-all duration-300 hover:scale-105"
              style={{
                borderColor: "var(--home-hero-outline-btn-border)",
                background: "var(--home-hero-outline-btn-bg)",
                backdropFilter: "blur(8px)",
                fontFamily: "'Cairo', sans-serif",
                fontSize: "1rem",
              }}
            >
              <MessageCircle className="size-5" />
              استشارة مجانية
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {["✅ بدون رسوم إعداد", "⚡ تسليم خلال 48 ساعة", "🔄 تعديلات غير محدودة", "🛡️ ضمان الرضا"].map((badge) => (
              <div
                key={badge}
                className="text-sm font-medium"
                style={{ color: "var(--home-text-inverse-subtle)", fontFamily: "'Cairo', sans-serif" }}
              >
                {badge}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
