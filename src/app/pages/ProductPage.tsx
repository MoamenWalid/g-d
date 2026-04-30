import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import { ChevronLeft, Home, ShoppingBag } from "lucide-react";

import { ProductGallery } from "../components/product/ProductGallery";
import { ProductInfo } from "../components/product/ProductInfo";
import { ProductActions } from "../components/product/ProductActions";
import { ProductTabs } from "../components/product/ProductTabs";
import { RelatedProducts } from "../components/product/RelatedProducts";
import { StickyCart } from "../components/product/StickyCart";

// ─── Fake product data (Salla-compatible structure) ───────────────────────────

const product = {
  id: "oud-royal-001",
  name: "عطر العود الملكي الذهبي",
  sku: "OUD-ROYAL-001",
  brand: "Gold Oud Collection",
  category: { name: "العطور الفاخرة", slug: "#" },
  rating: 4.8,
  reviewCount: 247,
  soldCount: 1240,
  stock: 8,
  basePrice: 349,
  originalPrice: 499,
  discount: 30,

  shortDesc:
    "عطر فاخر يجمع بين عمق خشب العود الهندي الأصيل ودفء المسك الشرقي، مع لمسات من الورد الطائفي والزعفران. تجربة عطرية استثنائية تدوم طوال اليوم.",

  description: `
    <p>يُعدّ <strong>عطر العود الملكي الذهبي</strong> من بين أرقى العطور الشرقية التي تجمع بين أصالة العود الهندي الخالص وحداثة التركيبة العطرية المتوازنة.</p>
    <br/>
    <p>تبدأ الرحلة العطرية بانفتاح ساحر من الزعفران الإيراني النقي والهيل العربي، قبل أن ينكشف قلب العطر الدافئ المؤلف من الورد الطائفي المخضرم وخشب العود الهندي الفاخر.</p>
    <br/>
    <p>يُختتم العطر بقاعدة راسخة من المسك الأبيض والصندل الكريمي والأنبرجريس، مما يمنحه ثباتاً استثنائياً يتجاوز الاثنتي عشرة ساعة على البشرة.</p>
    <br/>
    <p><strong>مناسب لـ:</strong> المناسبات الرسمية، السهرات الفاخرة، الهدايا المميزة، الاستخدام اليومي للباحثين عن التميز.</p>
  `,

  images: [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?fit=crop&w=900&q=85",
      alt: "عطر العود الملكي الذهبي - الصورة الرئيسية",
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1594035910387-fea47794261f?fit=crop&w=900&q=85",
      alt: "عطر العود الملكي الذهبي - تفاصيل الزجاجة",
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?fit=crop&w=900&q=85",
      alt: "عطر العود الملكي الذهبي - مجموعة",
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?fit=crop&w=900&q=85",
      alt: "عطر العود الملكي الذهبي - التغليف الفاخر",
    },
  ],

  sizes: [
    { label: "30 مل", value: "30ml", priceAdd: 0, available: true },
    { label: "50 مل", value: "50ml", priceAdd: 80, available: true },
    { label: "100 مل", value: "100ml", priceAdd: 200, available: true },
  ],

  concentrations: [
    { label: "Eau de Parfum", value: "edp", available: true },
    { label: "Eau de Toilette", value: "edt", available: false },
  ],

  details: {
    "الماركة": "Gold Oud Collection",
    "بلد المنشأ": "الإمارات العربية المتحدة",
    "التركيز": "Eau de Parfum",
    "ملاحظات القمة": "الزعفران الإيراني، الهيل",
    "ملاحظات القلب": "الورد الطائفي، العود الهندي",
    "ملاحظات القاعدة": "المسك الأبيض، الصندل، الأنبرجريس",
    "مدة البقاء": "12 - 16 ساعة",
    "انتشار الرائحة": "كبير جداً (Sillage fort)",
    "الوزن": "250 جرام",
    "الأبعاد": "8 × 5 × 15 سم",
    "رقم الباركود": "6921234567890",
    "الموسم": "الخريف والشتاء",
  },

  reviews: [
    {
      id: 1,
      author: "سارة العتيبي",
      initials: "س",
      rating: 5,
      date: "منذ 3 أيام",
      verified: true,
      helpful: 24,
      comment:
        "عطر رائع جداً، الرائحة تدوم لساعات طويلة وفخامته واضحة. اشتريته هدية لأختي وأعجبها جداً. التغليف فاخر جداً وشعرت بالقيمة من أول لحظة فتحت الصندوق. سأكرر الشراء بالتأكيد.",
    },
    {
      id: 2,
      author: "محمد الشمري",
      initials: "م",
      rating: 5,
      date: "منذ أسبوع",
      verified: true,
      helpful: 18,
      comment:
        "أفضل عطر جربته، رائحة العود أصيلة ومميزة. الثبات ممتاز جداً، حتى بعد 14 ساعة لا تزال تشم الرائحة. السعر مناسب جداً مقارنة بالجودة العالية. أنصح به بشدة.",
    },
    {
      id: 3,
      author: "نورة القحطاني",
      initials: "ن",
      rating: 4,
      date: "منذ أسبوعين",
      verified: true,
      helpful: 11,
      comment:
        "عطر جميل وفاخر، الرائحة مميزة وتثير الإعجاب في كل مكان أذهب إليه. توقعت التغليف أفخم قليلاً لكنه لا يزال جيداً جداً. سأكرر الشراء.",
    },
  ],
};

const relatedProducts = [
  {
    id: "rel-1",
    name: "عطر الورد الأبيض الراقي",
    price: 299,
    originalPrice: 399,
    discount: 25,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1587017539504-67cfbddac569?fit=crop&w=500&q=80",
  },
  {
    id: "rel-2",
    name: "مجموعة عطور الليل الفاخرة",
    price: 549,
    originalPrice: 699,
    discount: 21,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1590156562745-5a5c3a8bda50?fit=crop&w=500&q=80",
    badge: "جديد",
  },
  {
    id: "rel-3",
    name: "عطر المسك الأبيض الكلاسيكي",
    price: 229,
    originalPrice: 319,
    discount: 28,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1526045612212-70caf35c14df?fit=crop&w=500&q=80",
  },
  {
    id: "rel-4",
    name: "عطر الزعفران الذهبي",
    price: 449,
    originalPrice: 599,
    discount: 25,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1563170351-be82bc888aa4?fit=crop&w=500&q=80",
  },
  {
    id: "rel-5",
    name: "كولونيا الحمضيات المنعشة",
    price: 179,
    originalPrice: 249,
    discount: 28,
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1600612253971-183bb33d78f7?fit=crop&w=500&q=80",
  },
];

// ─── ProductPage ──────────────────────────────────────────────────────────────

export function ProductPage() {
  const [selectedSize, setSelectedSize] = useState("30ml");
  const [selectedConcentration, setSelectedConcentration] = useState("edp");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showSticky, setShowSticky] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const ctaTriggerRef = useRef<HTMLDivElement>(null);

  // Compute current price based on selected size
  const currentPrice = useMemo(() => {
    const sizeModifier =
      product.sizes.find((s) => s.value === selectedSize)?.priceAdd ?? 0;
    return product.basePrice + sizeModifier;
  }, [selectedSize]);

  // IntersectionObserver: show sticky when CTA scrolls off-screen
  useEffect(() => {
    const el = ctaTriggerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowSticky(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleAddToCart = useCallback(() => {
    setCartCount((c) => c + quantity);
  }, [quantity]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div
      dir="rtl"
      style={{ background: "#F8F9FC", minHeight: "100vh", fontFamily: "'Cairo', sans-serif" }}
    >
      {/* ── Page Header ────────────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-40"
        style={{
          background: "rgba(255,255,255,0.97)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(108,92,231,0.08)",
          boxShadow: "0 2px 16px rgba(108,92,231,0.06)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" onClick={scrollToTop} className="flex items-center gap-2 flex-shrink-0">
              <img src="/imgs/logo.png" alt="شعار المتجر" className="h-8 w-auto" />
            </Link>

            {/* Breadcrumb */}
            <nav
              className="hidden md:flex items-center gap-1 text-xs flex-1 justify-center"
              aria-label="مسار التنقل"
              style={{ fontFamily: "'Cairo', sans-serif" }}
            >
              <Link
                to="/"
                className="flex items-center gap-1 transition-colors duration-150 hover:opacity-70"
                style={{ color: "#a0aab4" }}
              >
                <Home className="w-3.5 h-3.5" />
                الرئيسية
              </Link>
              <ChevronLeft className="w-3 h-3" style={{ color: "#d1d5db" }} />
              <span style={{ color: "#a0aab4" }}>{product.category.name}</span>
              <ChevronLeft className="w-3 h-3" style={{ color: "#d1d5db" }} />
              <span
                className="font-semibold truncate max-w-[200px]"
                style={{ color: "#2D3436" }}
              >
                {product.name}
              </span>
            </nav>

            {/* Cart icon */}
            <button
              className="relative flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200"
              style={{
                background: "rgba(108,92,231,0.08)",
                color: "#6C5CE7",
              }}
              aria-label={`السلة: ${cartCount} منتج`}
            >
              <ShoppingBag className="w-5 h-5" />
              <span
                className="text-sm font-semibold hidden sm:inline"
                style={{ fontFamily: "'Cairo', sans-serif" }}
              >
                السلة
              </span>
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white"
                  style={{ background: "linear-gradient(135deg, #6C5CE7, #00CEC9)" }}
                >
                  {cartCount}
                </motion.span>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32">
        {/* ── Two-column product layout ──────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-16">
          {/* Gallery — sticky on desktop */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:sticky lg:top-24 lg:self-start"
          >
            <ProductGallery images={product.images} />
          </motion.div>

          {/* Info + Actions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="flex flex-col gap-6"
          >
            <ProductInfo
              name={product.name}
              brand={product.brand}
              category={product.category}
              rating={product.rating}
              reviewCount={product.reviewCount}
              soldCount={product.soldCount}
              shortDesc={product.shortDesc}
              basePrice={product.basePrice}
              originalPrice={product.originalPrice}
              discount={product.discount}
              sizes={product.sizes}
              concentrations={product.concentrations}
              stock={product.stock}
              selectedSize={selectedSize}
              selectedConcentration={selectedConcentration}
              currentPrice={currentPrice}
              onSizeChange={setSelectedSize}
              onConcentrationChange={setSelectedConcentration}
            />

            {/* Divider */}
            <div
              className="border-t"
              style={{ borderColor: "rgba(108,92,231,0.08)" }}
            />

            {/* Ref wrapper — IntersectionObserver watches this to show sticky cart */}
            <div ref={ctaTriggerRef}>
              <ProductActions
                currentPrice={currentPrice}
                quantity={quantity}
                isWishlisted={isWishlisted}
                productName={product.name}
                onQuantityChange={setQuantity}
                onWishlistToggle={() => setIsWishlisted((w) => !w)}
                onAddToCart={handleAddToCart}
              />
            </div>
          </motion.div>
        </div>

        {/* ── Tabs: Description / Details / Reviews ───────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <ProductTabs
            description={product.description}
            details={product.details}
            reviews={product.reviews}
            rating={product.rating}
            reviewCount={product.reviewCount}
          />
        </motion.div>

        {/* ── Related products ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="py-8 px-6 rounded-3xl"
          style={{
            background: "white",
            boxShadow: "0 4px 24px rgba(108,92,231,0.06)",
            border: "1px solid rgba(108,92,231,0.07)",
          }}
        >
          <RelatedProducts products={relatedProducts} />
        </motion.div>
      </main>

      {/* ── Sticky cart bar ──────────────────────────────────────────────── */}
      <StickyCart
        show={showSticky}
        productName={product.name}
        currentPrice={currentPrice}
        quantity={quantity}
        productImage={product.images[0].src}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}
