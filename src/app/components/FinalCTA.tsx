import { motion } from "motion/react";
import { ArrowLeft, MessageCircle } from "lucide-react";

export function FinalCTA() { 
  return (
    <section
      className="relative py-28 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #1a0533 0%, #2d1b69 40%, #1a3a6e 80%, #0d2b52 100%)" }}
    >
      {/* Background decorations */}
      <div
        className="absolute top-0 left-0 w-96 h-96 opacity-20 blur-3xl rounded-full"
        style={{ background: "radial-gradient(circle, #6C5CE7, transparent)" }}
      />
      <div
        className="absolute bottom-0 right-0 w-96 h-96 opacity-20 blur-3xl rounded-full"
        style={{ background: "radial-gradient(circle, #00CEC9, transparent)" }}
      />
      <div
        className="absolute top-1/2 left-1/2 w-48 h-48 opacity-10 blur-2xl rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{ background: "white" }}
      />

      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 border text-sm font-semibold"
            style={{
              background: "rgba(255,255,255,0.08)",
              borderColor: "rgba(255,255,255,0.2)",
              color: "#00CEC9",
              fontFamily: "'Cairo', sans-serif",
            }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#00CEC9" }} />
            نقبل عملاء جدد الآن
          </div>

          <h2
            className="text-white mb-6"
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
                background: "linear-gradient(135deg, #a29bfe, #00CEC9)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              متجرك على سلة؟
            </span>
          </h2>

          <p
            className="max-w-2xl mx-auto mb-12"
            style={{
              color: "rgba(255,255,255,0.7)",
              fontFamily: "'Cairo', sans-serif",
              lineHeight: 1.8,
              fontSize: "1.1rem",
            }}
          >
            انضم إلى أكثر من 200 صاحب متجر ناجح وثقوا بـ Elgahmi Design لتحويل متاجرهم على سلة.
            لنبني شيئاً استثنائياً معاً — سريعاً واحترافياً وبنتائج ملموسة.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href="#pricing"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-2xl text-white font-bold transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              style={{
                background: "linear-gradient(135deg, #6C5CE7, #00CEC9)",
                boxShadow: "0 12px 40px rgba(108,92,231,0.45)",
                fontFamily: "'Cairo', sans-serif",
                fontSize: "1rem",
              }}
            >
              ابدأ الآن <ArrowLeft className="w-5 h-5" />
            </a>
            <a
              href="https://wa.me/966500000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-2xl font-bold transition-all duration-300 hover:scale-105 border"
              style={{
                color: "white",
                borderColor: "rgba(255,255,255,0.3)",
                background: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(8px)",
                fontFamily: "'Cairo', sans-serif",
                fontSize: "1rem",
              }}
            >
              <MessageCircle className="w-5 h-5" />
              استشارة مجانية
            </a>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-6">
            {[
              "✅ بدون رسوم إعداد",
              "⚡ تسليم خلال 48 ساعة",
              "🔄 تعديلات غير محدودة",
              "🛡️ ضمان الرضا",
            ].map((badge) => (
              <div
                key={badge}
                className="text-sm font-medium"
                style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Cairo', sans-serif" }}
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
