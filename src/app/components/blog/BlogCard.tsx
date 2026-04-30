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
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="group overflow-hidden rounded-2xl bg-white border h-full"
      style={{
        borderColor: "rgba(108,92,231,0.1)",
        boxShadow: "0 8px 28px rgba(45,52,54,0.07)",
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
            style={{ background: "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.35) 100%)" }}
          />
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
            {post.tags.slice(0, 2).map((tag) => (
              <span
                key={`${post.slug}-${tag}`}
                className="rounded-full px-3 py-1 text-[11px] font-semibold text-white"
                style={{ background: "linear-gradient(135deg, #6C5CE7, #00CEC9)" }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="p-5 sm:p-6">
          <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs" style={{ color: "#7f8c96" }}>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5" />
              {formatDate(post.publishedAt)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <UserRound className="h-3.5 w-3.5" />
              {post.author}
            </span>
          </div>

          <h3
            className="mb-2 line-clamp-2 text-lg font-extrabold leading-tight"
            style={{ color: "#2D3436" }}
          >
            {post.title}
          </h3>
          <p className="line-clamp-3 text-sm leading-6" style={{ color: "#5f6b75" }}>
            {post.description}
          </p>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs font-semibold" style={{ color: "#a0aab4" }}>
              {post.readTime}
            </span>
            <span className="text-sm font-semibold" style={{ color: "#6C5CE7" }}>
              اقرأ المقال
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
