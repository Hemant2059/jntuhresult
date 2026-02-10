"use client";

import { motion } from "framer-motion";
import { Mail, MessageSquare, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white py-20 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div>
              <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4">Contact Me</h1>
              <p className="text-lg text-gray-600">
                Have a question or feedback? I'd love to hear from you. Fill out the form or reach out via email.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Email</h3>
                  <p className="text-gray-600 italic underline">hp2059712@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-50 rounded-2xl text-purple-600">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Live Support</h3>
                  <p className="text-gray-600">Available Monday to Friday, 9am - 5pm IST</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-green-50 rounded-2xl text-green-600">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Response Time</h3>
                  <p className="text-gray-600">Usually responds within 24 hours</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form Embed */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative bg-gray-50 rounded-[2.5rem] p-4 md:p-8 border border-gray-100 overflow-hidden min-h-[600px] flex items-center justify-center"
          >
            {/* 
              User Instructions: 
              Replace the src below with your actual Google Form embed URL 
            */}
            <iframe 
               src="https://docs.google.com/forms/d/e/1FAIpQLSdpS46olT3djO78dEYbbCxNreDEKv-e3KAtnsgrZ0WwzBgEAA/viewform?usp=sharing&ouid=112976098429978993957?embedded=true" 
               width="100%" 
               height="700" 
               frameBorder="0" 
               marginHeight={0} 
               marginWidth={0}
               className="rounded-2xl shadow-sm bg-white"
            >
              Loading…
            </iframe>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
