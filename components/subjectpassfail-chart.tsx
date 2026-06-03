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
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { downloadAsPDF } from "@/lib/download-pdf";

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
      .sort((a, b) => (parseFloat(b.SGPA) || 0) - (parseFloat(a.SGPA) || 0))
      .slice(0, 3)
      .map((t) => ({
        name: t.Details.NAME,
        rollNo: t.Details.Roll_No,
        sgpa: t.SGPA,
      }));

    return { chartData: subjectStats, toppers };
  }, [data]);

  const [isExporting, setIsExporting] = React.useState(false);

  const handleDownload = async () => {
    setIsExporting(true);
    try {
      await downloadAsPDF("class-chart-analysis", "Class_Performance_Analysis");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Card className="w-full space-y-6 p-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
        <CardTitle className="text-xl font-bold text-gray-900">
          Performance Analysis
        </CardTitle>
        <Button
          onClick={handleDownload}
          disabled={isExporting}
          variant="outline"
          size="sm"
          className="rounded-xl gap-2 border-dashed"
        >
          {isExporting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Download className="h-4 w-4" />
          )}
          {isExporting ? "Generating..." : "Download as PDF"}
        </Button>
      </CardHeader>

      <CardContent className="w-full" id="class-chart-analysis">
        <div className="mb-8 p-4 bg-gray-50 rounded-2xl border border-gray-100">
          <p className="text-sm text-gray-500 font-medium text-center">Subject-wise Pass & Fail Distribution</p>
        </div>
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
        <div className="mt-12">
          <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-yellow-400" />
            Class Toppers
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {toppers.map((t, index) => (
              <div
                key={index}
                className="relative bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                {index === 0 && (
                  <div className="absolute -top-3 -right-3 bg-yellow-400 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">
                    RANK 1
                  </div>
                )}
                <div className="text-center">
                  <p className="font-bold text-gray-900 truncate mb-1">
                    {t.name}
                  </p>
                  <p className="text-xs text-gray-500 mb-4">
                    {t.rollNo}
                  </p>
                  <div className={`inline-flex items-center justify-center h-12 w-20 rounded-xl font-bold text-xl ${
                    index === 0 ? "bg-yellow-50 text-yellow-700" : "bg-blue-50 text-blue-700"
                  }`}>
                    {t.sgpa}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubjectPassFailChart;
