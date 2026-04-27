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
  basePrice: number;
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
            className="w-4 h-4"
            fill={i <= Math.round(rating) ? "#FDCB6E" : "none"}
            style={{ color: i <= Math.round(rating) ? "#FDCB6E" : "#D1D5DB" }}
          />
        ))}
      </div>
      <span
        className="text-sm font-semibold"
        style={{ color: "#2D3436", fontFamily: "'Cairo', sans-serif" }}
      >
        {rating}
      </span>
      <span
        className="text-sm"
        style={{ color: "#a0aab4", fontFamily: "'Cairo', sans-serif" }}
      >
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
  basePrice,
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
      {/* Category + Brand */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-3 flex-wrap"
      >
        <a
          href={category.slug}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 hover:opacity-80"
          style={{
            background: "rgba(108,92,231,0.1)",
            color: "#6C5CE7",
            fontFamily: "'Cairo', sans-serif",
          }}
        >
          <Tag className="w-3 h-3" />
          {category.name}
        </a>
        <span
          className="text-xs"
          style={{ color: "#a0aab4", fontFamily: "'Cairo', sans-serif" }}
        >
          {brand}
        </span>
      </motion.div>

      {/* Product Name */}
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, duration: 0.45 }}
        style={{
          fontFamily: "'Cairo', sans-serif",
          fontWeight: 800,
          fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
          color: "#2D3436",
          lineHeight: 1.3,
        }}
      >
        {name}
      </motion.h1>

      {/* Rating + Sold */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="flex items-center gap-4 flex-wrap"
      >
        <StarRating rating={rating} count={reviewCount} />
        <div
          className="flex items-center gap-1.5 text-xs"
          style={{ color: "#636e72", fontFamily: "'Cairo', sans-serif" }}
        >
          <Users className="w-3.5 h-3.5" />
          {soldCount.toLocaleString("ar-SA")} تم شراؤه
        </div>
      </motion.div>

      {/* Short description */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="text-sm leading-relaxed"
        style={{ color: "#636e72", fontFamily: "'Cairo', sans-serif", lineHeight: 1.85 }}
      >
        {shortDesc}
      </motion.p>

      {/* ── Price block ──────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="flex items-end gap-3 flex-wrap pb-5 border-b"
        style={{ borderColor: "rgba(108,92,231,0.1)" }}
      >
        <span
          style={{
            fontFamily: "'Cairo', sans-serif",
            fontWeight: 900,
            fontSize: "2.2rem",
            lineHeight: 1,
            letterSpacing: "-0.5px",
            background: "linear-gradient(135deg, #6C5CE7, #00CEC9)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {currentPrice.toLocaleString("ar-SA")}
          <span style={{ fontSize: "1rem", marginRight: "4px" }}>ر.س</span>
        </span>

        <span
          className="text-base line-through"
          style={{ color: "#b2bec3", fontFamily: "'Cairo', sans-serif" }}
        >
          {originalPrice.toLocaleString("ar-SA")} ر.س
        </span>

        <span
          className="px-2.5 py-0.5 rounded-full text-xs font-bold text-white"
          style={{
            background: "linear-gradient(135deg, #e17055, #d63031)",
            fontFamily: "'Cairo', sans-serif",
          }}
        >
          وفّر {discount}%
        </span>

        {stock <= 10 && (
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{
              background: "rgba(225,112,85,0.12)",
              color: "#e17055",
              fontFamily: "'Cairo', sans-serif",
            }}
          >
            ⚡ {stock} قطع فقط
          </span>
        )}
      </motion.div>

      {/* ── Size variant ─────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.4 }}
      >
        <p
          className="text-sm font-semibold mb-3"
          style={{ color: "#2D3436", fontFamily: "'Cairo', sans-serif" }}
        >
          الحجم:{" "}
          <span style={{ color: "#6C5CE7", fontWeight: 700 }}>
            {sizes.find((s) => s.value === selectedSize)?.label}
          </span>
        </p>
        <div className="flex gap-2 flex-wrap">
          {sizes.map((size) => (
            <button
              key={size.value}
              onClick={() => size.available && onSizeChange(size.value)}
              disabled={!size.available}
              className="relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
              style={{
                fontFamily: "'Cairo', sans-serif",
                background:
                  selectedSize === size.value
                    ? "linear-gradient(135deg, #6C5CE7, #00CEC9)"
                    : "white",
                color: selectedSize === size.value ? "white" : size.available ? "#2D3436" : "#b2bec3",
                border:
                  selectedSize === size.value
                    ? "2px solid transparent"
                    : "2px solid rgba(108,92,231,0.15)",
                boxShadow:
                  selectedSize === size.value
                    ? "0 4px 16px rgba(108,92,231,0.3)"
                    : "0 2px 8px rgba(0,0,0,0.04)",
                opacity: size.available ? 1 : 0.45,
                cursor: size.available ? "pointer" : "not-allowed",
                textDecoration: !size.available ? "line-through" : "none",
              }}
            >
              {size.label}
              {size.priceAdd > 0 && (
                <span
                  className="text-xs mr-1"
                  style={{
                    color: selectedSize === size.value ? "rgba(255,255,255,0.75)" : "#a0aab4",
                  }}
                >
                  +{size.priceAdd}
                </span>
              )}
            </button>
          ))}
        </div>
      </motion.div>

      {/* ── Concentration variant ─────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <p
          className="text-sm font-semibold mb-3"
          style={{ color: "#2D3436", fontFamily: "'Cairo', sans-serif" }}
        >
          التركيز
        </p>
        <div className="flex gap-2 flex-wrap">
          {concentrations.map((c) => (
            <button
              key={c.value}
              onClick={() => c.available && onConcentrationChange(c.value)}
              disabled={!c.available}
              className="px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
              style={{
                fontFamily: "'Cairo', sans-serif",
                background:
                  selectedConcentration === c.value
                    ? "linear-gradient(135deg, #6C5CE7, #00CEC9)"
                    : "white",
                color:
                  selectedConcentration === c.value
                    ? "white"
                    : c.available
                    ? "#2D3436"
                    : "#b2bec3",
                border:
                  selectedConcentration === c.value
                    ? "2px solid transparent"
                    : "2px solid rgba(108,92,231,0.15)",
                boxShadow:
                  selectedConcentration === c.value
                    ? "0 4px 16px rgba(108,92,231,0.3)"
                    : "0 2px 8px rgba(0,0,0,0.04)",
                opacity: c.available ? 1 : 0.45,
                cursor: c.available ? "pointer" : "not-allowed",
                textDecoration: !c.available ? "line-through" : "none",
              }}
            >
              {c.label}
              {!c.available && (
                <span className="mr-1 text-xs">(نفذ)</span>
              )}
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
