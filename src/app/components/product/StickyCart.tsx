import { motion, AnimatePresence } from "motion/react";
import { ShoppingCart } from "lucide-react";

type Props = {
  show: boolean;
  productName: string;
  currentPrice: number;
  quantity: number;
  productImage: string;
  onAddToCart: () => void;
};

export function StickyCart({
  show,
  productName,
  currentPrice,
  quantity,
  productImage,
  onAddToCart,
}: Props) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 35 }}
          className="fixed bottom-0 left-0 right-0 z-50"
          style={{
            background: "var(--home-sticky-cart-bg)",
            backdropFilter: "blur(16px)",
            borderTop: "1px solid var(--home-sticky-cart-border)",
            boxShadow: "var(--home-sticky-cart-shadow)",
          }}
        >
          <div className="mx-auto max-w-7xl px-4 py-3">
            <div className="flex items-center gap-4">
              <div
                className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-xl"
                style={{ border: "1.5px solid var(--home-accent-soft-border)" }}
              >
                <img src={productImage} alt={productName} className="h-full w-full object-cover" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold" style={{ color: "var(--home-text-primary)", fontFamily: "'Cairo', sans-serif" }}>
                  {productName}
                </p>
                <p className="text-xs" style={{ color: "var(--home-text-secondary)", fontFamily: "'Cairo', sans-serif" }}>
                  الكمية: {quantity} ×{" "}
                  <span style={{ color: "var(--home-brand)", fontWeight: 700 }}>
                    {currentPrice.toLocaleString("ar-SA")} ر.س
                  </span>
                </p>
              </div>

              <div className="flex flex-shrink-0 items-center gap-3">
                <div className="hidden text-left sm:block">
                  <p className="text-xs" style={{ color: "var(--home-text-muted)", fontFamily: "'Cairo', sans-serif" }}>
                    الإجمالي
                  </p>
                  <p
                    className="text-base font-black"
                    style={{
                      fontFamily: "'Cairo', sans-serif",
                      background: "var(--home-gradient-text)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {(currentPrice * quantity).toLocaleString("ar-SA")} ر.س
                  </p>
                </div>

                <motion.button
                  type="button"
                  onClick={onAddToCart}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 whitespace-nowrap rounded-2xl px-5 py-3 text-sm font-bold text-white"
                  style={{
                    background: "var(--home-gradient-brand)",
                    boxShadow: "var(--home-cta-shadow)",
                    fontFamily: "'Cairo', sans-serif",
                  }}
                  aria-label="أضف إلى السلة"
                >
                  <ShoppingCart className="h-4 w-4" />
                  أضف للسلة
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
