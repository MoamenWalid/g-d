import { useCallback, useEffect, useMemo, useState, useTransition } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { Toaster } from "sonner";
import { ChevronRight, Filter, ShoppingBag, SlidersHorizontal, X } from "lucide-react";
import { toast } from "sonner";

import { AppPageHeader } from "../components/AppPageHeader";
import { CategoryBreadcrumb } from "../components/category/CategoryBreadcrumb";
import { CatalogProductCard } from "../components/category/CatalogProductCard";
import { ProductCardSkeleton } from "../components/category/ProductCardSkeleton";
import { useHomeTheme } from "../context/HomeThemeContext";
import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";
import { Label } from "../components/ui/label";
import { ScrollArea } from "../components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../components/ui/sheet";
import { Slider } from "../components/ui/slider";
import { Separator } from "../components/ui/separator";
import { Badge } from "../components/ui/badge";
import { useIsMobile } from "../components/ui/use-mobile";
import {
  CATALOG_CATEGORIES,
  CATALOG_PRODUCTS,
  catalogPriceBounds,
  type CatalogCategoryId,
  type CatalogProduct,
} from "../data/categoryProducts";

type SortOption = "recommended" | "price_desc" | "price_asc" | "rating";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "recommended", label: "مقترحاتنا" },
  { value: "price_desc", label: "أعلى سعر" },
  { value: "price_asc", label: "أقل سعر" },
  { value: "rating", label: "أعلى تقييم" },
];

const INITIAL_LOAD_MS = 900;

const selectTriggerClass =
  "h-10 w-full rounded-xl border text-sm data-[placeholder]:text-[var(--home-text-muted)] [&_svg]:text-[var(--home-text-muted)]";

const selectTriggerStyle = {
  background: "var(--home-card-bg)",
  borderColor: "var(--home-accent-soft-border)",
  color: "var(--home-text-primary)",
  fontFamily: "'Cairo', sans-serif",
} as const;

function sortProducts(list: CatalogProduct[], sort: SortOption): CatalogProduct[] {
  const next = [...list];
  switch (sort) {
    case "price_desc":
      return next.sort((a, b) => b.price - a.price);
    case "price_asc":
      return next.sort((a, b) => a.price - b.price);
    case "rating":
      return next.sort((a, b) => b.rating - a.rating || b.recommendationRank - a.recommendationRank);
    case "recommended":
    default:
      return next.sort(
        (a, b) =>
          b.recommendationRank - a.recommendationRank ||
          b.rating - a.rating ||
          b.price - a.price,
      );
  }
}

function FiltersBody({
  selectedCategories,
  toggleCategory,
  priceRange,
  setPriceRange,
  bounds,
  onClear,
  hasActiveFilters,
}: {
  selectedCategories: Set<CatalogCategoryId>;
  toggleCategory: (id: CatalogCategoryId) => void;
  priceRange: [number, number];
  setPriceRange: (v: [number, number]) => void;
  bounds: { min: number; max: number };
  onClear: () => void;
  hasActiveFilters: boolean;
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-base font-bold" style={{ fontFamily: "'Cairo', sans-serif", color: "var(--home-text-primary)" }}>
          التصفية
        </h2>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-8 shrink-0 hover:opacity-90 disabled:opacity-40"
          style={{ fontFamily: "'Cairo', sans-serif", color: "var(--home-brand)" }}
          disabled={!hasActiveFilters}
          onClick={onClear}
        >
          مسح الكل
        </Button>
      </div>

      <div>
        <p
          className="mb-3 text-xs font-semibold uppercase tracking-wide"
          style={{ fontFamily: "'Cairo', sans-serif", color: "var(--home-text-muted)" }}
        >
          التصنيفات
        </p>
        <div className="flex flex-col gap-3">
          {CATALOG_CATEGORIES.map((cat) => (
            <label
              key={cat.id}
              className="flex cursor-pointer items-center gap-3 rounded-lg px-1 py-1.5 transition-colors hover:bg-[var(--home-accent-soft-bg)]"
            >
              <Checkbox
                checked={selectedCategories.has(cat.id)}
                onCheckedChange={() => toggleCategory(cat.id)}
                aria-label={cat.label}
              />
              <span className="text-sm" style={{ fontFamily: "'Cairo', sans-serif", color: "var(--home-text-primary)" }}>
                {cat.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      <Separator style={{ background: "var(--home-card-border)" }} />

      <div>
        <p
          className="mb-3 text-xs font-semibold uppercase tracking-wide"
          style={{ fontFamily: "'Cairo', sans-serif", color: "var(--home-text-muted)" }}
        >
          نطاق السعر (ر.س)
        </p>
        <Slider
          min={bounds.min}
          max={bounds.max}
          step={1}
          value={priceRange}
          onValueChange={(v) => setPriceRange([v[0], v[1]] as [number, number])}
          className="py-2"
        />
        <div className="mt-2 flex justify-between text-xs" style={{ fontFamily: "'Cairo', sans-serif", color: "var(--home-text-secondary)" }}>
          <span>{priceRange[0].toLocaleString("ar-SA")}</span>
          <span>{priceRange[1].toLocaleString("ar-SA")}</span>
        </div>
      </div>
    </div>
  );
}

export function CategoryPage() {
  const { theme } = useHomeTheme();
  const bounds = useMemo(() => catalogPriceBounds(CATALOG_PRODUCTS), []);
  const [priceRange, setPriceRange] = useState<[number, number]>([bounds.min, bounds.max]);
  const [selectedCategories, setSelectedCategories] = useState<Set<CatalogCategoryId>>(new Set());
  const [sort, setSort] = useState<SortOption>("recommended");
  const [wishlist, setWishlist] = useState<Set<string>>(() => new Set());
  const [initialLoading, setInitialLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const t = window.setTimeout(() => setInitialLoading(false), INITIAL_LOAD_MS);
    return () => window.clearTimeout(t);
  }, []);

  const toggleCategory = useCallback((id: CatalogCategoryId) => {
    startTransition(() => {
      setSelectedCategories((prev) => {
        const next = new Set(prev);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        return next;
      });
    });
  }, []);

  const setPriceRangeTransition = useCallback((v: [number, number]) => {
    startTransition(() => setPriceRange(v));
  }, []);

  const filtered = useMemo(() => {
    return CATALOG_PRODUCTS.filter((p) => {
      if (selectedCategories.size > 0 && !selectedCategories.has(p.categoryId)) return false;
      if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
      return true;
    });
  }, [selectedCategories, priceRange]);

  const visible = useMemo(() => sortProducts(filtered, sort).slice(0, 50), [filtered, sort]);

  const hasActiveFilters =
    selectedCategories.size > 0 || priceRange[0] !== bounds.min || priceRange[1] !== bounds.max;

  const clearFilters = useCallback(() => {
    startTransition(() => {
      setSelectedCategories(new Set());
      setPriceRange([bounds.min, bounds.max]);
    });
  }, [bounds.min, bounds.max]);

  const toggleWishlist = useCallback((id: string) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const onAddToCart = useCallback(() => {
    toast.success("تمت الإضافة للسلة", { description: "يمكنك متابعة التسوق أو فتح السلة." });
  }, []);

  const onNotify = useCallback(() => {
    toast.message("سنُعلمك عند التوفر", { description: "تم حفظ طلب التنبيه لهذا المنتج." });
  }, []);

  const activeFilterChips = useMemo(() => {
    const chips: { key: string; label: string; onRemove: () => void }[] = [];
    selectedCategories.forEach((id) => {
      const cat = CATALOG_CATEGORIES.find((c) => c.id === id);
      if (cat)
        chips.push({
          key: `cat-${id}`,
          label: cat.label,
          onRemove: () => toggleCategory(id),
        });
    });
    if (priceRange[0] !== bounds.min || priceRange[1] !== bounds.max) {
      chips.push({
        key: "price",
        label: `${priceRange[0].toLocaleString("ar-SA")} — ${priceRange[1].toLocaleString("ar-SA")} ر.س`,
        onRemove: () => startTransition(() => setPriceRange([bounds.min, bounds.max])),
      });
    }
    return chips;
  }, [selectedCategories, priceRange, bounds, toggleCategory]);

  const showSkeleton = initialLoading;
  const gridDimmed = isPending && !initialLoading;

  const headerCart = (
    <Link
      to="/cart"
      className="flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 transition-opacity duration-150 hover:opacity-90 sm:px-4"
      style={{ background: "var(--home-pdp-cart-chip-bg)", color: "var(--home-brand)" }}
    >
      <ShoppingBag className="size-5" />
      <span className="hidden text-sm font-semibold sm:inline" style={{ fontFamily: "'Cairo', sans-serif" }}>
        السلة
      </span>
    </Link>
  );

  return (
    <div
      dir="rtl"
      className="min-h-screen pb-28"
      style={{ backgroundColor: "var(--home-shell-bg)", fontFamily: "'Cairo', sans-serif", color: "var(--home-text-primary)" }}
    >
      <Toaster richColors position="top-center" theme={theme === "dark" ? "dark" : "light"} />

      <AppPageHeader center={<CategoryBreadcrumb />} end={headerCart} />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <nav
          className="mb-6 flex items-center gap-1.5 text-sm md:hidden"
          aria-label="مسار التنقل"
          style={{ color: "var(--home-text-muted)", fontFamily: "'Cairo', sans-serif" }}
        >
          <Link to="/" className="transition-opacity hover:opacity-80" style={{ color: "var(--home-text-muted)" }}>
            الرئيسية
          </Link>
          <ChevronRight className="h-3.5 w-3.5" style={{ color: "var(--home-breadcrumb-chevron)" }} />
          <span style={{ color: "var(--home-brand)" }}>جميع المنتجات</span>
        </nav>

        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-extrabold sm:text-3xl" style={{ color: "var(--home-text-primary)" }}>
              جميع المنتجات
            </h1>
            <p className="mt-1 text-sm" style={{ color: "var(--home-text-muted)" }}>
              {showSkeleton ? "جاري التحميل…" : `${visible.length} منتجاً يطابق عرضك الحالي`}
            </p>
          </div>
          {!isMobile && (
            <div className="flex w-full max-w-xs flex-col gap-1 sm:w-64">
              <Label className="text-xs" style={{ color: "var(--home-text-muted)" }}>
                الترتيب
              </Label>
              <Select value={sort} onValueChange={(v) => startTransition(() => setSort(v as SortOption))}>
                <SelectTrigger className={selectTriggerClass} style={selectTriggerStyle}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SORT_OPTIONS.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        {activeFilterChips.length > 0 && (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold" style={{ color: "var(--home-text-secondary)" }}>
              عوامل التصفية:
            </span>
            {activeFilterChips.map((chip) => (
              <Badge
                key={chip.key}
                variant="secondary"
                className="gap-1 rounded-full border-0 py-1 pl-1 pr-2.5 text-xs font-medium"
                style={{ background: "var(--home-accent-soft-bg)", color: "var(--home-text-primary)" }}
              >
                {chip.label}
                <button
                  type="button"
                  className="rounded-full p-0.5 transition-colors hover:bg-[var(--home-pdp-subtle-surface)]"
                  aria-label={`إزالة ${chip.label}`}
                  onClick={chip.onRemove}
                >
                  <X className="size-3" style={{ color: "var(--home-text-muted)" }} />
                </button>
              </Badge>
            ))}
            <Button
              type="button"
              variant="link"
              className="h-auto p-0 text-xs hover:opacity-90"
              style={{ color: "var(--home-brand)" }}
              onClick={clearFilters}
            >
              مسح الكل
            </Button>
          </div>
        )}

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          {!isMobile && (
            <aside className="lg:w-72 lg:shrink-0" style={{ position: "sticky", top: "6rem", alignSelf: "flex-start" }}>
              <div
                className="rounded-2xl border p-5"
                style={{
                  borderColor: "var(--home-card-border)",
                  background: "var(--home-card-bg)",
                  boxShadow: "var(--home-card-shadow)",
                }}
              >
                <FiltersBody
                  selectedCategories={selectedCategories}
                  toggleCategory={toggleCategory}
                  priceRange={priceRange}
                  setPriceRange={setPriceRangeTransition}
                  bounds={bounds}
                  onClear={clearFilters}
                  hasActiveFilters={hasActiveFilters}
                />
              </div>
            </aside>
          )}

          <div className="min-w-0 flex-1">
            <div className={`relative transition-opacity duration-200 ${gridDimmed ? "opacity-60" : "opacity-100"}`}>
              {showSkeleton ? (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <ProductCardSkeleton key={i} />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {visible.map((p) => (
                    <CatalogProductCard
                      key={p.id}
                      product={p}
                      wishlisted={wishlist.has(p.id)}
                      onToggleWishlist={() => toggleWishlist(p.id)}
                      onAddToCart={onAddToCart}
                      onNotify={onNotify}
                    />
                  ))}
                </div>
              )}

              {!showSkeleton && visible.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center rounded-2xl border border-dashed py-20 text-center"
                  style={{
                    borderColor: "var(--home-accent-soft-border)",
                    background: "var(--home-card-bg)",
                    boxShadow: "var(--home-card-shadow)",
                  }}
                >
                  <SlidersHorizontal className="mb-3 size-10" style={{ color: "var(--home-control-disabled-text)" }} />
                  <p className="text-lg font-semibold" style={{ color: "var(--home-text-primary)" }}>
                    لا توجد منتجات مطابقة
                  </p>
                  <p className="mt-1 max-w-sm text-sm" style={{ color: "var(--home-text-muted)" }}>
                    جرّب توسيع نطاق السعر أو إلغاء بعض التصنيفات.
                  </p>
                  <Button
                    className="mt-6 rounded-xl font-semibold text-white"
                    style={{ background: "var(--home-gradient-brand)", boxShadow: "var(--home-cta-shadow)" }}
                    onClick={clearFilters}
                  >
                    إعادة ضبط التصفية
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </main>

      {isMobile && (
        <div
          className="fixed inset-x-0 bottom-0 z-50 border-t px-4 py-3 backdrop-blur-md"
          style={{
            background: "var(--home-sticky-cart-bg)",
            borderColor: "var(--home-sticky-cart-border)",
            boxShadow: "var(--home-sticky-cart-shadow)",
            paddingBottom: "max(0.75rem, env(safe-area-inset-bottom, 0px))",
          }}
        >
          <div className="mx-auto flex max-w-lg items-center gap-3">
            <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
              <SheetTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="h-11 flex-1 rounded-xl"
                  style={{ borderColor: "var(--home-accent-soft-border)", color: "var(--home-text-primary)" }}
                >
                  <Filter className="size-4" />
                  التصفية
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full max-w-md border-0 p-0">
                <SheetHeader
                  className="border-b p-4 text-right"
                  style={{ borderColor: "var(--home-card-border)", background: "var(--home-card-bg)" }}
                >
                  <SheetTitle style={{ fontFamily: "'Cairo', sans-serif", color: "var(--home-text-primary)" }}>
                    تصفية المنتجات
                  </SheetTitle>
                </SheetHeader>
                <ScrollArea className="h-[calc(100vh-5rem)] p-4" style={{ background: "var(--home-shell-bg)" }}>
                  <FiltersBody
                    selectedCategories={selectedCategories}
                    toggleCategory={toggleCategory}
                    priceRange={priceRange}
                    setPriceRange={setPriceRangeTransition}
                    bounds={bounds}
                    onClear={clearFilters}
                    hasActiveFilters={hasActiveFilters}
                  />
                </ScrollArea>
              </SheetContent>
            </Sheet>
            <div className="min-w-0 flex-[1.4]">
              <Select value={sort} onValueChange={(v) => startTransition(() => setSort(v as SortOption))}>
                <SelectTrigger className={`${selectTriggerClass} h-11`} style={selectTriggerStyle}>
                  <SelectValue placeholder="الترتيب" />
                </SelectTrigger>
                <SelectContent>
                  {SORT_OPTIONS.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
