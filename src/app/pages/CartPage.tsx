import { useState, useReducer, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  Tag,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Package,
  CheckCircle2,
  X,
  AlertCircle,
  ChevronDown,
  FileText,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface CartProduct {
  id: string;
  title: string;
  category: string;
  image: string;
  originalPrice: number;
  discountedPrice: number;
  quantity: number;
  options: { label: string; value: string }[];
  customFields: { label: string; value: string }[];
  optionExtra: number; // extra cost from options
}

type CartAction =
  | { type: "INCREMENT"; id: string }
  | { type: "DECREMENT"; id: string }
  | { type: "REMOVE"; id: string }
  | { type: "SET_QUANTITY"; id: string; qty: number };

// ─── Mock Data ────────────────────────────────────────────────────────────────

const INITIAL_CART: CartProduct[] = [
  {
    id: "prod-001",
    title: "حقيبة جلدية فاخرة",
    category: "الحقائب والإكسسوارات",
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?fit=crop&w=600&q=80",
    originalPrice: 599,
    discountedPrice: 449,
    quantity: 1,
    options: [
      { label: "اللون", value: "كوجناك" },
      { label: "المقاس", value: "متوسط" },
    ],
    customFields: [{ label: "نص النقش", value: "M.A" }],
    optionExtra: 25,
  },
  {
    id: "prod-002",
    title: "ساعة يد كلاسيكية",
    category: "الساعات الفاخرة",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?fit=crop&w=600&q=80",
    originalPrice: 1299,
    discountedPrice: 999,
    quantity: 1,
    options: [
      { label: "لون الإطار", value: "ذهبي روز" },
      { label: "حزام", value: "جلد بني" },
    ],
    customFields: [{ label: "ملاحظات", value: "هدية — يرجى التغليف" }],
    optionExtra: 0,
  },
  {
    id: "prod-003",
    title: "عطر العود الملكي",
    category: "العطور الفاخرة",
    image:
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?fit=crop&w=600&q=80",
    originalPrice: 499,
    discountedPrice: 349,
    quantity: 2,
    options: [
      { label: "الحجم", value: "100 مل" },
      { label: "التركيز", value: "Eau de Parfum" },
    ],
    customFields: [],
    optionExtra: 15,
  },
];

// ─── Reducer ──────────────────────────────────────────────────────────────────

function cartReducer(state: CartProduct[], action: CartAction): CartProduct[] {
  switch (action.type) {
    case "INCREMENT":
      return state.map((p) =>
        p.id === action.id ? { ...p, quantity: p.quantity + 1 } : p
      );
    case "DECREMENT":
      return state.map((p) =>
        p.id === action.id && p.quantity > 1
          ? { ...p, quantity: p.quantity - 1 }
          : p
      );
    case "REMOVE":
      return state.filter((p) => p.id !== action.id);
    case "SET_QUANTITY":
      return state.map((p) =>
        p.id === action.id ? { ...p, quantity: Math.max(1, action.qty) } : p
      );
    default:
      return state;
  }
}

// ─── Animated Number ──────────────────────────────────────────────────────────

function AnimatedPrice({ value }: { value: number }) {
  const prevRef = useRef(value);
  const [display, setDisplay] = useState(value);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (prevRef.current !== value) {
      setFlash(true);
      setDisplay(value);
      prevRef.current = value;
      const t = setTimeout(() => setFlash(false), 500);
      return () => clearTimeout(t);
    }
  }, [value]);

  return (
    <span
      className="tabular-nums transition-all duration-300"
      style={{
        color: flash ? "#6C5CE7" : "inherit",
        transform: flash ? "scale(1.06)" : "scale(1)",
        display: "inline-block",
      }}
    >
      {display.toLocaleString("ar-SA")} ر.س
    </span>
  );
}

// ─── QuantityControl ─────────────────────────────────────────────────────────

interface QuantityControlProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

function QuantityControl({
  quantity,
  onIncrement,
  onDecrement,
}: QuantityControlProps) {
  return (
    <div
      className="inline-flex items-center gap-0 rounded-2xl overflow-hidden"
      style={{
        background: "rgba(108,92,231,0.07)",
        border: "1.5px solid rgba(108,92,231,0.18)",
      }}
    >
      <button
        onClick={onDecrement}
        disabled={quantity <= 1}
        className="w-9 h-9 flex items-center justify-center text-lg font-bold transition-all duration-200 disabled:opacity-30 hover:bg-purple-100 active:scale-90"
        style={{ color: "#6C5CE7" }}
        aria-label="تقليل الكمية"
      >
        <Minus className="w-3.5 h-3.5" />
      </button>
      <span
        className="w-9 h-9 flex items-center justify-center text-sm font-bold tabular-nums select-none"
        style={{ color: "#2d1b69", fontFamily: "'Cairo', sans-serif" }}
      >
        <AnimatePresence mode="popLayout">
          <motion.span
            key={quantity}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {quantity}
          </motion.span>
        </AnimatePresence>
      </span>
      <button
        onClick={onIncrement}
        className="w-9 h-9 flex items-center justify-center text-lg font-bold transition-all duration-200 hover:bg-purple-100 active:scale-90"
        style={{ color: "#6C5CE7" }}
        aria-label="زيادة الكمية"
      >
        <Plus className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

// ─── CartItem ─────────────────────────────────────────────────────────────────

interface CartItemProps {
  product: CartProduct;
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
}

function CartItem({ product, onIncrement, onDecrement, onRemove }: CartItemProps) {
  const lineTotal = (product.discountedPrice + product.optionExtra) * product.quantity;

  // Accordion state — only used when product.id === "prod-001"
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [agreementText, setAgreementText] = useState("");
  const [agreement2Text, setAgreement2Text] = useState("");

  const isFirstProduct = product.id === "prod-001";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{
        opacity: 0,
        x: 80,
        scale: 0.93,
        transition: { duration: 0.35, ease: "easeInOut" },
      }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="group relative rounded-3xl overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(12px)",
        boxShadow:
          "0 4px 24px rgba(108,92,231,0.07), 0 1px 4px rgba(0,0,0,0.04)",
        border: "1.5px solid rgba(108,92,231,0.1)",
      }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
        style={{
          background:
            "linear-gradient(135deg, rgba(108,92,231,0.04) 0%, rgba(0,206,201,0.04) 100%)",
        }}
      />

      <div className="relative flex flex-col sm:flex-row gap-4 p-5">
        {/* Image */}
        <div className="relative flex-shrink-0">
          <div
            className="w-full sm:w-28 h-40 sm:h-28 rounded-2xl overflow-hidden"
            style={{ boxShadow: "0 6px 20px rgba(0,0,0,0.12)" }}
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          {/* Discount badge */}
          <div
            className="absolute -top-2 -right-2 w-11 h-11 rounded-full flex items-center justify-center text-xs font-black text-white"
            style={{
              background: "linear-gradient(135deg, #6C5CE7, #a29bfe)",
              boxShadow: "0 4px 12px rgba(108,92,231,0.4)",
              fontFamily: "'Cairo', sans-serif",
            }}
          >
            {Math.round(
              ((product.originalPrice - product.discountedPrice) /
                product.originalPrice) *
                100
            )}
            %
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 flex flex-col gap-2">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span
                className="text-xs font-semibold px-2.5 py-0.5 rounded-full mb-1.5 inline-block"
                style={{
                  background: "rgba(108,92,231,0.1)",
                  color: "#6C5CE7",
                  fontFamily: "'Cairo', sans-serif",
                }}
              >
                {product.category}
              </span>
              <h3
                className="text-base font-bold leading-snug"
                style={{
                  color: "#1a0533",
                  fontFamily: "'Cairo', sans-serif",
                  fontSize: "1rem",
                }}
              >
                {product.title}
              </h3>
            </div>
            {/* Remove button */}
            <button
              onClick={onRemove}
              className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
              style={{
                background: "rgba(255,71,87,0.08)",
                color: "#ff4757",
              }}
              aria-label="إزالة المنتج"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Options */}
          <div className="flex flex-wrap gap-1.5">
            {product.options.map((opt) => (
              <span
                key={opt.label}
                className="text-xs px-2.5 py-1 rounded-lg font-medium"
                style={{
                  background: "rgba(0,206,201,0.08)",
                  color: "#00a8a5",
                  fontFamily: "'Cairo', sans-serif",
                  border: "1px solid rgba(0,206,201,0.2)",
                }}
              >
                {opt.label}: <strong>{opt.value}</strong>
              </span>
            ))}
            {product.customFields.map((cf) => (
              <span
                key={cf.label}
                className="text-xs px-2.5 py-1 rounded-lg font-medium"
                style={{
                  background: "rgba(253,203,110,0.12)",
                  color: "#b8860b",
                  fontFamily: "'Cairo', sans-serif",
                  border: "1px solid rgba(253,203,110,0.3)",
                }}
              >
                ✏️ {cf.label}: {cf.value}
              </span>
            ))}
          </div>

          {/* Pricing row */}
          <div className="flex items-center justify-between mt-auto pt-2">
            <div className="flex items-center gap-2">
              <span
                className="text-lg font-black"
                style={{
                  color: "#1a0533",
                  fontFamily: "'Cairo', sans-serif",
                }}
              >
                {product.discountedPrice.toLocaleString("ar-SA")} ر.س
              </span>
              <span
                className="text-sm line-through"
                style={{ color: "#bbb", fontFamily: "'Cairo', sans-serif" }}
              >
                {product.originalPrice.toLocaleString("ar-SA")}
              </span>
              {product.optionExtra > 0 && (
                <span
                  className="text-xs font-semibold"
                  style={{ color: "#6C5CE7", fontFamily: "'Cairo', sans-serif" }}
                >
                  +{product.optionExtra} (خيارات)
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <QuantityControl
                quantity={product.quantity}
                onIncrement={onIncrement}
                onDecrement={onDecrement}
              />
              {/* Line total */}
              <div className="text-right hidden sm:block">
                <div
                  className="text-xs font-medium"
                  style={{ color: "#999", fontFamily: "'Cairo', sans-serif" }}
                >
                  الإجمالي
                </div>
                <div
                  className="text-base font-black"
                  style={{ color: "#6C5CE7", fontFamily: "'Cairo', sans-serif" }}
                >
                  <AnimatedPrice value={lineTotal} />
                </div>
              </div>
            </div>
          </div>

          {/* Mobile line total */}
          <div
            className="sm:hidden text-sm font-bold text-left"
            style={{ color: "#6C5CE7", fontFamily: "'Cairo', sans-serif" }}
          >
            الإجمالي: <AnimatedPrice value={lineTotal} />
          </div>
        </div>
      </div>

      {/* ── Accordion (first product only) ── */}
      {isFirstProduct && (
        <div
          className="border-t mx-5 mb-1"
          style={{ borderColor: "rgba(108,92,231,0.1)" }}
        >
          {/* Trigger */}
          <button
            onClick={() => setAccordionOpen((prev) => !prev)}
            className="w-full flex items-center justify-between gap-3 py-3.5 text-sm font-bold transition-colors duration-200 hover:opacity-80 focus:outline-none"
            style={{ color: "#6C5CE7", fontFamily: "'Cairo', sans-serif" }}
            aria-expanded={accordionOpen}
          >
            <span className="flex items-center gap-2">
              <FileText className="w-4 h-4 flex-shrink-0" />
              الإضافات
            </span>
            <motion.span
              animate={{ rotate: accordionOpen ? 180 : 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="flex-shrink-0"
            >
              <ChevronDown className="w-4 h-4" />
            </motion.span>
          </button>

          {/* Panel */}
          <AnimatePresence initial={false}>
            {accordionOpen && (
              <motion.div
                key="accordion-panel"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                style={{ overflow: "hidden" }}
              >
                <div className="flex flex-col gap-4 pb-5">
                  {/* Field 1 — Textarea */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      className="text-xs font-bold"
                      style={{ color: "#555", fontFamily: "'Cairo', sans-serif" }}
                    >
                      نص الإتفاقيه
                    </label>
                    <textarea
                      value={agreementText}
                      onChange={(e) => setAgreementText(e.target.value)}
                      placeholder="أدخل نص الاتفاقية هنا…"
                      rows={4}
                      className="w-full px-3.5 py-2.5 rounded-2xl text-sm resize-none outline-none transition-all duration-200 focus:ring-2 focus:ring-purple-300"
                      style={{
                        background: "rgba(108,92,231,0.04)",
                        border: "1.5px solid rgba(108,92,231,0.15)",
                        color: "#1a0533",
                        fontFamily: "'Cairo', sans-serif",
                        direction: "rtl",
                        lineHeight: 1.7,
                      }}
                    />
                  </div>

                  {/* Field 2 — Input */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      className="text-xs font-bold"
                      style={{ color: "#555", fontFamily: "'Cairo', sans-serif" }}
                    >
                      نص الإتفاقيه ٢
                    </label>
                    <input
                      type="text"
                      value={agreement2Text}
                      onChange={(e) => setAgreement2Text(e.target.value)}
                      placeholder="أدخل النص هنا…"
                      className="w-full px-3.5 py-2.5 rounded-2xl text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-purple-300"
                      style={{
                        background: "rgba(108,92,231,0.04)",
                        border: "1.5px solid rgba(108,92,231,0.15)",
                        color: "#1a0533",
                        fontFamily: "'Cairo', sans-serif",
                        direction: "rtl",
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}

// ─── OrderSummary ─────────────────────────────────────────────────────────────

interface OrderSummaryProps {
  items: CartProduct[];
}

function OrderSummary({ items }: OrderSummaryProps) {
  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponStatus, setCouponStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const subtotal = items.reduce(
    (sum, p) => sum + p.originalPrice * p.quantity,
    0
  );
  const optionsTotal = items.reduce(
    (sum, p) => sum + p.optionExtra * p.quantity,
    0
  );
  const discountBeforeCoupon = items.reduce(
    (sum, p) =>
      sum + (p.originalPrice - p.discountedPrice) * p.quantity,
    0
  );
  const cartValue = items.reduce(
    (sum, p) => sum + (p.discountedPrice + p.optionExtra) * p.quantity,
    0
  );

  const couponDiscount = appliedCoupon === "test" ? cartValue * 0.5 : 0;
  const finalTotal = cartValue - couponDiscount;

  function handleApplyCoupon() {
    const trimmed = coupon.trim().toLowerCase();
    if (trimmed === "test") {
      setAppliedCoupon("test");
      setCouponStatus("success");
    } else {
      setAppliedCoupon(null);
      setCouponStatus("error");
      const t = setTimeout(() => setCouponStatus("idle"), 2500);
      return () => clearTimeout(t);
    }
  }

  function handleRemoveCoupon() {
    setAppliedCoupon(null);
    setCoupon("");
    setCouponStatus("idle");
  }

  return (
    <div
      className="rounded-3xl overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.9)",
        backdropFilter: "blur(16px)",
        boxShadow:
          "0 8px 40px rgba(108,92,231,0.1), 0 2px 8px rgba(0,0,0,0.05)",
        border: "1.5px solid rgba(108,92,231,0.12)",
      }}
    >
      {/* Header */}
      <div
        className="px-6 py-5 flex items-center gap-3"
        style={{
          background: "linear-gradient(135deg, #1a0533 0%, #2d1b69 100%)",
        }}
      >
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: "rgba(255,255,255,0.12)" }}
        >
          <ShoppingBag className="w-4.5 h-4.5 text-white" />
        </div>
        <h2
          className="text-white font-bold text-lg"
          style={{ fontFamily: "'Cairo', sans-serif" }}
        >
          ملخص الطلب
        </h2>
        <span
          className="mr-auto text-xs px-2.5 py-1 rounded-full font-bold"
          style={{
            background: "rgba(108,92,231,0.4)",
            color: "#c4b5fd",
            fontFamily: "'Cairo', sans-serif",
          }}
        >
          {items.reduce((s, p) => s + p.quantity, 0)} منتج
        </span>
      </div>

      <div className="p-6 flex flex-col gap-4">
        {/* Line items */}
        <div className="flex flex-col gap-3">
          <SummaryRow
            label="المجموع قبل الخصم"
            value={subtotal}
            color="#555"
          />
          {optionsTotal > 0 && (
            <SummaryRow
              label="إضافات الخيارات"
              value={optionsTotal}
              color="#6C5CE7"
              prefix="+"
            />
          )}
          <SummaryRow
            label="خصم المنتجات"
            value={discountBeforeCoupon}
            color="#00b894"
            prefix="-"
          />
        </div>

        {/* Divider */}
        <div
          className="h-px rounded-full"
          style={{ background: "rgba(108,92,231,0.1)" }}
        />

        {/* Coupon hint */}
        <motion.div
          initial={false}
          animate={appliedCoupon ? { height: 0, opacity: 0 } : { height: "auto", opacity: 1 }}
          className="overflow-hidden"
        >
          <div
            className="flex items-center gap-2 text-xs px-3 py-2.5 rounded-2xl"
            style={{
              background: "linear-gradient(135deg, rgba(108,92,231,0.07), rgba(0,206,201,0.07))",
              color: "#6C5CE7",
              fontFamily: "'Cairo', sans-serif",
              border: "1px dashed rgba(108,92,231,0.25)",
            }}
          >
            <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
            <span>
              استخدم الكود{" "}
              <strong
                className="font-black cursor-pointer hover:underline"
                onClick={() => setCoupon("test")}
                style={{ color: "#2d1b69" }}
              >
                'test'
              </strong>{" "}
              للحصول على خصم 50%
            </span>
          </div>
        </motion.div>

        {/* Coupon input */}
        {!appliedCoupon ? (
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Tag
                className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4"
                style={{ color: "#aaa" }}
              />
              <input
                type="text"
                value={coupon}
                onChange={(e) => {
                  setCoupon(e.target.value);
                  setCouponStatus("idle");
                }}
                onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
                placeholder="كود الخصم"
                className="w-full pr-9 pl-3 py-2.5 rounded-2xl text-sm outline-none transition-all duration-200 focus:ring-2"
                style={{
                  background:
                    couponStatus === "error"
                      ? "rgba(255,71,87,0.06)"
                      : "rgba(108,92,231,0.05)",
                  border:
                    couponStatus === "error"
                      ? "1.5px solid rgba(255,71,87,0.4)"
                      : "1.5px solid rgba(108,92,231,0.15)",
                  color: "#1a0533",
                  fontFamily: "'Cairo', sans-serif",
                  direction: "rtl",
                }}
              />
            </div>
            <button
              onClick={handleApplyCoupon}
              className="px-4 py-2.5 rounded-2xl text-sm font-bold text-white transition-all duration-200 hover:scale-105 active:scale-95 flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, #6C5CE7, #a29bfe)",
                boxShadow: "0 4px 16px rgba(108,92,231,0.3)",
                fontFamily: "'Cairo', sans-serif",
              }}
            >
              تطبيق
            </button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-between px-3 py-2.5 rounded-2xl"
            style={{
              background: "rgba(0,184,148,0.08)",
              border: "1.5px solid rgba(0,184,148,0.3)",
            }}
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" style={{ color: "#00b894" }} />
              <span
                className="text-sm font-bold"
                style={{ color: "#00b894", fontFamily: "'Cairo', sans-serif" }}
              >
                كود <strong>'{appliedCoupon}'</strong> مُطبَّق — خصم 50%
              </span>
            </div>
            <button
              onClick={handleRemoveCoupon}
              className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-red-50 transition-colors"
              style={{ color: "#999" }}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}

        {/* Coupon error */}
        <AnimatePresence>
          {couponStatus === "error" && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="flex items-center gap-1.5 text-xs"
              style={{ color: "#ff4757", fontFamily: "'Cairo', sans-serif" }}
            >
              <AlertCircle className="w-3.5 h-3.5" />
              كود الخصم غير صحيح. حاول مرة أخرى.
            </motion.div>
          )}
        </AnimatePresence>

        {/* Coupon discount row */}
        <AnimatePresence>
          {appliedCoupon && couponDiscount > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <SummaryRow
                label="خصم الكود (50%)"
                value={couponDiscount}
                color="#ff4757"
                prefix="-"
                highlight
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Divider */}
        <div
          className="h-px rounded-full"
          style={{ background: "rgba(108,92,231,0.1)" }}
        />

        {/* Final total */}
        <div className="flex items-center justify-between">
          <span
            className="text-base font-bold"
            style={{ color: "#1a0533", fontFamily: "'Cairo', sans-serif" }}
          >
            الإجمالي النهائي
          </span>
          <span
            className="text-2xl font-black"
            style={{ color: "#1a0533", fontFamily: "'Cairo', sans-serif" }}
          >
            <AnimatedPrice value={finalTotal} />
          </span>
        </div>

        {/* Checkout button */}
        <button
          className="w-full py-4 rounded-2xl text-white font-bold text-base flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl active:scale-[0.98] mt-1"
          style={{
            background:
              "linear-gradient(135deg, #1a0533 0%, #6C5CE7 60%, #00CEC9 100%)",
            boxShadow: "0 12px 40px rgba(108,92,231,0.4)",
            fontFamily: "'Cairo', sans-serif",
          }}
        >
          إتمام الشراء
          <ArrowRight className="w-4.5 h-4.5" />
        </button>

        {/* Security */}
        <div className="flex justify-center gap-4 pt-1">
          {["🔒 دفع آمن", "✅ ضمان الاسترجاع", "🚀 شحن سريع"].map((t) => (
            <span
              key={t}
              className="text-xs"
              style={{ color: "#aaa", fontFamily: "'Cairo', sans-serif" }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── SummaryRow helper ────────────────────────────────────────────────────────

function SummaryRow({
  label,
  value,
  color,
  prefix = "",
  highlight = false,
}: {
  label: string;
  value: number;
  color: string;
  prefix?: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between py-0.5 ${
        highlight ? "px-3 py-2 rounded-xl" : ""
      }`}
      style={
        highlight
          ? {
              background: "rgba(255,71,87,0.06)",
              border: "1px dashed rgba(255,71,87,0.25)",
            }
          : {}
      }
    >
      <span
        className="text-sm font-medium"
        style={{ color: "#777", fontFamily: "'Cairo', sans-serif" }}
      >
        {label}
      </span>
      <span
        className="text-sm font-bold tabular-nums"
        style={{ color, fontFamily: "'Cairo', sans-serif" }}
      >
        {prefix}
        <AnimatedPrice value={value} />
      </span>
    </div>
  );
}

// ─── Empty Cart ───────────────────────────────────────────────────────────────

function EmptyCart() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="col-span-full flex flex-col items-center justify-center py-24 text-center"
    >
      {/* Animated bag */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="mb-8"
      >
        <div
          className="w-32 h-32 rounded-full flex items-center justify-center mx-auto"
          style={{
            background:
              "linear-gradient(135deg, rgba(108,92,231,0.1), rgba(0,206,201,0.1))",
            border: "2px dashed rgba(108,92,231,0.25)",
          }}
        >
          <ShoppingBag
            className="w-14 h-14"
            style={{ color: "rgba(108,92,231,0.4)" }}
          />
        </div>
      </motion.div>

      <h2
        className="text-2xl font-black mb-3"
        style={{ color: "#1a0533", fontFamily: "'Cairo', sans-serif" }}
      >
        سلتك فارغة
      </h2>
      <p
        className="text-base mb-8 max-w-xs"
        style={{ color: "#999", fontFamily: "'Cairo', sans-serif", lineHeight: 1.8 }}
      >
        يبدو أنك لم تضف أي منتجات بعد. ابدأ التسوق الآن!
      </p>

      <Link to="/">
        <button
          className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-white font-bold text-sm transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
          style={{
            background: "linear-gradient(135deg, #6C5CE7, #00CEC9)",
            boxShadow: "0 10px 32px rgba(108,92,231,0.35)",
            fontFamily: "'Cairo', sans-serif",
          }}
        >
          <ChevronRight className="w-4 h-4" />
          تصفح المنتجات
        </button>
      </Link>
    </motion.div>
  );
}

// ─── CartPage ─────────────────────────────────────────────────────────────────

export function CartPage() {
  const [cart, dispatch] = useReducer(cartReducer, INITIAL_CART);

  const isEmpty = cart.length === 0;

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(160deg, #F0EEFF 0%, #F8F9FC 40%, #E8FFFE 100%)",
        fontFamily: "'Cairo', sans-serif",
      }}
    >
      {/* Ambient blobs */}
      <div
        className="fixed top-0 left-0 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 opacity-30 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #a29bfe 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="fixed bottom-0 right-0 w-[500px] h-[500px] translate-x-1/3 translate-y-1/3 opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #00CEC9 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          {/* Breadcrumb */}
          <nav
            className="flex items-center gap-1.5 text-sm mb-5"
            style={{ color: "#aaa", fontFamily: "'Cairo', sans-serif" }}
          >
            <Link
              to="/"
              className="hover:text-purple-600 transition-colors flex items-center gap-1"
            >
              الرئيسية
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span style={{ color: "#6C5CE7" }}>سلة التسوق</span>
          </nav>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1
                className="text-3xl sm:text-4xl font-black"
                style={{ color: "#1a0533", fontFamily: "'Cairo', sans-serif" }}
              >
                سلة{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #6C5CE7, #00CEC9)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  التسوق
                </span>
              </h1>
              {!isEmpty && (
                <p
                  className="text-sm mt-1"
                  style={{ color: "#999", fontFamily: "'Cairo', sans-serif" }}
                >
                  {cart.reduce((s, p) => s + p.quantity, 0)} منتج في سلتك
                </p>
              )}
            </div>

            <Link to="/">
              <button
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold transition-all duration-200 hover:scale-105 active:scale-95"
                style={{
                  background: "rgba(108,92,231,0.08)",
                  color: "#6C5CE7",
                  border: "1.5px solid rgba(108,92,231,0.2)",
                  fontFamily: "'Cairo', sans-serif",
                }}
              >
                <ChevronRight className="w-4 h-4" />
                متابعة التسوق
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Main layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">
          {/* Left: Cart items */}
          <div>
            <AnimatePresence mode="popLayout">
              {isEmpty ? (
                <EmptyCart key="empty" />
              ) : (
                <motion.div
                  key="items"
                  className="flex flex-col gap-4"
                >
                  {/* Items header */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2 px-1 mb-1"
                  >
                    <Package
                      className="w-4.5 h-4.5"
                      style={{ color: "#6C5CE7" }}
                    />
                    <span
                      className="text-sm font-bold"
                      style={{
                        color: "#6C5CE7",
                        fontFamily: "'Cairo', sans-serif",
                      }}
                    >
                      المنتجات ({cart.length})
                    </span>
                  </motion.div>

                  <AnimatePresence mode="popLayout">
                    {cart.map((product) => (
                      <CartItem
                        key={product.id}
                        product={product}
                        onIncrement={() =>
                          dispatch({ type: "INCREMENT", id: product.id })
                        }
                        onDecrement={() =>
                          dispatch({ type: "DECREMENT", id: product.id })
                        }
                        onRemove={() =>
                          dispatch({ type: "REMOVE", id: product.id })
                        }
                      />
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right: Order Summary — sticky */}
          {!isEmpty && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="lg:sticky lg:top-8"
            >
              <OrderSummary items={cart} />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
