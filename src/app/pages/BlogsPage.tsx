import { useEffect, useState } from "react";
import { Link } from "react-router";
import { ChevronRight } from "lucide-react";

import { AppPageHeader } from "../components/AppPageHeader";
import { BlogCard } from "../components/blog/BlogCard";
import { BlogGridSkeleton } from "../components/blog/BlogCardSkeleton";
import { BlogListingBreadcrumb } from "../components/blog/blogBreadcrumbs";
import { blogPosts } from "../data/blogs";

export function BlogsPage() {
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    const id = window.setTimeout(() => setShowSkeleton(false), 320);
    return () => window.clearTimeout(id);
  }, []);

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
      <AppPageHeader center={<BlogListingBreadcrumb />} />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-14">
        <nav
          className="mb-6 flex items-center gap-1.5 text-sm md:hidden"
          aria-label="مسار التنقل"
          style={{ color: "var(--home-text-muted)", fontFamily: "'Cairo', sans-serif" }}
        >
          <Link to="/" className="transition-opacity hover:opacity-80" style={{ color: "var(--home-text-muted)" }}>
            الرئيسية
          </Link>
          <ChevronRight className="h-3.5 w-3.5" style={{ color: "var(--home-breadcrumb-chevron)" }} />
          <span style={{ color: "var(--home-brand)" }}>المدونة</span>
        </nav>

        <section className="mb-10 text-center sm:mb-12">
          <h1 className="mx-auto max-w-3xl text-3xl font-black tracking-tight sm:text-4xl" style={{ color: "var(--home-text-primary)" }}>
            مقالات احترافية في التصميم وتجربة المستخدم
          </h1>
          <p
            className="mx-auto mt-4 max-w-2xl text-base leading-7 sm:text-lg"
            style={{ color: "var(--home-text-secondary)" }}
          >
            استكشف محتوى عملي من فرق التصميم والهندسة حول بناء تجارب رقمية مميزة، أنظمة قابلة للتوسع، ونتائج تجارية قابلة للقياس.
          </p>
        </section>

        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {showSkeleton ? <BlogGridSkeleton count={blogPosts.length} /> : blogPosts.map((post) => <BlogCard key={post.slug} post={post} />)}
        </section>
      </main>
    </div>
  );
}
