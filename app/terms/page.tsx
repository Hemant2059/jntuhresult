import { FileText } from "lucide-react";

export const metadata = {
  title: "Terms and Conditions",
  description: "Terms and conditions for using JNTUH Results.",
};

export default function TermsAndConditions() {
  return (
    <main className="min-h-screen bg-[#fafafa] dark:bg-gray-950">
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-6 py-14 sm:py-20">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">Terms &amp; Conditions</h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Welcome to JNTUH Results</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-8 sm:p-12 shadow-sm space-y-10">
          <Section title="1. Acceptance of Terms">
            <p>By accessing this website you accept these terms and conditions. Do not continue to use JNTUH Results if you do not agree to all of the terms and conditions stated on this page.</p>
          </Section>

          <Section title="2. License">
            <p>Unless otherwise stated, JNTUH Results and/or its licensors own the intellectual property rights for all material on this website. All intellectual property rights are reserved.</p>
          </Section>

          <Section title="3. Accuracy of Information">
            <p>The information provided on this website is for general informational purposes only. While we strive to keep the information up-to-date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, or suitability of the information.</p>
          </Section>

          <Section title="4. Disclaimer">
            <p>To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will limit or exclude our or your liability for death or personal injury, fraud, or any liabilities in any way that is not permitted under applicable law.</p>
          </Section>

          <Section title="5. External Links">
            <p>Our website may contain links to third-party websites. We have no control over the content, privacy policies, or practices of any third-party websites.</p>
          </Section>

          <Section title="6. Contact">
            <p>If you have any questions about these terms, please contact us at <strong className="text-blue-600">hp2059712@gmail.com</strong>.</p>
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
