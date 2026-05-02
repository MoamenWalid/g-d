import { motion } from "motion/react";
import { ArrowLeft, Play, Star, TrendingUp, ShieldCheck, Zap } from "lucide-react";

const HERO_IMAGE = "https://images.unsplash.com/photo-1648134859177-66e35b61e106?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBzdG9yZSUyMGRhc2hib2FyZCUyMG1vZGVybiUyMGludGVyZmFjZXxlbnwxfHx8fDE3NzY3MTIwMzl8MA&ixlib=rb-4.1.0&q=80&w=1080";

const stats = [
  { icon: TrendingUp, value: "200+", label: "متجر تم إطلاقه" },
  { icon: Star, value: "4.9/5", label: "تقييم العملاء" },
  { icon: Zap, value: "48hr", label: "تسليم سريع" },
  { icon: ShieldCheck, value: "100%", label: "رضا العملاء" },
];

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden"
      style={{ background: "var(--home-hero-bg)" }}
    >
      <div
        className="absolute top-0 left-0 h-96 w-96 rounded-full opacity-20 blur-3xl"
        style={{ background: "var(--home-hero-blob-purple)" }}
      />
      <div
        className="absolute right-0 bottom-0 h-96 w-96 rounded-full opacity-20 blur-3xl"
        style={{ background: "var(--home-hero-blob-teal)" }}
      />
      <div
        className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10 blur-2xl"
        style={{ background: "var(--home-hero-blob-white)" }}
      />

      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-6 pt-28 pb-20 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-2"
              style={{
                background: "var(--home-hero-badge-bg)",
                borderColor: "var(--home-hero-badge-border)",
              }}
            >
              <div className="size-2 animate-pulse rounded-full" style={{ background: "var(--home-brand-secondary)" }} />
              <span className="text-sm font-medium" style={{ color: "var(--home-brand-secondary)", fontFamily: "'Cairo', sans-serif" }}>
                الخبراء الأوائل في منصة سلة
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mb-6 text-white"
              style={{
                fontFamily: "'Cairo', sans-serif",
                fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
                fontWeight: 800,
                lineHeight: 1.25,
              }}
            >
              أنشئ متجراً احترافياً{" "}
              <span
                style={{
                  background: "var(--home-gradient-hero-text)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                يبيع بثقة
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mb-10 max-w-xl text-lg"
              style={{ color: "var(--home-text-inverse-muted)", fontFamily: "'Cairo', sans-serif", lineHeight: 1.8 }}
            >
              نتخصص في تصميم وتطوير وتفعيل متاجر سلة الاحترافية.
              من الشعارات المميزة إلى إعداد المتجر الكامل — نحوّل رؤيتك إلى عمل تجاري يحقق مبيعات عالية.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mb-14 flex flex-wrap gap-4"
            >
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 rounded-2xl px-8 py-4 font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl"
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
                href="#services"
                className="inline-flex items-center gap-2 rounded-2xl border px-8 py-4 font-bold text-white transition-all duration-300 hover:scale-105"
                style={{
                  borderColor: "var(--home-hero-outline-btn-border)",
                  background: "var(--home-hero-outline-btn-bg)",
                  fontFamily: "'Cairo', sans-serif",
                  fontSize: "1rem",
                  backdropFilter: "blur(8px)",
                }}
              >
                <Play className="size-4" />
                عرض الخدمات
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="grid grid-cols-2 gap-4 sm:grid-cols-4"
            >
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center rounded-2xl border p-3 text-center"
                  style={{
                    background: "var(--home-hero-stat-bg)",
                    borderColor: "var(--home-hero-stat-border)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <stat.icon className="mb-1 size-5" style={{ color: "var(--home-brand-secondary)" }} />
                  <span
                    className="font-bold"
                    style={{ color: "var(--home-text-inverse)", fontFamily: "'Cairo', sans-serif", fontSize: "1.1rem" }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-xs" style={{ color: "var(--home-text-inverse-subtle)", fontFamily: "'Cairo', sans-serif" }}>
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
            className="relative hidden justify-center lg:flex"
          >
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <div
                className="relative max-w-full overflow-hidden rounded-3xl border"
                style={{
                  borderColor: "var(--home-hero-mockup-border)",
                  boxShadow: "0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(108,92,231,0.3)",
                  width: "500px",
                }}
              >
                <div className="flex items-center gap-2 px-4 py-3" style={{ background: "var(--home-hero-mockup-chrome)" }}>
                  <div className="size-3 rounded-full" style={{ background: "#ff5f57" }} />
                  <div className="size-3 rounded-full" style={{ background: "#ffbd2e" }} />
                  <div className="size-3 rounded-full" style={{ background: "#28ca41" }} />
                  <div
                    className="mx-4 flex-1 rounded-full px-4 py-1 text-xs"
                    style={{ background: "var(--home-hero-mockup-url-bg)", color: "var(--home-hero-mockup-url-text)", fontFamily: "'Cairo', sans-serif" }}
                  >
                    mystore.salla.sa
                  </div>
                </div>
                <img
                  src={HERO_IMAGE}
                  alt="لوحة تحكم المتجر الإلكتروني"
                  className="w-full object-cover"
                  style={{ height: "340px" }}
                />
              </div>

              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -right-10 top-16 flex items-center gap-3 rounded-2xl px-4 py-3"
                style={{
                  background: "var(--home-hero-float-card-bg)",
                  boxShadow: "var(--home-hero-float-card-shadow)",
                  border: "1px solid var(--home-hero-float-card-border)",
                }}
              >
                <div
                  className="flex size-9 items-center justify-center rounded-xl text-lg"
                  style={{ background: "var(--home-gradient-brand)" }}
                >
                  🛍️
                </div>
                <div>
                  <div className="text-xs font-bold" style={{ color: "var(--home-hero-float-card-text)", fontFamily: "'Cairo', sans-serif" }}>
                    طلب جديد!
                  </div>
                  <div className="text-xs" style={{ color: "var(--home-hero-float-card-muted)", fontFamily: "'Cairo', sans-serif" }}>
                    349.00 ر.س
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [4, -4, 4] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -left-8 bottom-20 rounded-2xl px-4 py-3"
                style={{
                  background: "var(--home-hero-float-card-bg)",
                  boxShadow: "var(--home-hero-float-card-shadow)",
                  border: "1px solid var(--home-hero-float-alt-border)",
                }}
              >
                <div className="mb-1 flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} className="text-sm">
                      ⭐
                    </span>
                  ))}
                </div>
                <div className="text-xs font-bold" style={{ color: "var(--home-hero-float-card-text)", fontFamily: "'Cairo', sans-serif" }}>
                  +38 تقييم
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [-6, 6, -6] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                className="absolute -top-6 -left-4 flex items-center gap-2 rounded-2xl px-4 py-3"
                style={{
                  background: "var(--home-hero-growth-bg)",
                  boxShadow: "0 8px 32px rgba(108,92,231,0.4)",
                }}
              >
                <TrendingUp className="size-4 text-white" />
                <span className="text-sm font-bold text-white" style={{ fontFamily: "'Cairo', sans-serif" }}>
                  +127% مبيعات
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="absolute right-0 bottom-0 left-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="var(--home-hero-wave-fill)" />
        </svg>
      </div>
    </section>
  );
}
