import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "أحمد الراشدي",
    role: "صاحب متجر – أزياء",
    image: "https://images.unsplash.com/photo-1624411024074-18a756682b50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmFiaWMlMjBtYW4lMjBwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzY3MTIwMzl8MA&ixlib=rb-4.1.0&q=80&w=200",
    rating: 5,
    review: "غيّر الجاهمي ديزاين متجري على سلة بشكل كامل. ارتفعت المبيعات بنسبة 85% خلال الشهر الأول. عمل رائع وتسليم سريع جداً!",
    verified: true,
  },
  {
    id: 2,
    name: "سارة العتيبي",
    role: "مديرة تنفيذية – علامة تجارية للتجميل",
    image: "https://images.unsplash.com/photo-1770058428154-9eee8a6a1fbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHNtaWxpbmclMjBwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdHxlbnwxfHx8fDE3NzY2OTAyNTJ8MA&ixlib=rb-4.1.0&q=80&w=200",
    rating: 5,
    review: "حزمة الهوية البصرية كانت تستحق كل ريال. فهموا رؤيتي تماماً وقدموا تصميماً راقياً أحبه عملائي. أنصح بهم بشدة!",
    verified: true,
  },
  {
    id: 3,
    name: "خالد منصور",
    role: "مؤسس – إلكترونيات",
    image: "https://images.unsplash.com/photo-1634136941261-01d4bb876512?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBidXNpbmVzcyUyMGNhc3VhbCUyMHNtaWxpbmclMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzY3MTIwNDV8MA&ixlib=rb-4.1.0&q=80&w=200",
    rating: 5,
    review: "احترافية عالية واستجابة سريعة ونتائج ملموسة. تفعيل قالب عالي كان مثالياً. متجري الآن يبدو بقيمة 10 أضعاف ما دفعته. أفضل استثمار لعملي.",
    verified: true,
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className="size-4"
          style={{ color: s <= count ? "var(--home-star)" : "var(--home-star-empty)" }}
          fill={s <= count ? "var(--home-star)" : "none"}
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="relative overflow-hidden py-24" style={{ background: "var(--home-night-section-bg)" }}>
      <div
        className="absolute top-0 right-0 h-72 w-72 rounded-full opacity-15 blur-3xl"
        style={{ background: "var(--home-hero-blob-purple)" }}
      />
      <div
        className="absolute bottom-0 left-0 h-72 w-72 rounded-full opacity-15 blur-3xl"
        style={{ background: "var(--home-hero-blob-teal)" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16 text-center">
          <div
            className="mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold"
            style={{
              background: "rgba(255,255,255,0.08)",
              borderColor: "rgba(255,255,255,0.15)",
              color: "var(--home-brand-secondary)",
              fontFamily: "'Cairo', sans-serif",
            }}
          >
            <Star className="size-4" fill="var(--home-brand-secondary)" />
            آراء العملاء
          </div>
          <h2
            className="mb-4 text-white"
            style={{
              fontFamily: "'Cairo', sans-serif",
              fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
              fontWeight: 800,
            }}
          >
            ماذا يقول{" "}
            <span
              style={{
                background: "linear-gradient(135deg, var(--home-brand-muted), var(--home-brand-secondary))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              عملاؤنا
            </span>
          </h2>
          <p className="mx-auto max-w-xl" style={{ color: "var(--home-text-inverse-muted)", fontFamily: "'Cairo', sans-serif", lineHeight: 1.8 }}>
            أصحاب متاجر حقيقيون. نتائج حقيقية. اكتشف لماذا يثق بنا أكثر من 200 عمل تجاري.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.15, duration: 0.7 }}
              className="home-testimonial-card rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1"
            >
              <Quote className="mb-4 size-8" style={{ color: "var(--home-night-quote)" }} />

              <div className="mb-4">
                <StarRating count={t.rating} />
              </div>

              <p
                className="mb-6 flex-1"
                style={{
                  color: "rgba(255,255,255,0.8)",
                  fontFamily: "'Cairo', sans-serif",
                  lineHeight: 1.8,
                  fontSize: "0.95rem",
                }}
              >
                "{t.review}"
              </p>

              <div className="flex items-center gap-3 border-t pt-4" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                <img
                  src={t.image}
                  alt={t.name}
                  className="size-11 rounded-full border-2 object-cover"
                  style={{ borderColor: "rgba(108,92,231,0.5)" }}
                />
                <div>
                  <div
                    className="flex items-center gap-2 font-semibold text-white"
                    style={{ fontFamily: "'Cairo', sans-serif", fontSize: "0.9rem" }}
                  >
                    {t.name}
                    {t.verified && (
                      <span
                        className="rounded-full px-2 py-0.5 text-xs"
                        style={{ background: "rgba(0,206,201,0.2)", color: "var(--home-brand-secondary)" }}
                      >
                        ✓ موثق
                      </span>
                    )}
                  </div>
                  <div className="text-xs" style={{ color: "var(--home-text-inverse-subtle)", fontFamily: "'Cairo', sans-serif" }}>
                    {t.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="mt-12 flex flex-wrap justify-center gap-8 text-center"
        >
          {[
            { value: "4.9", label: "متوسط التقييم" },
            { value: "200+", label: "عميل سعيد" },
            { value: "98%", label: "يوصون بنا" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span className="text-4xl font-black text-white" style={{ fontFamily: "'Cairo', sans-serif" }}>
                {stat.value}
              </span>
              <span className="mt-1 text-sm" style={{ color: "var(--home-text-inverse-subtle)", fontFamily: "'Cairo', sans-serif" }}>
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
