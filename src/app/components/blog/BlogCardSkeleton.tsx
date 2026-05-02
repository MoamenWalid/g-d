import { motion } from "motion/react";

export function BlogCardSkeleton() {
  return (
    <motion.article
      initial={{ opacity: 0.6 }}
      animate={{ opacity: 1 }}
      className="h-full overflow-hidden rounded-2xl border"
      style={{
        borderColor: "var(--home-card-border)",
        background: "var(--home-card-bg)",
        boxShadow: "var(--home-card-shadow)",
      }}
      aria-hidden
    >
      <div className="home-blog-skeleton-shimmer relative" style={{ aspectRatio: "16 / 10" }} />
      <div className="p-5 sm:p-6">
        <div className="mb-3 flex flex-wrap gap-2">
          <div className="home-blog-skeleton-shimmer h-3 w-24 rounded-full" />
          <div className="home-blog-skeleton-shimmer h-3 w-20 rounded-full" />
        </div>
        <div className="home-blog-skeleton-shimmer mb-2 h-5 w-full rounded-md" />
        <div className="home-blog-skeleton-shimmer mb-2 h-5 w-[88%] rounded-md" />
        <div className="home-blog-skeleton-shimmer mb-1.5 h-3.5 w-full rounded-md" />
        <div className="home-blog-skeleton-shimmer mb-1.5 h-3.5 w-[92%] rounded-md" />
        <div className="home-blog-skeleton-shimmer mt-4 h-3 w-[40%] rounded-md" />
      </div>
    </motion.article>
  );
}

type GridProps = {
  count?: number;
};

export function BlogGridSkeleton({ count = 6 }: GridProps) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <BlogCardSkeleton key={i} />
      ))}
    </>
  );
}
