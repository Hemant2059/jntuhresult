"use client";

import { motion } from "framer-motion";
import { Mail, MessageSquare, Clock, GraduationCap } from "lucide-react";



export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] dark:bg-gray-950">
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-14 sm:py-20">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600">
              <Mail className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">Contact Us</h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                Have a question or feedback? We&apos;d love to hear from you.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-5 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-2xl text-blue-600">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Email</h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">hp2059712@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
                <div className="p-3 bg-purple-50 dark:bg-purple-900/30 rounded-2xl text-purple-600">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Support Hours</h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">Monday to Friday, 9am - 5pm IST</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
                <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-2xl text-green-600">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Response Time</h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">Usually responds within 24 hours</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 border border-blue-100 dark:border-blue-800">
              <div className="flex items-start gap-4">
                <GraduationCap className="h-6 w-6 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">Independent Platform</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    JNTUH Results is an independent platform designed to help students easily access their examination results.
                    We are not affiliated with JNTUH or any official university authority.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-6 sm:p-8 border border-gray-100 dark:border-gray-800 overflow-hidden min-h-[500px]"
          >
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSdpS46olT3djO78dEYbbCxNreDEKv-e3KAtnsgrZ0WwzBgEAA/viewform?usp=sharing&ouid=112976098429978993957?embedded=true"
              width="100%"
              height="650"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              className="rounded-2xl"
            >
              Loading&hellip;
            </iframe>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
