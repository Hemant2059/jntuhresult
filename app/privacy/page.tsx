import { Shield } from "lucide-react";

export const metadata = {
  title: "Privacy Policy",
  description: "JNTUH Results Privacy Policy - how we collect, use, and protect your information.",
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[#fafafa] dark:bg-gray-950">
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-6 py-14 sm:py-20">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">Privacy Policy</h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-8 sm:p-12 shadow-sm space-y-10">
          <Section title="1. Information We Collect">
            <p>When you use our website to search for results, we may collect the following information:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li><strong>Hall Ticket Number:</strong> You voluntarily enter your JNTUH hall ticket number to search for your results. This information is processed temporarily and is not stored on our servers.</li>
              <li><strong>Browser Information:</strong> We collect standard browser and device information to improve our services and for analytics purposes.</li>
              <li><strong>Cookies:</strong> We use cookies to enhance user experience and analyze website traffic.</li>
            </ul>
          </Section>

          <Section title="2. How We Use Your Information">
            <ul className="list-disc pl-6 space-y-2">
              <li>To provide you with examination results quickly and accurately</li>
              <li>To improve our website and user experience</li>
              <li>To analyze website traffic and usage patterns</li>
              <li>To comply with legal obligations</li>
            </ul>
          </Section>

          <Section title="3. Log Files">
            <p>JNTUH Results follows a standard procedure of using log files. These files log visitors when they visit websites. The information collected includes IP addresses, browser type, ISP, date and time stamps, and referring/exit pages. These are not linked to any personally identifiable information.</p>
          </Section>

          <Section title="4. Cookies">
            <p>We use cookies to store information including visitors&apos; preferences and the pages they visited. This information is used to optimize the users&apos; experience by customizing our web page content based on browser type and/or other information.</p>
          </Section>

          <Section title="5. Third-Party Services">
            <p>We use Google Analytics and Google AdSense which may use cookies and other tracking technologies. These third-party services have their own privacy policies governing the use of your information. We have no access to or control over these cookies.</p>
          </Section>

          <Section title="6. Data Security">
            <p>We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure.</p>
          </Section>

          <Section title="7. Children&apos;s Privacy">
            <p>We do not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think your child has provided such information, please contact us immediately.</p>
          </Section>

          <Section title="8. Contact">
            <p>If you have any questions about this Privacy Policy, please contact us at <strong className="text-blue-600">hp2059712@gmail.com</strong>.</p>
          </Section>
        </div>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
      <div className="text-gray-600 dark:text-gray-400 leading-relaxed space-y-3">{children}</div>
    </section>
  );
}
