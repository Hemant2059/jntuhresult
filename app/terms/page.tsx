"use client";

import { motion } from "framer-motion";

export default function TermsAndConditions() {
  return (
    <main className="min-h-screen bg-white py-20 px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5 }}
           className="space-y-8"
        >
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4">Terms and Conditions</h1>
            <p className="text-gray-500">Welcome to JNTUH Results Vercel</p>
          </div>

          <section className="prose prose-blue max-w-none text-gray-600 space-y-6">
            <p>
              These terms and conditions outline the rules and regulations for the use of JNTUH Results Vercel's Website, located at https://jntuhresultbp.vercel.app.
            </p>

            <p>
              By accessing this website we assume you accept these terms and conditions. Do not continue to use JNTUH Results Vercel if you do not agree to take all of the terms and conditions stated on this page.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 border-b pb-2">1. License</h2>
            <p>
              Unless otherwise stated, JNTUH Results Vercel and/or its licensors own the intellectual property rights for all material on JNTUH Results Vercel. All intellectual property rights are reserved. You may access this from JNTUH Results Vercel for your own personal use subjected to restrictions set in these terms and conditions.
            </p>
            <p>You must not:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Republish material from JNTUH Results Vercel</li>
              <li>Sell, rent or sub-license material from JNTUH Results Vercel</li>
              <li>Reproduce, duplicate or copy material from JNTUH Results Vercel</li>
              <li>Redistribute content from JNTUH Results Vercel</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 border-b pb-2">2. Accuracy of Information</h2>
            <p>
              The information provided on this website is for general informational purposes only. While we strive to keep the information up-to-date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 border-b pb-2">3. Hyperlinking to our Content</h2>
            <p>
              The following organizations may link to our Website without prior written approval:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Government agencies;</li>
              <li>Search engines;</li>
              <li>News organizations;</li>
              <li>Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of other listed businesses.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 border-b pb-2">4. Content Liability</h2>
            <p>
              We shall not be hold responsible for any content that appears on our Website. You agree to protect and defend us against all claims that is rising on our Website.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 border-b pb-2">5. Disclaimer</h2>
            <p>
              To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>limit or exclude our or your liability for death or personal injury;</li>
              <li>limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
              <li>limit any of our or your liabilities in any way that is not permitted under applicable law; or</li>
              <li>exclude any of our or your liabilities that may not be excluded under applicable law.</li>
            </ul>
          </section>
        </motion.div>
      </div>
    </main>
  );
}
