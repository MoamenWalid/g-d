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
    <section className="py-24" style={{ background: "white" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 text-sm font-semibold"
            style={{ background: "rgba(0,206,201,0.1)", color: "#00CEC9", fontFamily: "'Cairo', sans-serif" }}
          >
            <Rocket className="w-4 h-4" />
            عملية بسيطة
          </div>
          <h2
            className="mb-4"
            style={{
              fontFamily: "'Cairo', sans-serif",
              fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
              fontWeight: 800,
              color: "#2D3436",
            }}
          >
            كيف{" "}
            <span style={{ background: "linear-gradient(135deg, #6C5CE7, #00CEC9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              نعمل
            </span>
          </h2>
          <p
            className="max-w-xl mx-auto"
            style={{ color: "#636e72", fontFamily: "'Cairo', sans-serif", lineHeight: 1.8 }}
          >
            من اختيار الخدمة إلى استلام النتيجة النهائية — بسيط وسريع وخالٍ من التعقيد.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line (desktop) */}
          <div
            className="hidden md:block absolute top-20 left-1/4 right-1/4 h-px"
            style={{ background: "linear-gradient(90deg, #6C5CE7, #00CEC9)", zIndex: 0 }}
          />
          <div
            className="hidden md:block absolute top-20 left-1/2 right-0 h-px"
            style={{ background: "linear-gradient(90deg, #00CEC9, #fd79a8)", zIndex: 0 }}
          />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.15, duration: 0.7 }}
              className="relative flex flex-col items-center text-center group"
            >
              {/* Number circle */}
              <div className="relative mb-6 z-10">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-sm mb-2 mx-auto transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: step.gradient,
                    boxShadow: `0 8px 32px ${step.color}40`,
                    fontFamily: "'Cairo', sans-serif",
                  }}
                >
                  <step.icon className="w-7 h-7" />
                </div>
                <div
                  className="absolute -top-3 -left-3 w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black text-white"
                  style={{ background: step.gradient, fontFamily: "'Cairo', sans-serif" }}
                >
                  {step.number}
                </div>
              </div>

              {/* Text */}
              <div
                className="rounded-2xl p-6 w-full transition-all duration-300"
                style={{
                  background: "#F8F9FC",
                  border: "1px solid rgba(108,92,231,0.08)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 12px 40px ${step.color}20`;
                  (e.currentTarget as HTMLDivElement).style.borderColor = `${step.color}30`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(108,92,231,0.08)";
                }}
              >
                <h3
                  className="mb-3"
                  style={{ fontFamily: "'Cairo', sans-serif", fontWeight: 700, fontSize: "1.15rem", color: "#2D3436" }}
                >
                  {step.title}
                </h3>
                <p style={{ color: "#636e72", fontFamily: "'Cairo', sans-serif", lineHeight: 1.7, fontSize: "0.9rem" }}>
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
