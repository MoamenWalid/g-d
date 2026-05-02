import React, { useState, useReducer, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  Tag,
  ChevronRight,
  ChevronLeft,
  Home,
  ArrowRight,
  Sparkles,
  Package,
  CheckCircle2,
  X,
  AlertCircle,
  ChevronDown,
  FileText,
} from "lucide-react";

import { AppPageHeader } from "../components/AppPageHeader";

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
        color: flash ? "var(--home-brand)" : "inherit",
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
      className="inline-flex items-center gap-0 overflow-hidden rounded-2xl"
      style={{
        background: "var(--home-card-bg)",
        border: "1.5px solid var(--home-accent-soft-border)",
      }}
    >
      <button
        type="button"
        onClick={onDecrement}
        disabled={quantity <= 1}
        className="flex h-9 w-9 items-center justify-center text-lg font-bold transition-all duration-200 hover:bg-[var(--home-accent-soft-bg)] active:scale-90 disabled:opacity-30"
        style={{ color: "var(--home-brand)" }}
        aria-label="تقليل الكمية"
      >
        <Minus className="w-3.5 h-3.5" />
      </button>
      <span
        className="flex h-9 w-9 select-none items-center justify-center text-sm font-bold tabular-nums"
        style={{ color: "var(--home-text-primary)", fontFamily: "'Cairo', sans-serif" }}
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
        type="button"
        onClick={onIncrement}
        className="flex h-9 w-9 items-center justify-center text-lg font-bold transition-all duration-200 hover:bg-[var(--home-accent-soft-bg)] active:scale-90"
        style={{ color: "var(--home-brand)" }}
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
      className="group relative overflow-hidden rounded-3xl"
      style={{
        background: "var(--home-card-bg)",
        backdropFilter: "blur(12px)",
        boxShadow: "var(--home-card-shadow)",
        border: "1px solid var(--home-card-border)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "var(--home-cart-item-hover-glow)" }}
      />

      <div className="relative flex flex-col gap-4 p-5 sm:flex-row">
        <div className="relative flex-shrink-0">
          <div
            className="h-40 w-full overflow-hidden rounded-2xl sm:h-28 sm:w-28"
            style={{ boxShadow: "var(--home-card-shadow)" }}
          >
            <img
              src={product.image}
              alt={product.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div
            className="absolute -right-2 -top-2 flex h-11 w-11 items-center justify-center rounded-full text-xs font-black text-white"
            style={{
              background: "var(--home-gradient-brand)",
              boxShadow: "var(--home-cta-shadow)",
              fontFamily: "'Cairo', sans-serif",
            }}
          >
            {Math.round(
              ((product.originalPrice - product.discountedPrice) / product.originalPrice) * 100
            )}
            %
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span
                className="mb-1.5 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold"
                style={{
                  background: "var(--home-accent-soft-bg)",
                  color: "var(--home-brand)",
                  fontFamily: "'Cairo', sans-serif",
                }}
              >
                {product.category}
              </span>
              <h3
                className="text-base font-bold leading-snug"
                style={{
                  color: "var(--home-text-primary)",
                  fontFamily: "'Cairo', sans-serif",
                  fontSize: "1rem",
                }}
              >
                {product.title}
              </h3>
            </div>
            <button
              type="button"
              onClick={onRemove}
              className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl transition-all duration-200 hover:scale-110 active:scale-95"
              style={{
                background: "var(--home-wishlist-bg)",
                color: "var(--home-wishlist)",
              }}
              aria-label="إزالة المنتج"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {product.options.map((opt) => (
              <span
                key={opt.label}
                className="rounded-lg px-2.5 py-1 text-xs font-medium"
                style={{
                  background: "var(--home-teal-soft-bg)",
                  color: "var(--home-brand-secondary)",
                  fontFamily: "'Cairo', sans-serif",
                  border: "1px solid var(--home-accent-soft-border)",
                }}
              >
                {opt.label}: <strong>{opt.value}</strong>
              </span>
            ))}
            {product.customFields.map((cf) => (
              <span
                key={cf.label}
                className="rounded-lg px-2.5 py-1 text-xs font-medium"
                style={{
                  background: "color-mix(in srgb, var(--home-accent-amber) 16%, transparent)",
                  color: "var(--home-text-primary)",
                  fontFamily: "'Cairo', sans-serif",
                  border: "1px solid color-mix(in srgb, var(--home-accent-amber) 35%, transparent)",
                }}
              >
                ✏️ {cf.label}: {cf.value}
              </span>
            ))}
          </div>

          <div className="mt-auto flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <span
                className="text-lg font-black"
                style={{
                  color: "var(--home-text-primary)",
                  fontFamily: "'Cairo', sans-serif",
                }}
              >
                {product.discountedPrice.toLocaleString("ar-SA")} ر.س
              </span>
              <span
                className="text-sm line-through"
                style={{ color: "var(--home-text-muted)", fontFamily: "'Cairo', sans-serif" }}
              >
                {product.originalPrice.toLocaleString("ar-SA")}
              </span>
              {product.optionExtra > 0 && (
                <span className="text-xs font-semibold" style={{ color: "var(--home-brand)", fontFamily: "'Cairo', sans-serif" }}>
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
              <div className="hidden text-right sm:block">
                <div className="text-xs font-medium" style={{ color: "var(--home-text-muted)", fontFamily: "'Cairo', sans-serif" }}>
                  الإجمالي
                </div>
                <div className="text-base font-black" style={{ color: "var(--home-brand)", fontFamily: "'Cairo', sans-serif" }}>
                  <AnimatedPrice value={lineTotal} />
                </div>
              </div>
            </div>
          </div>

          <div className="text-left text-sm font-bold sm:hidden" style={{ color: "var(--home-brand)", fontFamily: "'Cairo', sans-serif" }}>
            الإجمالي: <AnimatedPrice value={lineTotal} />
          </div>
        </div>
      </div>

      {isFirstProduct && (
        <div className="mx-5 mb-1 border-t" style={{ borderColor: "var(--home-card-border)" }}>
          <button
            type="button"
            onClick={() => setAccordionOpen((prev) => !prev)}
            className="flex w-full items-center justify-between gap-3 py-3.5 text-sm font-bold transition-colors duration-200 hover:opacity-80 focus:outline-none"
            style={{ color: "var(--home-brand)", fontFamily: "'Cairo', sans-serif" }}
            aria-expanded={accordionOpen}
          >
            <span className="flex items-center gap-2">
              <FileText className="h-4 w-4 flex-shrink-0" />
              الإضافات
            </span>
            <motion.span
              animate={{ rotate: accordionOpen ? 180 : 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="flex-shrink-0"
            >
              <ChevronDown className="h-4 w-4" />
            </motion.span>
          </button>

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
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold" style={{ color: "var(--home-text-secondary)", fontFamily: "'Cairo', sans-serif" }}>
                      نص الإتفاقيه
                    </label>
                    <textarea
                      value={agreementText}
                      onChange={(e) => setAgreementText(e.target.value)}
                      placeholder="أدخل نص الاتفاقية هنا…"
                      rows={4}
                      className="w-full resize-none rounded-2xl px-3.5 py-2.5 text-sm outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[var(--home-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--home-card-bg)]"
                      style={{
                        background: "var(--home-pdp-subtle-surface)",
                        border: "1.5px solid var(--home-accent-soft-border)",
                        color: "var(--home-text-primary)",
                        fontFamily: "'Cairo', sans-serif",
                        direction: "rtl",
                        lineHeight: 1.7,
                      }}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold" style={{ color: "var(--home-text-secondary)", fontFamily: "'Cairo', sans-serif" }}>
                      نص الإتفاقيه ٢
                    </label>
                    <input
                      type="text"
                      value={agreement2Text}
                      onChange={(e) => setAgreement2Text(e.target.value)}
                      placeholder="أدخل النص هنا…"
                      className="w-full rounded-2xl px-3.5 py-2.5 text-sm outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[var(--home-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--home-card-bg)]"
                      style={{
                        background: "var(--home-pdp-subtle-surface)",
                        border: "1.5px solid var(--home-accent-soft-border)",
                        color: "var(--home-text-primary)",
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
      className="overflow-hidden rounded-3xl"
      style={{
        background: "var(--home-card-bg)",
        backdropFilter: "blur(16px)",
        boxShadow: "var(--home-card-shadow)",
        border: "1px solid var(--home-card-border)",
      }}
    >
      <div
        className="flex items-center gap-3 px-6 py-5"
        style={{ background: "var(--home-pricing-highlight-bg)" }}
      >
        <div
          className="flex h-9 w-9 items-center justify-center rounded-xl"
          style={{ background: "var(--home-pricing-highlight-feature-hover)" }}
        >
          <ShoppingBag className="h-[18px] w-[18px] text-white" />
        </div>
        <h2 className="text-lg font-bold text-white" style={{ fontFamily: "'Cairo', sans-serif" }}>
          ملخص الطلب
        </h2>
        <span
          className="mr-auto rounded-full px-2.5 py-1 text-xs font-bold"
          style={{
            background: "var(--home-pricing-highlight-feature-hover)",
            color: "var(--home-text-inverse)",
            fontFamily: "'Cairo', sans-serif",
          }}
        >
          {items.reduce((s, p) => s + p.quantity, 0)} منتج
        </span>
      </div>

      <div className="flex flex-col gap-4 p-6">
        <div className="flex flex-col gap-3">
          <SummaryRow label="المجموع قبل الخصم" value={subtotal} valueTone="default" />
          {optionsTotal > 0 && (
            <SummaryRow label="إضافات الخيارات" value={optionsTotal} valueTone="brand" prefix="+" />
          )}
          <SummaryRow label="خصم المنتجات" value={discountBeforeCoupon} valueTone="success" prefix="-" />
        </div>

        <div className="h-px rounded-full" style={{ background: "var(--home-card-border)" }} />

        <motion.div
          initial={false}
          animate={appliedCoupon ? { height: 0, opacity: 0 } : { height: "auto", opacity: 1 }}
          className="overflow-hidden"
        >
          <div
            className="flex items-center gap-2 rounded-2xl px-3 py-2.5 text-xs"
            style={{
              background: "color-mix(in srgb, var(--home-brand) 8%, transparent)",
              color: "var(--home-brand)",
              fontFamily: "'Cairo', sans-serif",
              border: "1px dashed var(--home-accent-soft-border)",
            }}
          >
            <Sparkles className="h-3.5 w-3.5 flex-shrink-0" />
            <span>
              استخدم الكود{" "}
              <strong
                className="cursor-pointer font-black hover:underline"
                onClick={() => setCoupon("test")}
                style={{ color: "var(--home-text-primary)" }}
              >
                {"'test'"}
              </strong>{" "}
              للحصول على خصم 50%
            </span>
          </div>
        </motion.div>

        {!appliedCoupon ? (
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Tag
                className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2"
                style={{ color: "var(--home-text-muted)" }}
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
                className="w-full rounded-2xl py-2.5 pl-3 pr-9 text-sm outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[var(--home-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--home-card-bg)]"
                style={{
                  background:
                    couponStatus === "error" ? "var(--home-wishlist-bg)" : "var(--home-pdp-subtle-surface)",
                  border:
                    couponStatus === "error"
                      ? "1.5px solid var(--home-wishlist-border)"
                      : "1.5px solid var(--home-accent-soft-border)",
                  color: "var(--home-text-primary)",
                  fontFamily: "'Cairo', sans-serif",
                  direction: "rtl",
                }}
              />
            </div>
            <button
              type="button"
              onClick={handleApplyCoupon}
              className="flex-shrink-0 rounded-2xl px-4 py-2.5 text-sm font-bold text-white transition-all duration-200 hover:scale-105 active:scale-95"
              style={{
                background: "var(--home-gradient-brand)",
                boxShadow: "var(--home-cta-shadow)",
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
            className="flex items-center justify-between rounded-2xl px-3 py-2.5"
            style={{
              background: "var(--home-success-soft)",
              border: "1.5px solid color-mix(in srgb, var(--home-success) 35%, transparent)",
            }}
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" style={{ color: "var(--home-success)" }} />
              <span className="text-sm font-bold" style={{ color: "var(--home-success)", fontFamily: "'Cairo', sans-serif" }}>
                كود <strong>{`'${appliedCoupon}'`}</strong> مُطبَّق — خصم 50%
              </span>
            </div>
            <button
              type="button"
              onClick={handleRemoveCoupon}
              className="flex h-6 w-6 items-center justify-center rounded-full transition-colors hover:bg-[var(--home-wishlist-bg)]"
              style={{ color: "var(--home-text-muted)" }}
              aria-label="إزالة الكوبون"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        )}

        <AnimatePresence>
          {couponStatus === "error" && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="flex items-center gap-1.5 text-xs"
              style={{ color: "var(--home-wishlist)", fontFamily: "'Cairo', sans-serif" }}
            >
              <AlertCircle className="h-3.5 w-3.5" />
              كود الخصم غير صحيح. حاول مرة أخرى.
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {appliedCoupon && couponDiscount > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <SummaryRow label="خصم الكود (50%)" value={couponDiscount} valueTone="danger" prefix="-" highlight />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="h-px rounded-full" style={{ background: "var(--home-card-border)" }} />

        <div className="flex items-center justify-between">
          <span className="text-base font-bold" style={{ color: "var(--home-text-primary)", fontFamily: "'Cairo', sans-serif" }}>
            الإجمالي النهائي
          </span>
          <span className="text-2xl font-black" style={{ color: "var(--home-text-primary)", fontFamily: "'Cairo', sans-serif" }}>
            <AnimatedPrice value={finalTotal} />
          </span>
        </div>

        <button
          type="button"
          className="mt-1 flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-base font-bold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl active:scale-[0.98]"
          style={{
            background: "var(--home-gradient-brand)",
            boxShadow: "var(--home-cta-shadow-lg)",
            fontFamily: "'Cairo', sans-serif",
          }}
        >
          إتمام الشراء
          <ArrowRight className="h-[18px] w-[18px]" />
        </button>

        <div className="flex justify-center gap-4 pt-1">
          {["🔒 دفع آمن", "✅ ضمان الاسترجاع", "🚀 شحن سريع"].map((t) => (
            <span key={t} className="text-xs" style={{ color: "var(--home-text-muted)", fontFamily: "'Cairo', sans-serif" }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── SummaryRow helper ────────────────────────────────────────────────────────

type SummaryValueTone = "default" | "brand" | "success" | "danger";

const summaryToneColor: Record<SummaryValueTone, string> = {
  default: "var(--home-text-secondary)",
  brand: "var(--home-brand)",
  success: "var(--home-success)",
  danger: "var(--home-wishlist)",
};

function SummaryRow({
  label,
  value,
  valueTone,
  prefix = "",
  highlight = false,
}: {
  label: string;
  value: number;
  valueTone: SummaryValueTone;
  prefix?: string;
  highlight?: boolean;
}) {
  const valueColor = summaryToneColor[valueTone];
  return (
    <div
      className={`flex items-center justify-between py-0.5 ${highlight ? "rounded-xl px-3 py-2" : ""}`}
      style={
        highlight
          ? {
              background: "var(--home-wishlist-bg)",
              border: "1px dashed var(--home-wishlist-border)",
            }
          : {}
      }
    >
      <span className="text-sm font-medium" style={{ color: "var(--home-text-muted)", fontFamily: "'Cairo', sans-serif" }}>
        {label}
      </span>
      <span className="text-sm font-bold tabular-nums" style={{ color: valueColor, fontFamily: "'Cairo', sans-serif" }}>
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
      className="col-span-full flex flex-col items-center justify-center rounded-3xl py-24 text-center"
      style={{
        background: "var(--home-card-bg)",
        border: "1px solid var(--home-card-border)",
        boxShadow: "var(--home-card-shadow)",
      }}
    >
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="mb-8"
      >
        <div
          className="mx-auto flex h-32 w-32 items-center justify-center rounded-full"
          style={{
            background: "color-mix(in srgb, var(--home-brand) 10%, transparent)",
            border: "2px dashed var(--home-accent-soft-border)",
          }}
        >
          <ShoppingBag className="h-14 w-14" style={{ color: "var(--home-brand-muted)" }} />
        </div>
      </motion.div>

      <h2 className="mb-3 text-2xl font-black" style={{ color: "var(--home-text-primary)", fontFamily: "'Cairo', sans-serif" }}>
        سلتك فارغة
      </h2>
      <p className="mb-8 max-w-xs text-base" style={{ color: "var(--home-text-secondary)", fontFamily: "'Cairo', sans-serif", lineHeight: 1.8 }}>
        يبدو أنك لم تضف أي منتجات بعد. ابدأ التسوق الآن!
      </p>

      <Link to="/">
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-2xl px-8 py-4 text-sm font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
          style={{
            background: "var(--home-gradient-brand)",
            boxShadow: "var(--home-cta-shadow)",
            fontFamily: "'Cairo', sans-serif",
          }}
        >
          <ChevronRight className="h-4 w-4" />
          تصفح المنتجات
        </button>
      </Link>
    </motion.div>
  );
}

// ─── CartPage ─────────────────────────────────────────────────────────────────

const cartBreadcrumb = (
  <nav
    className="flex items-center gap-1 text-xs"
    aria-label="مسار التنقل"
    style={{ fontFamily: "'Cairo', sans-serif" }}
  >
    <Link to="/" className="flex items-center gap-1 transition-opacity duration-150 hover:opacity-70" style={{ color: "var(--home-text-muted)" }}>
      <Home className="h-3.5 w-3.5" />
      الرئيسية
    </Link>
    <ChevronLeft className="h-3 w-3" style={{ color: "var(--home-breadcrumb-chevron)" }} />
    <span className="font-semibold" style={{ color: "var(--home-text-primary)" }}>
      سلة التسوق
    </span>
  </nav>
);

export function CartPage() {
  const [cart, dispatch] = useReducer(cartReducer, INITIAL_CART);

  const isEmpty = cart.length === 0;

  return (
    <div
      dir="rtl"
      className="relative min-h-screen"
      style={{
        background: "var(--home-cart-page-bg)",
        color: "var(--home-text-primary)",
        fontFamily: "'Cairo', sans-serif",
      }}
    >
      <div
        className="pointer-events-none fixed left-0 top-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 opacity-[0.35]"
        style={{ background: "var(--home-cart-blob-1)", filter: "blur(80px)" }}
      />
      <div
        className="pointer-events-none fixed bottom-0 right-0 h-[500px] w-[500px] translate-x-1/3 translate-y-1/3 opacity-25"
        style={{ background: "var(--home-cart-blob-2)", filter: "blur(80px)" }}
      />

      <AppPageHeader center={cartBreadcrumb} />

      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-8 sm:mb-10"
        >
          <nav
            className="mb-4 flex items-center gap-1.5 text-sm md:hidden"
            style={{ color: "var(--home-text-muted)", fontFamily: "'Cairo', sans-serif" }}
            aria-label="مسار التنقل"
          >
            <Link to="/" className="transition-opacity hover:opacity-80" style={{ color: "var(--home-text-muted)" }}>
              الرئيسية
            </Link>
            <ChevronRight className="h-3.5 w-3.5" style={{ color: "var(--home-breadcrumb-chevron)" }} />
            <span style={{ color: "var(--home-brand)" }}>سلة التسوق</span>
          </nav>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black sm:text-4xl" style={{ color: "var(--home-text-primary)", fontFamily: "'Cairo', sans-serif" }}>
                سلة{" "}
                <span
                  style={{
                    background: "var(--home-gradient-text)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  التسوق
                </span>
              </h1>
              {!isEmpty && (
                <p className="mt-1 text-sm" style={{ color: "var(--home-text-muted)", fontFamily: "'Cairo', sans-serif" }}>
                  {cart.reduce((s, p) => s + p.quantity, 0)} منتج في سلتك
                </p>
              )}
            </div>

            <Link to="/">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-bold transition-all duration-200 hover:scale-105 active:scale-95"
                style={{
                  background: "var(--home-pdp-cart-chip-bg)",
                  color: "var(--home-brand)",
                  border: "1.5px solid var(--home-accent-soft-border)",
                  fontFamily: "'Cairo', sans-serif",
                }}
              >
                <ChevronRight className="h-4 w-4" />
                متابعة التسوق
              </button>
            </Link>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_380px]">
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
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-1 flex items-center gap-2 px-1">
                    <Package className="h-[18px] w-[18px]" style={{ color: "var(--home-brand)" }} />
                    <span className="text-sm font-bold" style={{ color: "var(--home-brand)", fontFamily: "'Cairo', sans-serif" }}>
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
              className="lg:sticky lg:top-24"
            >
              <OrderSummary items={cart} />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
