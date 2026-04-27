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
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(16px)",
            borderTop: "1px solid rgba(108,92,231,0.12)",
            boxShadow: "0 -8px 40px rgba(108,92,231,0.12)",
          }}
        >
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center gap-4">
              {/* Product thumbnail */}
              <div
                className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0"
                style={{ border: "1.5px solid rgba(108,92,231,0.15)" }}
              >
                <img
                  src={productImage}
                  alt={productName}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Name + price */}
              <div className="flex-1 min-w-0">
                <p
                  className="text-sm font-semibold truncate"
                  style={{ color: "#2D3436", fontFamily: "'Cairo', sans-serif" }}
                >
                  {productName}
                </p>
                <p
                  className="text-xs"
                  style={{ color: "#636e72", fontFamily: "'Cairo', sans-serif" }}
                >
                  الكمية: {quantity} ×{" "}
                  <span style={{ color: "#6C5CE7", fontWeight: 700 }}>
                    {currentPrice.toLocaleString("ar-SA")} ر.س
                  </span>
                </p>
              </div>

              {/* Total + CTA */}
              <div className="flex items-center gap-3 flex-shrink-0">
                <div className="text-left hidden sm:block">
                  <p
                    className="text-xs"
                    style={{ color: "#a0aab4", fontFamily: "'Cairo', sans-serif" }}
                  >
                    الإجمالي
                  </p>
                  <p
                    className="text-base font-black"
                    style={{
                      fontFamily: "'Cairo', sans-serif",
                      background: "linear-gradient(135deg, #6C5CE7, #00CEC9)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {(currentPrice * quantity).toLocaleString("ar-SA")} ر.س
                  </p>
                </div>

                <motion.button
                  onClick={onAddToCart}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-5 py-3 rounded-2xl text-white text-sm font-bold"
                  style={{
                    background: "linear-gradient(135deg, #6C5CE7, #00CEC9)",
                    boxShadow: "0 6px 20px rgba(108,92,231,0.4)",
                    fontFamily: "'Cairo', sans-serif",
                    whiteSpace: "nowrap",
                  }}
                  aria-label="أضف إلى السلة"
                >
                  <ShoppingCart className="w-4 h-4" />
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
