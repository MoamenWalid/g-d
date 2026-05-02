import { useState } from "react";
import type { CSSProperties } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, ThumbsUp, BadgeCheck } from "lucide-react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

export type Review = {
  id: number;
  author: string;
  initials: string;
  rating: number;
  date: string;
  verified: boolean;
  helpful: number;
  comment: string;
};

type Props = {
  description: string;
  details: Record<string, string>;
  reviews: Review[];
  rating: number;
  reviewCount: number;
};

function StarsDisplay({ rating, size = 4 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          style={{
            width: size,
            height: size,
            color: i <= Math.round(rating) ? "var(--home-star)" : "var(--home-star-empty)",
            fill: i <= Math.round(rating) ? "var(--home-star)" : "none",
          }}
        />
      ))}
    </div>
  );
}

function RatingBar({ stars, count, total }: { stars: number; count: number; total: number }) {
  const pct = total > 0 ? (count / total) * 100 : 0;
  return (
    <div className="flex items-center gap-3">
      <div className="flex flex-shrink-0 gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className="h-3 w-3"
            fill={i <= stars ? "var(--home-star)" : "none"}
            style={{ color: i <= stars ? "var(--home-star)" : "var(--home-star-empty)" }}
          />
        ))}
      </div>
      <div className="h-2 flex-1 overflow-hidden rounded-full" style={{ background: "var(--home-accent-soft-bg)" }}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ background: "var(--home-gradient-brand)" }}
        />
      </div>
      <span className="w-8 text-left text-xs" style={{ color: "var(--home-text-muted)", fontFamily: "'Cairo', sans-serif" }}>
        {count}
      </span>
    </div>
  );
}

const tabConfig = [
  { value: "description", label: "الوصف" },
  { value: "details", label: "تفاصيل المنتج" },
  { value: "reviews", label: "التقييمات" },
];

export function ProductTabs({ description, details, reviews, rating, reviewCount }: Props) {
  const [active, setActive] = useState("description");
  const [helpfulMap, setHelpfulMap] = useState<Record<number, boolean>>({});

  const ratingBreakdown = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: reviews.filter((r) => Math.round(r.rating) === stars).length,
  }));

  const detailEntries = Object.entries(details);

  return (
    <TabsPrimitive.Root value={active} onValueChange={setActive}>
      <TabsPrimitive.List
        className="flex w-fit gap-1 rounded-2xl p-1.5"
        style={{ background: "var(--home-card-bg)", boxShadow: "var(--home-card-shadow)" }}
        aria-label="أقسام المنتج"
      >
        {tabConfig.map(({ value, label }) => (
          <TabsPrimitive.Trigger
            key={value}
            value={value}
            className="relative rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-2"
            style={
              {
                fontFamily: "'Cairo', sans-serif",
                color: active === value ? "white" : "var(--home-text-secondary)",
                "--tw-ring-color": "var(--home-brand)",
              } as CSSProperties
            }
          >
            {active === value && (
              <motion.span
                layoutId="tab-pill"
                className="absolute inset-0 rounded-xl"
                style={{ background: "var(--home-gradient-brand)" }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
              />
            )}
            <span className="relative z-10">{label}</span>
            {value === "reviews" && (
              <span
                className="relative z-10 mr-1.5 rounded-full px-1.5 py-0.5 text-xs font-bold"
                style={{
                  background: active === value ? "rgba(255,255,255,0.25)" : "var(--home-accent-soft-bg)",
                  color: active === value ? "white" : "var(--home-brand)",
                }}
              >
                {reviewCount}
              </span>
            )}
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>

      <div
        className="mt-6 rounded-3xl p-7"
        style={{
          background: "var(--home-card-bg)",
          boxShadow: "var(--home-card-shadow)",
          border: "1px solid var(--home-card-border)",
        }}
      >
        <AnimatePresence mode="wait">
          <TabsPrimitive.Content value="description" asChild>
            <motion.div
              key="description"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className="home-pdp-prose prose max-w-none text-sm leading-loose"
                style={{ fontFamily: "'Cairo', sans-serif", lineHeight: 2 }}
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </motion.div>
          </TabsPrimitive.Content>

          <TabsPrimitive.Content value="details" asChild>
            <motion.div
              key="details"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <dl className="grid grid-cols-1 gap-0 sm:grid-cols-2">
                {detailEntries.map(([key, value], i) => (
                  <div
                    key={key}
                    className="flex items-start gap-3 rounded-xl px-4 py-3.5 transition-colors duration-150 hover:bg-[var(--home-accent-soft-bg)]"
                    style={{
                      borderBottom: i < detailEntries.length - 1 ? "1px solid var(--home-card-border)" : "none",
                    }}
                  >
                    <dt
                      className="w-28 flex-shrink-0 text-sm font-semibold"
                      style={{ color: "var(--home-text-primary)", fontFamily: "'Cairo', sans-serif" }}
                    >
                      {key}
                    </dt>
                    <dd className="text-sm" style={{ color: "var(--home-text-secondary)", fontFamily: "'Cairo', sans-serif" }}>
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          </TabsPrimitive.Content>

          <TabsPrimitive.Content value="reviews" asChild>
            <motion.div
              key="reviews"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-8"
            >
              <div className="flex flex-col items-start gap-8 sm:flex-row">
                <div
                  className="flex flex-shrink-0 flex-col items-center gap-2 rounded-2xl p-6"
                  style={{
                    background: "var(--home-accent-soft-bg)",
                    border: "1px solid var(--home-card-border)",
                    minWidth: "140px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Cairo', sans-serif",
                      fontWeight: 900,
                      fontSize: "3.5rem",
                      lineHeight: 1,
                      background: "var(--home-gradient-text)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {rating}
                  </span>
                  <StarsDisplay rating={rating} size={16} />
                  <span className="text-xs" style={{ color: "var(--home-text-muted)", fontFamily: "'Cairo', sans-serif" }}>
                    {reviewCount} تقييم
                  </span>
                </div>

                <div className="flex w-full flex-1 flex-col gap-2">
                  {ratingBreakdown.map(({ stars, count }) => (
                    <RatingBar key={stars} stars={stars} count={count} total={reviews.length} />
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-5">
                {reviews.map((review) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="rounded-2xl p-5"
                    style={{
                      background: "var(--home-pdp-subtle-surface)",
                      border: "1px solid var(--home-card-border)",
                    }}
                  >
                    <div className="mb-3 flex items-start gap-3">
                      <div
                        className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                        style={{ background: "var(--home-gradient-brand)" }}
                      >
                        {review.initials}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-sm font-semibold" style={{ color: "var(--home-text-primary)", fontFamily: "'Cairo', sans-serif" }}>
                            {review.author}
                          </span>
                          {review.verified && (
                            <span
                              className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs"
                              style={{
                                background: "var(--home-success-soft)",
                                color: "var(--home-success)",
                                fontFamily: "'Cairo', sans-serif",
                              }}
                            >
                              <BadgeCheck className="h-3 w-3" />
                              مشتري موثق
                            </span>
                          )}
                        </div>
                        <div className="mt-1 flex items-center gap-2">
                          <StarsDisplay rating={review.rating} size={14} />
                          <span className="text-xs" style={{ color: "var(--home-text-muted)", fontFamily: "'Cairo', sans-serif" }}>
                            {review.date}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p
                      className="mb-3 text-sm leading-relaxed"
                      style={{ color: "var(--home-text-secondary)", fontFamily: "'Cairo', sans-serif", lineHeight: 1.85 }}
                    >
                      {review.comment}
                    </p>

                    <button
                      type="button"
                      onClick={() => setHelpfulMap((prev) => ({ ...prev, [review.id]: !prev[review.id] }))}
                      className="flex items-center gap-1.5 text-xs transition-colors duration-150"
                      style={{
                        color: helpfulMap[review.id] ? "var(--home-brand)" : "var(--home-text-muted)",
                        fontFamily: "'Cairo', sans-serif",
                      }}
                    >
                      <ThumbsUp className="h-3.5 w-3.5" fill={helpfulMap[review.id] ? "var(--home-brand)" : "none"} />
                      مفيد ({review.helpful + (helpfulMap[review.id] ? 1 : 0)})
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </TabsPrimitive.Content>
        </AnimatePresence>
      </div>
    </TabsPrimitive.Root>
  );
}
