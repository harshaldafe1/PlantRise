import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "What is your return policy?",
    a: "We offer a hassle-free 30-day return policy on all products. If you're not satisfied with your purchase, simply contact our support team and we'll arrange a return or exchange for you.",
  },
  {
    q: "How do I track my order?",
    a: "Once your order is shipped, you'll receive an email with a tracking number. You can use this number on our website or the courier's website to track your delivery in real-time.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit/debit cards, UPI, net banking, and popular digital wallets. All transactions are secured with industry-standard encryption.",
  },
  {
    q: "Do you offer international shipping?",
    a: "Currently, we ship within India only. We're working on expanding our shipping to international destinations. Stay tuned for updates!",
  },
  {
    q: "How can I contact customer support?",
    a: "You can reach us via email at info@yourcompany.com, call us at +91-9270542700, or use the contact form on our Contact page. Our support team is available Monday to Saturday, 9 AM to 6 PM.",
  },
  {
    q: "Are your products organic?",
    a: "Yes! All our products are 100% organic and eco-friendly. Our vermicompost is made using natural earthworm composting processes without any chemical additives.",
  },
];

const FAQs = () => {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-5 py-16">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-heading font-bold text-primary mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-muted-foreground text-lg">
            Find answers to common questions about PlantRise.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="bg-card rounded-xl px-6 shadow-sm border-none"
              >
                <AccordionTrigger className="text-foreground font-medium text-left hover:no-underline py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </Layout>
  );
};

export default FAQs;
