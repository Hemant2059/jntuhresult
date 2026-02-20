export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-4xl rounded-xl bg-white p-6 shadow-md md:p-10">
        <h1 className="mb-6 text-3xl font-bold text-gray-900">
          About Us
        </h1>

        <p className="mb-4 text-gray-700 leading-relaxed">
          Welcome to <span className="font-semibold">JNTUH Results</span>, a
          dedicated platform designed to help students easily access
          Jawaharlal Nehru Technological University Hyderabad (JNTUH)
          examination results.
        </p>

        <p className="mb-4 text-gray-700 leading-relaxed">
          Our goal is to provide a fast, simple, and user-friendly experience
          for students who want to check their results without unnecessary
          confusion or delays.
        </p>

        <h2 className="mt-8 mb-3 text-xl font-semibold text-gray-900">
          What We Do
        </h2>

        <ul className="mb-6 list-disc pl-6 text-gray-700">
          <li>Display JNTUH examination results in a clear format</li>
          <li>Provide result updates for various semesters and regulations</li>
          <li>Help students quickly find academic result information</li>
        </ul>

        <h2 className="mt-8 mb-3 text-xl font-semibold text-gray-900">
          About JNTUH
        </h2>

        <p className="mb-4 text-gray-700 leading-relaxed">
          Jawaharlal Nehru Technological University Hyderabad (JNTUH) is one of 
          India's leading technical universities, established in 1972. The university 
          offers undergraduate and postgraduate programs in various disciplines 
          including Engineering, Pharmacy, Management, and Computer Applications.
        </p>

        <p className="mb-4 text-gray-700 leading-relaxed">
          JNTUH conducts examinations twice a year for B.Tech, B.Pharmacy, 
          M.Tech, M.Pharmacy, MBA, MCA, and other programs across its 
          affiliated colleges in Hyderabad and Telangana region.
        </p>

        <h2 className="mt-8 mb-3 text-xl font-semibold text-gray-900">
          JNTUH Grading System (R22)
        </h2>

        <p className="mb-4 text-gray-700 leading-relaxed">
          JNTUH follows a 10-point grading system for both B.Tech and B.Pharmacy 
          programs under R22 regulations. Students are awarded grades based on their 
          performance in examinations. The Grade Points help calculate the Semester 
          Grade Point Average (SGPA) and Cumulative Grade Point Average (CGPA).
        </p>

        <h3 className="mt-6 mb-3 text-lg font-semibold text-gray-900">
          B.Tech R22 Grading System
        </h3>

        <div className="mb-6 overflow-x-auto">
          <table className="min-w-full border border-gray-200 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left font-semibold border-b">Grade</th>
                <th className="px-4 py-2 text-left font-semibold border-b">Points</th>
                <th className="px-4 py-2 text-left font-semibold border-b">Marks Range</th>
                <th className="px-4 py-2 text-left font-semibold border-b">Description</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr className="border-b">
                <td className="px-4 py-2 font-medium">O</td>
                <td className="px-4 py-2">10</td>
                <td className="px-4 py-2">≥ 90%</td>
                <td className="px-4 py-2">Outstanding</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 font-medium">A+</td>
                <td className="px-4 py-2">9</td>
                <td className="px-4 py-2">80% - 89.99%</td>
                <td className="px-4 py-2">Excellent</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 font-medium">A</td>
                <td className="px-4 py-2">8</td>
                <td className="px-4 py-2">70% - 79.99%</td>
                <td className="px-4 py-2">Very Good</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 font-medium">B+</td>
                <td className="px-4 py-2">7</td>
                <td className="px-4 py-2">60% - 69.99%</td>
                <td className="px-4 py-2">Good</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 font-medium">B</td>
                <td className="px-4 py-2">6</td>
                <td className="px-4 py-2">50% - 59.99%</td>
                <td className="px-4 py-2">Average</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 font-medium">C</td>
                <td className="px-4 py-2">5</td>
                <td className="px-4 py-2">40% - 49.99%</td>
                <td className="px-4 py-2">Pass</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium">F</td>
                <td className="px-4 py-2">0</td>
                <td className="px-4 py-2">&lt; 40%</td>
                <td className="px-4 py-2">Fail</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mb-4 text-gray-700 leading-relaxed">
          <strong>B.Tech R22 Passing Criteria:</strong> Minimum 35% in CIE (Continuous 
          Internal Evaluation), 35% in SEE (Semester End Examination), and 40% overall 
          (both CIE + SEE combined). Students must secure SGPA ≥ 5.0 in each semester 
          and CGPA ≥ 5.0 to complete the program.
        </p>

        <h3 className="mt-6 mb-3 text-lg font-semibold text-gray-900">
          B.Pharmacy R22 Grading System (as per UGC/PCI Guidelines)
        </h3>

        <div className="mb-6 overflow-x-auto">
          <table className="min-w-full border border-gray-200 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left font-semibold border-b">% of Marks Secured</th>
                <th className="px-4 py-2 text-left font-semibold border-b">Letter Grade</th>
                <th className="px-4 py-2 text-left font-semibold border-b">Grade Points</th>
                <th className="px-4 py-2 text-left font-semibold border-b">Description</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr className="border-b">
                <td className="px-4 py-2">≥ 90%</td>
                <td className="px-4 py-2 font-medium">O</td>
                <td className="px-4 py-2">10</td>
                <td className="px-4 py-2">Outstanding</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2">80% - 89.99%</td>
                <td className="px-4 py-2 font-medium">A+</td>
                <td className="px-4 py-2">9</td>
                <td className="px-4 py-2">Excellent</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2">70% - 79.99%</td>
                <td className="px-4 py-2 font-medium">A</td>
                <td className="px-4 py-2">9</td>
                <td className="px-4 py-2">Excellent</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2">60% - 69.99%</td>
                <td className="px-4 py-2 font-medium">B</td>
                <td className="px-4 py-2">8</td>
                <td className="px-4 py-2">Good</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2">50% - 59.99%</td>
                <td className="px-4 py-2 font-medium">C</td>
                <td className="px-4 py-2">7</td>
                <td className="px-4 py-2">Fair</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2">Below 50%</td>
                <td className="px-4 py-2 font-medium">D</td>
                <td className="px-4 py-2">6</td>
                <td className="px-4 py-2">Average</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2">-</td>
                <td className="px-4 py-2 font-medium">F</td>
                <td className="px-4 py-2">0</td>
                <td className="px-4 py-2">Fail</td>
              </tr>
              <tr>
                <td className="px-4 py-2">Absent</td>
                <td className="px-4 py-2 font-medium">Ab</td>
                <td className="px-4 py-2">0</td>
                <td className="px-4 py-2">Absent</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mb-4 text-gray-700 leading-relaxed">
          <strong>B.Pharmacy R22 Passing Criteria:</strong> The student passes the 
          subject/course only when Grade Point (GP) ≥ 6 ('D' grade or above). 
          Students must earn 209 credits with SGPA ≥ 6.0 in each semester and 
          CGPA ≥ 6.0 to complete the B.Pharmacy program.
        </p>

        <h4 className="mt-4 mb-2 text-md font-semibold text-gray-900">
          SGPA & CGPA Calculation Formula
        </h4>

        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <p className="mb-2 text-gray-700">
            <strong>SGPA =</strong> (Σ Credit Points) / (Total Credits) for the semester
          </p>
          <p className="mb-2 text-gray-700">
            <strong>CGPA =</strong> (Σ Credit Points from all semesters) / (Total Credits from all semesters)
          </p>
          <p className="text-sm text-gray-600">
            Credit Points (CP) = Grade Point (GP) × Credits for that course
          </p>
        </div>

        <h4 className="mt-4 mb-2 text-md font-semibold text-gray-900">
          Important Notes
        </h4>

        <ul className="mb-4 list-disc pl-6 text-gray-700 space-y-1">
          <li>A student obtaining 'F' grade in any subject shall be deemed to have 'failed' and is required to reappear as a 'supplementary student'.</li>
          <li>A student who has not appeared for examination in any subject, 'Ab' grade will be allocated.</li>
          <li>A letter grade indicates only the range of percentage of marks, not specific marks.</li>
          <li>For merit ranking, only the 'rounded off' values of CGPAs will be used.</li>
          <li>Performance in failed subjects will be taken into account for SGPA and CGPA calculations.</li>
        </ul>

        <h2 className="mt-8 mb-3 text-xl font-semibold text-gray-900">
          Understanding Your Results
        </h2>

        <p className="mb-4 text-gray-700 leading-relaxed">
          When you check your JNTUH results, you will see various details including 
          your hall ticket number, name, semester, subjects appeared, marks obtained 
          in each subject, grades, SGPA for that semester, and your cumulative CGPA.
        </p>

        <p className="mb-4 text-gray-700 leading-relaxed">
          <strong>SGPA (Semester Grade Point Average):</strong> This is the weighted 
          average of grade points obtained in all subjects during a particular semester. 
          It indicates your performance for that specific semester.
        </p>

        <p className="mb-4 text-gray-700 leading-relaxed">
          <strong>CGPA (Cumulative Grade Point Average):</strong> This is the cumulative 
          average of grade points obtained in all semesters till date. It reflects your 
          overall academic performance throughout your course.
        </p>

        <h2 className="mt-8 mb-3 text-xl font-semibold text-gray-900">
          Types of JNTUH Examinations
        </h2>

        <ul className="mb-6 list-disc pl-6 text-gray-700 space-y-2">
          <li><strong>Regular Examinations:</strong> Conducted at the end of each semester for students in their normal course duration.</li>
          <li><strong>Supplementary/Improvement Examinations:</strong> Offered for students who wish to improve their grades in subjects they have already passed or to clear backlogs.</li>
          <li><strong>Mid-Term Examinations:</strong> Conducted internally during the semester by affiliated colleges.</li>
          <li><strong>Lab Examinations:</strong> Practical examinations conducted separately for laboratory courses.</li>
        </ul>

        <h2 className="mt-8 mb-3 text-xl font-semibold text-gray-900">
          JNTUH Academic Regulations
        </h2>

        <p className="mb-4 text-gray-700 leading-relaxed">
          JNTUH follows different academic regulations for various programs. 
          The common regulations include R18 (2018), R22 (2022) for B.Tech, 
          and corresponding regulations for other courses. Each regulation 
          has specific credit requirements, grading procedures, and pass criteria.
        </p>

        <p className="mb-4 text-gray-700 leading-relaxed">
          Students must earn a minimum required credits and maintain a satisfactory 
          CGPA to successfully complete their program. The university also has 
          provisions for credit transfer, bridge courses, and academic probation 
          for students who need additional support.
        </p>

        <h2 className="mt-8 mb-3 text-xl font-semibold text-gray-900">
          How to Check Your Results
        </h2>

        <ol className="mb-6 list-decimal pl-6 text-gray-700 space-y-2">
          <li>Visit the JNTUH Results portal on our website</li>
          <li>Select the type of result you want to check (Academic, Semester, All Results, etc.)</li>
          <li>Enter your 10-digit hall ticket number</li>
          <li>For semester results, select the appropriate semester</li>
          <li>Click on the Search or Submit button</li>
          <li>View your results and download them for future reference</li>
        </ol>

        <h2 className="mt-8 mb-3 text-xl font-semibold text-gray-900">
          Important Notes
        </h2>

        <ul className="mb-6 list-disc pl-6 text-gray-700 space-y-2">
          <li>Always verify your results with the official JNTUH results portal</li>
          <li>Keep printed or digital copies of your mark sheets for future use</li>
          <li>In case of discrepancies, contact your college examination cell immediately</li>
          <li>Results are typically published 2-3 weeks after the completion of examinations</li>
          <li>Supplementary results are usually announced within a month after the regular results</li>
        </ul>

        <h2 className="mt-8 mb-3 text-xl font-semibold text-gray-900">
          Disclaimer
        </h2>

        <p className="mb-4 text-gray-700 leading-relaxed">
          <span className="font-semibold">JNTUH Results</span> is an
          independent website and is <span className="font-semibold">not affiliated</span> with
          JNTUH or any official university authority.
        </p>

        <p className="mb-4 text-gray-700 leading-relaxed">
          All information available on this website is collected from publicly
          available official sources and is provided strictly for
          informational purposes only.
        </p>

        <p className="mb-6 text-gray-700 leading-relaxed">
          Students are advised to verify their results from the official JNTUH
          website or through official university notifications.
        </p>

        <h2 className="mt-8 mb-3 text-xl font-semibold text-gray-900">
          Our Commitment
        </h2>

        <ul className="mb-6 list-disc pl-6 text-gray-700">
          <li>Maintain accuracy and transparency</li>
          <li>Provide a clean and accessible user interface</li>
          <li>Respect user privacy and data</li>
        </ul>

        <p className="mb-6 text-gray-700 leading-relaxed">
          We do not require users to create accounts or submit personal
          information to access results.
        </p>

        <h2 className="mt-8 mb-3 text-xl font-semibold text-gray-900">
          Contact Us
        </h2>

        <p className="text-gray-700">
          If you have any questions, suggestions, or notice any incorrect
          information, please contact us at:
        </p>

        <p className="mt-2 font-medium text-gray-900">
          Email: <span className="text-blue-600">hp2059712@gmail.com</span>
        </p>
      </div>
    </main>
  );
}
