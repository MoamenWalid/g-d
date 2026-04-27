import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShoppingCart, Heart, Share2, Minus, Plus, Shield, RefreshCw, Truck, BadgeCheck } from "lucide-react";

type Props = {
  currentPrice: number;
  quantity: number;
  isWishlisted: boolean;
  productName: string;
  onQuantityChange: (qty: number) => void;
  onWishlistToggle: () => void;
  onAddToCart: () => void;
};

const trustBadges = [
  { icon: Shield, label: "دفع آمن 100%" },
  { icon: RefreshCw, label: "إرجاع مجاني 7 أيام" },
  { icon: Truck, label: "شحن خلال 24 ساعة" },
  { icon: BadgeCheck, label: "منتج أصلي مضمون" },
];

export function ProductActions({
  currentPrice,
  quantity,
  isWishlisted,
  productName,
  onQuantityChange,
  onWishlistToggle,
  onAddToCart,
}: Props) {
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    onAddToCart();
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: productName, url: window.location.href });
    } else {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  const total = currentPrice * quantity;

  return (
    <div className="flex flex-col gap-5">
      {/* ── Quantity + Total ─────────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        {/* Stepper */}
        <div
          className="flex items-center gap-0 rounded-2xl overflow-hidden"
          style={{ border: "1.5px solid rgba(108,92,231,0.18)", background: "white" }}
        >
          <button
            onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
            className="w-11 h-11 flex items-center justify-center transition-colors duration-150 hover:bg-purple-50"
            aria-label="تقليل الكمية"
          >
            <Minus className="w-4 h-4" style={{ color: "#6C5CE7" }} />
          </button>
          <span
            className="w-10 text-center text-base font-bold"
            style={{ color: "#2D3436", fontFamily: "'Cairo', sans-serif" }}
          >
            {quantity}
          </span>
          <button
            onClick={() => onQuantityChange(quantity + 1)}
            className="w-11 h-11 flex items-center justify-center transition-colors duration-150 hover:bg-purple-50"
            aria-label="زيادة الكمية"
          >
            <Plus className="w-4 h-4" style={{ color: "#6C5CE7" }} />
          </button>
        </div>

        {/* Live total */}
        <div className="flex flex-col items-end">
          <span
            className="text-xs"
            style={{ color: "#a0aab4", fontFamily: "'Cairo', sans-serif" }}
          >
            الإجمالي
          </span>
          <AnimatePresence mode="wait">
            <motion.span
              key={total}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.2 }}
              className="text-xl font-black"
              style={{
                fontFamily: "'Cairo', sans-serif",
                background: "linear-gradient(135deg, #6C5CE7, #00CEC9)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {total.toLocaleString("ar-SA")} ر.س
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* ── CTA row ──────────────────────────────────────────────────── */}
      <div className="flex gap-3">
        {/* Add to Cart (primary) */}
        <motion.button
          onClick={handleAddToCart}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl text-white text-sm font-bold transition-shadow duration-300"
          style={{
            background: added
              ? "linear-gradient(135deg, #00b894, #00cec9)"
              : "linear-gradient(135deg, #6C5CE7, #00CEC9)",
            boxShadow: "0 8px 28px rgba(108,92,231,0.35)",
            fontFamily: "'Cairo', sans-serif",
            fontSize: "0.95rem",
          }}
          aria-label="أضف إلى السلة"
        >
          <AnimatePresence mode="wait">
            {added ? (
              <motion.span
                key="added"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                ✓ تمت الإضافة للسلة
              </motion.span>
            ) : (
              <motion.span
                key="add"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                أضف إلى السلة
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Wishlist */}
        <motion.button
          onClick={onWishlistToggle}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-200"
          style={{
            background: isWishlisted ? "rgba(255,118,117,0.12)" : "white",
            border: isWishlisted
              ? "1.5px solid rgba(255,118,117,0.35)"
              : "1.5px solid rgba(108,92,231,0.15)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}
          aria-label={isWishlisted ? "إزالة من المفضلة" : "أضف للمفضلة"}
          aria-pressed={isWishlisted}
        >
          <motion.div animate={{ scale: isWishlisted ? [1, 1.3, 1] : 1 }} transition={{ duration: 0.3 }}>
            <Heart
              className="w-5 h-5"
              fill={isWishlisted ? "#ff7675" : "none"}
              style={{ color: isWishlisted ? "#ff7675" : "#6C5CE7" }}
            />
          </motion.div>
        </motion.button>

        {/* Share */}
        <motion.button
          onClick={handleShare}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-200"
          style={{
            background: "white",
            border: "1.5px solid rgba(108,92,231,0.15)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}
          aria-label="مشاركة المنتج"
        >
          <Share2 className="w-5 h-5" style={{ color: "#6C5CE7" }} />
        </motion.button>
      </div>

      {/* ── Trust badges ─────────────────────────────────────────────── */}
      <div
        className="grid grid-cols-2 gap-3 p-4 rounded-2xl"
        style={{ background: "white", border: "1px solid rgba(108,92,231,0.08)" }}
      >
        {trustBadges.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(108,92,231,0.1)" }}
            >
              <Icon className="w-3.5 h-3.5" style={{ color: "#6C5CE7" }} />
            </div>
            <span
              className="text-xs font-medium"
              style={{ color: "#636e72", fontFamily: "'Cairo', sans-serif" }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
