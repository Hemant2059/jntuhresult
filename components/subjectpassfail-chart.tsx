"use client";

import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

/* ---------- Types ---------- */
type Details = {
  NAME: string;
  Roll_No: string;
};

type SubjectData = {
  name: string;
  internal: string;
  external: string;
  total: string;
  grade: string;
  credits: string;
};

type AcademicData = {
  Details: Details;
  Result: Record<string, SubjectData>;
  SGPA: string;
};

type Props = {
  data: Record<string, AcademicData>;
};

/* ---------- Pass Condition ---------- */
const isPass = (grade: string) => {
  return !["F", "ABSENT", "AB", "N.A", "N/A"].includes(grade.toUpperCase());
};

/* ---------- Chart Colors ---------- */
const COLORS = ["#4ade80", "#f87171"]; // green, red

/* ---------- Component ---------- */
const SubjectPassFailChart: React.FC<Props> = ({ data }) => {
  const { chartData, toppers } = useMemo(() => {
    const students = Object.values(data || {});
    if (students.length === 0) return { chartData: [], toppers: [] };

    const subjectCodes = Object.keys(students[0].Result);

    const subjectStats = subjectCodes.map((code) => {
      let pass = 0,
        fail = 0;

      for (const st of students) {
        const grade = st.Result[code]?.grade;
        if (!grade) continue;
        isPass(grade) ? pass++ : fail++;
      }

      const total = pass + fail;

      return {
        subject: students[0].Result[code].name,
        passPercent: total ? (pass / total) * 100 : 0,
        failPercent: total ? (fail / total) * 100 : 0,
      };
    });

    // Sort toppers by SGPA
    const toppers = [...students]
      .sort((a, b) => parseFloat(b.SGPA) - parseFloat(a.SGPA))
      .slice(0, 3)
      .map((t) => ({
        name: t.Details.NAME,
        rollNo: t.Details.Roll_No,
        sgpa: t.SGPA,
      }));

    return { chartData: subjectStats, toppers };
  }, [data]);

  return (
    <Card className="w-full space-y-6 p-4">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Subject-wise Pass & Fail Percentage
        </CardTitle>
      </CardHeader>

      <CardContent className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* -------- Pie Charts For Each Subject -------- */}
          {chartData.map((item) => (
            <div
              key={item.subject}
              className="bg-muted/30 rounded-xl p-4 shadow-sm"
            >
              <h3 className="text-center font-medium mb-2">{item.subject}</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={[
                      { label: "Pass", value: item.passPercent },
                      { label: "Fail", value: item.failPercent },
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    dataKey="value"
                    nameKey="label"
                  >
                    <Cell fill={COLORS[0]} />
                    <Cell fill={COLORS[1]} />
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>

              <div className="text-center text-sm mt-2">
                <span className="text-green-600 font-medium">
                  Pass: {item.passPercent.toFixed(1)}%
                </span>
                {"  "} |{"  "}
                <span className="text-red-600 font-medium">
                  Fail: {item.failPercent.toFixed(1)}%
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* -------- Top 3 Toppers -------- */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold mb-3">Top 3 Toppers</h2>

          <div className="space-y-3">
            {toppers.map((t, index) => (
              <div
                key={index}
                className="bg-primary/5 rounded-lg p-3 flex items-center justify-between shadow"
              >
                <div>
                  <p className="font-medium">
                    {index + 1}. {t.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Roll No: {t.rollNo}
                  </p>
                </div>
                <div className="text-primary font-bold text-xl">{t.sgpa}</div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubjectPassFailChart;
