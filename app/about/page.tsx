import { GraduationCap, Info } from "lucide-react";

export const metadata = {
  title: "About Us",
  description:
    "Learn about JNTUH Results - a fast, accurate platform for JNTUH B.Tech and B.Pharmacy students to check their academic results.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] dark:bg-gray-950">
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-6 py-14 sm:py-20">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600">
              <Info className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">About Us</h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Learn more about JNTUH Results</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-8 sm:p-12 shadow-sm space-y-8">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
            Welcome to <strong>JNTUH Results</strong>, a dedicated platform designed to help students easily access Jawaharlal
            Nehru Technological University Hyderabad (JNTUH) examination results.
          </p>

          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Our goal is to provide a fast, simple, and user-friendly experience for students who want to check their results
            without unnecessary confusion or delays.
          </p>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">What We Do</h2>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-blue-600 shrink-0" />
                Display JNTUH examination results in a clear format
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-blue-600 shrink-0" />
                Provide result updates for various semesters and regulations
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-blue-600 shrink-0" />
                Help students quickly find academic result information
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Our Commitment</h2>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-blue-600 shrink-0" />
                Maintain accuracy and transparency
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-blue-600 shrink-0" />
                Provide a clean and accessible user interface
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-blue-600 shrink-0" />
                Respect user privacy and data
              </li>
            </ul>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 border border-blue-100 dark:border-blue-800">
            <div className="flex items-start gap-4">
              <GraduationCap className="h-6 w-6 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">Not Affiliated with JNTUH</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  JNTUH Results is an independent platform and is not affiliated with JNTUH or any official university authority.
                  All information is collected from publicly available sources.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
