import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, Star, ShoppingBag } from "lucide-react";

export type RelatedProduct = {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  image: string;
  badge?: string;
};

type Props = {
  products: RelatedProduct[];
};

function ProductCard({ product }: { product: RelatedProduct }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="relative flex-none cursor-pointer overflow-hidden rounded-2xl"
      style={{
        width: "clamp(220px, 28vw, 280px)",
        background: "var(--home-card-bg)",
        boxShadow: hovered ? "var(--home-card-shadow-hover)" : "var(--home-card-shadow)",
        transition: "box-shadow 0.25s ease",
        border: "1px solid var(--home-card-border)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: "4 / 3" }}>
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500"
          style={{ transform: hovered ? "scale(1.08)" : "scale(1)" }}
          draggable={false}
        />

        {product.discount > 0 && (
          <span
            className="absolute right-3 top-3 rounded-full px-2.5 py-1 text-xs font-bold text-white"
            style={{
              background: "var(--home-discount-gradient)",
              fontFamily: "'Cairo', sans-serif",
            }}
          >
            -{product.discount}%
          </span>
        )}

        {product.badge && (
          <span
            className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-bold text-white"
            style={{
              background: "var(--home-gradient-brand)",
              fontFamily: "'Cairo', sans-serif",
            }}
          >
            {product.badge}
          </span>
        )}

        <div
          className="absolute inset-0 flex items-end justify-center pb-4 transition-opacity duration-200"
          style={{ opacity: hovered ? 1 : 0, background: "var(--home-related-overlay)" }}
        >
          <button
            type="button"
            className="flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold text-white"
            style={{
              background: "var(--home-gradient-brand)",
              fontFamily: "'Cairo', sans-serif",
              boxShadow: "var(--home-cta-shadow)",
            }}
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            أضف إلى السلة
          </button>
        </div>
      </div>

      <div className="p-4">
        <h4
          className="mb-2 line-clamp-2 text-sm font-semibold"
          style={{ color: "var(--home-text-primary)", fontFamily: "'Cairo', sans-serif", lineHeight: 1.5 }}
        >
          {product.name}
        </h4>

        <div className="mb-2.5 flex gap-0.5">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star
              key={i}
              className="h-3 w-3"
              fill={i <= Math.round(product.rating) ? "var(--home-star)" : "none"}
              style={{ color: i <= Math.round(product.rating) ? "var(--home-star)" : "var(--home-star-empty)" }}
            />
          ))}
          <span className="mr-1 text-xs" style={{ color: "var(--home-text-muted)", fontFamily: "'Cairo', sans-serif" }}>
            {product.rating}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span
            className="text-base font-black"
            style={{
              fontFamily: "'Cairo', sans-serif",
              background: "var(--home-gradient-text)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {product.price.toLocaleString("ar-SA")} ر.س
          </span>
          {product.originalPrice > product.price && (
            <span className="text-xs line-through" style={{ color: "var(--home-text-muted)", fontFamily: "'Cairo', sans-serif" }}>
              {product.originalPrice.toLocaleString("ar-SA")}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function RelatedProducts({ products }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    skipSnaps: false,
  });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateButtons = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", updateButtons);
    emblaApi.on("reInit", updateButtons);
    updateButtons();
  }, [emblaApi, updateButtons]);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h2
            style={{
              fontFamily: "'Cairo', sans-serif",
              fontWeight: 800,
              fontSize: "1.4rem",
              color: "var(--home-text-primary)",
            }}
          >
            قد يعجبك أيضاً
          </h2>
          <p className="mt-0.5 text-sm" style={{ color: "var(--home-text-muted)", fontFamily: "'Cairo', sans-serif" }}>
            منتجات مختارة خصيصاً لك
          </p>
        </div>

        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!canPrev}
            className="flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200"
            style={{
              background: canPrev ? "var(--home-gradient-brand)" : "var(--home-control-disabled-bg)",
              boxShadow: canPrev ? "var(--home-cta-shadow)" : "none",
              cursor: canPrev ? "pointer" : "not-allowed",
            }}
            aria-label="السابق"
          >
            <ChevronRight className="h-4 w-4" style={{ color: canPrev ? "white" : "var(--home-control-disabled-text)" }} />
          </button>
          <button
            type="button"
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canNext}
            className="flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200"
            style={{
              background: canNext ? "var(--home-gradient-brand)" : "var(--home-control-disabled-bg)",
              boxShadow: canNext ? "var(--home-cta-shadow)" : "none",
              cursor: canNext ? "pointer" : "not-allowed",
            }}
            aria-label="التالي"
          >
            <ChevronLeft className="h-4 w-4" style={{ color: canNext ? "white" : "var(--home-control-disabled-text)" }} />
          </button>
        </div>
      </div>

      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
