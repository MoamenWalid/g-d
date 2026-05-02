import { useState } from "react";
import { motion } from "motion/react";
import { Heart, ShoppingBag, Bell } from "lucide-react";
import { Link } from "react-router";

import type { CatalogProduct } from "../../data/categoryProducts";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Button } from "../ui/button";
import { cn } from "../ui/utils";

type Props = {
  product: CatalogProduct;
  wishlisted: boolean;
  onToggleWishlist: () => void;
  onAddToCart: () => void;
  onNotify: () => void;
};

export function CatalogProductCard({
  product,
  wishlisted,
  onToggleWishlist,
  onAddToCart,
  onNotify,
}: Props) {
  const [hovered, setHovered] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border transition-shadow duration-300",
        product.inStock ? "hover:shadow-lg" : "opacity-[0.97]",
      )}
      style={{
        borderColor: "var(--home-card-border)",
        background: "var(--home-card-bg)",
        boxShadow:
          hovered && product.inStock ? "var(--home-card-shadow-hover)" : "var(--home-card-shadow)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden" style={{ background: "var(--home-pdp-subtle-surface)" }}>
        {!imgLoaded && <div className="home-blog-skeleton-shimmer absolute inset-0" aria-hidden />}
        <ImageWithFallback
          src={product.image}
          alt={product.title}
          loading="lazy"
          decoding="async"
          width={640}
          height={480}
          onLoad={() => setImgLoaded(true)}
          className={cn(
            "size-full object-cover transition-transform duration-500 ease-out",
            product.inStock && "group-hover:scale-[1.06]",
            !imgLoaded && "opacity-0",
            imgLoaded && "opacity-100",
          )}
          draggable={false}
        />

        {!product.inStock && (
          <div
            className="absolute inset-0 flex items-center justify-center backdrop-blur-[2px]"
            style={{ background: "color-mix(in srgb, var(--home-text-primary) 42%, transparent)" }}
            aria-hidden
          />
        )}

        <div className="absolute left-3 top-3 z-10 flex flex-wrap gap-2">
          {!product.inStock && (
            <span
              className="rounded-full px-2.5 py-1 text-xs font-bold text-white shadow-md"
              style={{
                background: "linear-gradient(135deg, var(--home-text-muted), var(--home-text-primary))",
                fontFamily: "'Cairo', sans-serif",
              }}
            >
              غير متوفر
            </span>
          )}
          {product.compareAtPrice != null && product.compareAtPrice > product.price && product.inStock && (
            <span
              className="rounded-full px-2.5 py-1 text-xs font-bold text-white"
              style={{
                background: "var(--home-discount-gradient)",
                fontFamily: "'Cairo', sans-serif",
              }}
            >
              خصم
            </span>
          )}
        </div>

        <motion.button
          type="button"
          whileTap={{ scale: 0.92 }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleWishlist();
          }}
          className="absolute right-3 top-3 z-10 flex size-10 items-center justify-center rounded-full border shadow-md backdrop-blur-sm transition-colors"
          style={{
            borderColor: "var(--home-accent-soft-border)",
            background: "var(--home-pdp-header-bg)",
            color: "var(--home-brand)",
          }}
          aria-pressed={wishlisted}
          aria-label={wishlisted ? "إزالة من المفضلة" : "إضافة للمفضلة"}
        >
          <motion.span animate={{ scale: wishlisted ? [1, 1.2, 1] : 1 }} transition={{ duration: 0.35 }}>
            <Heart
              className="size-[18px]"
              fill={wishlisted ? "var(--home-wishlist)" : "none"}
              stroke={wishlisted ? "var(--home-wishlist)" : "currentColor"}
            />
          </motion.span>
        </motion.button>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <Link
          to="/info"
          className="block min-h-[2.75rem] rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--home-accent-ring)]"
        >
          <h3
            className="line-clamp-2 text-sm font-semibold leading-relaxed transition-colors group-hover:opacity-90"
            style={{ fontFamily: "'Cairo', sans-serif", color: "var(--home-text-primary)" }}
          >
            {product.title}
          </h3>
        </Link>

        <p className="text-xs" style={{ fontFamily: "'Cairo', sans-serif", color: "var(--home-text-muted)" }}>
          {product.categoryLabel}
        </p>

        <div className="mt-auto flex flex-wrap items-baseline gap-2">
          <span
            className="text-base font-black"
            style={{
              fontFamily: "'Cairo', sans-serif",
              background: "var(--home-gradient-text)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {product.price.toLocaleString("ar-SA")} ر.س
          </span>
          {product.compareAtPrice != null && product.compareAtPrice > product.price && (
            <span className="text-xs line-through" style={{ fontFamily: "'Cairo', sans-serif", color: "var(--home-text-muted)" }}>
              {product.compareAtPrice.toLocaleString("ar-SA")}
            </span>
          )}
        </div>

        {product.inStock ? (
          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
            <Button
              type="button"
              className="h-10 w-full rounded-xl border-0 font-semibold text-white transition-shadow hover:shadow-lg"
              style={{
                background: "var(--home-gradient-brand)",
                fontFamily: "'Cairo', sans-serif",
                boxShadow: "var(--home-cta-shadow)",
              }}
              onClick={onAddToCart}
            >
              <ShoppingBag className="size-4" />
              أضف إلى السلة
            </Button>
          </motion.div>
        ) : (
          <Button
            type="button"
            variant="outline"
            className="h-10 w-full rounded-xl font-semibold transition-colors"
            style={{
              fontFamily: "'Cairo', sans-serif",
              borderColor: "var(--home-accent-soft-border)",
              color: "var(--home-text-primary)",
              background: "var(--home-pdp-subtle-surface)",
            }}
            onClick={onNotify}
          >
            <Bell className="size-4" />
            أعلمني عند التوفر
          </Button>
        )}
      </div>
    </motion.article>
  );
}
