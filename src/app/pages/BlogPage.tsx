import { useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import { ArrowLeft, CalendarDays, Heart, UserRound } from "lucide-react";

import { AppPageHeader } from "../components/AppPageHeader";
import { BlogCard } from "../components/blog/BlogCard";
import { BlogArticleBreadcrumb, BlogListingBreadcrumb } from "../components/blog/blogBreadcrumbs";
import { getBlogBySlug, getRelatedPosts } from "../data/blogs";

function formatDate(dateValue: string) {
  return new Intl.DateTimeFormat("ar-SA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(dateValue));
}

function normalizeHtml(input: string) {
  if (!input) return "";
  const hasHtmlShell = /<html[\s>]/i.test(input);
  if (!hasHtmlShell || typeof window === "undefined") return input;

  const parser = new DOMParser();
  const doc = parser.parseFromString(input, "text/html");
  return doc.body.innerHTML || input;
}

export function BlogPage() {
  const { slug = "" } = useParams();
  const [liked, setLiked] = useState(false);

  const post = useMemo(() => getBlogBySlug(slug), [slug]);

  if (!post) {
    return (
      <div
        dir="rtl"
        className="flex min-h-screen flex-col"
        style={{
          backgroundColor: "var(--home-shell-bg)",
          color: "var(--home-text-primary)",
          fontFamily: "'Cairo', sans-serif",
        }}
      >
        <AppPageHeader center={<BlogListingBreadcrumb />} />
        <div className="flex flex-1 items-center justify-center p-4">
          <div
            className="w-full max-w-lg rounded-2xl border p-8 text-center"
            style={{
              background: "var(--home-card-bg)",
              borderColor: "var(--home-card-border)",
              boxShadow: "var(--home-card-shadow)",
            }}
          >
            <h1 className="text-2xl font-black" style={{ color: "var(--home-text-primary)" }}>
              المقال غير موجود
            </h1>
            <p className="mt-2 text-sm leading-6" style={{ color: "var(--home-text-secondary)" }}>
              لم نتمكن من العثور على هذا المقال. يمكنك العودة إلى صفحة المدونة واستعراض أحدث المقالات.
            </p>
            <Link
              to="/blogs"
              className="mt-5 inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: "var(--home-gradient-brand)", boxShadow: "var(--home-cta-shadow)" }}
            >
              <ArrowLeft className="h-4 w-4" />
              تصفح المدونة
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const relatedPosts = getRelatedPosts(post, 3);
  const content = normalizeHtml(post.content);

  return (
    <div
      dir="rtl"
      className="min-h-screen"
      style={{
        backgroundColor: "var(--home-shell-bg)",
        color: "var(--home-text-primary)",
        fontFamily: "'Cairo', sans-serif",
      }}
    >
      <AppPageHeader center={<BlogArticleBreadcrumb title={post.title} />} />

      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-12">
        <div className="mb-6 md:hidden">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-80"
            style={{ color: "var(--home-brand)" }}
          >
            <ArrowLeft className="h-4 w-4" />
            كل المقالات
          </Link>
        </div>

        <article
          className="overflow-hidden rounded-3xl border"
          style={{
            borderColor: "var(--home-card-border)",
            background: "var(--home-card-bg)",
            boxShadow: "var(--home-card-shadow)",
          }}
        >
          <img src={post.image} alt={post.title} className="h-[260px] w-full object-cover sm:h-[340px] lg:h-[420px]" />

          <div className="p-6 sm:p-8 lg:p-10">
            <div className="mb-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={`${post.slug}-${tag}`}
                  className="rounded-full px-3 py-1 text-xs font-semibold text-white"
                  style={{ background: "var(--home-gradient-brand)" }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl font-black leading-tight sm:text-4xl" style={{ color: "var(--home-text-primary)" }}>
              {post.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm" style={{ color: "var(--home-text-muted)" }}>
              <span className="inline-flex items-center gap-2">
                <UserRound className="h-4 w-4" />
                {post.author}
              </span>
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />
                {formatDate(post.publishedAt)}
              </span>
              <span>{post.readTime}</span>
            </div>

            <button
              type="button"
              onClick={() => setLiked((state) => !state)}
              className="mt-5 inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition-all duration-200"
              style={{
                borderColor: liked ? "var(--home-wishlist-border)" : "var(--home-accent-soft-border)",
                background: liked ? "var(--home-wishlist-bg)" : "var(--home-pdp-subtle-surface)",
                color: liked ? "var(--home-wishlist)" : "var(--home-text-primary)",
              }}
              aria-pressed={liked}
            >
              <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
              {liked ? "تم الإعجاب" : "أعجبني هذا المقال"}
            </button>

            <div
              className="home-blog-prose mt-8 border-t pt-8"
              style={{ borderColor: "var(--home-card-border)" }}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </article>

        {relatedPosts.length > 0 && (
          <section className="mt-12">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-2xl font-black" style={{ color: "var(--home-text-primary)" }}>
                مقالات ذات صلة
              </h2>
              <Link
                to="/blogs"
                className="text-sm font-semibold transition-opacity hover:opacity-80"
                style={{ color: "var(--home-brand)" }}
              >
                عرض كل المقالات
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost.slug} post={relatedPost} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
