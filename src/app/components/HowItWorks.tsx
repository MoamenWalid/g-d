import { motion } from "motion/react";
import { ShoppingCart, CreditCard, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: ShoppingCart,
    title: "اختر خدمتك",
    desc: "تصفح قائمة خدماتنا، واختر ما يناسب احتياجاتك، وأضفه إلى سلة التسوق.",
    color: "#6C5CE7",
    gradient: "linear-gradient(135deg, #6C5CE7, #a29bfe)",
  },
  {
    number: "02",
    icon: CreditCard,
    title: "أتمم الدفع",
    desc: "دفع آمن وفوري. نقبل جميع البطاقات وطرق الدفع الرئيسية.",
    color: "#00CEC9",
    gradient: "linear-gradient(135deg, #00CEC9, #00b894)",
  },
  {
    number: "03",
    icon: Rocket,
    title: "نبدأ العمل فوراً",
    desc: "فريقنا المتخصص يبدأ العمل فوراً. ستتلقى تحديثات عند كل مرحلة.",
    color: "#fd79a8",
    gradient: "linear-gradient(135deg, #fd79a8, #e84393)",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24" style={{ background: "var(--home-section-surface)" }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16 text-center">
          <div
            className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
            style={{ background: "var(--home-teal-soft-bg)", color: "var(--home-brand-secondary)", fontFamily: "'Cairo', sans-serif" }}
          >
            <Rocket className="size-4" />
            عملية بسيطة
          </div>
          <h2
            className="mb-4"
            style={{
              fontFamily: "'Cairo', sans-serif",
              fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
              fontWeight: 800,
              color: "var(--home-text-primary)",
            }}
          >
            كيف{" "}
            <span
              style={{
                background: "var(--home-gradient-text)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              نعمل
            </span>
          </h2>
          <p className="mx-auto max-w-xl" style={{ color: "var(--home-text-secondary)", fontFamily: "'Cairo', sans-serif", lineHeight: 1.8 }}>
            من اختيار الخدمة إلى استلام النتيجة النهائية — بسيط وسريع وخالٍ من التعقيد.
          </p>
        </div>

        <div className="relative grid grid-cols-1 gap-8 md:grid-cols-3">
          <div
            className="absolute top-20 right-1/4 left-1/4 hidden h-px md:block"
            style={{ background: "linear-gradient(90deg, var(--home-brand), var(--home-brand-secondary))", zIndex: 0 }}
          />
          <div
            className="absolute top-20 right-0 left-1/2 hidden h-px md:block"
            style={{ background: `linear-gradient(90deg, var(--home-brand-secondary), var(--home-accent-pink))`, zIndex: 0 }}
          />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.15, duration: 0.7 }}
              className="group relative z-10 flex flex-col items-center text-center"
            >
              <div className="relative z-10 mb-6">
                <div
                  className="mx-auto mb-2 flex size-16 items-center justify-center rounded-2xl text-sm font-bold text-white transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: step.gradient,
                    boxShadow: `0 8px 32px ${step.color}40`,
                    fontFamily: "'Cairo', sans-serif",
                  }}
                >
                  <step.icon className="size-7" />
                </div>
                <div
                  className="absolute -top-3 -left-3 flex size-8 items-center justify-center rounded-xl text-xs font-black text-white"
                  style={{ background: step.gradient, fontFamily: "'Cairo', sans-serif" }}
                >
                  {step.number}
                </div>
              </div>

              <div className="home-step-box w-full rounded-2xl p-6">
                <h3
                  className="mb-3"
                  style={{ fontFamily: "'Cairo', sans-serif", fontWeight: 700, fontSize: "1.15rem", color: "var(--home-text-primary)" }}
                >
                  {step.title}
                </h3>
                <p style={{ color: "var(--home-text-secondary)", fontFamily: "'Cairo', sans-serif", lineHeight: 1.7, fontSize: "0.9rem" }}>
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
