import { Link } from "react-router";
import { ArrowLeft, FileText, RefreshCcw, ShieldCheck } from "lucide-react";

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
    <div dir="rtl" style={{ minHeight: "100vh", background: "#F8F9FC" }}>
      <header
        className="sticky top-0 z-30 border-b"
        style={{
          background: "rgba(255,255,255,0.95)",
          borderColor: "rgba(108,92,231,0.1)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold" style={{ color: "#6C5CE7" }}>
            <ArrowLeft className="h-4 w-4" />
            العودة للرئيسية
          </Link>
          <span className="text-sm font-semibold" style={{ color: "#2D3436" }}>
            الشروط والسياسات
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <section className="mb-10 text-center">
          <h1 className="text-3xl font-black tracking-tight sm:text-4xl" style={{ color: "#2D3436" }}>
            الشروط وسياسة الخصوصية والاسترجاع
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-8 sm:text-lg" style={{ color: "#5f6b75" }}>
            نصوص قانونية واضحة ومختصرة، مصممة بأسلوب أنيق وسهل القراءة لضمان فهم كامل للحقوق والالتزامات قبل
            استخدام خدماتنا.
          </p>
        </section>

        <section
          className="mb-8 rounded-2xl border bg-white p-4 sm:p-5"
          style={{ borderColor: "rgba(108,92,231,0.1)", boxShadow: "0 8px 24px rgba(45,52,54,0.06)" }}
        >
          <div className="flex flex-wrap gap-2">
            <a href="#terms" className="rounded-full px-4 py-2 text-xs font-semibold" style={{ background: "#f1eeff", color: "#6C5CE7" }}>
              شروط الاستخدام
            </a>
            <a href="#privacy" className="rounded-full px-4 py-2 text-xs font-semibold" style={{ background: "#eefbfb", color: "#00a7a2" }}>
              سياسة الخصوصية
            </a>
            <a href="#refund" className="rounded-full px-4 py-2 text-xs font-semibold" style={{ background: "#fff3ed", color: "#e17055" }}>
              سياسة الاسترجاع
            </a>
          </div>
        </section>

        <div className="space-y-6">
          {sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="rounded-2xl border bg-white p-6 sm:p-8"
              style={{ borderColor: "rgba(108,92,231,0.1)", boxShadow: "0 10px 30px rgba(45,52,54,0.07)" }}
            >
              <div className="mb-5 flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ background: "linear-gradient(135deg, #6C5CE7, #00CEC9)" }}
                >
                  <section.icon className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-2xl font-black" style={{ color: "#2D3436" }}>
                  {section.title}
                </h2>
              </div>

              <div className="space-y-4 text-[16px] leading-8 sm:text-[17px]" style={{ color: "#4f5b65" }}>
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
