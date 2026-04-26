import { motion } from "motion/react";
import { Check, Star, Zap, Crown } from "lucide-react";

const plans = [
  {
    id: "starter",
    name: "المبتدئ",
    icon: Zap,
    desc: "مثالي للمتاجر الجديدة التي تبدأ على سلة.",
    price: "499 ر.س",
    period: "دفعة واحدة",
    highlighted: false,
    gradient: "linear-gradient(135deg, #74b9ff, #0984e3)",
    color: "#0984e3",
    features: [
      "تصميم شعار (مفهومان)",
      "مجموعة بانرات أساسية (3 بانرات)",
      "إعداد ألوان قالب سلة",
      "جولتان للتعديل",
      "تسليم خلال 72 ساعة",
      "دعم عبر البريد الإلكتروني",
    ],
    cta: "احصل على المبتدئ",
  },
  {
    id: "professional",
    name: "الاحترافي",
    icon: Star,
    desc: "الخيار الأكثر شيوعاً للأعمال النامية.",
    price: "1,299 ر.س",
    period: "دفعة واحدة",
    highlighted: true,
    gradient: "linear-gradient(135deg, #6C5CE7, #00CEC9)",
    color: "#6C5CE7",
    badge: "الأكثر شيوعاً",
    features: [
      "حزمة هوية بصرية كاملة",
      "إعداد متجر سلة كامل",
      "تفعيل القالب (عالي/نجم)",
      "10 بانرات مخصصة",
      "تعديلات غير محدودة",
      "تسليم خلال 48 ساعة",
      "دعم واتساب أولوية",
      "شهر صيانة مجانية",
    ],
    cta: "احصل على الاحترافي",
  },
  {
    id: "premium",
    name: "المميز",
    icon: Crown,
    desc: "الحزمة الشاملة للعلامات التجارية الراسخة الساعية للتميز.",
    price: "2,999 ر.س",
    period: "دفعة واحدة",
    highlighted: false,
    gradient: "linear-gradient(135deg, #fdcb6e, #e17055)",
    color: "#e17055",
    features: [
      "كل ما في الاحترافي",
      "صفحات هبوط مخصصة (3)",
      "تعديل صور المنتجات (50)",
      "تحسين محركات البحث",
      "كيت وسائل التواصل الاجتماعي",
      "إعداد التحليلات",
      "3 أشهر صيانة مجانية",
      "مدير حساب مخصص",
    ],
    cta: "احصل على المميز",
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24" style={{ background: "#F8F9FC" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 text-sm font-semibold"
            style={{ background: "rgba(108,92,231,0.1)", color: "#6C5CE7", fontFamily: "'Cairo', sans-serif" }}
          >
            <Crown className="w-4 h-4" />
            خطط الأسعار
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
            أسعار واضحة{" "}
            <span style={{ background: "linear-gradient(135deg, #6C5CE7, #00CEC9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              وشفافة
            </span>
          </h2>
          <p
            className="max-w-xl mx-auto"
            style={{ color: "#636e72", fontFamily: "'Cairo', sans-serif", lineHeight: 1.8 }}
          >
            لا رسوم خفية. اختر الخطة التي تناسب احتياجاتك وميزانيتك.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.15, duration: 0.7 }}
              className={`relative rounded-3xl p-8 flex flex-col transition-all duration-300 ${plan.highlighted ? "md:-mt-4 md:mb-4" : ""}`}
              style={{
                background: plan.highlighted
                  ? "linear-gradient(160deg, #1a0533, #2d1b69, #0d2b52)"
                  : "white",
                border: plan.highlighted
                  ? "1px solid rgba(108,92,231,0.5)"
                  : "1px solid rgba(108,92,231,0.1)",
                boxShadow: plan.highlighted
                  ? "0 24px 60px rgba(108,92,231,0.35)"
                  : "0 4px 20px rgba(0,0,0,0.06)",
              }}
            >
              {/* Badge */}
              {plan.badge && (
                <div
                  className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full text-xs font-bold text-white"
                  style={{ background: plan.gradient }}
                >
                  ⭐ {plan.badge}
                </div>
              )}

              {/* Icon + Plan name */}
              <div className="flex items-center gap-4 mb-5">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ background: plan.gradient, boxShadow: `0 6px 20px ${plan.color}40` }}
                >
                  <plan.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: "'Cairo', sans-serif",
                      fontWeight: 700,
                      fontSize: "1.15rem",
                      color: plan.highlighted ? "white" : "#2D3436",
                    }}
                  >
                    {plan.name}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Cairo', sans-serif",
                      fontSize: "0.8rem",
                      color: plan.highlighted ? "rgba(255,255,255,0.6)" : "#636e72",
                    }}
                  >
                    {plan.desc}
                  </p>
                </div>
              </div>

              {/* Price */}
              <div className="mb-6 pb-6 border-b" style={{ borderColor: plan.highlighted ? "rgba(255,255,255,0.12)" : "rgba(108,92,231,0.1)" }}>
                <span
                  style={{
                    fontFamily: "'Cairo', sans-serif",
                    fontWeight: 900,
                    fontSize: "2.5rem",
                    color: plan.highlighted ? "white" : "#2D3436",
                  }}
                >
                  {plan.price}
                </span>
                <span
                  className="mr-2 text-sm"
                  style={{ color: plan.highlighted ? "rgba(255,255,255,0.5)" : "#a0aab4", fontFamily: "'Cairo', sans-serif" }}
                >
                  / {plan.period}
                </span>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: plan.highlighted ? "rgba(0,206,201,0.2)" : `${plan.color}18` }}
                    >
                      <Check className="w-3 h-3" style={{ color: plan.highlighted ? "#00CEC9" : plan.color }} />
                    </div>
                    <span
                      className="text-sm"
                      style={{
                        color: plan.highlighted ? "rgba(255,255,255,0.8)" : "#636e72",
                        fontFamily: "'Cairo', sans-serif",
                        lineHeight: 1.5,
                      }}
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                className="w-full py-4 rounded-2xl text-sm font-bold transition-all duration-300 hover:scale-105"
                style={{
                  background: plan.highlighted ? plan.gradient : "transparent",
                  color: plan.highlighted ? "white" : plan.color,
                  border: plan.highlighted ? "none" : `2px solid ${plan.color}40`,
                  boxShadow: plan.highlighted ? `0 8px 24px ${plan.color}40` : "none",
                  fontFamily: "'Cairo', sans-serif",
                }}
                onMouseEnter={(e) => {
                  if (!plan.highlighted) {
                    (e.currentTarget as HTMLButtonElement).style.background = `${plan.color}12`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!plan.highlighted) {
                    (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                  }
                }}
              >
                {plan.cta} ←
              </button>
            </motion.div>
          ))}
        </div>

        <p
          className="text-center mt-8 text-sm"
          style={{ color: "#a0aab4", fontFamily: "'Cairo', sans-serif" }}
        >
          جميع الخطط تشمل ضمان الرضا. تحتاج حزمة مخصصة؟{" "}
          <a href="#contact" style={{ color: "#6C5CE7", fontWeight: 600 }}>تواصل معنا</a>
        </p>
      </div>
    </section>
  );
}
