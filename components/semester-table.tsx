import branches from "@/lib/branch";
import colleges from "@/lib/college";
import { getGradeColor } from "@/lib/color";
import React from "react";

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

type AcademicData = {
  Details: Details;
  Result: Record<string, SubjectData>;
  SGPA: string;
  History: any[];
};

const SemesterTable = ({
  data,
  semester,
}: {
  data: AcademicData;
  semester: string;
}) => {
  const { Details, Result, SGPA } = data;
  const name = Details.NAME;
  const rollno = Details.Roll_No;
  const collegeCode = Details.COLLEGE_CODE as keyof typeof colleges;
  const collegeName = colleges[collegeCode];
  const branchKey = rollno.slice(6, 8) as keyof typeof branches;
  const branch = branches[branchKey];
  const failedSubjects = Object.entries(data.Result)
    .filter(([_, sub]) => sub.grade === "F")
    .map(([subCode, _]) => subCode);
  return (
    name && (
      <div className="max-w-4xl mx-auto p-2 text-[30%] md:text-[50%] lg:text-[70%] xl:text-[90%]">
        <div className="border-2 rounded-xl p-1">
          {/* Student Info */}
          <div className="mb-2 text-center">
            <h1 className="font-bold">{collegeName}</h1>
            <h2 className="font-semibold">{branch}</h2>
          </div>
          <div className="border-2 p-1 rounded-md mb-2">
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
                <h2>Father's Name</h2>
                <h2 className="font-semibold">{Details.FATHER_NAME}</h2>
              </div>
            </div>
          </div>

          {/* Semester Result */}
          <div className="border-2 p-1 rounded-xl mt-2">
            <h1 className="text-center font-semibold border-b-2 py-2 bg-gray-100">
              {semester} Semester
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

            {Object.entries(Result).map(([subCode, sub]) => {
              const isFailed = failedSubjects.includes(subCode);
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
              <span className="border-2 p-2 rounded-md">{SGPA}</span>
            </div>
          </div>

          {/* Summary */}
          <div className="border-2 rounded-xl p-1 my-2">
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <h2 className="font-bold ">Backlogs</h2>
                <h2 className="font-semibold">{failedSubjects.length}</h2>
              </div>
              <div>
                <h2 className="font-bold">Credits</h2>
                <h2 className="font-semibold">
                  {Object.values(data.Result)
                    .map((sub) => Number(sub.credits))
                    .reduce((a, b) => a + b, 0)}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default SemesterTable;
