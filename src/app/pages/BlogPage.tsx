import { useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import { ArrowLeft, CalendarDays, Heart, UserRound } from "lucide-react";

import { BlogCard } from "../components/blog/BlogCard";
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
      <div dir="rtl" className="flex min-h-screen items-center justify-center bg-[#F8F9FC] p-4">
        <div
          className="w-full max-w-lg rounded-2xl border bg-white p-8 text-center"
          style={{ borderColor: "rgba(108,92,231,0.12)", boxShadow: "0 12px 30px rgba(45,52,54,0.08)" }}
        >
          <h1 className="text-2xl font-black" style={{ color: "#2D3436" }}>
            المقال غير موجود
          </h1>
          <p className="mt-2 text-sm leading-6" style={{ color: "#5f6b75" }}>
            لم نتمكن من العثور على هذا المقال. يمكنك العودة إلى صفحة المدونة واستعراض أحدث المقالات.
          </p>
          <Link
            to="/blogs"
            className="mt-5 inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white"
            style={{ background: "linear-gradient(135deg, #6C5CE7, #00CEC9)" }}
          >
            <ArrowLeft className="h-4 w-4" />
            تصفح المدونة
          </Link>
        </div>
      </div>
    );
  }

  const relatedPosts = getRelatedPosts(post, 3);
  const content = normalizeHtml(post.content);

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
          <Link to="/blogs" className="inline-flex items-center gap-2 text-sm font-semibold" style={{ color: "#6C5CE7" }}>
            <ArrowLeft className="h-4 w-4" />
            كل المقالات
          </Link>
          <span className="text-sm font-semibold" style={{ color: "#2D3436" }}>
            تفاصيل المقال
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <article
          className="overflow-hidden rounded-3xl border bg-white"
          style={{ borderColor: "rgba(108,92,231,0.1)", boxShadow: "0 15px 40px rgba(45,52,54,0.08)" }}
        >
          <img src={post.image} alt={post.title} className="h-[260px] w-full object-cover sm:h-[340px] lg:h-[420px]" />

          <div className="p-6 sm:p-8 lg:p-10">
            <div className="mb-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={`${post.slug}-${tag}`}
                  className="rounded-full px-3 py-1 text-xs font-semibold text-white"
                  style={{ background: "linear-gradient(135deg, #6C5CE7, #00CEC9)" }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl font-black leading-tight sm:text-4xl" style={{ color: "#2D3436" }}>
              {post.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm" style={{ color: "#7f8c96" }}>
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
                borderColor: liked ? "rgba(225,112,85,0.4)" : "rgba(108,92,231,0.18)",
                background: liked ? "rgba(225,112,85,0.08)" : "white",
                color: liked ? "#e17055" : "#2D3436",
              }}
              aria-pressed={liked}
            >
              <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
              {liked ? "تم الإعجاب" : "أعجبني هذا المقال"}
            </button>

            <div
              className="mt-8 border-t pt-8 text-[17px] leading-8 [&_a]:font-semibold [&_a]:text-[#6C5CE7] [&_blockquote]:border-l-4 [&_blockquote]:border-[#6C5CE7] [&_blockquote]:bg-[#f4f2ff] [&_blockquote]:px-5 [&_blockquote]:py-3 [&_blockquote]:italic [&_code]:rounded-md [&_code]:bg-[#f3f5f8] [&_code]:px-1.5 [&_code]:py-0.5 [&_h2]:mb-4 [&_h2]:mt-10 [&_h2]:text-3xl [&_h2]:font-black [&_h2]:leading-tight [&_h3]:mb-3 [&_h3]:mt-8 [&_h3]:text-2xl [&_h3]:font-bold [&_img]:my-8 [&_img]:w-full [&_img]:rounded-2xl [&_li]:mb-2 [&_ol]:my-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mb-5 [&_pre]:my-6 [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:bg-[#1f2430] [&_pre]:p-4 [&_pre]:text-sm [&_pre]:leading-6 [&_pre]:text-[#f8f9fc] [&_ul]:my-5 [&_ul]:list-disc [&_ul]:pl-6"
              style={{ borderColor: "rgba(108,92,231,0.1)", color: "#3d4750" }}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </article>

        {relatedPosts.length > 0 && (
          <section className="mt-12">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-2xl font-black" style={{ color: "#2D3436" }}>
                مقالات ذات صلة
              </h2>
              <Link to="/blogs" className="text-sm font-semibold" style={{ color: "#6C5CE7" }}>
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
