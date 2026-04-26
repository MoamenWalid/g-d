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

const tagColors: Record<string, string> = {
  تصميم: "#6C5CE7",
  "هوية بصرية": "#fd79a8",
  تطوير: "#fdcb6e",
  إعداد: "#00CEC9",
};

export function Portfolio() {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const visible = projects.slice(0, visibleCount);
  const hasMore = visibleCount < Math.min(projects.length, MAX_COUNT);

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + STEP, MAX_COUNT));
  };

  return (
    <section id="portfolio" className="py-24" style={{ background: "#F8F9FC" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 text-sm font-semibold"
            style={{ background: "rgba(108,92,231,0.1)", color: "#6C5CE7", fontFamily: "'Cairo', sans-serif" }}
          >
            <Eye className="w-4 h-4" />
            أعمال مميزة
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
            معرض{" "}
            <span style={{ background: "linear-gradient(135deg, #6C5CE7, #00CEC9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              أعمالنا
            </span>
          </h2>
          <p
            className="max-w-xl mx-auto"
            style={{ color: "#636e72", fontFamily: "'Cairo', sans-serif", lineHeight: 1.8 }}
          >
            مجموعة مختارة من أعمالنا الأخيرة — متاجر حقيقية، نتائج حقيقية.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visible.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group relative rounded-3xl overflow-hidden cursor-pointer"
              style={{
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                aspectRatio: "3/4",
              }}
            >
              {/* Image */}
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Overlay on hover */}
              <div
                className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition-all duration-400"
                style={{
                  background: "linear-gradient(to top, rgba(20,10,40,0.95) 0%, rgba(20,10,40,0.4) 60%, transparent 100%)",
                }}
              >
                {/* Tag */}
                <div
                  className="inline-flex self-start px-3 py-1 rounded-full text-xs font-bold text-white mb-3"
                  style={{ background: tagColors[project.tag] || "#6C5CE7" }}
                >
                  {project.tag}
                </div>

                <h3
                  className="text-white mb-1"
                  style={{ fontFamily: "'Cairo', sans-serif", fontWeight: 700, fontSize: "1rem" }}
                >
                  {project.name}
                </h3>
                <p
                  className="text-sm"
                  style={{ color: "rgba(255,255,255,0.7)", fontFamily: "'Cairo', sans-serif" }}
                >
                  {project.type}
                </p>

                <button
                  className="mt-3 self-start flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:scale-105"
                  style={{ background: "rgba(108,92,231,0.7)", backdropFilter: "blur(8px)" }}
                >
                  <ExternalLink className="w-4 h-4" />
                  عرض المشروع
                </button>
              </div>

              {/* Tag always visible — top-right in RTL */}
              <div
                className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white group-hover:opacity-0 transition-opacity duration-300"
                style={{ background: `${tagColors[project.tag]}CC` }}
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
              className="text-center mt-10"
            >
              <button
                onClick={handleLoadMore}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-300 hover:scale-105 border"
                style={{
                  color: "#6C5CE7",
                  borderColor: "rgba(108,92,231,0.3)",
                  background: "white",
                  fontFamily: "'Cairo', sans-serif",
                  boxShadow: "0 4px 16px rgba(108,92,231,0.12)",
                  cursor: "pointer",
                }}
              >
                <ChevronDown className="w-4 h-4" />
                عرض المزيد
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
