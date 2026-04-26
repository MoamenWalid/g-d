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
    <section id="faq" className="py-24" style={{ background: "#F8F9FC" }}>
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 text-sm font-semibold"
            style={{ background: "rgba(108,92,231,0.1)", color: "#6C5CE7", fontFamily: "'Cairo', sans-serif" }}
          >
            <HelpCircle className="w-4 h-4" />
            أسئلة شائعة
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
            الأسئلة{" "}
            <span style={{ background: "linear-gradient(135deg, #6C5CE7, #00CEC9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              الشائعة
            </span>
          </h2>
          <p
            className="max-w-lg mx-auto"
            style={{ color: "#636e72", fontFamily: "'Cairo', sans-serif", lineHeight: 1.8 }}
          >
            كل ما تحتاج معرفته قبل البدء. لم تجد إجابتك؟ تواصل معنا مباشرة.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-2xl overflow-hidden transition-all duration-300"
                style={{
                  background: "white",
                  border: isOpen ? "1px solid rgba(108,92,231,0.3)" : "1px solid rgba(108,92,231,0.1)",
                  boxShadow: isOpen ? "0 8px 32px rgba(108,92,231,0.12)" : "0 2px 8px rgba(0,0,0,0.04)",
                }}
              >
                <button
                  className="w-full flex items-center justify-between p-6 text-right transition-colors duration-200"
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-sm font-bold transition-all duration-300"
                      style={{
                        background: isOpen ? "linear-gradient(135deg, #6C5CE7, #00CEC9)" : "#F8F9FC",
                        color: isOpen ? "white" : "#6C5CE7",
                        fontFamily: "'Cairo', sans-serif",
                      }}
                    >
                      {faq.id}
                    </div>
                    <span
                      className="font-semibold pl-4"
                      style={{
                        fontFamily: "'Cairo', sans-serif",
                        color: isOpen ? "#6C5CE7" : "#2D3436",
                        fontSize: "1rem",
                      }}
                    >
                      {faq.question}
                    </span>
                  </div>
                  <div
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
                    style={{
                      background: isOpen ? "rgba(108,92,231,0.1)" : "#F8F9FC",
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  >
                    <ChevronDown
                      className="w-4 h-4"
                      style={{ color: isOpen ? "#6C5CE7" : "#a0aab4" }}
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
                        className="px-6 pb-6 mr-12"
                        style={{
                          color: "#636e72",
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

        <div className="text-center mt-10">
          <p style={{ color: "#636e72", fontFamily: "'Cairo', sans-serif", marginBottom: "12px" }}>
            لا تزال لديك أسئلة؟
          </p>
          <a
            href="https://wa.me/966500000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold transition-all duration-300 hover:scale-105"
            style={{
              background: "#25D366",
              boxShadow: "0 6px 20px rgba(37,211,102,0.35)",
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
