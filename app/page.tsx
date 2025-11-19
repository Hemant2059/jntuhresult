"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Home() {
  const features = [
    {
      title: "Academic Result",
      href: "/academic",
      description: "Complete academic overview including CGPA & grade history.",
    },
    {
      title: "Semester Result",
      href: "/semester",
      description: "View SGPA, subject-wise marks, and semester performance.",
    },
    {
      title: "Class Result",
      href: "/classresult",
      description: "Check class toppers, rankings, and statistical charts.",
    },
  ];

  const faqs = [
    {
      question: "How can I check my results?",
      answer:
        "Simply enter your roll number in the search box on the respective page or browse by category to view your results instantly.",
    },
    {
      question: "What if I forget my roll number?",
      answer:
        "No worries! You can ask your class representative or check your admit card to find your roll number.",
    },
    {
      question: "Can I download my results?",
      answer:
        "Yes! All results can be easily downloaded in PDF format for your records.",
    },
    {
      question: "Is my data safe?",
      answer:
        "Absolutely. We only display official academic results and do not store any personal information beyond what is required to fetch your results.",
    },
    {
      question: "How often are results updated?",
      answer:
        "Results are updated as soon as they are officially released by JNTUH, so you always get the latest information.",
    },
    {
      question: "Can I check results for multiple semesters?",
      answer:
        "Of course! You can view both your semester-wise results and cumulative academic results with CGPA and grades.",
    },
    {
      question: "Do I need to create an account to check results?",
      answer:
        "No need! Simply enter your roll number and view your results immediately without signing up.",
    },
    {
      question: "What if I notice a mistake in my result?",
      answer:
        "In that case, please contact your college examination cell to report discrepancies and get it resolved officially.",
    },
    {
      question: "Can I access results on my phone?",
      answer:
        "Yes! Our website is mobile-friendly, so you can check your results anytime, anywhere, right from your phone.",
    },
  ];

  return (
    <main className="max-w-6xl mx-auto px-4 py-16">
      {/* ------------ HERO SECTION ------------ */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Check Your <span className="text-blue-600">JNTUH Results</span>{" "}
          Instantly
        </h1>

        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Fast, accurate, and clean interface for all students. Search your
          result by roll number or browse by category.
        </p>
      </motion.section>

      {/* ------------ FEATURE CARDS ------------ */}
      <section className="grid md:grid-cols-3 gap-6 mt-12">
        {features.map((item, index) => (
          <motion.div
            key={item.href}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
          >
            <Link
              href={item.href}
              className="border rounded-xl p-6 shadow-sm hover:shadow-md transition bg-white block"
            >
              <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
              <p className="text-gray-600 text-sm mb-4">{item.description}</p>

              <div className="flex items-center font-medium text-blue-600">
                Explore <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </Link>
          </motion.div>
        ))}
      </section>

      {/* ------------ FAQ SECTION ------------ */}
      <section className="mt-20">
        <h2 className="text-2xl font-bold text-center mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4 max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Accordion
                type="single"
                collapsible
                className="border rounded-lg"
              >
                <AccordionItem value={`faq-${index}`}>
                  <AccordionTrigger className="px-4 py-3 font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-4 py-3 text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ------------ FOOTER ------------ */}
      <footer className="text-center text-gray-500 text-sm mt-20 ">
        © {new Date().getFullYear()} JNTUH Result | All Rights Reserved
      </footer>
    </main>
  );
}
