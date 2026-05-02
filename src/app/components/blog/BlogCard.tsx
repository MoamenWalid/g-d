import { Link } from "react-router";
import { motion } from "motion/react";
import { CalendarDays, UserRound } from "lucide-react";

import type { BlogPost } from "../../data/blogs";

type BlogCardProps = {
  post: BlogPost;
};

function formatDate(dateValue: string) {
  return new Intl.DateTimeFormat("ar-SA", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(dateValue));
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <motion.article
      whileHover={{ y: -6, boxShadow: "var(--home-card-shadow-hover)" }}
      transition={{ duration: 0.25 }}
      className="group h-full overflow-hidden rounded-2xl border"
      style={{
        borderColor: "var(--home-card-border)",
        background: "var(--home-card-bg)",
        boxShadow: "var(--home-card-shadow)",
      }}
    >
      <Link to={`/blogs/${post.slug}`} className="block h-full">
        <div className="relative overflow-hidden" style={{ aspectRatio: "16 / 10" }}>
          <img
            src={post.image}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "var(--home-related-overlay)" }}
          />
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
            {post.tags.slice(0, 2).map((tag) => (
              <span
                key={`${post.slug}-${tag}`}
                className="rounded-full px-3 py-1 text-[11px] font-semibold text-white"
                style={{ background: "var(--home-gradient-brand)" }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="p-5 sm:p-6">
          <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs" style={{ color: "var(--home-text-muted)" }}>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5" />
              {formatDate(post.publishedAt)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <UserRound className="h-3.5 w-3.5" />
              {post.author}
            </span>
          </div>

          <h3 className="mb-2 line-clamp-2 text-lg font-extrabold leading-tight" style={{ color: "var(--home-text-primary)" }}>
            {post.title}
          </h3>
          <p className="line-clamp-3 text-sm leading-6" style={{ color: "var(--home-text-secondary)" }}>
            {post.description}
          </p>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs font-semibold" style={{ color: "var(--home-text-muted)" }}>
              {post.readTime}
            </span>
            <span className="text-sm font-semibold" style={{ color: "var(--home-brand)" }}>
              اقرأ المقال
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
