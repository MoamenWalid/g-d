import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    id: 1,
    question: "كم يستغرق إنجاز الخدمة؟",
    answer:
      "يعتمد وقت التسليم على الخدمة المختارة. شعارات تُسلَّم عادةً خلال 24-48 ساعة. إعداد المتاجر الكاملة قد يستغرق 3-5 أيام عمل. تفعيل القوالب يتم عادةً خلال 24 ساعة. ستتلقى دائماً جدولاً زمنياً واضحاً عند تقديم طلبك.",
  },
  {
    id: 2,
    question: "ماذا يشمل دعمكم بعد التسليم؟",
    answer:
      "تشمل جميع الخدمات فترة دعم 7 أيام بعد التسليم لأي تعديلات طفيفة. عملاء خطتي الاحترافي والمميز يحصلون على دعم ممتد. خطط الصيانة الشهرية متاحة أيضاً للمساعدة المستمرة.",
  },
  {
    id: 3,
    question: "كم عدد التعديلات التي أحصل عليها؟",
    answer:
      "تشمل خطة المبتدئ جولتين للتعديل. خطتا الاحترافي والمميز تشملان تعديلات غير محدودة حتى تكون راضياً 100%. نحن ملتزمون بتقديم ما تتصوره بالضبط.",
  },
  {
    id: 4,
    question: "هل تعملون مع جميع قوالب سلة؟",
    answer:
      "نعم! لدينا خبرة عميقة في جميع قوالب سلة بما فيها عالي ونجم والقوالب المخصصة. نعمل أيضاً مع ميزات سلة برو ويمكننا المساعدة في إعداد أي جانب من جوانب متجرك.",
  },
  {
    id: 5,
    question: "هل يمكنني طلب خدمة مخصصة غير مدرجة في موقعكم؟",
    answer:
      "بالتأكيد. تواصل معنا عبر واتساب أو البريد الإلكتروني لمناقشة احتياجاتك الخاصة. نقوم بإنشاء حزم مخصصة تتناسب مع متطلبات عملك بأسعار تنافسية.",
  },
  {
    id: 6,
    question: "ما طرق الدفع التي تقبلونها؟",
    answer:
      "نقبل جميع بطاقات الائتمان الرئيسية، التحويلات البنكية، Apple Pay، وSTC Pay. تتم معالجة الدفع بشكل آمن عبر منصتنا. للطلبات الكبيرة، قد تتوفر خيارات تقسيط.",
  },
];

export function FAQ() {
  const [openId, setOpenId] = useState<number | null>(1);

  return (
    <section id="faq" className="py-24" style={{ background: "var(--home-section-muted)" }}>
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="mb-16 text-center">
          <div
            className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
            style={{ background: "var(--home-pill-bg)", color: "var(--home-brand)", fontFamily: "'Cairo', sans-serif" }}
          >
            <HelpCircle className="size-4" />
            أسئلة شائعة
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
            الأسئلة{" "}
            <span
              style={{
                background: "var(--home-gradient-text)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              الشائعة
            </span>
          </h2>
          <p className="mx-auto max-w-lg" style={{ color: "var(--home-text-secondary)", fontFamily: "'Cairo', sans-serif", lineHeight: 1.8 }}>
            كل ما تحتاج معرفته قبل البدء. لم تجد إجابتك؟ تواصل معنا مباشرة.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="overflow-hidden rounded-2xl transition-all duration-300"
                style={{
                  background: "var(--home-faq-item-bg)",
                  border: isOpen ? `1px solid var(--home-faq-item-border-open)` : `1px solid var(--home-faq-item-border)`,
                  boxShadow: isOpen ? "var(--home-faq-item-shadow-open)" : "var(--home-faq-item-shadow)",
                }}
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between p-6 text-right transition-colors duration-200"
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="flex size-8 flex-shrink-0 items-center justify-center rounded-xl text-sm font-bold transition-all duration-300"
                      style={{
                        background: isOpen ? "var(--home-gradient-brand)" : "var(--home-faq-id-bg)",
                        color: isOpen ? "var(--home-text-inverse)" : "var(--home-brand)",
                        fontFamily: "'Cairo', sans-serif",
                      }}
                    >
                      {faq.id}
                    </div>
                    <span
                      className="pl-4 font-semibold"
                      style={{
                        fontFamily: "'Cairo', sans-serif",
                        color: isOpen ? "var(--home-brand)" : "var(--home-text-primary)",
                        fontSize: "1rem",
                      }}
                    >
                      {faq.question}
                    </span>
                  </div>
                  <div
                    className="flex size-8 flex-shrink-0 items-center justify-center rounded-full transition-all duration-300"
                    style={{
                      background: isOpen ? "var(--home-faq-accent-open-bg)" : "var(--home-faq-id-bg)",
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  >
                    <ChevronDown
                      className="size-4"
                      style={{ color: isOpen ? "var(--home-brand)" : "var(--home-faq-chevron-muted)" }}
                    />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div
                        className="mr-12 px-6 pb-6"
                        style={{
                          color: "var(--home-text-secondary)",
                          fontFamily: "'Cairo', sans-serif",
                          lineHeight: 1.8,
                          fontSize: "0.95rem",
                        }}
                      >
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <p style={{ color: "var(--home-text-secondary)", fontFamily: "'Cairo', sans-serif", marginBottom: "12px" }}>
            لا تزال لديك أسئلة؟
          </p>
          <a
            href="https://wa.me/966500000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl px-6 py-3 font-semibold text-white transition-all duration-300 hover:scale-105"
            style={{
              background: "var(--home-whatsapp)",
              boxShadow: "var(--home-whatsapp-shadow)",
              fontFamily: "'Cairo', sans-serif",
            }}
          >
            💬 تحدث معنا على واتساب
          </a>
        </div>
      </div>
    </section>
  );
}
