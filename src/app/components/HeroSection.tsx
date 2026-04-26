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
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #1a0533 0%, #2d1b69 30%, #1a3a6e 70%, #0d2b52 100%)" }}
    >
      {/* Background decorative blobs */}
      <div
        className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #6C5CE7, transparent)" }}
      />
      <div
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #00CEC9, transparent)" }}
      />
      <div
        className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full opacity-10 blur-2xl -translate-x-1/2 -translate-y-1/2"
        style={{ background: "radial-gradient(circle, #ffffff, transparent)" }}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Right Content (first in DOM = right in RTL) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 border"
              style={{
                background: "rgba(108,92,231,0.15)",
                borderColor: "rgba(108,92,231,0.3)",
              }}
            >
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#00CEC9" }} />
              <span className="text-sm font-medium" style={{ color: "#00CEC9", fontFamily: "'Cairo', sans-serif" }}>
                الخبراء الأوائل في منصة سلة
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-white mb-6"
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
                  background: "linear-gradient(135deg, #6C5CE7, #00CEC9)",
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
              className="text-lg mb-10 max-w-xl"
              style={{ color: "rgba(255,255,255,0.75)", fontFamily: "'Cairo', sans-serif", lineHeight: 1.8 }}
            >
              نتخصص في تصميم وتطوير وتفعيل متاجر سلة الاحترافية.
              من الشعارات المميزة إلى إعداد المتجر الكامل — نحوّل رؤيتك إلى عمل تجاري يحقق مبيعات عالية.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-wrap gap-4 mb-14"
            >
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-white font-bold transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                style={{
                  background: "linear-gradient(135deg, #6C5CE7, #00CEC9)",
                  boxShadow: "0 8px 30px rgba(108,92,231,0.4)",
                  fontFamily: "'Cairo', sans-serif",
                  fontSize: "1rem",
                }}
              >
                ابدأ الآن <ArrowLeft className="w-5 h-5" />
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold transition-all duration-300 hover:scale-105 border"
                style={{
                  color: "white",
                  borderColor: "rgba(255,255,255,0.3)",
                  background: "rgba(255,255,255,0.08)",
                  fontFamily: "'Cairo', sans-serif",
                  fontSize: "1rem",
                  backdropFilter: "blur(8px)",
                }}
              >
                <Play className="w-4 h-4" />
                عرض الخدمات
              </a>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center p-3 rounded-2xl border text-center"
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    borderColor: "rgba(255,255,255,0.12)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <stat.icon className="w-5 h-5 mb-1" style={{ color: "#00CEC9" }} />
                  <span
                    className="font-bold"
                    style={{ color: "white", fontFamily: "'Cairo', sans-serif", fontSize: "1.1rem" }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Cairo', sans-serif" }}>
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Left: Mockup (second in DOM = left in RTL) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
            className="relative hidden lg:flex justify-center"
          >
            {/* Floating decorative card */}
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              {/* Main mockup */}
              <div
                className="relative rounded-3xl overflow-hidden border"
                style={{
                  borderColor: "rgba(255,255,255,0.15)",
                  boxShadow: "0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(108,92,231,0.3)",
                  width: "500px",
                  maxWidth: "100%",
                }}
              >
                {/* Browser chrome */}
                <div
                  className="flex items-center gap-2 px-4 py-3"
                  style={{ background: "rgba(20,10,40,0.9)" }}
                >
                  <div className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: "#ffbd2e" }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: "#28ca41" }} />
                  <div
                    className="flex-1 mx-4 rounded-full px-4 py-1 text-xs"
                    style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)", fontFamily: "'Cairo', sans-serif" }}
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

              {/* Floating badge 1: Order notification — inner side (right in RTL) */}
              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -right-10 top-16 rounded-2xl px-4 py-3 flex items-center gap-3"
                style={{
                  background: "white",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
                  border: "1px solid rgba(108,92,231,0.2)",
                }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
                  style={{ background: "linear-gradient(135deg, #6C5CE7, #00CEC9)" }}
                >
                  🛍️
                </div>
                <div>
                  <div className="text-xs font-bold" style={{ color: "#2D3436", fontFamily: "'Cairo', sans-serif" }}>طلب جديد!</div>
                  <div className="text-xs" style={{ color: "#636e72", fontFamily: "'Cairo', sans-serif" }}>349.00 ر.س</div>
                </div>
              </motion.div>

              {/* Floating badge 2: Rating — outer side (left in RTL) */}
              <motion.div
                animate={{ y: [4, -4, 4] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -left-8 bottom-20 rounded-2xl px-4 py-3"
                style={{
                  background: "white",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
                  border: "1px solid rgba(0,206,201,0.2)",
                }}
              >
                <div className="flex items-center gap-1 mb-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} className="text-sm">⭐</span>
                  ))}
                </div>
                <div className="text-xs font-bold" style={{ color: "#2D3436", fontFamily: "'Cairo', sans-serif" }}>+38 تقييم</div>
              </motion.div>

              {/* Floating badge 3: Growth — outer top (left in RTL) */}
              <motion.div
                animate={{ y: [-6, 6, -6] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                className="absolute -left-4 -top-6 rounded-2xl px-4 py-3 flex items-center gap-2"
                style={{
                  background: "linear-gradient(135deg, #6C5CE7, #4f3ac7)",
                  boxShadow: "0 8px 32px rgba(108,92,231,0.4)",
                }}
              >
                <TrendingUp className="w-4 h-4 text-white" />
                <span className="text-sm font-bold text-white" style={{ fontFamily: "'Cairo', sans-serif" }}>+127% مبيعات</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#F8F9FC" />
        </svg>
      </div>
    </section>
  );
}
