import React, { useState, useCallback, useEffect, Fragment, type ReactNode, type ComponentType } from "react";
import { createPortal } from "react-dom";
import useEmblaCarousel from "embla-carousel-react";
import { motion, AnimatePresence } from "motion/react";
import {
  Palette, Store, Zap, Image as ImageIcon, Code, Package,
  Settings, Layers, Star, Check, ShoppingCart, Eye, X,
  ChevronLeft, ChevronRight, MessageCircle, CheckCircle2,
  Send, RefreshCw, PackageCheck, ClipboardList, TrendingUp, Quote,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const tabs = ["الكل", "التصميم", "التطوير", "الإعداد"];

const processSteps = [
  { icon: ClipboardList, label: "استلام الطلب" },
  { icon: Zap,           label: "بدء التنفيذ" },
  { icon: Send,          label: "إرسال النماذج" },
  { icon: RefreshCw,     label: "التعديلات" },
  { icon: PackageCheck,  label: "التسليم النهائي" },
];

// ---------------------------------------------------------------------------
// Services Data (extended)
// ---------------------------------------------------------------------------

const services = [
  {
    id: 1,
    tab: "التصميم",
    icon: Palette,
    title: "تصميم الشعار",
    desc: "شعار احترافي يعكس هوية علامتك التجارية ويميزك في السوق.",
    features: ["3 مفاهيم فريدة", "تعديلات غير محدودة", "جميع ملفات المصدر مشمولة"],
    price: "299 ر.س",
    tag: "الأكثر طلباً" as string | null,
    gradient: "linear-gradient(135deg, #6C5CE7, #a29bfe)",
    color: "#6C5CE7",
    portfolio: [
      { bg: "linear-gradient(135deg, #6C5CE7 0%, #a29bfe 100%)", label: "شعار متجر أزياء فاخر" },
      { bg: "linear-gradient(145deg, #4834d4 0%, #6C5CE7 100%)", label: "شعار مطعم عربي أصيل" },
      { bg: "linear-gradient(135deg, #7d6ff0 0%, #c4b5fd 100%)", label: "شعار شركة تقنية ناشئة" },
      { bg: "linear-gradient(160deg, #6C5CE7 0%, #fd79a8 100%)", label: "شعار متجر عطور" },
    ],
    whatYouGet: [
      "3 مفاهيم تصميمية فريدة ومتميزة",
      "تعديلات غير محدودة حتى رضاك التام",
      "جميع ملفات المصدر (AI, EPS, SVG, PNG, PDF)",
      "نسخ للخلفيات الفاتحة والداكنة",
      "حقوق ملكية كاملة للتصميم",
    ],
    whyImportant:
      "الشعار هو أول ما يراه عميلك — إنه وجه علامتك التجارية. شعار احترافي يبني الثقة فوراً، يميزك عن المنافسين، ويجعل متجرك لا يُنسى في ذهن المشتري.",
    rating: 4.9,
    reviewCount: 127,
    stats: "+500 شعار تم تنفيذه",
    testimonial: {
      text: "أفضل استثمار لمتجري — الشعار الاحترافي غيّر نظرة عملائي تماماً ورفع مبيعاتي بشكل ملحوظ.",
      author: "أحمد المطيري",
    },
  },
  {
    id: 2,
    tab: "التصميم",
    icon: ImageIcon,
    title: "تصميم البانرات",
    desc: "بانرات متجر جذابة ومرئيات تسويقية تزيد من النقرات والمبيعات.",
    features: ["5 بانرات مخصصة", "مقاسات وسائل التواصل", "محسّن لمنصة سلة"],
    price: "199 ر.س",
    tag: null,
    gradient: "linear-gradient(135deg, #fd79a8, #e84393)",
    color: "#fd79a8",
    portfolio: [
      { bg: "linear-gradient(135deg, #fd79a8 0%, #e84393 100%)", label: "بانر عروض رمضان" },
      { bg: "linear-gradient(145deg, #e84393 0%, #c0392b 100%)", label: "بانر إطلاق منتج جديد" },
      { bg: "linear-gradient(135deg, #ff6b9d 0%, #e84393 100%)", label: "بانر تخفيضات موسمية" },
      { bg: "linear-gradient(160deg, #fd79a8 0%, #a84479 100%)", label: "بانر أزياء نسائية" },
    ],
    whatYouGet: [
      "5 بانرات بتصاميم احترافية جذابة",
      "جميع مقاسات وسائل التواصل الاجتماعي",
      "تصميم مخصص لمنصة سلة الإلكترونية",
      "صيغ PNG وJPEG بدقة عالية",
      "إمكانية التعديل على النصوص والألوان",
    ],
    whyImportant:
      "البانرات هي محرك المبيعات الأول في متجرك. تصميم احترافي يجذب العين ويدفع الزائر للنقر والشراء — الاستثمار في البصريات يعني استثماراً مباشراً في إيراداتك.",
    rating: 4.8,
    reviewCount: 89,
    stats: "+300 بانر تم تنفيذه",
    testimonial: {
      text: "البانرات الجديدة ضاعفت نسبة النقرات في متجري خلال أسبوع واحد فقط!",
      author: "سارة العتيبي",
    },
  },
  {
    id: 3,
    tab: "التصميم",
    icon: Layers,
    title: "حزمة الهوية البصرية",
    desc: "هوية بصرية متكاملة — شعار، ألوان، خطوط، ودليل العلامة التجارية.",
    features: ["شعار + دليل العلامة", "نظام الألوان والخطوط", "كيت وسائل التواصل"],
    price: "799 ر.س",
    tag: "أفضل قيمة",
    gradient: "linear-gradient(135deg, #00CEC9, #00b894)",
    color: "#00CEC9",
    portfolio: [
      { bg: "linear-gradient(135deg, #00CEC9 0%, #00b894 100%)", label: "هوية علامة أزياء فاخرة" },
      { bg: "linear-gradient(145deg, #00b894 0%, #00CEC9 100%)", label: "هوية متجر عضوي طبيعي" },
      { bg: "linear-gradient(135deg, #00CEC9 0%, #0984e3 100%)", label: "هوية شركة تقنية" },
      { bg: "linear-gradient(160deg, #55efc4 0%, #00CEC9 100%)", label: "هوية كافيه متميز" },
    ],
    whatYouGet: [
      "شعار احترافي مع جميع ملفات المصدر",
      "دليل العلامة التجارية الكامل",
      "نظام ألوان وخطوط موحد",
      "كيت تصاميم وسائل التواصل (20 قالب)",
      "قوالب بطاقات الأعمال والمطبوعات",
    ],
    whyImportant:
      "الهوية البصرية المتكاملة تحول متجرك من مجرد بائع إلى علامة تجارية موثوقة. التناسق في كل نقطة تواصل يبني ثقة عميقة ويضاعف قيمة منتجاتك في نظر العميل.",
    rating: 5.0,
    reviewCount: 63,
    stats: "+150 هوية تجارية منجزة",
    testimonial: {
      text: "الهوية البصرية غيّرت صورة متجري تماماً — أصبح لديّ عملاء يثقون بي قبل أن يشتروا.",
      author: "محمد الشهري",
    },
  },
  {
    id: 4,
    tab: "التطوير",
    icon: Store,
    title: "تخصيص متجر سلة",
    desc: "تخصيص كامل لمتجر سلة ليتوافق مع علامتك التجارية ويزيد التحويلات.",
    features: ["تخطيط وألوان مخصصة", "إعداد أقسام المنتجات", "محسّن للموبايل"],
    price: "599 ر.س",
    tag: "مميز",
    gradient: "linear-gradient(135deg, #6C5CE7, #00CEC9)",
    color: "#6C5CE7",
    portfolio: [
      { bg: "linear-gradient(135deg, #6C5CE7 0%, #00CEC9 100%)", label: "تخصيص متجر أزياء" },
      { bg: "linear-gradient(145deg, #00CEC9 0%, #6C5CE7 100%)", label: "تخصيص متجر إلكترونيات" },
      { bg: "linear-gradient(135deg, #a29bfe 0%, #00b894 100%)", label: "تخصيص متجر مستلزمات" },
      { bg: "linear-gradient(160deg, #6C5CE7 0%, #55efc4 100%)", label: "تخصيص متجر عطور" },
    ],
    whatYouGet: [
      "تخصيص كامل للألوان والخطوط والتخطيط",
      "إعداد وتنظيم جميع أقسام المنتجات",
      "تحسين تجربة الشراء والتحويلات",
      "تحسين متوافق مع جميع الأجهزة",
      "دعم فني لمدة أسبوعين بعد التسليم",
    ],
    whyImportant:
      "متجر مخصص باحترافية يقلل من معدل التخلي عن سلة الشراء ويحسن تجربة المستخدم. الزائر الذي يجد تجربة سلسة وجميلة يتحول إلى مشتٍر فعلي.",
    rating: 4.9,
    reviewCount: 74,
    stats: "+200 متجر تم تخصيصه",
    testimonial: {
      text: "بعد التخصيص ارتفعت نسبة التحويل في متجري من 1.2% إلى 3.8% خلال شهر واحد فقط!",
      author: "خالد الدوسري",
    },
  },
  {
    id: 5,
    tab: "التطوير",
    icon: Code,
    title: "صفحة هبوط مخصصة",
    desc: "صفحات هبوط عالية التحويل مصممة خصيصاً لحملات منتجات سلة.",
    features: ["تصميم يركز على التحويل", "سرعة تحميل عالية", "هيكل مختبر ومُحسَّن"],
    price: "449 ر.س",
    tag: null,
    gradient: "linear-gradient(135deg, #fdcb6e, #e17055)",
    color: "#e17055",
    portfolio: [
      { bg: "linear-gradient(135deg, #fdcb6e 0%, #e17055 100%)", label: "صفحة هبوط منتج صحي" },
      { bg: "linear-gradient(145deg, #e17055 0%, #fdcb6e 100%)", label: "صفحة هبوط حملة موسمية" },
      { bg: "linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%)", label: "صفحة هبوط أزياء فاخرة" },
      { bg: "linear-gradient(160deg, #e17055 0%, #d63031 100%)", label: "صفحة هبوط إطلاق منتج" },
    ],
    whatYouGet: [
      "تصميم صفحة هبوط مُحسَّنة للتحويل",
      "سرعة تحميل عالية لتجربة أفضل",
      "هيكل محتوى مُختبر وفعّال",
      "تكامل مع منصة سلة الإلكترونية",
      "تقييم لأداء الصفحة بعد الإطلاق",
    ],
    whyImportant:
      "صفحة الهبوط الاحترافية هي الفرق بين حملة إعلانية ناجحة وأخرى فاشلة. صفحة مُصممة للتحويل تضاعف عائد استثمارك في الإعلانات وتحول الزوار إلى مشترين.",
    rating: 4.8,
    reviewCount: 52,
    stats: "+120 صفحة هبوط منجزة",
    testimonial: {
      text: "استثمرت في صفحة الهبوط وعوضت التكلفة كاملة من أول يوم إطلاق حملتي!",
      author: "نورة الرشيد",
    },
  },
  {
    id: 6,
    tab: "الإعداد",
    icon: Zap,
    title: "تفعيل القالب (عالي/نجم)",
    desc: "تفعيل وإعداد احترافي لقوالب سلة المميزة.",
    features: ["إعداد كامل للقالب", "ألوان وخطوط مخصصة", "تفعيل جميع الأقسام"],
    price: "349 ر.س",
    tag: "تسليم سريع",
    gradient: "linear-gradient(135deg, #00CEC9, #0984e3)",
    color: "#0984e3",
    portfolio: [
      { bg: "linear-gradient(135deg, #00CEC9 0%, #0984e3 100%)", label: "قالب عالي - متجر أزياء" },
      { bg: "linear-gradient(145deg, #0984e3 0%, #00CEC9 100%)", label: "قالب نجم - متجر مكياج" },
      { bg: "linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)", label: "قالب عالي - إلكترونيات" },
      { bg: "linear-gradient(160deg, #00CEC9 0%, #6c5ce7 100%)", label: "قالب نجم - متجر عطور" },
    ],
    whatYouGet: [
      "تفعيل كامل لقالب سلة المميز",
      "تخصيص الألوان والخطوط حسب هويتك",
      "إعداد وتفعيل جميع الأقسام والصفحات",
      "رفع الشعار والصور والمحتوى",
      "اختبار شامل قبل التسليم",
    ],
    whyImportant:
      "القالب المميز وحده لا يكفي — الإعداد الاحترافي هو ما يجعله يبدو استثنائياً. إعداد غير صحيح يضيع ميزات القالب ويعطي انطباعاً سلبياً عن متجرك.",
    rating: 4.9,
    reviewCount: 91,
    stats: "+350 قالب تم تفعيله",
    testimonial: {
      text: "كنت أحاول إعداد القالب بنفسي لأسابيع — تم الإعداد باحتراف في أقل من 24 ساعة!",
      author: "فهد العنزي",
    },
  },
  {
    id: 7,
    tab: "الإعداد",
    icon: Settings,
    title: "إعداد المتجر الكامل",
    desc: "إعداد متجر سلة من الصفر — جاهز للإطلاق والبيع فوراً.",
    features: ["إعداد المتجر كاملاً", "إعداد الدفع والشحن", "تحسين محركات البحث"],
    price: "1,299 ر.س",
    tag: "موصى به",
    gradient: "linear-gradient(135deg, #6C5CE7, #a29bfe)",
    color: "#6C5CE7",
    portfolio: [
      { bg: "linear-gradient(135deg, #6C5CE7 0%, #a29bfe 100%)", label: "متجر أزياء من الصفر" },
      { bg: "linear-gradient(145deg, #a29bfe 0%, #6C5CE7 100%)", label: "متجر إلكترونيات متكامل" },
      { bg: "linear-gradient(135deg, #4834d4 0%, #a29bfe 100%)", label: "متجر عطور ومستحضرات" },
      { bg: "linear-gradient(160deg, #6C5CE7 0%, #fd79a8 100%)", label: "متجر مستلزمات منزلية" },
    ],
    whatYouGet: [
      "إعداد كامل لمتجر سلة من الصفر",
      "إعداد بوابات الدفع والشحن",
      "رفع المنتجات والأقسام والمحتوى",
      "تحسين SEO لمحركات البحث",
      "دليل استخدام ودعم فني بعد الإطلاق",
    ],
    whyImportant:
      "البداية الصحيحة توفر أشهراً من المشاكل. متجر مُعَدّ باحترافية يعمل بكفاءة من اليوم الأول ويوفر تجربة تسوق استثنائية تحول الزوار إلى عملاء دائمين.",
    rating: 5.0,
    reviewCount: 48,
    stats: "+100 متجر تم إعداده",
    testimonial: {
      text: "أطلقت متجري وبدأت أتلقى طلبات في نفس اليوم — الإعداد الاحترافي أحدث فرقاً كبيراً.",
      author: "عبدالله القحطاني",
    },
  },
  {
    id: 8,
    tab: "التصميم",
    icon: Package,
    title: "تعديل صور المنتجات",
    desc: "تعديل احترافي وتحسين صور منتجات متجرك.",
    features: ["إزالة الخلفيات", "تصحيح الألوان", "حتى 20 منتج"],
    price: "249 ر.س",
    tag: null,
    gradient: "linear-gradient(135deg, #74b9ff, #0984e3)",
    color: "#0984e3",
    portfolio: [
      { bg: "linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)", label: "صور منتجات عطور" },
      { bg: "linear-gradient(145deg, #0984e3 0%, #74b9ff 100%)", label: "صور ملابس وأزياء" },
      { bg: "linear-gradient(135deg, #a8d8ea 0%, #74b9ff 100%)", label: "صور مستلزمات منزلية" },
      { bg: "linear-gradient(160deg, #74b9ff 0%, #6c5ce7 100%)", label: "صور مجوهرات وإكسسوار" },
    ],
    whatYouGet: [
      "إزالة الخلفيات وتبييضها احترافياً",
      "تصحيح الألوان والإضاءة",
      "تعديل وتجميل حتى 20 منتج",
      "ضغط الصور لسرعة تحميل أفضل",
      "تسليم بصيغ PNG وJPEG وWEBP",
    ],
    whyImportant:
      "صور المنتجات هي مندوب مبيعاتك الصامت — 75% من المشترين يقررون الشراء بناءً على الصور. صورة احترافية تقنع العميل قبل أن يقرأ وصف المنتج.",
    rating: 4.8,
    reviewCount: 112,
    stats: "+2000 صورة منتج تم تعديلها",
    testimonial: {
      text: "بعد تعديل صور منتجاتي ارتفعت مبيعاتي 40% — الفرق بالصور واضح جداً لعملائي.",
      author: "ريم البلوي",
    },
  },
  {
    id: 9,
    tab: "الإعداد",
    icon: Star,
    title: "الصيانة الشهرية",
    desc: "دعم مستمر وتحديثات لإبقاء متجرك يعمل بسلاسة.",
    features: ["تعديلات غير محدودة", "دعم أولوية", "تقرير شهري"],
    price: "199 ر.س/شهر",
    tag: null,
    gradient: "linear-gradient(135deg, #fd79a8, #6C5CE7)",
    color: "#6C5CE7",
    portfolio: [
      { bg: "linear-gradient(135deg, #fd79a8 0%, #6C5CE7 100%)", label: "صيانة متجر أزياء شهرياً" },
      { bg: "linear-gradient(145deg, #6C5CE7 0%, #fd79a8 100%)", label: "دعم وتحديث دوري" },
      { bg: "linear-gradient(135deg, #e84393 0%, #a29bfe 100%)", label: "تعديلات وإضافات مستمرة" },
      { bg: "linear-gradient(160deg, #fd79a8 0%, #00CEC9 100%)", label: "مراقبة أداء المتجر" },
    ],
    whatYouGet: [
      "تعديلات غير محدودة على المتجر شهرياً",
      "دعم فني بأولوية قصوى",
      "تقرير شهري شامل لأداء المتجر",
      "تحديثات منتظمة للمحتوى والمنتجات",
      "مراقبة استمرارية عمل المتجر",
    ],
    whyImportant:
      "المتجر الناجح يحتاج رعاية مستمرة — التحديثات الدورية تبقي متجرك في أفضل حالاته وتمنع المشاكل قبل أن تؤثر على مبيعاتك.",
    rating: 4.9,
    reviewCount: 38,
    stats: "+50 متجر تحت الصيانة",
    testimonial: {
      text: "راحة بال تامة — متجري دائماً محدّث ومتابَع باحتراف دون أي قلق أو متابعة مني.",
      author: "منى الحربي",
    },
  },
];

type Service = (typeof services)[0];

export function ServicesSection() {
  const [activeTab, setActiveTab] = useState("الكل");
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filtered =
    activeTab === "الكل" ? services : services.filter((s) => s.tab === activeTab);

  const handleQuickView = (service: Service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <section id="services" className="py-24" style={{ background: "#F8F9FC" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-14">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 text-sm font-semibold"
              style={{
                background: "rgba(108,92,231,0.1)",
                color: "#6C5CE7",
                fontFamily: "'Cairo', sans-serif",
              }}
            >
              <ShoppingCart className="w-4 h-4" />
              خدماتنا
            </div>
            <h2
              className="mb-4"
              style={{
                fontFamily: "'Cairo', sans-serif",
                fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                fontWeight: 800,
                color: "#2D3436",
              }}
            >
              خدمات مميزة،{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #6C5CE7, #00CEC9)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                جاهزة للشراء
              </span>
            </h2>
            <p
              className="max-w-2xl mx-auto"
              style={{
                color: "#636e72",
                fontFamily: "'Cairo', sans-serif",
                lineHeight: 1.8,
                fontSize: "1.05rem",
              }}
            >
              جميع خدماتنا منظمة كمنتجات — اختر ما تحتاجه، اشترِ فوراً، ونبدأ العمل على الفور.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300"
                style={{
                  fontFamily: "'Cairo', sans-serif",
                  background:
                    activeTab === tab
                      ? "linear-gradient(135deg, #6C5CE7, #00CEC9)"
                      : "white",
                  color: activeTab === tab ? "white" : "#636e72",
                  boxShadow:
                    activeTab === tab
                      ? "0 4px 20px rgba(108,92,231,0.35)"
                      : "0 2px 8px rgba(0,0,0,0.08)",
                  border:
                    activeTab === tab ? "none" : "1px solid rgba(108,92,231,0.15)",
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onQuickView={handleQuickView}
              />
            ))}
          </div>
        </div>
      </section>

      <QuickViewModal
        service={selectedService}
        open={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}

// ---------------------------------------------------------------------------
// ServiceCard
// ---------------------------------------------------------------------------

function ServiceCard({
  service,
  onQuickView,
}: {
  service: Service;
  onQuickView: (s: Service) => void;
}) {
  const Icon = service.icon;

  return (
    <div
      className="group relative bg-white rounded-3xl p-6 transition-all duration-300 hover:-translate-y-2 flex flex-col"
      style={{
        boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
        border: "1px solid rgba(108,92,231,0.08)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 16px 48px rgba(108,92,231,0.18)";
        (e.currentTarget as HTMLDivElement).style.borderColor =
          "rgba(108,92,231,0.25)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 4px 20px rgba(0,0,0,0.06)";
        (e.currentTarget as HTMLDivElement).style.borderColor =
          "rgba(108,92,231,0.08)";
      }}
    >
      {service.tag && (
        <div
          className="absolute top-5 left-5 px-3 py-1 rounded-full text-xs font-bold text-white"
          style={{ background: service.gradient }}
        >
          {service.tag}
        </div>
      )}

      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
        style={{
          background: service.gradient,
          boxShadow: `0 8px 24px ${service.color}40`,
        }}
      >
        <Icon className="w-7 h-7 text-white" />
      </div>

      <h3
        className="mb-2"
        style={{
          fontFamily: "'Cairo', sans-serif",
          fontSize: "1.15rem",
          fontWeight: 700,
          color: "#2D3436",
        }}
      >
        {service.title}
      </h3>
      <p
        className="mb-4 flex-1"
        style={{
          color: "#636e72",
          fontFamily: "'Cairo', sans-serif",
          fontSize: "0.9rem",
          lineHeight: 1.7,
        }}
      >
        {service.desc}
      </p>

      <ul className="space-y-2 mb-5">
        {service.features.map((f) => (
          <li key={f} className="flex items-center gap-2">
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: `${service.color}20` }}
            >
              <Check className="w-3 h-3" style={{ color: service.color }} />
            </div>
            <span
              className="text-sm"
              style={{ color: "#636e72", fontFamily: "'Cairo', sans-serif" }}
            >
              {f}
            </span>
          </li>
        ))}
      </ul>

      <div
        className="flex items-center justify-between pt-4 border-t"
        style={{ borderColor: "rgba(108,92,231,0.1)" }}
      >
        <span
          className="font-bold"
          style={{
            fontFamily: "'Cairo', sans-serif",
            fontSize: "1.3rem",
            color: "#2D3436",
          }}
        >
          {service.price}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => onQuickView(service)}
            className="p-2.5 rounded-xl transition-all duration-200 border group/eye"
            style={{ borderColor: "rgba(108,92,231,0.2)", color: "#6C5CE7" }}
            title="معاينة سريعة"
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(108,92,231,0.08)";
              e.currentTarget.style.borderColor = "rgba(108,92,231,0.4)";
              e.currentTarget.style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = "rgba(108,92,231,0.2)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{
              background: service.gradient,
              boxShadow: `0 4px 16px ${service.color}35`,
              fontFamily: "'Cairo', sans-serif",
            }}
          >
            <ShoppingCart className="w-4 h-4" />
            اشترِ الآن
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// PortfolioCarousel
// ---------------------------------------------------------------------------

function PortfolioCarousel({
  items,
  color,
  Icon,
}: {
  items: Service["portfolio"];
  color: string;
  Icon: ComponentType<{ className?: string }>;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, direction: "rtl" });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div>
      {/* Slide label */}
      <div
        className="mb-3 flex items-center gap-2"
        style={{ fontFamily: "'Cairo', sans-serif" }}
      >
        <div
          className="w-1 h-5 rounded-full"
          style={{ background: color }}
        />
        <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#2D3436" }}>
          أعمال من محفظتنا
        </span>
        <span
          style={{
            fontSize: "0.72rem",
            color,
            background: `${color}15`,
            padding: "2px 8px",
            borderRadius: "20px",
            fontWeight: 600,
          }}
        >
          {items.length} مشروع
        </span>
      </div>

      {/* Carousel viewport */}
      <div
        ref={emblaRef}
        style={{ overflow: "hidden", borderRadius: "18px" }}
      >
        <div style={{ display: "flex" }}>
          {items.map((item, i) => (
            <div key={i} style={{ flex: "0 0 100%", minWidth: 0 }}>
              <div
                className="group"
                style={{
                  height: "240px",
                  background: item.bg,
                  borderRadius: "18px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  overflow: "hidden",
                  cursor: "pointer",
                }}
              >
                {/* Subtle pattern overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.15) 0%, transparent 60%)",
                    pointerEvents: "none",
                  }}
                />

                {/* Decorative circles */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "-40px",
                    left: "-40px",
                    width: "160px",
                    height: "160px",
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.08)",
                    pointerEvents: "none",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "-30px",
                    right: "-30px",
                    width: "120px",
                    height: "120px",
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.06)",
                    pointerEvents: "none",
                  }}
                />

                {/* Icon box */}
                <div
                  className="transition-transform duration-300 group-hover:scale-110"
                  style={{
                    width: "72px",
                    height: "72px",
                    borderRadius: "20px",
                    background: "rgba(255,255,255,0.22)",
                    backdropFilter: "blur(8px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "14px",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
                  }}
                >
                  <Icon className="w-9 h-9 text-white" />
                </div>

                {/* Label pill */}
                <div
                  style={{
                    background: "rgba(255,255,255,0.22)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "12px",
                    padding: "7px 18px",
                    fontFamily: "'Cairo', sans-serif",
                    color: "white",
                    fontWeight: 700,
                    fontSize: "0.875rem",
                  }}
                >
                  {item.label}
                </div>

                {/* Project badge */}
                <div
                  style={{
                    position: "absolute",
                    top: "14px",
                    right: "14px",
                    background: "rgba(255,255,255,0.25)",
                    backdropFilter: "blur(4px)",
                    borderRadius: "8px",
                    padding: "3px 10px",
                    fontFamily: "'Cairo', sans-serif",
                    color: "white",
                    fontWeight: 700,
                    fontSize: "0.7rem",
                  }}
                >
                  مشروع {i + 1}
                </div>

                {/* Hover overlay */}
                <div
                  className="transition-opacity duration-300 group-hover:opacity-100 opacity-0"
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(0,0,0,0.12)",
                    borderRadius: "18px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "14px",
        }}
      >
        {/* Dots */}
        <div style={{ display: "flex", gap: "6px" }}>
          {scrollSnaps.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              style={{
                width: i === selectedIndex ? "22px" : "8px",
                height: "8px",
                borderRadius: "4px",
                background: i === selectedIndex ? color : "rgba(0,0,0,0.15)",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>

        {/* Arrows */}
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={scrollPrev}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              border: `1.5px solid ${color}30`,
              background: `${color}10`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: color,
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = `${color}20`;
              e.currentTarget.style.borderColor = `${color}60`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = `${color}10`;
              e.currentTarget.style.borderColor = `${color}30`;
            }}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={scrollNext}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              border: `1.5px solid ${color}30`,
              background: `${color}10`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: color,
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = `${color}20`;
              e.currentTarget.style.borderColor = `${color}60`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = `${color}10`;
              e.currentTarget.style.borderColor = `${color}30`;
            }}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// QuickViewModal
// ---------------------------------------------------------------------------

function QuickViewModal({
  service,
  open,
  onClose,
}: {
  service: Service | null;
  open: boolean;
  onClose: () => void;
}) {
  // Lock body scroll + Escape key handler
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", handler);
    };
  }, [open, onClose]);

  if (!service && !open) return null;

  const s = service;

  return createPortal(
    <AnimatePresence>
      {open && s && (
        <motion.div
          key="qv-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(10, 6, 30, 0.72)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            zIndex: 9998,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
            fontFamily: "'Cairo', sans-serif",
          }}
        >
          {/* Modal container */}
          <motion.div
            key="qv-modal"
            initial={{ opacity: 0, scale: 0.93, y: 28 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 28 }}
            transition={{ type: "spring", damping: 26, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            dir="rtl"
            role="dialog"
            aria-modal="true"
            style={{
              width: "100%",
              maxWidth: "920px",
              maxHeight: "92vh",
              background: "white",
              borderRadius: "24px",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              boxShadow:
                "0 40px 120px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.05)",
            }}
          >
            {/* ── Modal Header ── */}
            <div
              style={{
                padding: "18px 24px",
                borderBottom: "1px solid rgba(108,92,231,0.1)",
                display: "flex",
                alignItems: "center",
                gap: "14px",
                flexShrink: 0,
                background: "white",
              }}
            >
              {/* Service icon */}
              <div
                style={{
                  width: "46px",
                  height: "46px",
                  borderRadius: "14px",
                  background: s.gradient,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  boxShadow: `0 8px 20px ${s.color}45`,
                }}
              >
                <s.icon className="w-6 h-6 text-white" />
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <h2
                  style={{
                    fontFamily: "'Cairo', sans-serif",
                    fontSize: "1.15rem",
                    fontWeight: 800,
                    color: "#2D3436",
                    margin: 0,
                    lineHeight: 1.2,
                  }}
                >
                  {s.title}
                </h2>

                {/* Rating row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginTop: "5px",
                    flexWrap: "wrap",
                  }}
                >
                  <div style={{ display: "flex", gap: "2px" }}>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <Star
                        key={n}
                        className="w-3.5 h-3.5"
                        style={{
                          fill: n <= Math.round(s.rating) ? "#fdcb6e" : "none",
                          color: "#fdcb6e",
                        }}
                      />
                    ))}
                  </div>
                  <span
                    style={{
                      fontSize: "0.8rem",
                      fontWeight: 800,
                      color: "#2D3436",
                    }}
                  >
                    {s.rating}
                  </span>
                  <span style={{ fontSize: "0.78rem", color: "#636e72" }}>
                    ({s.reviewCount} تقييم)
                  </span>
                  <span
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      color: "white",
                      background: s.gradient,
                      padding: "2px 10px",
                      borderRadius: "20px",
                    }}
                  >
                    {s.stats}
                  </span>
                </div>
              </div>

              {/* Close button */}
              <button
                onClick={onClose}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  border: "1px solid rgba(108,92,231,0.15)",
                  background: "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "#636e72",
                  flexShrink: 0,
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#f0eeff";
                  e.currentTarget.style.color = "#6C5CE7";
                  e.currentTarget.style.borderColor = "rgba(108,92,231,0.35)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#636e72";
                  e.currentTarget.style.borderColor = "rgba(108,92,231,0.15)";
                }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* ── Modal Body (scrollable) ── */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "24px",
                scrollbarWidth: "thin",
                scrollbarColor: `${s.color}30 transparent`,
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: "28px",
                }}
              >
                {/* ── RIGHT: Portfolio Carousel ── */}
                <div>
                  <PortfolioCarousel
                    items={s.portfolio}
                    color={s.color}
                    Icon={s.icon}
                  />

                  {/* Testimonial (below carousel) */}
                  <div
                    style={{
                      marginTop: "20px",
                      background: "white",
                      border: "1px solid rgba(108,92,231,0.12)",
                      borderRadius: "16px",
                      padding: "16px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                    }}
                  >
                    <Quote
                      className="w-5 h-5 mb-2"
                      style={{ color: s.color }}
                    />
                    <p
                      style={{
                        fontSize: "0.875rem",
                        color: "#2D3436",
                        lineHeight: 1.75,
                        margin: "0 0 12px",
                        fontStyle: "italic",
                      }}
                    >
                      "{s.testimonial.text}"
                    </p>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <div
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "50%",
                          background: s.gradient,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <span
                          style={{
                            color: "white",
                            fontWeight: 800,
                            fontSize: "0.8rem",
                          }}
                        >
                          {s.testimonial.author.charAt(0)}
                        </span>
                      </div>
                      <span
                        style={{
                          fontSize: "0.82rem",
                          fontWeight: 700,
                          color: "#2D3436",
                        }}
                      >
                        {s.testimonial.author}
                      </span>
                      <div
                        style={{
                          display: "flex",
                          gap: "2px",
                          marginRight: "auto",
                        }}
                      >
                        {[1, 2, 3, 4, 5].map((n) => (
                          <Star
                            key={n}
                            className="w-3 h-3"
                            style={{ fill: "#fdcb6e", color: "#fdcb6e" }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── LEFT: Service Details ── */}
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  {/* ── What you get ── */}
                  <div>
                    <SectionTitle
                      icon={<CheckCircle2 className="w-4 h-4" style={{ color: s.color }} />}
                      color={s.color}
                    >
                      ماذا ستحصل عليه
                    </SectionTitle>
                    <ul
                      style={{
                        listStyle: "none",
                        padding: 0,
                        margin: 0,
                        display: "flex",
                        flexDirection: "column",
                        gap: "7px",
                      }}
                    >
                      {s.whatYouGet.map((item, i) => (
                        <li
                          key={i}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            padding: "9px 12px",
                            background: `${s.color}08`,
                            borderRadius: "12px",
                            border: `1px solid ${s.color}15`,
                          }}
                        >
                          <div
                            style={{
                              width: "20px",
                              height: "20px",
                              borderRadius: "50%",
                              background: `${s.color}22`,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                            }}
                          >
                            <Check
                              className="w-3 h-3"
                              style={{ color: s.color }}
                            />
                          </div>
                          <span
                            style={{
                              fontSize: "0.865rem",
                              color: "#2D3436",
                              fontWeight: 500,
                            }}
                          >
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* ── Why important ── */}
                  <div
                    style={{
                      background: `linear-gradient(135deg, ${s.color}0d, ${s.color}05)`,
                      border: `1px solid ${s.color}20`,
                      borderRadius: "16px",
                      padding: "16px",
                    }}
                  >
                    <SectionTitle
                      icon={<TrendingUp className="w-4 h-4" style={{ color: s.color }} />}
                      color={s.color}
                    >
                      لماذا هذه الخدمة مهمة
                    </SectionTitle>
                    <p
                      style={{
                        fontSize: "0.875rem",
                        color: "#4a5568",
                        lineHeight: 1.85,
                        margin: 0,
                      }}
                    >
                      {s.whyImportant}
                    </p>
                  </div>

                  {/* ── Process Timeline ── */}
                  <div>
                    <SectionTitle
                      icon={<MessageCircle className="w-4 h-4" style={{ color: s.color }} />}
                      color={s.color}
                    >
                      خطوات التنفيذ
                    </SectionTitle>

                    <div style={{ display: "flex", alignItems: "flex-start", gap: "0" }}>
                      {processSteps.map((step, i) => {
                        const StepIcon = step.icon;
                        const isLast = i === processSteps.length - 1;
                        return (
                          <Fragment key={i}>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: "6px",
                                flex: "0 0 auto",
                              }}
                            >
                              <div
                                style={{
                                  width: "40px",
                                  height: "40px",
                                  borderRadius: "12px",
                                  background: `${s.color}15`,
                                  border: `1.5px solid ${s.color}25`,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <StepIcon
                                  className="w-4 h-4"
                                  style={{ color: s.color }}
                                />
                              </div>
                              <span
                                style={{
                                  fontSize: "0.6rem",
                                  textAlign: "center",
                                  color: "#636e72",
                                  fontWeight: 600,
                                  lineHeight: 1.3,
                                  width: "52px",
                                }}
                              >
                                {step.label}
                              </span>
                            </div>
                            {!isLast && (
                              <div
                                style={{
                                  flex: 1,
                                  height: "2px",
                                  background: `${s.color}25`,
                                  marginTop: "19px",
                                  minWidth: "6px",
                                  borderRadius: "1px",
                                }}
                              />
                            )}
                          </Fragment>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Sticky CTA Footer ── */}
            <div
              style={{
                padding: "14px 24px",
                borderTop: "1px solid rgba(108,92,231,0.1)",
                background: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "12px",
                flexShrink: 0,
                flexWrap: "wrap",
                boxShadow: "0 -6px 24px rgba(0,0,0,0.06)",
              }}
            >
              {/* Price block */}
              <div>
                <div
                  style={{
                    fontSize: "0.72rem",
                    color: "#636e72",
                    marginBottom: "2px",
                    fontWeight: 600,
                  }}
                >
                  السعر
                </div>
                <div
                  style={{
                    fontFamily: "'Cairo', sans-serif",
                    fontSize: "1.55rem",
                    fontWeight: 800,
                    color: "#2D3436",
                    lineHeight: 1,
                  }}
                >
                  {s.price}
                </div>
              </div>

              {/* CTA buttons */}
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <a
                  href="https://wa.me/966500000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "7px",
                    padding: "11px 20px",
                    borderRadius: "14px",
                    border: `2px solid ${s.color}`,
                    color: s.color,
                    fontFamily: "'Cairo', sans-serif",
                    fontSize: "0.9rem",
                    fontWeight: 700,
                    background: `${s.color}0a`,
                    cursor: "pointer",
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = `${s.color}18`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = `${s.color}0a`;
                  }}
                >
                  <MessageCircle className="w-4 h-4" />
                  تواصل معنا
                </a>

                <a
                  href={`https://wa.me/966500000000?text=${encodeURIComponent(`أريد الطلب: ${s.title}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "7px",
                    padding: "11px 24px",
                    borderRadius: "14px",
                    border: "none",
                    color: "white",
                    fontFamily: "'Cairo', sans-serif",
                    fontSize: "0.9rem",
                    fontWeight: 700,
                    background: s.gradient,
                    cursor: "pointer",
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                    boxShadow: `0 6px 20px ${s.color}45`,
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.03)";
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 10px 28px ${s.color}55`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)";
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 6px 20px ${s.color}45`;
                  }}
                >
                  <ShoppingCart className="w-4 h-4" />
                  اطلب الآن
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

// ---------------------------------------------------------------------------
// SectionTitle helper
// ---------------------------------------------------------------------------

function SectionTitle({
  children,
  icon,
  color,
}: {
  children: ReactNode;
  icon: ReactNode;
  color: string;
}) {
  return (
    <h3
      style={{
        fontFamily: "'Cairo', sans-serif",
        fontSize: "0.95rem",
        fontWeight: 800,
        color: "#2D3436",
        marginBottom: "12px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}
    >
      <span
        style={{
          width: "28px",
          height: "28px",
          borderRadius: "8px",
          background: `${color}18`,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {icon}
      </span>
      {children}
    </h3>
  );
}
