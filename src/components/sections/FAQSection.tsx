import { Container } from "@/components/ui/Container";
import { AccordionItem } from "@/components/ui/Accordion";
import type { FAQ } from "@/types";

interface FAQSectionProps {
  faqs: FAQ[];
  title?: string;
}

export function FAQSection({ faqs, title }: FAQSectionProps) {
  return (
    <section className="py-16 lg:py-24">
      <Container>
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 sm:text-4xl">
            {title}
          </h2>
          <div className="divide-y divide-accent-200 rounded-xl border border-accent-200 bg-white p-6 shadow-sm">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
