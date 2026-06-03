"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  GraduationCap,
  BookOpen,
  Users,
  BarChart3,
  Search,
  Download,
  Zap,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export default function Home() {
  const features = [
    {
      title: "Academic Result",
      href: "/academic",
      description: "Complete academic overview including CGPA & grade history across all semesters.",
      icon: <GraduationCap className="h-6 w-6" />,
      gradient: "from-blue-600 to-indigo-600",
      bgLight: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      title: "Semester Result",
      href: "/semester",
      description: "View SGPA, subject-wise marks, and detailed semester performance reports.",
      icon: <BookOpen className="h-6 w-6" />,
      gradient: "from-indigo-600 to-blue-600",
      bgLight: "bg-indigo-50 dark:bg-indigo-900/20",
    },
    {
      title: "All Exam Results",
      href: "/allresult",
      description: "Complete history of all exams — regular, supply, and revaluation results.",
      icon: <BarChart3 className="h-6 w-6" />,
      gradient: "from-emerald-600 to-green-600",
      bgLight: "bg-green-50 dark:bg-green-900/20",
    },
    {
      title: "Class Analysis",
      href: "/classresult",
      description: "Check class toppers, rankings, subject pass/fail stats, and performance charts.",
      icon: <Users className="h-6 w-6" />,
      gradient: "from-purple-600 to-indigo-600",
      bgLight: "bg-purple-50 dark:bg-purple-900/20",
    },
  ];

  const highlights = [
    {
      title: "Lightning Fast",
      description: "Get your results in milliseconds with our optimized engine.",
      icon: <Zap className="h-5 w-5" />,
    },
    {
      title: "PDF Downloads",
      description: "Save your results offline with one-click PDF generation.",
      icon: <Download className="h-5 w-5" />,
    },
    {
      title: "Result Analytics",
      description: "Visual charts and statistics for performance tracking.",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      title: "No Login Required",
      description: "Simply enter your roll number — no account or sign-up needed.",
      icon: <Search className="h-5 w-5" />,
    },
  ];

  const faqs = [
    {
      question: "How can I check my results?",
      answer: "Simply enter your roll number in the search box on the respective page or browse by category to view your results instantly.",
    },
    {
      question: "What if I forget my roll number?",
      answer: "You can ask your class representative or check your admit card/exam hall ticket to find your roll number.",
    },
    {
      question: "Can I download my results?",
      answer: "Yes! All results can be easily downloaded in PDF format for your records with a single click.",
    },
    {
      question: "Is my data safe?",
      answer: "Absolutely. We only display official academic results and do not store any personal information beyond what is required to fetch your results.",
    },
    {
      question: "How often are results updated?",
      answer: "Results are updated as soon as they are officially released by JNTUH, so you always get the latest information.",
    },
    {
      question: "Can I check results for multiple semesters?",
      answer: "Yes! You can view both your semester-wise results and cumulative academic results with CGPA and grades.",
    },
    {
      question: "Do I need to create an account?",
      answer: "No need! Simply enter your roll number and view your results immediately without signing up.",
    },
    {
      question: "What if I notice a mistake in my result?",
      answer: "Please contact your college examination cell to report discrepancies and get it resolved officially.",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* HERO */}
      <section className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,var(--color-blue-50),transparent)] dark:bg-[radial-gradient(45rem_50rem_at_top,var(--color-blue-950),transparent)]" />
        <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white/80 dark:bg-gray-950/80 shadow-xl shadow-blue-600/5 ring-1 ring-blue-50 dark:ring-blue-950 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />

        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Link
                href="http://results.jntuh.ac.in"
                target="_blank"
                className="inline-flex items-center rounded-full bg-blue-50 dark:bg-blue-900/30 px-4 py-1.5 text-sm font-medium text-blue-700 dark:text-blue-300 ring-1 ring-inset ring-blue-700/10 mb-6"
              >
                Official JNTUH Results Portal &rarr;
              </Link>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl"
            >
              Check Your{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600">
                JNTUH Results
              </span>{" "}
              Instantly
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400"
            >
              The fastest way to access your academic performance. Clean, intuitive, and built for B.Tech &amp; B.Pharmacy students.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-10 flex items-center justify-center gap-x-6"
            >
              <Button
                asChild
                size="lg"
                className="rounded-full px-8 shadow-lg shadow-blue-500/25 h-12"
              >
                <Link href="/academic">Check My Result</Link>
              </Button>
              <Link
                href="/classresult"
                className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-300 flex items-center gap-1 group hover:text-blue-600 transition-colors"
              >
                Class Ranking{" "}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="py-12 sm:py-16 bg-gray-50/50 dark:bg-gray-900/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 p-4 sm:p-5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">{item.title}</h3>
                  <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURE CARDS */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
              Everything you need
            </h2>
            <p className="mt-3 text-lg text-gray-500 dark:text-gray-400">
              Choose the result type that matches what you&apos;re looking for.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="group relative flex flex-col items-start p-6 sm:p-8 border border-gray-100 dark:border-gray-800 rounded-3xl transition-all hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-2xl hover:shadow-blue-500/10 bg-white dark:bg-gray-900 h-full"
                >
                  <div className={`p-3 rounded-2xl ${item.bgLight} group-hover:scale-110 transition-transform mb-5`}>
                    <div className={`text-transparent bg-clip-text bg-linear-to-r ${item.gradient}`}>
                      {item.icon}
                    </div>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6 grow">
                    {item.description}
                  </p>
                  <div className="flex items-center font-semibold text-blue-600 group-hover:gap-3 transition-all gap-2 text-sm">
                    Get Started <ArrowRight className="h-4 w-4" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-gray-50/50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-800">
        <div className="mx-auto max-w-3xl px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-lg text-gray-500 dark:text-gray-400">
              Everything you need to know about checking JNTUH results.
            </p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.03 }}
              >
                <Accordion
                  type="single"
                  collapsible
                  className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <AccordionItem value={`faq-${index}`} className="border-none">
                    <AccordionTrigger className="px-6 py-4 font-semibold text-left text-gray-900 dark:text-white hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
