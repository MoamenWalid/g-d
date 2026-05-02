import { motion } from "motion/react";

export function ProductCardSkeleton() {
  return (
    <motion.article
      initial={{ opacity: 0.6 }}
      animate={{ opacity: 1 }}
      className="flex flex-col overflow-hidden rounded-2xl border"
      style={{
        borderColor: "var(--home-card-border)",
        background: "var(--home-card-bg)",
        boxShadow: "var(--home-card-shadow)",
      }}
      aria-hidden
    >
      <div className="home-blog-skeleton-shimmer relative aspect-[4/3] w-full" />
      <div className="flex flex-col gap-3 p-4">
        <div className="home-blog-skeleton-shimmer h-4 w-full rounded-md" />
        <div className="home-blog-skeleton-shimmer h-4 w-[88%] max-w-full rounded-md" />
        <div className="flex gap-2 pt-1">
          <div className="home-blog-skeleton-shimmer h-3.5 w-24 rounded-md" />
          <div className="home-blog-skeleton-shimmer h-3.5 w-14 rounded-md" />
        </div>
        <div className="home-blog-skeleton-shimmer mt-1 h-10 w-full rounded-xl" />
      </div>
    </motion.article>
  );
}
