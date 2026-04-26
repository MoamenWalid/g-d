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
    <section id="why-us" className="py-24" style={{ background: "white" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Right: Content (first in DOM = right in RTL) */}
          <div>
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 text-sm font-semibold"
              style={{ background: "rgba(108,92,231,0.1)", color: "#6C5CE7", fontFamily: "'Cairo', sans-serif" }}
            >
              <Award className="w-4 h-4" />
              لماذا نحن
            </div>
            <h2
              className="mb-6"
              style={{
                fontFamily: "'Cairo', sans-serif",
                fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                fontWeight: 800,
                color: "#2D3436",
                lineHeight: 1.3,
              }}
            >
              لماذا يختارنا الآلاف من{" "}
              <span style={{ background: "linear-gradient(135deg, #6C5CE7, #00CEC9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                أصحاب المتاجر
              </span>
            </h2>
            <p
              className="mb-8"
              style={{ color: "#636e72", fontFamily: "'Cairo', sans-serif", lineHeight: 1.8, fontSize: "1.05rem", maxWidth: "480px" }}
            >
              لسنا مجرد وكالة تصميم — نحن شريكك في النمو. كل خدمة مصممة لتحقيق نتائج أعمال حقيقية على منصة سلة.
            </p>

            {/* Mini stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { value: "200+", label: "متجر تم بناؤه" },
                { value: "5 سنوات", label: "خبرة" },
                { value: "48 ساعة", label: "متوسط التسليم" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl p-4 text-center"
                  style={{ background: "#F8F9FC", border: "1px solid rgba(108,92,231,0.1)" }}
                >
                  <div
                    className="font-black"
                    style={{ fontFamily: "'Cairo', sans-serif", fontSize: "1.5rem", color: "#2D3436" }}
                  >
                    {s.value}
                  </div>
                  <div
                    className="text-xs"
                    style={{ color: "#636e72", fontFamily: "'Cairo', sans-serif" }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            <a
              href="#pricing"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-white font-bold transition-all duration-300 hover:scale-105 hover:shadow-xl"
              style={{
                background: "linear-gradient(135deg, #6C5CE7, #00CEC9)",
                boxShadow: "0 8px 30px rgba(108,92,231,0.35)",
                fontFamily: "'Cairo', sans-serif",
              }}
            >
              ابدأ اليوم ←
            </a>
          </div>

          {/* Left: Benefit Cards (second in DOM = left in RTL) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 group"
                style={{
                  background: "#F8F9FC",
                  border: "1px solid rgba(108,92,231,0.08)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background = "white";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 12px 40px ${b.color}25`;
                  (e.currentTarget as HTMLDivElement).style.borderColor = `${b.color}30`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background = "#F8F9FC";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(108,92,231,0.08)";
                }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: b.gradient, boxShadow: `0 6px 20px ${b.color}40` }}
                >
                  <b.icon className="w-6 h-6 text-white" />
                </div>
                <h3
                  className="mb-2"
                  style={{ fontFamily: "'Cairo', sans-serif", fontWeight: 700, fontSize: "1rem", color: "#2D3436" }}
                >
                  {b.title}
                </h3>
                <p
                  style={{ color: "#636e72", fontFamily: "'Cairo', sans-serif", fontSize: "0.88rem", lineHeight: 1.7 }}
                >
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
