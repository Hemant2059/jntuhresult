"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, GraduationCap, BookOpen, Users, Search, Download, BarChart3 } from "lucide-react";
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
      description: "Complete academic overview including CGPA & grade history.",
      icon: <GraduationCap className="h-6 w-6 text-blue-600" />,
      color: "blue",
    },
    {
      title: "Semester Result",
      href: "/semester",
      description: "View SGPA, subject-wise marks, and semester performance.",
      icon: <BookOpen className="h-6 w-6 text-indigo-600" />,
      color: "indigo",
    },
    {
      title: "Class Result",
      href: "/classresult",
      description: "Check class toppers, rankings, and statistical charts.",
      icon: <Users className="h-6 w-6 text-purple-600" />,
      color: "purple",
    },
  ];

  const highlights = [
    {
      title: "Instant Search",
      description: "Get your results in milliseconds with our optimized engine.",
      icon: <Search className="h-5 w-5" />,
    },
    {
      title: "PDF Downloads",
      description: "Save your results offline with one-click PDF generation.",
      icon: <Download className="h-5 w-5" />,
    },
    {
      title: "Result Analysis",
      description: "Visual charts and statistics for performance tracking.",
      icon: <BarChart3 className="h-5 w-5" />,
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
    <div className="min-h-screen bg-white">
      {/* ------------ HERO SECTION ------------ */}
      <section className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.blue.50),white)]" />
        <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-blue-600/10 ring-1 ring-blue-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
        
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 mb-6">
                Official JNTUH Results Portal
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl"
            >
              Check Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">JNTUH Results</span> Instantly
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-lg leading-8 text-gray-600"
            >
              The fastest way to access your academic performance. Clean, intuitive, and built for B.Tech & B.Pharmacy students.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-10 flex items-center justify-center gap-x-6"
            >
              <Button asChild size="lg" className="rounded-full px-8 shadow-lg shadow-blue-500/25">
                <Link href="/academic">Check My Result</Link>
              </Button>
              <Link href="/classresult" className="text-sm font-semibold leading-6 text-gray-900 flex items-center gap-1 group">
                Class Ranking <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ------------ HIGHLIGHTS SECTION ------------ */}
      <section className="py-12 bg-white sm:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-3 lg:gap-x-12">
            {highlights.map((item, index) => (
              <motion.div 
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-x-4 p-4 rounded-2xl bg-gray-50/50 border border-gray-100"
              >
                <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-gray-900/5 text-blue-600">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">{item.title}</h3>
                  <p className="mt-1 text-xs text-gray-500">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------ FEATURE CARDS ------------ */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <Link
                  href={item.href}
                  className="group relative flex flex-col items-start p-8 border rounded-3xl transition-all hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-500/10 bg-white h-full"
                >
                  <div className={`p-3 rounded-2xl bg-${item.color}-50 group-hover:bg-${item.color}-100 transition-colors mb-6`}>
                    {item.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">{item.title}</h2>
                  <p className="text-gray-600 leading-relaxed mb-8 flex-grow">{item.description}</p>

                  <div className="flex items-center font-bold text-blue-600 group-hover:gap-4 transition-all gap-2">
                    Explore <ArrowRight className="h-4 w-4" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------ FAQ SECTION ------------ */}
      <section className="py-24 bg-gray-50/50 border-t border-gray-100">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Everything you need to know about checking JNTUH results.
            </p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Accordion
                  type="single"
                  collapsible
                  className="bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <AccordionItem value={`faq-${index}`} className="border-none">
                    <AccordionTrigger className="px-6 py-4 font-semibold text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 text-gray-600">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------ FOOTER ------------ */}
      <footer className="py-12 text-center text-gray-500 text-sm border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p>© {new Date().getFullYear()} JNTUH Result Dashboard. Built for students with ❤️</p>
        </div>
      </footer>
    </div>
  );
}
