import { useState } from "react";
import { motion } from "motion/react";
import { Check, Star, Zap, Crown, Info } from "lucide-react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

// ─── Data ────────────────────────────────────────────────────────────────────

type Feature = { label: string; tooltip: string };

type Plan = {
  id: string;
  name: string;
  icon: React.ElementType;
  desc: string;
  price: string;
  currency: string;
  period: string;
  highlighted: boolean;
  gradient: string;
  color: string;
  badge?: string;
  features: Feature[];
  cta: string;
};

const plans: Plan[] = [
  {
    id: "starter",
    name: "المبتدئ",
    icon: Zap,
    desc: "مثالي للمتاجر الجديدة التي تبدأ على سلة.",
    price: "499",
    currency: "ر.س",
    period: "دفعة واحدة",
    highlighted: false,
    gradient: "linear-gradient(135deg, #74b9ff, #0984e3)",
    color: "#0984e3",
    features: [
      {
        label: "تصميم شعار (مفهومان)",
        tooltip: "نصمم لك شعارين مختلفين يعكسان هوية علامتك التجارية، لتختار الأنسب لك.",
      },
      {
        label: "مجموعة بانرات أساسية (3 بانرات)",
        tooltip: "ثلاثة بانرات احترافية جاهزة للاستخدام في متجرك أو على منصاتك التواصلية.",
      },
      {
        label: "إعداد ألوان قالب سلة",
        tooltip: "ضبط ألوان وخطوط القالب لتنسجم مع هويتك البصرية بشكل مثالي.",
      },
      {
        label: "جولتان للتعديل",
        tooltip: "حقك في طلب جولتين من التعديلات بعد تسليم التصاميم الأولية.",
      },
      {
        label: "تسليم خلال 72 ساعة",
        tooltip: "نلتزم بتسليم جميع الملفات كاملةً خلال 72 ساعة من انطلاق العمل.",
      },
      {
        label: "دعم عبر البريد الإلكتروني",
        tooltip: "دعم فني متخصص عبر البريد الإلكتروني خلال ساعات العمل الرسمية.",
      },
    ],
    cta: "احصل على المبتدئ",
  },
  {
    id: "professional",
    name: "الاحترافي",
    icon: Star,
    desc: "الخيار الأكثر شيوعاً للأعمال النامية.",
    price: "1,299",
    currency: "ر.س",
    period: "دفعة واحدة",
    highlighted: true,
    gradient: "linear-gradient(135deg, #6C5CE7, #00CEC9)",
    color: "#6C5CE7",
    badge: "الأكثر شيوعاً",
    features: [
      {
        label: "حزمة هوية بصرية كاملة",
        tooltip: "شعار + ألوان + خطوط + دليل استخدام — كل ما يبني هوية بصرية متكاملة.",
      },
      {
        label: "إعداد متجر سلة كامل",
        tooltip: "إعداد وتهيئة جميع أقسام متجرك على منصة سلة من الألف إلى الياء.",
      },
      {
        label: "تفعيل القالب (عالي/نجم)",
        tooltip: "تفعيل وتخصيص قوالب عالي أو نجم المميزة لتعطي متجرك مظهراً احترافياً.",
      },
      {
        label: "10 بانرات مخصصة",
        tooltip: "عشرة بانرات مصممة خصيصاً لمنتجاتك وعروضك وحملاتك التسويقية.",
      },
      {
        label: "تعديلات غير محدودة",
        tooltip: "طلب أي عدد من التعديلات حتى تصل إلى النتيجة التي تحلم بها.",
      },
      {
        label: "تسليم خلال 48 ساعة",
        tooltip: "تسليم أسرع خلال 48 ساعة نظراً للأولوية الممنوحة لهذه الحزمة.",
      },
      {
        label: "دعم واتساب أولوية",
        tooltip: "تواصل مباشر وسريع عبر واتساب مع فريق الدعم المتخصص على مدار الساعة.",
      },
      {
        label: "شهر صيانة مجانية",
        tooltip: "متابعة وصيانة متجرك مجاناً لمدة شهر كامل بعد التسليم النهائي.",
      },
    ],
    cta: "احصل على الاحترافي",
  },
  {
    id: "premium",
    name: "المميز",
    icon: Crown,
    desc: "الحزمة الشاملة للعلامات التجارية الراسخة الساعية للتميز.",
    price: "2,999",
    currency: "ر.س",
    period: "دفعة واحدة",
    highlighted: false,
    gradient: "linear-gradient(135deg, #fdcb6e, #e17055)",
    color: "#e17055",
    features: [
      {
        label: "كل ما في الاحترافي",
        tooltip: "تشمل جميع مزايا حزمة الاحترافي بالإضافة إلى الميزات التالية.",
      },
      {
        label: "صفحات هبوط مخصصة (3)",
        tooltip: "ثلاث صفحات هبوط مصممة احترافياً لتحويل الزوار إلى عملاء فعليين.",
      },
      {
        label: "تعديل صور المنتجات (50)",
        tooltip: "تحرير وتحسين 50 صورة منتج لإبراز جمالها ورفع معدلات الشراء.",
      },
      {
        label: "تحسين محركات البحث",
        tooltip: "تحسين متجرك ليظهر في النتائج الأولى على جوجل وباقي محركات البحث.",
      },
      {
        label: "كيت وسائل التواصل الاجتماعي",
        tooltip: "حزمة قوالب جاهزة ومتناسقة لجميع منصات التواصل الاجتماعي.",
      },
      {
        label: "إعداد التحليلات",
        tooltip: "ربط وإعداد أدوات التحليل لمتابعة أداء متجرك ومعدلات التحويل بدقة.",
      },
      {
        label: "3 أشهر صيانة مجانية",
        tooltip: "صيانة ومتابعة مستمرة لمدة ثلاثة أشهر كاملة بعد التسليم النهائي.",
      },
      {
        label: "مدير حساب مخصص",
        tooltip: "مدير حساب متخصص يكون نقطة تواصلك الوحيدة طوال مراحل المشروع.",
      },
    ],
    cta: "احصل على المميز",
  },
];

// ─── FeatureTooltip ───────────────────────────────────────────────────────────

function FeatureTooltip({
  content,
  highlighted,
  color,
}: {
  content: string;
  highlighted: boolean;
  color: string;
}) {
  return (
    <TooltipPrimitive.Root>
      <TooltipPrimitive.Trigger asChild>
        <button
          className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1
                     transition-colors duration-150"
          style={
            {
              background: highlighted ? "rgba(255,255,255,0.15)" : `${color}18`,
              "--tw-ring-color": highlighted ? "white" : color,
            } as React.CSSProperties
          }
          aria-label="معلومات إضافية"
        >
          <Info
            className="w-2.5 h-2.5"
            style={{ color: highlighted ? "rgba(255,255,255,0.55)" : color }}
          />
        </button>
      </TooltipPrimitive.Trigger>

      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          side="top"
          sideOffset={8}
          avoidCollisions
          collisionPadding={12}
          className="z-50 max-w-[230px] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed
                     shadow-2xl animate-in fade-in-0 zoom-in-95
                     data-[state=closed]:animate-out data-[state=closed]:fade-out-0
                     data-[state=closed]:zoom-out-95 data-[side=top]:slide-in-from-bottom-2"
          style={{
            background: "var(--home-tooltip-bg)",
            color: "var(--home-tooltip-text)",
            fontFamily: "'Cairo', sans-serif",
            direction: "rtl",
            border: "1px solid var(--home-tooltip-border)",
          }}
        >
          {content}
          <TooltipPrimitive.Arrow className="fill-[var(--home-tooltip-arrow)]" width={10} height={5} />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
}

// ─── FeatureItem ──────────────────────────────────────────────────────────────

function FeatureItem({
  feature,
  highlighted,
  color,
}: {
  feature: Feature;
  highlighted: boolean;
  color: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <li
      className="flex items-center gap-3 rounded-xl px-2 py-1.5 -mx-2 cursor-default
                 transition-colors duration-150"
      style={{
        background: hovered
          ? highlighted
            ? "rgba(255,255,255,0.07)"
            : `${color}0d`
          : "transparent",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Check icon */}
      <div
        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-150"
        style={{
          background: highlighted ? "rgba(0,206,201,0.2)" : `${color}18`,
          transform: hovered ? "scale(1.15)" : "scale(1)",
        }}
      >
        <Check
          className="w-3 h-3"
          style={{ color: highlighted ? "var(--home-brand-secondary)" : color }}
        />
      </div>

      {/* Label */}
      <span
        className="text-sm flex-1"
        style={{
          color: highlighted ? "var(--home-pricing-highlight-feature)" : "var(--home-pricing-feature-muted)",
          fontFamily: "'Cairo', sans-serif",
          lineHeight: 1.5,
        }}
      >
        {feature.label}
      </span>

      {/* Info icon + Tooltip */}
      <FeatureTooltip
        content={feature.tooltip}
        highlighted={highlighted}
        color={color}
      />
    </li>
  );
}

// ─── PricingCard ──────────────────────────────────────────────────────────────

function PricingCard({ plan, index }: { plan: Plan; index: number }) {
  const [cardHovered, setCardHovered] = useState(false);

  const cardShadow = cardHovered
    ? plan.highlighted
      ? "var(--home-pricing-highlight-shadow-hover)"
      : "var(--home-pricing-card-shadow-hover)"
    : plan.highlighted
      ? "var(--home-pricing-highlight-shadow)"
      : "var(--home-pricing-card-shadow)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.15, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      animate={{ y: cardHovered ? -6 : 0 }}
      className={`relative rounded-3xl p-8 flex flex-col ${
        plan.highlighted ? "md:-mt-5 md:mb-5" : ""
      }`}
      style={{
        background: plan.highlighted ? "var(--home-pricing-highlight-bg)" : "var(--home-card-bg)",
        border: plan.highlighted
          ? "1.5px solid var(--home-pricing-highlight-border)"
          : "1px solid var(--home-pricing-muted-plan-border)",
        boxShadow: cardShadow,
        transition: "box-shadow 0.3s ease, transform 0.3s ease",
      }}
      onMouseEnter={() => setCardHovered(true)}
      onMouseLeave={() => setCardHovered(false)}
    >
      {/* Popular badge */}
      {plan.badge && (
        <motion.div
          initial={{ opacity: 0, y: -8, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: index * 0.15 + 0.35, duration: 0.4 }}
          className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full
                     text-xs font-bold text-white flex items-center gap-1.5 whitespace-nowrap"
          style={{
            background: plan.gradient,
            boxShadow: `0 4px 16px ${plan.color}55`,
          }}
        >
          <Star className="w-3 h-3" fill="currentColor" />
          {plan.badge}
        </motion.div>
      )}

      {/* Icon + Plan name */}
      <div className="flex items-center gap-4 mb-5">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{
            background: plan.gradient,
            boxShadow: `0 6px 20px ${plan.color}40`,
          }}
        >
          <plan.icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3
            style={{
              fontFamily: "'Cairo', sans-serif",
              fontWeight: 700,
              fontSize: "1.15rem",
              color: plan.highlighted ? "var(--home-text-inverse)" : "var(--home-pricing-plan-title)",
            }}
          >
            {plan.name}
          </h3>
          <p
            style={{
              fontFamily: "'Cairo', sans-serif",
              fontSize: "0.78rem",
              color: plan.highlighted ? "var(--home-text-inverse-subtle)" : "var(--home-pricing-plan-desc)",
              lineHeight: 1.45,
            }}
          >
            {plan.desc}
          </p>
        </div>
      </div>

      {/* Price block */}
      <div
        className="mb-6 pb-6 border-b"
        style={{
          borderColor: plan.highlighted ? "var(--home-pricing-highlight-divider)" : "var(--home-pricing-muted-plan-border)",
        }}
      >
        <div className="flex items-baseline gap-1">
          <span
            style={{
              fontFamily: "'Cairo', sans-serif",
              fontWeight: 900,
              fontSize: "2.75rem",
              lineHeight: 1,
              letterSpacing: "-1px",
              color: plan.highlighted ? "var(--home-text-inverse)" : "var(--home-pricing-plan-title)",
            }}
          >
            {plan.price}
          </span>
          <span
            style={{
              fontFamily: "'Cairo', sans-serif",
              fontWeight: 700,
              fontSize: "0.95rem",
              color: plan.highlighted ? "var(--home-text-inverse-muted)" : plan.color,
              marginRight: "3px",
            }}
          >
            {plan.currency}
          </span>
        </div>
        <p
          className="mt-1.5 text-xs"
          style={{
            fontFamily: "'Cairo', sans-serif",
            color: plan.highlighted ? "var(--home-pricing-highlight-meta)" : "var(--home-pricing-plan-muted)",
          }}
        >
          {plan.period}
        </p>
      </div>

      {/* Feature list */}
      <ul className="space-y-0.5 mb-8 flex-1">
        {plan.features.map((feature) => (
          <FeatureItem
            key={feature.label}
            feature={feature}
            highlighted={plan.highlighted}
            color={plan.color}
          />
        ))}
      </ul>

      {/* CTA button */}
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="w-full py-4 rounded-2xl text-sm font-bold"
        style={{
          background: plan.highlighted ? plan.gradient : "transparent",
          color: plan.highlighted ? "white" : plan.color,
          border: plan.highlighted ? "none" : `2px solid ${plan.color}45`,
          boxShadow: plan.highlighted ? `0 8px 24px ${plan.color}40` : "none",
          fontFamily: "'Cairo', sans-serif",
          cursor: "pointer",
          transition: "background 0.2s ease, border-color 0.2s ease",
        }}
        onMouseEnter={(e) => {
          if (!plan.highlighted) {
            (e.currentTarget as HTMLButtonElement).style.background = `${plan.color}10`;
            (e.currentTarget as HTMLButtonElement).style.borderColor = `${plan.color}80`;
          }
        }}
        onMouseLeave={(e) => {
          if (!plan.highlighted) {
            (e.currentTarget as HTMLButtonElement).style.background = "transparent";
            (e.currentTarget as HTMLButtonElement).style.borderColor = `${plan.color}45`;
          }
        }}
      >
        {plan.cta} ←
      </motion.button>
    </motion.div>
  );
}

// ─── Pricing (main export) ────────────────────────────────────────────────────

export function Pricing() {
  return (
    <TooltipPrimitive.Provider delayDuration={250} skipDelayDuration={100}>
      <section id="pricing" className="py-24" style={{ background: "var(--home-section-muted)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 text-sm font-semibold"
              style={{
                background: "var(--home-pill-bg)",
                color: "var(--home-brand)",
                fontFamily: "'Cairo', sans-serif",
              }}
            >
              <Crown className="w-4 h-4" />
              خطط الأسعار
            </div>

            <h2
              className="mb-4"
              style={{
                fontFamily: "'Cairo', sans-serif",
                fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                fontWeight: 800,
                color: "var(--home-text-primary)",
              }}
            >
              أسعار واضحة{" "}
              <span
                style={{
                  background: "var(--home-gradient-text)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                وشفافة
              </span>
            </h2>

            <p
              className="max-w-xl mx-auto"
              style={{
                color: "var(--home-text-secondary)",
                fontFamily: "'Cairo', sans-serif",
                lineHeight: 1.8,
              }}
            >
              لا رسوم خفية. اختر الخطة التي تناسب احتياجاتك وميزانيتك.
            </p>
          </motion.div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {plans.map((plan, i) => (
              <PricingCard key={plan.id} plan={plan} index={i} />
            ))}
          </div>

          {/* Footer note */}
          <motion.p
            className="text-center mt-10 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            style={{ color: "var(--home-pricing-plan-muted)", fontFamily: "'Cairo', sans-serif" }}
          >
            جميع الخطط تشمل ضمان الرضا. تحتاج حزمة مخصصة؟{" "}
            <a href="#contact" style={{ color: "var(--home-brand)", fontWeight: 600 }}>
              تواصل معنا
            </a>
          </motion.p>
        </div>
      </section>
    </TooltipPrimitive.Provider>
  );
}
