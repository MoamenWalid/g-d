import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, Eye, ChevronDown } from "lucide-react";

const INITIAL_COUNT = 4;
const STEP = 4;
const MAX_COUNT = 12;

const projects = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1539278383962-a7774385fa02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBjbG90aGluZyUyMHN0b3JlJTIwd2Vic2l0ZSUyMGRlc2lnbnxlbnwxfHx8fDE3NzY3MTIwMzl8MA&ixlib=rb-4.1.0&q=80&w=600",
    name: "متجر لارا للأزياء",
    type: "تخصيص قالب سلة",
    tag: "تصميم",
    color: "#6C5CE7",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1676570092589-a6c09ecbb373?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBjb3NtZXRpY3MlMjBvbmxpbmUlMjBzaG9wJTIwYnJhbmRpbmd8ZW58MXx8fHwxNzc2NzEyMDQyfDA&ixlib=rb-4.1.0&q=80&w=600",
    name: "جلو بيوتي",
    type: "هوية بصرية + إعداد متجر",
    tag: "هوية بصرية",
    color: "#fd79a8",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1512058454905-6b841e7ad132?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwcmVzdGF1cmFudCUyMGVjb21tZXJjZSUyMHN0b3JlJTIwZGVzaWdufGVufDF8fHx8MTc3NjcxMjA0Mnww&ixlib=rb-4.1.0&q=80&w=600",
    name: "مطعم حيان",
    type: "تخصيص متجر سلة",
    tag: "تطوير",
    color: "#fdcb6e",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1741851547702-cac24b2a0d13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljcyUyMGdhZGdldHMlMjBlY29tbWVyY2UlMjBwcm9kdWN0JTIwcGFnZXxlbnwxfHx8fDE3NzY3MTIwNDV8MA&ixlib=rb-4.1.0&q=80&w=600",
    name: "تيك زون للإلكترونيات",
    type: "تفعيل القالب (عالي)",
    tag: "إعداد",
    color: "#00CEC9",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    name: "أناقة للعبايات",
    type: "تصميم شعار + هوية بصرية",
    tag: "هوية بصرية",
    color: "#fd79a8",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    name: "نور للتسوق",
    type: "إعداد متجر سلة كامل",
    tag: "إعداد",
    color: "#00CEC9",
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    name: "واتش هاوس",
    type: "تخصيص قالب نجم",
    tag: "تطوير",
    color: "#fdcb6e",
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    name: "لحظة للتصوير",
    type: "تصميم بانرات تسويقية",
    tag: "تصميم",
    color: "#6C5CE7",
  },
  {
    id: 9,
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    name: "سبلاش للعطور",
    type: "هوية بصرية + تصميم متجر",
    tag: "هوية بصرية",
    color: "#fd79a8",
  },
  {
    id: 10,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    name: "ستيب ستايل",
    type: "تفعيل قالب + تخصيص",
    tag: "إعداد",
    color: "#00CEC9",
  },
  {
    id: 11,
    image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    name: "هوم ديكور",
    type: "صفحة هبوط مخصصة",
    tag: "تطوير",
    color: "#fdcb6e",
  },
  {
    id: 12,
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    name: "رن سبورت",
    type: "تصميم شعار + بانرات",
    tag: "تصميم",
    color: "#6C5CE7",
  },
];

export function Portfolio() {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const visible = projects.slice(0, visibleCount);
  const hasMore = visibleCount < Math.min(projects.length, MAX_COUNT);

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + STEP, MAX_COUNT));
  };

  return (
    <section id="portfolio" className="py-24" style={{ background: "var(--home-section-muted)" }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16 text-center">
          <div
            className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
            style={{ background: "var(--home-pill-bg)", color: "var(--home-brand)", fontFamily: "'Cairo', sans-serif" }}
          >
            <Eye className="size-4" />
            أعمال مميزة
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
            معرض{" "}
            <span
              style={{
                background: "var(--home-gradient-text)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              أعمالنا
            </span>
          </h2>
          <p className="mx-auto max-w-xl" style={{ color: "var(--home-text-secondary)", fontFamily: "'Cairo', sans-serif", lineHeight: 1.8 }}>
            مجموعة مختارة من أعمالنا الأخيرة — متاجر حقيقية، نتائج حقيقية.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {visible.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group relative cursor-pointer overflow-hidden rounded-3xl"
              style={{
                boxShadow: "var(--home-portfolio-tile-shadow)",
                aspectRatio: "3/4",
              }}
            >
              <img
                src={project.image}
                alt={project.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              <div
                className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 transition-all duration-400 group-hover:opacity-100"
                style={{ background: "var(--home-portfolio-overlay)" }}
              >
                <div
                  className="mb-3 inline-flex self-start rounded-full px-3 py-1 text-xs font-bold text-white"
                  style={{ background: project.color }}
                >
                  {project.tag}
                </div>

                <h3 className="mb-1 text-white" style={{ fontFamily: "'Cairo', sans-serif", fontWeight: 700, fontSize: "1rem" }}>
                  {project.name}
                </h3>
                <p className="text-sm" style={{ color: "var(--home-text-inverse-muted)", fontFamily: "'Cairo', sans-serif" }}>
                  {project.type}
                </p>

                <button
                  type="button"
                  className="mt-3 flex items-center gap-2 self-start rounded-xl px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:scale-105"
                  style={{ background: "var(--home-portfolio-btn-bg)", backdropFilter: "blur(8px)" }}
                >
                  <ExternalLink className="size-4" />
                  عرض المشروع
                </button>
              </div>

              <div
                className="absolute top-4 right-4 rounded-full px-3 py-1 text-xs font-bold text-white transition-opacity duration-300 group-hover:opacity-0"
                style={{ background: `color-mix(in srgb, ${project.color} 88%, transparent)` }}
              >
                {project.tag}
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {hasMore && (
            <motion.div
              key="load-more"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="mt-10 text-center"
            >
              <button
                type="button"
                onClick={handleLoadMore}
                className="inline-flex items-center gap-2 rounded-2xl border px-8 py-3.5 text-sm font-semibold transition-all duration-300 hover:scale-105"
                style={{
                  color: "var(--home-brand)",
                  borderColor: "var(--home-loadmore-border)",
                  background: "var(--home-card-bg)",
                  fontFamily: "'Cairo', sans-serif",
                  boxShadow: "var(--home-loadmore-shadow)",
                  cursor: "pointer",
                }}
              >
                <ChevronDown className="size-4" />
                عرض المزيد
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
