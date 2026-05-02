import { Link } from "react-router";
import { ChevronRight } from "lucide-react";
import { FileText, RefreshCcw, ShieldCheck } from "lucide-react";

import { AppPageHeader } from "../components/AppPageHeader";
import { PoliciesBreadcrumb } from "../components/policies/PoliciesBreadcrumb";

const sections = [
  {
    id: "terms",
    title: "شروط الاستخدام",
    icon: FileText,
    content: [
      "باستخدامك لهذا الموقع، فإنك توافق على الالتزام بجميع الشروط والأحكام الواردة في هذه الصفحة. في حال عدم الموافقة، يرجى التوقف عن استخدام الموقع والخدمات المرتبطة به.",
      "نحرص على تقديم محتوى وخدمات دقيقة ومحدثة، ومع ذلك قد يتم إجراء تعديلات دورية على الأسعار أو المزايا أو السياسات دون إشعار مسبق.",
      "يُمنع استخدام الموقع لأي غرض غير قانوني أو يضر بأداء المنصة أو يؤثر على تجربة المستخدمين الآخرين.",
    ],
  },
  {
    id: "privacy",
    title: "سياسة الخصوصية",
    icon: ShieldCheck,
    content: [
      "نلتزم بحماية بياناتك الشخصية واستخدامها فقط للأغراض التشغيلية المرتبطة بتقديم الخدمة، مثل التواصل، تحسين التجربة، وتنفيذ الطلبات.",
      "لا نبيع بيانات المستخدمين لأي طرف ثالث. قد نشارك بعض المعلومات مع مزودي خدمات موثوقين عند الحاجة التقنية فقط، وبما يتوافق مع متطلبات الأمان.",
      "يمكنك طلب تعديل أو حذف بياناتك عبر قنوات الدعم الرسمية، وسيتم التعامل مع الطلب خلال مدة زمنية معقولة وفق الإجراءات المعتمدة.",
    ],
  },
  {
    id: "refund",
    title: "سياسة الاسترجاع",
    icon: RefreshCcw,
    content: [
      "يحق للعميل طلب الاسترجاع خلال 7 أيام من تاريخ الدفع في حال عدم بدء تنفيذ الخدمة أو وجود سبب واضح يثبت تعذر تقديمها بالشكل المتفق عليه.",
      "في حال تم تنفيذ جزء من الخدمة، يتم تقييم قيمة الجزء المنجز وخصمها قبل استكمال إجراءات الاسترجاع.",
      "تتم معالجة طلبات الاسترجاع بعد مراجعة الطلب خلال مدة تتراوح بين 5 إلى 10 أيام عمل، ويتم التحويل لنفس وسيلة الدفع المستخدمة قدر الإمكان.",
    ],
  },
];

export function PoliciesPage() {
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
      <AppPageHeader center={<PoliciesBreadcrumb />} />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-14">
        <nav
          className="mb-6 flex items-center gap-1.5 text-sm md:hidden"
          aria-label="مسار التنقل"
          style={{ color: "var(--home-text-muted)", fontFamily: "'Cairo', sans-serif" }}
        >
          <Link to="/" className="transition-opacity hover:opacity-80" style={{ color: "var(--home-text-muted)" }}>
            الرئيسية
          </Link>
          <ChevronRight className="h-3.5 w-3.5" style={{ color: "var(--home-breadcrumb-chevron)" }} />
          <span style={{ color: "var(--home-brand)" }}>الشروط والسياسات</span>
        </nav>

        <section className="mb-10 text-center">
          <h1 className="text-3xl font-black tracking-tight sm:text-4xl" style={{ color: "var(--home-text-primary)" }}>
            الشروط وسياسة الخصوصية والاسترجاع
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-8 sm:text-lg" style={{ color: "var(--home-text-secondary)" }}>
            نصوص قانونية واضحة ومختصرة، مصممة بأسلوب أنيق وسهل القراءة لضمان فهم كامل للحقوق والالتزامات قبل استخدام خدماتنا.
          </p>
        </section>

        <section
          className="mb-8 rounded-2xl border p-4 sm:p-5"
          style={{
            borderColor: "var(--home-card-border)",
            background: "var(--home-card-bg)",
            boxShadow: "var(--home-card-shadow)",
          }}
        >
          <div className="flex flex-wrap gap-2">
            <a
              href="#terms"
              className="rounded-full px-4 py-2 text-xs font-semibold transition-opacity hover:opacity-90"
              style={{ background: "var(--home-accent-soft-bg)", color: "var(--home-brand)" }}
            >
              شروط الاستخدام
            </a>
            <a
              href="#privacy"
              className="rounded-full px-4 py-2 text-xs font-semibold transition-opacity hover:opacity-90"
              style={{ background: "var(--home-teal-soft-bg)", color: "var(--home-brand-secondary)" }}
            >
              سياسة الخصوصية
            </a>
            <a
              href="#refund"
              className="rounded-full px-4 py-2 text-xs font-semibold transition-opacity hover:opacity-90"
              style={{ background: "var(--home-discount-soft-bg)", color: "var(--home-discount-soft-text)" }}
            >
              سياسة الاسترجاع
            </a>
          </div>
        </section>

        <div className="space-y-6">
          {sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="rounded-2xl border p-6 sm:p-8"
              style={{
                borderColor: "var(--home-card-border)",
                background: "var(--home-card-bg)",
                boxShadow: "var(--home-card-shadow)",
              }}
            >
              <div className="mb-5 flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ background: "var(--home-gradient-brand)" }}
                >
                  <section.icon className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-2xl font-black" style={{ color: "var(--home-text-primary)" }}>
                  {section.title}
                </h2>
              </div>

              <div className="home-blog-prose text-[16px] sm:text-[17px]">
                {section.content.map((paragraph, idx) => (
                  <p key={`${section.id}-${idx}`}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
