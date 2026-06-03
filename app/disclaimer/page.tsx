import { AlertTriangle } from "lucide-react";

export const metadata = {
  title: "Disclaimer",
  description: "Important disclaimers about JNTUH Results.",
};

export default function Disclaimer() {
  return (
    <main className="min-h-screen bg-[#fafafa] dark:bg-gray-950">
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-6 py-14 sm:py-20">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-900/30 text-amber-600">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">Disclaimer</h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Important information about our service</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-8 sm:p-12 shadow-sm space-y-10">
          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-2xl p-6 border border-amber-100 dark:border-amber-800">
            <div className="flex items-start gap-4">
              <AlertTriangle className="h-6 w-6 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">Important Notice</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  We are NOT an official university website. We are a results aggregation tool built for student convenience.
                  For official and final results, always refer to the official JNTUH results portal.
                </p>
              </div>
            </div>
          </div>

          <Section title="1. General Information">
            <p>The information provided by JNTUH Results on this website is for general informational purposes only. All information is provided in good faith, however we make no representation or warranty of any kind regarding its accuracy, adequacy, validity, reliability, availability, or completeness.</p>
          </Section>

          <Section title="2. External Links">
            <p>The Site may contain links to other websites. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us.</p>
          </Section>

          <Section title="3. Errors and Omissions">
            <p>While we have made every attempt to ensure the information has been obtained from reliable sources, JNTUH Results is not responsible for any errors or omissions, or for the results obtained from the use of this information.</p>
          </Section>

          <Section title="4. No Affiliation">
            <p>This website is not affiliated with, endorsed by, or sponsored by Jawaharlal Nehru Technological University Hyderabad (JNTUH). The JNTUH logo, university names, and other trademarks are property of their respective owners.</p>
          </Section>

          <Section title="5. Use at Your Own Risk">
            <p>All information on the Site is provided &quot;as is&quot; with no guarantee of completeness, accuracy, timeliness, or of the results obtained from the use of this information. Any reliance on the material on this site is at your own risk.</p>
          </Section>

          <Section title="6. Result Verification">
            <p>Students are strongly advised to verify their examination results from the official JNTUH university portal at <a href="http://results.jntuh.ac.in" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">results.jntuh.ac.in</a>. Always cross-check with the official university records before making any decisions based on the results.</p>
          </Section>

          <Section title="7. Limitation of Liability">
            <p>In no event shall JNTUH Results be liable for any special, direct, indirect, or consequential damages arising out of or in any way connected with your use of this website.</p>
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
