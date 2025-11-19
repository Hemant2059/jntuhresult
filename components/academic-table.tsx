"use client";
import branches from "@/lib/branch";
import colleges from "@/lib/college";
import { getGradeColor } from "@/lib/color";

type Details = {
  NAME: string;
  Roll_No: string;
  COLLEGE_CODE: string;
  FATHER_NAME: string;
};

type SubjectData = {
  name: string;
  internal: string;
  external: string;
  total: string;
  grade: string;
  credits: string;
  rcrv: boolean;
};

type SemesterData = {
  Result: Record<string, SubjectData>;
  SGPA: number;
  Failed_Subjects: string[];
  History: any[];
};

type AcademicData = {
  Details: Details;
  Semesters: Record<string, SemesterData>;
  CGPA: number;
};

const AcademicTable = (data: AcademicData) => {
  const { Details, Semesters, CGPA } = data;
  const name = Details.NAME || "Unknown";
  const rollno = Details.Roll_No || "Unknown";
  const collegeCode = Details.COLLEGE_CODE as keyof typeof colleges;
  const collegeName = colleges[collegeCode] || "Unknown";
  const branchKey = rollno.slice(6, 8) as keyof typeof branches;
  const branch = branches[branchKey] || "Unknown";
  return (
    <div className="max-w-4xl mx-auto text-[30%] md:text-[50%] lg:text-[70%] xl:text-[90%]">
      <div className="border-2 rounded-xl p-1">
        {/* Student Info */}
        <div className="mb-2">
          <h1 className="font-bold text-center">{collegeName}</h1>
          <h2 className="font-semibold text-center">{branch}</h2>
        </div>
        <div className="border-2 p-1 rounded-md ">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <h2>Name</h2>
              <h2 className="font-semibold">{name}</h2>
            </div>
            <div>
              <h2>Roll No</h2>
              <h2 className="font-semibold">{rollno}</h2>
            </div>
            <div>
              <h2>Father&apos;s Name</h2>
              <h2 className="font-semibold">{Details.FATHER_NAME}</h2>
            </div>
          </div>
        </div>

        {/* Semesters */}
        {Object.entries(Semesters).map(([semKey, semesterData]) => (
          <div className="border-2 p-1 rounded-xl mt-2" key={semKey}>
            <h1 className="text-center font-semibold border-b-2 py-2 bg-gray-100">
              {semKey.replace("-", " ")} Semester
            </h1>
            <div className="grid grid-cols-9 pr-2 text-center font-semibold gap-1 py-2 border-b-2">
              <div>Code</div>
              <div className="col-span-3">Name</div>
              <div>Internal</div>
              <div>External</div>
              <div>Total</div>
              <div>Grade</div>
              <div>Credits</div>
            </div>

            {Object.entries(semesterData.Result).map(([subCode, sub]) => {
              const isFailed = semesterData.Failed_Subjects.includes(subCode);
              return (
                <div
                  className="grid grid-cols-9 pr-2 text-center gap-1 border-b-2 py-1"
                  key={subCode}
                >
                  <div>{subCode}</div>
                  <div className="col-span-3 text-left">{sub.name}</div>
                  <div>{sub.internal}</div>
                  <div>{sub.external}</div>
                  <div>{sub.total}</div>
                  <div className={getGradeColor(sub.grade, isFailed)}>
                    {sub.grade} {isFailed && "(Failed)"}
                  </div>
                  <div>{sub.credits}</div>
                </div>
              );
            })}

            <div className="flex items-center justify-between font-bold p-2">
              <span>SGPA</span>
              <span className="border-2 p-2 rounded-md">
                {semesterData.SGPA}
              </span>
            </div>
          </div>
        ))}

        {/* CGPA */}
        <div className="border-2 rounded-xl p-1 my-2">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <h2 className="font-bold ">CGPA</h2>
              <h2 className="font-semibold">{CGPA}</h2>
            </div>
            <div>
              <h2 className="font-bold">Backlogs</h2>
              <h2 className="font-semibold">
                {Object.values(Semesters).reduce(
                  (acc, sem) => acc + sem.Failed_Subjects.length,
                  0
                )}
              </h2>
            </div>
            <div>
              <h2 className="font-bold">Credits</h2>
              <h2 className="font-semibold">
                {Object.values(Semesters)
                  .flatMap((sem) =>
                    Object.values(sem.Result).map((sub) => Number(sub.credits))
                  )
                  .reduce((a, b) => a + b, 0)}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicTable;
