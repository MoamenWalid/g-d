import type { CSSProperties } from "react";
import { Link } from "react-router";
import { ChevronLeft, Home } from "lucide-react";

const navStyle: CSSProperties = { fontFamily: "'Cairo', sans-serif" };

export function PoliciesBreadcrumb() {
  return (
    <nav className="flex min-w-0 max-w-full items-center gap-1 text-xs" aria-label="مسار التنقل" style={navStyle}>
      <Link to="/" className="flex shrink-0 items-center gap-1 transition-opacity duration-150 hover:opacity-70" style={{ color: "var(--home-text-muted)" }}>
        <Home className="h-3.5 w-3.5" />
        الرئيسية
      </Link>
      <ChevronLeft className="h-3 w-3 shrink-0" style={{ color: "var(--home-breadcrumb-chevron)" }} />
      <span className="truncate font-semibold" style={{ color: "var(--home-text-primary)" }}>
        الشروط والسياسات
      </span>
    </nav>
  );
}
