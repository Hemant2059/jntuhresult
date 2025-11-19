import React from "react";
import SemesterTable from "./semester-table";

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

type ClassResultTableProps = {
  data: Record<string, AcademicData>; // data is object keyed by roll numbers
  semester: string;
};

const ClassResultTable: React.FC<ClassResultTableProps> = ({
  data,
  semester,
}) => {
  if (!data || Object.keys(data).length === 0) return <div>No data found</div>;

  // Convert object to array
  const students = Object.values(data);

  return (
    <div>
      {students.map((d) => (
        <SemesterTable key={d.Details.Roll_No} data={d} semester={semester} />
      ))}
    </div>
  );
};

export default ClassResultTable;
