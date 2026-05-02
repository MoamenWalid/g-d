import { motion } from "motion/react";
import { Star, Tag, Users } from "lucide-react";

export type Size = { label: string; value: string; priceAdd: number; available: boolean };
export type Concentration = { label: string; value: string; available: boolean };

type Props = {
  name: string;
  brand: string;
  category: { name: string; slug: string };
  rating: number;
  reviewCount: number;
  soldCount: number;
  shortDesc: string;
  originalPrice: number;
  discount: number;
  sizes: Size[];
  concentrations: Concentration[];
  stock: number;
  selectedSize: string;
  selectedConcentration: string;
  currentPrice: number;
  onSizeChange: (val: string) => void;
  onConcentrationChange: (val: string) => void;
};

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className="h-4 w-4"
            fill={i <= Math.round(rating) ? "var(--home-star)" : "none"}
            style={{
              color: i <= Math.round(rating) ? "var(--home-star)" : "var(--home-star-empty)",
            }}
          />
        ))}
      </div>
      <span className="text-sm font-semibold" style={{ color: "var(--home-text-primary)", fontFamily: "'Cairo', sans-serif" }}>
        {rating}
      </span>
      <span className="text-sm" style={{ color: "var(--home-text-muted)", fontFamily: "'Cairo', sans-serif" }}>
        ({count.toLocaleString("ar-SA")} تقييم)
      </span>
    </div>
  );
}

export function ProductInfo({
  name,
  brand,
  category,
  rating,
  reviewCount,
  soldCount,
  shortDesc,
  originalPrice,
  discount,
  sizes,
  concentrations,
  stock,
  selectedSize,
  selectedConcentration,
  currentPrice,
  onSizeChange,
  onConcentrationChange,
}: Props) {
  return (
    <div className="flex flex-col gap-5">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-wrap items-center gap-3"
      >
        <a
          href={category.slug}
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-all duration-200 hover:opacity-80"
          style={{
            background: "var(--home-accent-soft-bg)",
            color: "var(--home-brand)",
            fontFamily: "'Cairo', sans-serif",
          }}
        >
          <Tag className="h-3 w-3" />
          {category.name}
        </a>
        <span className="text-xs" style={{ color: "var(--home-text-muted)", fontFamily: "'Cairo', sans-serif" }}>
          {brand}
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, duration: 0.45 }}
        style={{
          fontFamily: "'Cairo', sans-serif",
          fontWeight: 800,
          fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
          color: "var(--home-text-primary)",
          lineHeight: 1.3,
        }}
      >
        {name}
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="flex flex-wrap items-center gap-4"
      >
        <StarRating rating={rating} count={reviewCount} />
        <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--home-text-secondary)", fontFamily: "'Cairo', sans-serif" }}>
          <Users className="h-3.5 w-3.5" />
          {soldCount.toLocaleString("ar-SA")} تم شراؤه
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="text-sm leading-relaxed"
        style={{ color: "var(--home-text-secondary)", fontFamily: "'Cairo', sans-serif", lineHeight: 1.85 }}
      >
        {shortDesc}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="flex flex-wrap items-end gap-3 border-b pb-5"
        style={{ borderColor: "var(--home-accent-soft-border)" }}
      >
        <span
          style={{
            fontFamily: "'Cairo', sans-serif",
            fontWeight: 900,
            fontSize: "2.2rem",
            lineHeight: 1,
            letterSpacing: "-0.5px",
            background: "var(--home-gradient-text)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {currentPrice.toLocaleString("ar-SA")}
          <span style={{ fontSize: "1rem", marginRight: "4px" }}>ر.س</span>
        </span>

        <span className="text-base line-through" style={{ color: "var(--home-text-muted)", fontFamily: "'Cairo', sans-serif" }}>
          {originalPrice.toLocaleString("ar-SA")} ر.س
        </span>

        <span
          className="rounded-full px-2.5 py-0.5 text-xs font-bold text-white"
          style={{
            background: "var(--home-discount-gradient)",
            fontFamily: "'Cairo', sans-serif",
          }}
        >
          وفّر {discount}%
        </span>

        {stock <= 10 && (
          <span
            className="rounded-full px-2.5 py-1 text-xs font-semibold"
            style={{
              background: "var(--home-discount-soft-bg)",
              color: "var(--home-discount-soft-text)",
              fontFamily: "'Cairo', sans-serif",
            }}
          >
            ⚡ {stock} قطع فقط
          </span>
        )}
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.4 }}>
        <p className="mb-3 text-sm font-semibold" style={{ color: "var(--home-text-primary)", fontFamily: "'Cairo', sans-serif" }}>
          الحجم:{" "}
          <span style={{ color: "var(--home-brand)", fontWeight: 700 }}>
            {sizes.find((s) => s.value === selectedSize)?.label}
          </span>
        </p>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size.value}
              type="button"
              onClick={() => size.available && onSizeChange(size.value)}
              disabled={!size.available}
              className="relative rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200"
              style={{
                fontFamily: "'Cairo', sans-serif",
                background: selectedSize === size.value ? "var(--home-gradient-brand)" : "var(--home-card-bg)",
                color: selectedSize === size.value ? "white" : size.available ? "var(--home-text-primary)" : "var(--home-control-disabled-text)",
                border:
                  selectedSize === size.value ? "2px solid transparent" : "2px solid var(--home-accent-soft-border)",
                boxShadow:
                  selectedSize === size.value ? "var(--home-cta-shadow)" : "var(--home-card-shadow)",
                opacity: size.available ? 1 : 0.45,
                cursor: size.available ? "pointer" : "not-allowed",
                textDecoration: !size.available ? "line-through" : "none",
              }}
            >
              {size.label}
              {size.priceAdd > 0 && (
                <span
                  className="mr-1 text-xs"
                  style={{
                    color: selectedSize === size.value ? "var(--home-text-inverse-muted)" : "var(--home-text-muted)",
                  }}
                >
                  +{size.priceAdd}
                </span>
              )}
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.4 }}>
        <p className="mb-3 text-sm font-semibold" style={{ color: "var(--home-text-primary)", fontFamily: "'Cairo', sans-serif" }}>
          التركيز
        </p>
        <div className="flex flex-wrap gap-2">
          {concentrations.map((c) => (
            <button
              key={c.value}
              type="button"
              onClick={() => c.available && onConcentrationChange(c.value)}
              disabled={!c.available}
              className="rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200"
              style={{
                fontFamily: "'Cairo', sans-serif",
                background: selectedConcentration === c.value ? "var(--home-gradient-brand)" : "var(--home-card-bg)",
                color: selectedConcentration === c.value
                  ? "white"
                  : c.available
                    ? "var(--home-text-primary)"
                    : "var(--home-control-disabled-text)",
                border:
                  selectedConcentration === c.value ? "2px solid transparent" : "2px solid var(--home-accent-soft-border)",
                boxShadow:
                  selectedConcentration === c.value ? "var(--home-cta-shadow)" : "var(--home-card-shadow)",
                opacity: c.available ? 1 : 0.45,
                cursor: c.available ? "pointer" : "not-allowed",
                textDecoration: !c.available ? "line-through" : "none",
              }}
            >
              {c.label}
              {!c.available && <span className="mr-1 text-xs">(نفذ)</span>}
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
