import { useState, useCallback, type MouseEvent } from "react";
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

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setZoomPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }, []);

  const prev = () => setActiveIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setActiveIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div className="flex select-none flex-col gap-3">
      <div
        className="group relative cursor-zoom-in overflow-hidden rounded-3xl"
        style={{
          aspectRatio: "1 / 1",
          background: "var(--home-pdp-subtle-surface)",
          boxShadow: "var(--home-gallery-main-shadow)",
          cursor: isZoomed ? "zoom-out" : "zoom-in",
        }}
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => {
          setIsZoomed(false);
          setZoomPos({ x: 50, y: 50 });
        }}
        onMouseMove={handleMouseMove}
      >
        {images.map((img, i) => (
          <img
            key={img.id}
            src={img.src}
            alt={img.alt}
            draggable={false}
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              opacity: i === activeIndex ? 1 : 0,
              transition: "opacity 0.35s ease",
              transform: isZoomed && i === activeIndex ? "scale(2.2)" : "scale(1)",
              transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
              transitionProperty: "opacity, transform",
              transitionDuration: isZoomed ? "0s, 0.25s" : "0.35s, 0.3s",
              transitionTimingFunction: "ease",
            }}
          />
        ))}

        <div
          className="absolute right-4 top-4 z-10 rounded-full px-3 py-1.5 text-xs font-bold text-white"
          style={{ background: "var(--home-gradient-brand)", fontFamily: "'Cairo', sans-serif" }}
        >
          خصم 30%
        </div>

        <AnimatePresence>
          {!isZoomed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-4 left-4 z-10 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-white"
              style={{
                background: "var(--home-gallery-overlay)",
                backdropFilter: "blur(6px)",
                fontFamily: "'Cairo', sans-serif",
              }}
            >
              <ZoomIn className="h-3.5 w-3.5" />
              تكبير للتفاصيل
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={prev}
          className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full opacity-0 transition-all duration-200 hover:scale-110 group-hover:opacity-100"
          style={{
            background: "var(--home-gallery-nav-bg)",
            boxShadow: "var(--home-gallery-nav-shadow)",
          }}
          aria-label="الصورة السابقة"
        >
          <ChevronRight className="h-4 w-4" style={{ color: "var(--home-text-primary)" }} />
        </button>
        <button
          type="button"
          onClick={next}
          className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full opacity-0 transition-all duration-200 hover:scale-110 group-hover:opacity-100"
          style={{
            background: "var(--home-gallery-nav-bg)",
            boxShadow: "var(--home-gallery-nav-shadow)",
          }}
          aria-label="الصورة التالية"
        >
          <ChevronLeft className="h-4 w-4" style={{ color: "var(--home-text-primary)" }} />
        </button>

        <div className="absolute bottom-4 right-1/2 z-10 flex translate-x-1/2 gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-label={`الصورة ${i + 1}`}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === activeIndex ? "22px" : "6px",
                height: "6px",
                background:
                  i === activeIndex ? "var(--home-brand)" : "var(--home-gallery-thumb-inactive)",
              }}
            />
          ))}
        </div>
      </div>

      <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${images.length}, 1fr)` }}>
        {images.map((img, i) => (
          <motion.button
            key={img.id}
            type="button"
            onClick={() => setActiveIndex(i)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="relative overflow-hidden rounded-2xl"
            style={{
              aspectRatio: "1 / 1",
              border:
                i === activeIndex
                  ? "2.5px solid var(--home-brand)"
                  : "2.5px solid transparent",
              boxShadow:
                i === activeIndex
                  ? `0 0 0 3px var(--home-gallery-thumb-ring-active)`
                  : "var(--home-gallery-thumb-shadow)",
              opacity: i === activeIndex ? 1 : 0.6,
              transition: "opacity 0.2s ease, box-shadow 0.2s ease",
            }}
            aria-label={`عرض ${img.alt}`}
            aria-pressed={i === activeIndex}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="h-full w-full object-cover"
              draggable={false}
            />
          </motion.button>
        ))}
      </div>
    </div>
  );
}
