import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ShoppingCart,
  Heart,
  Share2,
  Minus,
  Plus,
  Shield,
  RefreshCw,
  Truck,
  BadgeCheck,
} from "lucide-react";

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
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div
          className="flex items-center gap-0 overflow-hidden rounded-2xl"
          style={{ border: "1.5px solid var(--home-accent-soft-border)", background: "var(--home-card-bg)" }}
        >
          <button
            type="button"
            onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
            className="flex h-11 w-11 items-center justify-center transition-colors duration-150 hover:bg-[var(--home-accent-soft-bg)]"
            aria-label="تقليل الكمية"
          >
            <Minus className="h-4 w-4" style={{ color: "var(--home-brand)" }} />
          </button>
          <span
            className="w-10 text-center text-base font-bold"
            style={{ color: "var(--home-text-primary)", fontFamily: "'Cairo', sans-serif" }}
          >
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => onQuantityChange(quantity + 1)}
            className="flex h-11 w-11 items-center justify-center transition-colors duration-150 hover:bg-[var(--home-accent-soft-bg)]"
            aria-label="زيادة الكمية"
          >
            <Plus className="h-4 w-4" style={{ color: "var(--home-brand)" }} />
          </button>
        </div>

        <div className="flex flex-col items-end">
          <span className="text-xs" style={{ color: "var(--home-text-muted)", fontFamily: "'Cairo', sans-serif" }}>
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
                background: "var(--home-gradient-text)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {total.toLocaleString("ar-SA")} ر.س
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      <div className="flex gap-3">
        <motion.button
          type="button"
          onClick={handleAddToCart}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="flex flex-1 items-center justify-center gap-2 rounded-2xl py-4 text-sm font-bold text-white transition-shadow duration-300"
          style={{
            background: added ? "var(--home-success-gradient)" : "var(--home-gradient-brand)",
            boxShadow: "var(--home-cta-shadow)",
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
                <ShoppingCart className="h-4 w-4" />
                أضف إلى السلة
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        <motion.button
          type="button"
          onClick={onWishlistToggle}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          className="flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-200"
          style={{
            background: isWishlisted ? "var(--home-wishlist-bg)" : "var(--home-card-bg)",
            border: isWishlisted ? "1.5px solid var(--home-wishlist-border)" : "1.5px solid var(--home-accent-soft-border)",
            boxShadow: "var(--home-card-shadow)",
          }}
          aria-label={isWishlisted ? "إزالة من المفضلة" : "أضف للمفضلة"}
          aria-pressed={isWishlisted}
        >
          <motion.div animate={{ scale: isWishlisted ? [1, 1.3, 1] : 1 }} transition={{ duration: 0.3 }}>
            <Heart
              className="h-5 w-5"
              fill={isWishlisted ? "var(--home-wishlist)" : "none"}
              style={{ color: isWishlisted ? "var(--home-wishlist)" : "var(--home-brand)" }}
            />
          </motion.div>
        </motion.button>

        <motion.button
          type="button"
          onClick={handleShare}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          className="flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-200"
          style={{
            background: "var(--home-card-bg)",
            border: "1.5px solid var(--home-accent-soft-border)",
            boxShadow: "var(--home-card-shadow)",
          }}
          aria-label="مشاركة المنتج"
        >
          <Share2 className="h-5 w-5" style={{ color: "var(--home-brand)" }} />
        </motion.button>
      </div>

      <div
        className="grid grid-cols-2 gap-3 rounded-2xl p-4"
        style={{ background: "var(--home-card-bg)", border: "1px solid var(--home-card-border)" }}
      >
        {trustBadges.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-2">
            <div
              className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg"
              style={{ background: "var(--home-accent-soft-bg)" }}
            >
              <Icon className="h-3.5 w-3.5" style={{ color: "var(--home-brand)" }} />
            </div>
            <span className="text-xs font-medium" style={{ color: "var(--home-text-secondary)", fontFamily: "'Cairo', sans-serif" }}>
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
