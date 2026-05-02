import type { ReactNode } from "react";
import { Link } from "react-router";
import { HomeThemeToggle } from "./HomeThemeToggle";

type Props = {
  /** Center content (e.g. breadcrumb). Omit for logo-only + toggle. */
  center?: ReactNode;
  /** Right cluster before theme toggle (e.g. cart link). */
  end?: ReactNode;
};

export function AppPageHeader({ center, end }: Props) {
  return (
    <header
      className="sticky top-0 z-40"
      style={{
        background: "var(--home-pdp-header-bg)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--home-pdp-header-border)",
        boxShadow: "var(--home-pdp-header-shadow)",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-2 sm:gap-4">
          <Link to="/" className="flex flex-shrink-0 items-center gap-2">
            <img src="/imgs/logo.png" alt="شعار المتجر" className="h-8 w-auto" />
          </Link>

          {center != null && (
            <div className="hidden min-w-0 flex-1 justify-center md:flex">{center}</div>
          )}

          <div className="flex flex-shrink-0 items-center gap-2 sm:gap-3">
            {end}
            <HomeThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
