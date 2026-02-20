"use client";

import { motion } from "framer-motion";

export default function PrivacyPolicy() {
  const lastUpdated = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

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
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4">Privacy Policy</h1>
            <p className="text-gray-500">Last updated: {lastUpdated}</p>
          </div>

          <section className="prose prose-blue max-w-none text-gray-600 space-y-6">
            <p>
              At <strong>JNTUH Results Vercel</strong>, accessible from https://jntuhresultbp.vercel.app, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by JNTUH Results Vercel and how we use it.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 border-b pb-2">1. Log Files</h2>
            <p>
              JNTUH Results Vercel follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 border-b pb-2">2. Cookies and Web Beacons</h2>
            <p>
              Like any other website, JNTUH Results Vercel uses "cookies". These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 border-b pb-2">3. Google DoubleClick DART Cookie</h2>
            <p>
              Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – <a href="https://policies.google.com/technologies/ads" className="text-blue-600 hover:underline">https://policies.google.com/technologies/ads</a>
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 border-b pb-2">4. Advertising Partners Privacy Policies</h2>
            <p>
              Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on JNTUH Results Vercel, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.
            </p>
            <p>
              Note that JNTUH Results Vercel has no access to or control over these cookies that are used by third-party advertisers.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 border-b pb-2">5. Third Party Privacy Policies</h2>
            <p>
              JNTUH Results Vercel's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 border-b pb-2">6. GDPR Data Protection Rights</h2>
            <p>
              We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>The right to access</strong> – You have the right to request copies of your personal data.</li>
              <li><strong>The right to rectification</strong> – You have the right to request that we correct any information you believe is inaccurate.</li>
              <li><strong>The right to erasure</strong> – You have the right to request that we erase your personal data, under certain conditions.</li>
              <li><strong>The right to restrict processing</strong> – You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 border-b pb-2">7. Children's Information</h2>
            <p>
              Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.
            </p>
            <p>
              JNTUH Results Vercel does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 border-b pb-2">8. Information We Collect</h2>
            <p>
              JNTUH Results Vercel is designed to help students access their examination results quickly and easily. When you use our website to search for results, we may collect the following information:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Hall Ticket Number:</strong> You voluntarily enter your JNTUH hall ticket number to search for your results. This information is processed temporarily and is not stored on our servers.</li>
              <li><strong>Browser Information:</strong> We collect standard browser and device information to improve our services and for analytics purposes.</li>
              <li><strong>Cookies:</strong> We use cookies to enhance user experience and analyze website traffic.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 border-b pb-2">9. How We Use Your Information</h2>
            <p>
              The information we collect is used for the following purposes:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To provide you with examination results quickly and accurately</li>
              <li>To improve our website and user experience</li>
              <li>To analyze website traffic and usage patterns</li>
              <li>To respond to your questions and provide customer support</li>
              <li>To comply with legal obligations</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 border-b pb-2">10. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 border-b pb-2">11. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites. We have no control over the content, privacy policies, or practices of any third-party websites. We encourage you to review the privacy policies of those websites before providing any information.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 border-b pb-2">12. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 border-b pb-2">13. Contact Information</h2>
            <p>
              If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at <strong>hp2059712@gmail.com</strong>.
            </p>
          </section>
        </motion.div>
      </div>
    </main>
  );
}
