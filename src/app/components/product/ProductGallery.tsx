import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

export type GalleryImage = {
  id: number;
  src: string;
  alt: string;
};

type Props = {
  images: GalleryImage[];
};

export function ProductGallery({ images }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setZoomPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }, []);

  const prev = () => setActiveIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setActiveIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div className="flex flex-col gap-3 select-none">
      {/* ── Main image ─────────────────────────────────────────────── */}
      <div
        className="relative rounded-3xl overflow-hidden bg-gray-50"
        style={{
          aspectRatio: "1 / 1",
          boxShadow: "0 8px 40px rgba(108,92,231,0.10)",
          cursor: isZoomed ? "zoom-out" : "zoom-in",
        }}
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => { setIsZoomed(false); setZoomPos({ x: 50, y: 50 }); }}
        onMouseMove={handleMouseMove}
      >
        {/* All images stacked; only active one visible */}
        {images.map((img, i) => (
          <img
            key={img.id}
            src={img.src}
            alt={img.alt}
            draggable={false}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              opacity: i === activeIndex ? 1 : 0,
              transition: "opacity 0.35s ease",
              transform: isZoomed && i === activeIndex ? "scale(2.2)" : "scale(1)",
              transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
              // Only transition the scale (not origin) so movement is instant
              transitionProperty: "opacity, transform",
              transitionDuration: isZoomed ? "0s, 0.25s" : "0.35s, 0.3s",
              transitionTimingFunction: "ease",
            }}
          />
        ))}

        {/* Discount badge */}
        <div
          className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-bold text-white z-10"
          style={{ background: "linear-gradient(135deg, #6C5CE7, #00CEC9)", fontFamily: "'Cairo', sans-serif" }}
        >
          خصم 30%
        </div>

        {/* Zoom hint — hides while zoomed */}
        <AnimatePresence>
          {!isZoomed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-white z-10"
              style={{
                background: "rgba(0,0,0,0.38)",
                backdropFilter: "blur(6px)",
                fontFamily: "'Cairo', sans-serif",
              }}
            >
              <ZoomIn className="w-3.5 h-3.5" />
              تكبير للتفاصيل
            </motion.div>
          )}
        </AnimatePresence>

        {/* Arrows — visible on hover */}
        <button
          onClick={prev}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center z-10 opacity-0 hover:opacity-100 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
          style={{ background: "rgba(255,255,255,0.9)", boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}
          aria-label="الصورة السابقة"
        >
          <ChevronRight className="w-4 h-4 text-gray-700" />
        </button>
        <button
          onClick={next}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center z-10 opacity-0 hover:opacity-100 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
          style={{ background: "rgba(255,255,255,0.9)", boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}
          aria-label="الصورة التالية"
        >
          <ChevronLeft className="w-4 h-4 text-gray-700" />
        </button>

        {/* Dot indicator */}
        <div className="absolute bottom-4 right-1/2 translate-x-1/2 flex gap-1.5 z-10">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              aria-label={`الصورة ${i + 1}`}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === activeIndex ? "22px" : "6px",
                height: "6px",
                background: i === activeIndex ? "#6C5CE7" : "rgba(255,255,255,0.65)",
              }}
            />
          ))}
        </div>
      </div>

      {/* ── Thumbnails ──────────────────────────────────────────────── */}
      <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${images.length}, 1fr)` }}>
        {images.map((img, i) => (
          <motion.button
            key={img.id}
            onClick={() => setActiveIndex(i)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="relative rounded-2xl overflow-hidden"
            style={{
              aspectRatio: "1 / 1",
              border: i === activeIndex ? "2.5px solid #6C5CE7" : "2.5px solid transparent",
              boxShadow:
                i === activeIndex
                  ? "0 0 0 3px rgba(108,92,231,0.18)"
                  : "0 2px 8px rgba(0,0,0,0.06)",
              opacity: i === activeIndex ? 1 : 0.6,
              transition: "opacity 0.2s ease, box-shadow 0.2s ease",
            }}
            aria-label={`عرض ${img.alt}`}
            aria-pressed={i === activeIndex}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover"
              draggable={false}
            />
          </motion.button>
        ))}
      </div>
    </div>
  );
}
