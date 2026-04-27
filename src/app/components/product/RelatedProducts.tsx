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
      className="relative rounded-2xl overflow-hidden bg-white cursor-pointer flex-none"
      style={{
        width: "clamp(220px, 28vw, 280px)",
        boxShadow: hovered
          ? "0 16px 40px rgba(108,92,231,0.16)"
          : "0 4px 16px rgba(0,0,0,0.07)",
        transition: "box-shadow 0.25s ease",
        border: "1px solid rgba(108,92,231,0.08)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: "4 / 3" }}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{ transform: hovered ? "scale(1.08)" : "scale(1)" }}
          draggable={false}
        />

        {/* Discount badge */}
        {product.discount > 0 && (
          <span
            className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold text-white"
            style={{
              background: "linear-gradient(135deg, #e17055, #d63031)",
              fontFamily: "'Cairo', sans-serif",
            }}
          >
            -{product.discount}%
          </span>
        )}

        {/* Badge */}
        {product.badge && (
          <span
            className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold text-white"
            style={{
              background: "linear-gradient(135deg, #6C5CE7, #00CEC9)",
              fontFamily: "'Cairo', sans-serif",
            }}
          >
            {product.badge}
          </span>
        )}

        {/* Quick add overlay */}
        <div
          className="absolute inset-0 flex items-end justify-center pb-4 transition-opacity duration-200"
          style={{ opacity: hovered ? 1 : 0, background: "linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 60%)" }}
        >
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-xs font-semibold"
            style={{
              background: "linear-gradient(135deg, #6C5CE7, #00CEC9)",
              fontFamily: "'Cairo', sans-serif",
              boxShadow: "0 4px 16px rgba(108,92,231,0.4)",
            }}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            أضف إلى السلة
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h4
          className="text-sm font-semibold mb-2 line-clamp-2"
          style={{ color: "#2D3436", fontFamily: "'Cairo', sans-serif", lineHeight: 1.5 }}
        >
          {product.name}
        </h4>

        {/* Stars */}
        <div className="flex gap-0.5 mb-2.5">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star
              key={i}
              className="w-3 h-3"
              fill={i <= Math.round(product.rating) ? "#FDCB6E" : "none"}
              style={{ color: i <= Math.round(product.rating) ? "#FDCB6E" : "#E2E8F0" }}
            />
          ))}
          <span
            className="text-xs mr-1"
            style={{ color: "#a0aab4", fontFamily: "'Cairo', sans-serif" }}
          >
            {product.rating}
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span
            className="text-base font-black"
            style={{
              fontFamily: "'Cairo', sans-serif",
              background: "linear-gradient(135deg, #6C5CE7, #00CEC9)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {product.price.toLocaleString("ar-SA")} ر.س
          </span>
          {product.originalPrice > product.price && (
            <span
              className="text-xs line-through"
              style={{ color: "#b2bec3", fontFamily: "'Cairo', sans-serif" }}
            >
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
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2
            style={{
              fontFamily: "'Cairo', sans-serif",
              fontWeight: 800,
              fontSize: "1.4rem",
              color: "#2D3436",
            }}
          >
            قد يعجبك أيضاً
          </h2>
          <p
            className="text-sm mt-0.5"
            style={{ color: "#a0aab4", fontFamily: "'Cairo', sans-serif" }}
          >
            منتجات مختارة خصيصاً لك
          </p>
        </div>

        {/* Nav buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!canPrev}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
            style={{
              background: canPrev ? "linear-gradient(135deg, #6C5CE7, #00CEC9)" : "#f1f3f9",
              boxShadow: canPrev ? "0 4px 12px rgba(108,92,231,0.3)" : "none",
              cursor: canPrev ? "pointer" : "not-allowed",
            }}
            aria-label="السابق"
          >
            <ChevronRight
              className="w-4 h-4"
              style={{ color: canPrev ? "white" : "#b2bec3" }}
            />
          </button>
          <button
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canNext}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
            style={{
              background: canNext ? "linear-gradient(135deg, #6C5CE7, #00CEC9)" : "#f1f3f9",
              boxShadow: canNext ? "0 4px 12px rgba(108,92,231,0.3)" : "none",
              cursor: canNext ? "pointer" : "not-allowed",
            }}
            aria-label="التالي"
          >
            <ChevronLeft
              className="w-4 h-4"
              style={{ color: canNext ? "white" : "#b2bec3" }}
            />
          </button>
        </div>
      </div>

      {/* Carousel */}
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
