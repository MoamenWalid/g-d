import type { CSSProperties } from "react";
import { Link } from "react-router";
import { ChevronLeft, Home } from "lucide-react";

const navStyle: CSSProperties = { fontFamily: "'Cairo', sans-serif" };

export function BlogListingBreadcrumb() {
  return (
    <nav className="flex items-center gap-1 text-xs" aria-label="مسار التنقل" style={navStyle}>
      <Link to="/" className="flex items-center gap-1 transition-opacity duration-150 hover:opacity-70" style={{ color: "var(--home-text-muted)" }}>
        <Home className="h-3.5 w-3.5" />
        الرئيسية
      </Link>
      <ChevronLeft className="h-3 w-3" style={{ color: "var(--home-breadcrumb-chevron)" }} />
      <span className="font-semibold" style={{ color: "var(--home-text-primary)" }}>
        المدونة
      </span>
    </nav>
  );
}

export function BlogArticleBreadcrumb({ title }: { title: string }) {
  return (
    <nav className="flex min-w-0 max-w-full items-center gap-1 text-xs" aria-label="مسار التنقل" style={navStyle}>
      <Link to="/" className="flex shrink-0 items-center gap-1 transition-opacity duration-150 hover:opacity-70" style={{ color: "var(--home-text-muted)" }}>
        <Home className="h-3.5 w-3.5" />
        الرئيسية
      </Link>
      <ChevronLeft className="h-3 w-3 shrink-0" style={{ color: "var(--home-breadcrumb-chevron)" }} />
      <Link
        to="/blogs"
        className="shrink-0 font-medium transition-opacity duration-150 hover:opacity-80"
        style={{ color: "var(--home-text-muted)" }}
      >
        المدونة
      </Link>
      <ChevronLeft className="h-3 w-3 shrink-0" style={{ color: "var(--home-breadcrumb-chevron)" }} />
      <span className="min-w-0 max-w-[200px] truncate font-semibold sm:max-w-[280px]" style={{ color: "var(--home-text-primary)" }}>
        {title}
      </span>
    </nav>
  );
}
