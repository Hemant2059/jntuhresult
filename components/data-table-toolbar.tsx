"use client";

import * as React from "react";
import { Table } from "@tanstack/react-table";
import { ChevronDown, Search, X, Download, Loader2, FileSpreadsheet, FileText } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { downloadAsPDF } from "@/lib/download-pdf";
import { saveAsExcel, saveAsCSV } from "@/lib/export-utils";

interface Subject {
  code: string;
  name: string;
}

interface DataTableToolbarProps {
  table: Table<any>;
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
  subjects: Subject[];
  semester: string;
}

const METRICS = ["Internal", "External", "Total", "Grade"];

export function DataTableToolbar({
  table,
  globalFilter,
  setGlobalFilter,
  subjects,
  semester,
}: DataTableToolbarProps) {
  const [selectedSubjects, setSelectedSubjects] = React.useState<Set<string>>(
    () => new Set(subjects.map((s) => s.code))
  );
  const [isExporting, setIsExporting] = React.useState(false);

  const handleDownloadPDF = async () => {
    setIsExporting(true);
    try {
      await downloadAsPDF("class-data-table", `Class_Result_${semester}`);
    } finally {
      setIsExporting(false);
    }
  };

  const prepareExportData = () => {
    const visibleColumns = table.getVisibleLeafColumns();
    const rows = table.getRowModel().rows;

    // Headers
    const headers = visibleColumns.map((col) => {
      const colId = col.id;
      // Check if it's a subject column
      const match = colId.match(/^(.+)_(internal|external|total|grade)$/);
      if (match) {
        const [_, code, metric] = match;
        const subject = subjects.find((s) => s.code === code);
        const subName = subject ? subject.name : code;
        const metricMap: Record<string, string> = {
          internal: "Internal",
          external: "External",
          total: "Total",
          grade: "Grade",
        };
        return `${subName} - ${metricMap[metric] || metric}`;
      }
      
      if (colId === "rollNo") return "Roll No";
      if (colId === "name") return "Name";
      if (colId === "sgpa") return "SGPA";
      return (col.columnDef.header as string) || colId;
    });

    // Data
    const data = rows.map((row) => {
      return visibleColumns.map((col) => {
        const val = row.getValue(col.id);
        return val === null || val === undefined ? "" : val;
      });
    });

    return [headers, ...data];
  };

  const handleDownloadExcel = () => {
    const data = prepareExportData();
    saveAsExcel(data, `Class_Result_${semester}`);
  };

  const handleDownloadCSV = () => {
    const data = prepareExportData();
    saveAsCSV(data, `Class_Result_${semester}`);
  };

  React.useEffect(() => {
    setSelectedSubjects(new Set(subjects.map((s) => s.code)));
  }, [subjects]);

  const getColumnIdBySubjectMetric = (subjectCode: string, metric: string) => {
    const metricMap: Record<string, string> = {
      Internal: "_internal",
      External: "_external",
      Total: "_total",
      Grade: "_grade",
    };
    return `${subjectCode}${metricMap[metric]}`;
  };

  const isMetricVisibleForSubject = (subjectCode: string, metric: string) => {
    const colId = getColumnIdBySubjectMetric(subjectCode, metric);
    return table.getColumn(colId)?.getIsVisible() ?? false;
  };

  const isMetricFullyVisible = (metric: string) => {
    return subjects
      .filter((s) => selectedSubjects.has(s.code))
      .every((s) => isMetricVisibleForSubject(s.code, metric));
  };

  const toggleMetricAcrossSelectedSubjects = (
    metric: string,
    visible: boolean
  ) => {
    subjects.forEach((s) => {
      if (!selectedSubjects.has(s.code)) return;
      const colId = getColumnIdBySubjectMetric(s.code, metric);
      const col = table.getColumn(colId);
      if (col) col.toggleVisibility(visible);
    });
  };

  const toggleSubjectVisibility = (subjectCode: string, visible: boolean) => {
    const newSet = new Set(selectedSubjects);
    if (visible) newSet.add(subjectCode);
    else newSet.delete(subjectCode);
    setSelectedSubjects(newSet);

    METRICS.forEach((metric) => {
      const colId = getColumnIdBySubjectMetric(subjectCode, metric);
      const col = table.getColumn(colId);
      if (col) col.toggleVisibility(visible);
    });
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4 ">
      <div className="flex flex-1 items-center gap-2">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Filter results..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="pl-9 pr-4 h-10 rounded-xl"
          />
          {globalFilter && (
            <button
              onClick={() => setGlobalFilter("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="h-10 rounded-xl gap-2 border-dashed"
            >
              <Download className="h-4 w-4" />
              Download
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
             <DropdownMenuLabel>Export Options</DropdownMenuLabel>
             <DropdownMenuSeparator />
             <DropdownMenuItem onClick={handleDownloadExcel} className="cursor-pointer">
               <FileSpreadsheet className="mr-2 h-4 w-4 text-green-600" />
               <span>Excel</span>
             </DropdownMenuItem>
             <DropdownMenuItem onClick={handleDownloadCSV} className="cursor-pointer">
               <FileText className="mr-2 h-4 w-4 text-orange-600" />
               <span>CSV</span>
             </DropdownMenuItem>
             <DropdownMenuItem onClick={handleDownloadPDF} disabled={isExporting} className="cursor-pointer">
               {isExporting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FileText className="mr-2 h-4 w-4 text-red-600" />}
               <span>PDF</span>
             </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Columns Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-10 rounded-xl gap-2">
              <ChevronDown className="h-4 w-4" />
              Display
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-64" forceMount>
            {/* Roll No & Name */}
            {["rollNo", "name"].map((colKey) => (
              <DropdownMenuCheckboxItem
                key={colKey}
                checked={table.getColumn(colKey)?.getIsVisible() ?? false}
                onCheckedChange={(v) =>
                  table.getColumn(colKey)?.toggleVisibility(!!v)
                }
                onPointerDown={(e) => e.preventDefault()} // keep dropdown open
              >
                {colKey === "rollNo" ? "Roll No" : "Name"}
              </DropdownMenuCheckboxItem>
            ))}

            <DropdownMenuSeparator />

            {/* Subjects */}
            <DropdownMenuLabel className="text-sm font-semibold px-2 py-1.5 text-blue-600">
              Select Subjects
            </DropdownMenuLabel>
            {subjects.map((s) => (
              <DropdownMenuCheckboxItem
                key={s.code}
                checked={selectedSubjects.has(s.code)}
                onCheckedChange={(v) => toggleSubjectVisibility(s.code, !!v)}
                onPointerDown={(e) => e.preventDefault()} // prevent close
              >
                {s.name}
              </DropdownMenuCheckboxItem>
            ))}

            <DropdownMenuSeparator />

            {/* Metrics */}
            <DropdownMenuLabel className="text-sm font-semibold px-2 py-1.5 text-indigo-600">
              Metrics
            </DropdownMenuLabel>
            {METRICS.map((metric) => (
              <DropdownMenuCheckboxItem
                key={metric}
                checked={isMetricFullyVisible(metric)}
                onCheckedChange={(v) =>
                  toggleMetricAcrossSelectedSubjects(metric, !!v)
                }
                onPointerDown={(e) => e.preventDefault()} // prevent close
              >
                {metric}
              </DropdownMenuCheckboxItem>
            ))}

            <DropdownMenuSeparator />

            {/* SGPA */}
            <DropdownMenuCheckboxItem
              checked={table.getColumn("sgpa")?.getIsVisible() ?? false}
              onCheckedChange={(v) =>
                table.getColumn("sgpa")?.toggleVisibility(!!v)
              }
              onPointerDown={(e) => e.preventDefault()} // prevent close
            >
              Show SGPA
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
