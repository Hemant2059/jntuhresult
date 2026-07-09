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
      gradient: "from-primary to-primary/80",
      bgLight: "bg-secondary dark:bg-secondary",
    },
    {
      title: "Semester Result",
      href: "/semester",
      description: "View SGPA, subject-wise marks, and detailed semester performance reports.",
      icon: <BookOpen className="h-6 w-6" />,
      gradient: "from-primary to-primary/80",
      bgLight: "bg-secondary dark:bg-secondary",
    },
    {
      title: "All Exam Results",
      href: "/allresult",
      description: "Complete history of all exams — regular, supply, and revaluation results.",
      icon: <BarChart3 className="h-6 w-6" />,
      gradient: "from-primary to-primary/80",
      bgLight: "bg-secondary dark:bg-secondary",
    },
    {
      title: "Class Analysis",
      href: "/classresult",
      description: "Check class toppers, rankings, subject pass/fail stats, and performance charts.",
      icon: <Users className="h-6 w-6" />,
      gradient: "from-purple-600 to-indigo-600",
      bgLight: "bg-secondary dark:bg-secondary",
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
    <div className="min-h-screen bg-card dark:bg-card">
      {/* HERO */}
      <section className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,var(--color-blue-50),transparent)] dark:bg-[radial-gradient(45rem_50rem_at_top,var(--color-blue-950),transparent)]" />
        <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-card/80 dark:bg-background/80 shadow-xl shadow-blue-600/5 ring-1 ring-blue-50 dark:ring-blue-950 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />

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
              className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl"
            >
              Check Your{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-primary/80">
                JNTUH Results
              </span>{" "}
              Instantly
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-lg leading-8 text-muted-foreground"
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
                className="text-sm font-semibold leading-6 text-foreground dark:text-gray-300 flex items-center gap-1 group hover:text-primary transition-colors"
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
                className="flex items-center gap-4 p-4 sm:p-5 rounded-2xl bg-card dark:bg-card border border-border shadow-sm"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-900/30 text-primary dark:text-blue-400">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground">{item.title}</h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">{item.description}</p>
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
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Everything you need
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">
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
                  className="group relative flex flex-col items-start p-6 sm:p-8 border border-border rounded-3xl transition-all hover:border-primary/30 hover:shadow-2xl hover:shadow-blue-500/10 bg-card dark:bg-card h-full"
                >
                  <div className={`p-3 rounded-2xl ${item.bgLight} group-hover:scale-110 transition-transform mb-5`}>
                    <div className={`text-transparent bg-clip-text bg-linear-to-r ${item.gradient}`}>
                      {item.icon}
                    </div>
                  </div>
                  <h2 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 grow">
                    {item.description}
                  </p>
                  <div className="flex items-center font-semibold text-primary group-hover:gap-3 transition-all gap-2 text-sm">
                    Get Started <ArrowRight className="h-4 w-4" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 sm:py-28 bg-gray-50/50 dark:bg-gray-900/50 border-t border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              How It Works
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">
              Check your JNTUH results in three simple steps.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: "1", title: "Choose Result Type", desc: "Select whether you want to check semester results, academic CGPA, or complete exam history." },
              { step: "2", title: "Enter Hall Ticket", desc: "Enter your 10-digit JNTUH hall ticket number. No login or signup required." },
              { step: "3", title: "View Results", desc: "Get your detailed marks, grades, SGPA, and CGPA instantly. Download as PDF if needed." },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="text-center"
              >
                <div className="mx-auto h-14 w-14 rounded-2xl bg-primary text-white flex items-center justify-center text-xl font-bold mb-5 shadow-lg shadow-blue-500/25">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT JNTUH */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-6">
                About JNTUH Results
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  JNTUH Results is an independent platform built to help students of Jawaharlal Nehru Technological 
                  University Hyderabad (JNTUH) access their examination results quickly and easily. We fetch data 
                  directly from the official JNTUH API to ensure accuracy.
                </p>
                <p>
                  Whether you are a B.Tech or B.Pharmacy student under R13, R15, R16, R18, R22, or R25 regulation, 
                  our platform supports all regulations and provides instant access to semester results, academic CGPA, 
                  class analysis, and complete examination history.
                </p>
                <p>
                  We are not affiliated with JNTUH or any official university authority. For official results, 
                  always refer to{" "}
                  <a href="http://results.jntuh.ac.in" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
                    results.jntuh.ac.in
                  </a>.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { label: "Regulations Supported", value: "6+", desc: "R13 to R25" },
                { label: "Result Types", value: "4", desc: "Academic, Semester, All, Class" },
                { label: "API Response", value: "< 2s", desc: "Fast result fetching" },
                { label: "Privacy", value: "100%", desc: "No data stored" },
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className="p-5 bg-card dark:bg-card rounded-2xl border border-border shadow-sm"
                >
                  <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-sm font-semibold text-foreground">{stat.label}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{stat.desc}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-gray-50/50 dark:bg-gray-900/50 border-t border-border">
        <div className="mx-auto max-w-3xl px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">
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
                  className="bg-card dark:bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <AccordionItem value={`faq-${index}`} className="border-none">
                    <AccordionTrigger className="px-6 py-4 font-semibold text-left text-foreground hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 text-muted-foreground leading-relaxed">
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
