"use client";

import { motion } from "framer-motion";

export default function Disclaimer() {
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
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4">Disclaimer</h1>
            <p className="text-gray-500">Important Information</p>
          </div>

          <section className="prose prose-blue max-w-none text-gray-600 space-y-6">
            <p>
              The information provided by <strong>JNTUH Results Vercel</strong> ("we," "us," or "our") on https://jntuhresultbp.vercel.app (the "Site") is for general informational purposes only.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 border-b pb-2">1. External Links Disclaimer</h2>
            <p>
              The Site may contain (or you may be sent through the Site) links to other websites or content belonging to or originating from third parties or links to websites and features in banners or other advertising. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 border-b pb-2">2. Errors and Omissions Disclaimer</h2>
            <p>
              While we have made every attempt to ensure that the information contained in this site has been obtained from reliable sources, JNTUH Results Vercel is not responsible for any errors or omissions, or for the results obtained from the use of this information. All information in this site is provided "as is", with no guarantee of completeness, accuracy, timeliness or of the results obtained from the use of this information.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 border-b pb-2">3. Not Official Information</h2>
            <p>
              <strong>IMPORTANT:</strong> We are NOT an official university website. We are a results aggregation tool built for student convenience. For official and final results, always refer to the official JNTUH results portal at <a href="http://results.jntuh.ac.in" className="text-blue-600 hover:underline">http://results.jntuh.ac.in</a>. Any discrepancies found here should be verified with the official sources.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 border-b pb-2">4. Views Expressed Disclaimer</h2>
            <p>
              The Site may contain views and opinions which are those of the authors and do not necessarily reflect the official policy or position of any other author, agency, organization, employer or company, including JNTUH Results Vercel.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 border-b pb-2">5. "Use at Your Own Risk" Disclaimer</h2>
            <p>
              All information in the Site is provided "as is", with no guarantee of completeness, accuracy, timeliness or of the results obtained from the use of this information, and without warranty of any kind, express or implied, including, but not limited to warranties of performance, merchantability and fitness for a particular purpose.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 border-b pb-2">6. No Responsibility for Decisions</h2>
            <p>
              The information provided on this website should not be used as the sole basis for making important decisions. Any reliance on the material on this site is at your own risk. We shall not be liable for any losses or damages arising from the use of this website or reliance on any information provided herein.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 border-b pb-2">7. Result Verification</h2>
            <p>
              Students are strongly advised to verify their examination results from the official JNTUH university portal. While we strive to provide accurate and up-to-date information, we cannot guarantee that all results displayed on this website are 100% accurate. Always cross-check with the official university records before making any decisions based on the results.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 border-b pb-2">8. Copyright and Trademark</h2>
            <p>
              This website and its content are protected by copyright laws. The JNTUH logo, university names, and other trademarks are property of their respective owners. This website is not affiliated with, endorsed by, or sponsored by Jawaharlal Nehru Technological University Hyderabad (JNTUH).
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 border-b pb-2">9. Limitation of Liability</h2>
            <p>
              In no event shall JNTUH Results Vercel be liable for any special or consequential damages arising out of or in any way connected with your use of this website. This includes, but is not limited to, loss of data, loss of profits, or any other financial losses resulting from the use or inability to use the information on this website.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 border-b pb-2">10. Changes to Disclaimer</h2>
            <p>
              We reserve the right to modify this disclaimer at any time without prior notice. Your continued use of this website constitutes your acceptance of any changes to this disclaimer.
            </p>
          </section>
        </motion.div>
      </div>
    </main>
  );
}
