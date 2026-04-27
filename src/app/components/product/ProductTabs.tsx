import { useState } from "react";
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
            color: i <= Math.round(rating) ? "#FDCB6E" : "#E2E8F0",
            fill: i <= Math.round(rating) ? "#FDCB6E" : "none",
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
      <div className="flex gap-0.5 flex-shrink-0">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className="w-3 h-3"
            fill={i <= stars ? "#FDCB6E" : "none"}
            style={{ color: i <= stars ? "#FDCB6E" : "#E2E8F0" }}
          />
        ))}
      </div>
      <div
        className="flex-1 h-2 rounded-full overflow-hidden"
        style={{ background: "rgba(108,92,231,0.1)" }}
      >
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg, #6C5CE7, #00CEC9)" }}
        />
      </div>
      <span
        className="text-xs w-8 text-left"
        style={{ color: "#a0aab4", fontFamily: "'Cairo', sans-serif" }}
      >
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

  return (
    <TabsPrimitive.Root value={active} onValueChange={setActive}>
      {/* ── Tab list ────────────────────────────────────────────────── */}
      <TabsPrimitive.List
        className="flex gap-1 p-1.5 rounded-2xl w-fit"
        style={{ background: "white", boxShadow: "0 2px 12px rgba(108,92,231,0.08)" }}
        aria-label="أقسام المنتج"
      >
        {tabConfig.map(({ value, label }) => (
          <TabsPrimitive.Trigger
            key={value}
            value={value}
            className="relative px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-2"
            style={{
              fontFamily: "'Cairo', sans-serif",
              color: active === value ? "white" : "#636e72",
              "--tw-ring-color": "#6C5CE7",
            } as React.CSSProperties}
          >
            {active === value && (
              <motion.span
                layoutId="tab-pill"
                className="absolute inset-0 rounded-xl"
                style={{ background: "linear-gradient(135deg, #6C5CE7, #00CEC9)" }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
              />
            )}
            <span className="relative z-10">{label}</span>
            {value === "reviews" && (
              <span
                className="relative z-10 mr-1.5 px-1.5 py-0.5 rounded-full text-xs font-bold"
                style={{
                  background: active === value ? "rgba(255,255,255,0.25)" : "rgba(108,92,231,0.1)",
                  color: active === value ? "white" : "#6C5CE7",
                }}
              >
                {reviewCount}
              </span>
            )}
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>

      {/* ── Tab panels ──────────────────────────────────────────────── */}
      <div
        className="mt-6 rounded-3xl p-7"
        style={{
          background: "white",
          boxShadow: "0 4px 24px rgba(108,92,231,0.06)",
          border: "1px solid rgba(108,92,231,0.07)",
        }}
      >
        <AnimatePresence mode="wait">
          {/* Description */}
          <TabsPrimitive.Content value="description" asChild>
            <motion.div
              key="description"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className="prose max-w-none text-sm leading-loose"
                style={{
                  fontFamily: "'Cairo', sans-serif",
                  color: "#636e72",
                  lineHeight: 2,
                }}
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </motion.div>
          </TabsPrimitive.Content>

          {/* Details */}
          <TabsPrimitive.Content value="details" asChild>
            <motion.div
              key="details"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-0">
                {Object.entries(details).map(([key, value], i) => (
                  <div
                    key={key}
                    className="flex items-start gap-3 py-3.5 px-4 rounded-xl transition-colors duration-150 hover:bg-purple-50"
                    style={{
                      borderBottom:
                        i < Object.entries(details).length - 1
                          ? "1px solid rgba(108,92,231,0.07)"
                          : "none",
                    }}
                  >
                    <dt
                      className="text-sm font-semibold w-28 flex-shrink-0"
                      style={{ color: "#2D3436", fontFamily: "'Cairo', sans-serif" }}
                    >
                      {key}
                    </dt>
                    <dd
                      className="text-sm"
                      style={{ color: "#636e72", fontFamily: "'Cairo', sans-serif" }}
                    >
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          </TabsPrimitive.Content>

          {/* Reviews */}
          <TabsPrimitive.Content value="reviews" asChild>
            <motion.div
              key="reviews"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-8"
            >
              {/* Summary */}
              <div className="flex flex-col sm:flex-row gap-8 items-start">
                {/* Overall score */}
                <div className="flex flex-col items-center gap-2 p-6 rounded-2xl flex-shrink-0"
                  style={{ background: "rgba(108,92,231,0.04)", border: "1px solid rgba(108,92,231,0.08)", minWidth: "140px" }}
                >
                  <span
                    style={{
                      fontFamily: "'Cairo', sans-serif",
                      fontWeight: 900,
                      fontSize: "3.5rem",
                      lineHeight: 1,
                      background: "linear-gradient(135deg, #6C5CE7, #00CEC9)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {rating}
                  </span>
                  <StarsDisplay rating={rating} size={16} />
                  <span
                    className="text-xs"
                    style={{ color: "#a0aab4", fontFamily: "'Cairo', sans-serif" }}
                  >
                    {reviewCount} تقييم
                  </span>
                </div>

                {/* Breakdown bars */}
                <div className="flex flex-col gap-2 flex-1 w-full">
                  {ratingBreakdown.map(({ stars, count }) => (
                    <RatingBar
                      key={stars}
                      stars={stars}
                      count={count}
                      total={reviews.length}
                    />
                  ))}
                </div>
              </div>

              {/* Review cards */}
              <div className="flex flex-col gap-5">
                {reviews.map((review) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="p-5 rounded-2xl"
                    style={{
                      background: "#FAFBFF",
                      border: "1px solid rgba(108,92,231,0.08)",
                    }}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      {/* Avatar */}
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                        style={{ background: "linear-gradient(135deg, #6C5CE7, #00CEC9)" }}
                      >
                        {review.initials}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className="text-sm font-semibold"
                            style={{ color: "#2D3436", fontFamily: "'Cairo', sans-serif" }}
                          >
                            {review.author}
                          </span>
                          {review.verified && (
                            <span
                              className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full"
                              style={{
                                background: "rgba(0,184,148,0.1)",
                                color: "#00b894",
                                fontFamily: "'Cairo', sans-serif",
                              }}
                            >
                              <BadgeCheck className="w-3 h-3" />
                              مشتري موثق
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <StarsDisplay rating={review.rating} size={14} />
                          <span
                            className="text-xs"
                            style={{ color: "#a0aab4", fontFamily: "'Cairo', sans-serif" }}
                          >
                            {review.date}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p
                      className="text-sm leading-relaxed mb-3"
                      style={{ color: "#636e72", fontFamily: "'Cairo', sans-serif", lineHeight: 1.85 }}
                    >
                      {review.comment}
                    </p>

                    <button
                      onClick={() =>
                        setHelpfulMap((prev) => ({ ...prev, [review.id]: !prev[review.id] }))
                      }
                      className="flex items-center gap-1.5 text-xs transition-colors duration-150"
                      style={{
                        color: helpfulMap[review.id] ? "#6C5CE7" : "#a0aab4",
                        fontFamily: "'Cairo', sans-serif",
                      }}
                    >
                      <ThumbsUp
                        className="w-3.5 h-3.5"
                        fill={helpfulMap[review.id] ? "#6C5CE7" : "none"}
                      />
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
