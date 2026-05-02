import { motion } from "motion/react";
import { Zap, Award, HeadphonesIcon, DollarSign } from "lucide-react";

const benefits = [
  {
    icon: Zap,
    title: "تسليم فائق السرعة",
    desc: "تُسلَّم معظم الخدمات خلال 24-48 ساعة. نقدر وقتك ونعمل بكل جدية.",
    color: "#fdcb6e",
    gradient: "linear-gradient(135deg, #fdcb6e, #e17055)",
  },
  {
    icon: Award,
    title: "خبراء منصة سلة",
    desc: "خبرة عميقة في نظام سلة — القوالب، APIs، وأفضل الممارسات لتحقيق أعلى أداء.",
    color: "#6C5CE7",
    gradient: "linear-gradient(135deg, #6C5CE7, #a29bfe)",
  },
  {
    icon: HeadphonesIcon,
    title: "دعم مستمر",
    desc: "لا نختفي بعد التسليم. فريقنا متاح لدعم متجرك وتحديثه في أي وقت.",
    color: "#00CEC9",
    gradient: "linear-gradient(135deg, #00CEC9, #00b894)",
  },
  {
    icon: DollarSign,
    title: "أسعار تنافسية",
    desc: "جودة عالية بأسعار عادلة. لا رسوم خفية، لا مفاجآت — فقط قيمة تفوق التوقعات.",
    color: "#fd79a8",
    gradient: "linear-gradient(135deg, #fd79a8, #e84393)",
  },
];

export function WhyChooseUs() {
  return (
    <section id="why-us" className="py-24" style={{ background: "var(--home-section-surface)" }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <div
              className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
              style={{ background: "var(--home-pill-bg)", color: "var(--home-brand)", fontFamily: "'Cairo', sans-serif" }}
            >
              <Award className="size-4" />
              لماذا نحن
            </div>
            <h2
              className="mb-6"
              style={{
                fontFamily: "'Cairo', sans-serif",
                fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                fontWeight: 800,
                color: "var(--home-text-primary)",
                lineHeight: 1.3,
              }}
            >
              لماذا يختارنا الآلاف من{" "}
              <span
                style={{
                  background: "var(--home-gradient-text)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                أصحاب المتاجر
              </span>
            </h2>
            <p
              className="mb-8 max-w-[480px]"
              style={{ color: "var(--home-text-secondary)", fontFamily: "'Cairo', sans-serif", lineHeight: 1.8, fontSize: "1.05rem" }}
            >
              لسنا مجرد وكالة تصميم — نحن شريكك في النمو. كل خدمة مصممة لتحقيق نتائج أعمال حقيقية على منصة سلة.
            </p>

            <div className="mb-8 grid grid-cols-3 gap-4">
              {[
                { value: "200+", label: "متجر تم بناؤه" },
                { value: "5 سنوات", label: "خبرة" },
                { value: "48 ساعة", label: "متوسط التسليم" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl p-4 text-center"
                  style={{ background: "var(--home-step-panel-bg)", border: "1px solid var(--home-accent-soft-border)" }}
                >
                  <div
                    className="font-black"
                    style={{ fontFamily: "'Cairo', sans-serif", fontSize: "1.5rem", color: "var(--home-text-primary)" }}
                  >
                    {s.value}
                  </div>
                  <div className="text-xs" style={{ color: "var(--home-text-secondary)", fontFamily: "'Cairo', sans-serif" }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            <a
              href="#pricing"
              className="inline-flex items-center gap-2 rounded-2xl px-8 py-4 font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl"
              style={{
                background: "var(--home-gradient-brand)",
                boxShadow: "var(--home-cta-shadow-lg)",
                fontFamily: "'Cairo', sans-serif",
              }}
            >
              ابدأ اليوم ←
            </a>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="home-why-card group rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className="mb-4 flex size-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110"
                  style={{ background: b.gradient, boxShadow: `0 6px 20px ${b.color}40` }}
                >
                  <b.icon className="size-6 text-white" />
                </div>
                <h3
                  className="mb-2"
                  style={{ fontFamily: "'Cairo', sans-serif", fontWeight: 700, fontSize: "1rem", color: "var(--home-text-primary)" }}
                >
                  {b.title}
                </h3>
                <p style={{ color: "var(--home-text-secondary)", fontFamily: "'Cairo', sans-serif", fontSize: "0.88rem", lineHeight: 1.7 }}>
                  {b.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
