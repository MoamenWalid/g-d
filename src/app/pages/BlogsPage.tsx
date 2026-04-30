import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";

import { BlogCard } from "../components/blog/BlogCard";
import { blogPosts } from "../data/blogs";

export function BlogsPage() {
  return (
    <div dir="rtl" style={{ minHeight: "100vh", background: "#F8F9FC" }}>
      <header
        className="sticky top-0 z-30 border-b"
        style={{
          background: "rgba(255,255,255,0.94)",
          backdropFilter: "blur(10px)",
          borderColor: "rgba(108,92,231,0.1)",
        }}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold" style={{ color: "#6C5CE7" }}>
            <ArrowLeft className="h-4 w-4" />
            العودة للرئيسية
          </Link>
          <span className="text-sm font-semibold" style={{ color: "#2D3436" }}>
            المدونة
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <section className="mb-10 text-center sm:mb-12">
          <h1 className="mx-auto max-w-3xl text-3xl font-black tracking-tight sm:text-4xl" style={{ color: "#2D3436" }}>
            مقالات احترافية في التصميم وتجربة المستخدم
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 sm:text-lg" style={{ color: "#5f6b75" }}>
            استكشف محتوى عملي من فرق التصميم والهندسة حول بناء تجارب رقمية مميزة، أنظمة قابلة للتوسع، ونتائج
            تجارية قابلة للقياس.
          </p>
        </section>

        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {blogPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </section>
      </main>
    </div>
  );
}
