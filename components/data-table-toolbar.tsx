"use client";

import * as React from "react";
import { Table } from "@tanstack/react-table";
import { ChevronDown, Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

interface Subject {
  code: string;
  name: string;
}

interface DataTableToolbarProps {
  table: Table<any>;
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
  subjects: Subject[];
}

const METRICS = ["Internal", "External", "Total", "Grade"];

export function DataTableToolbar({
  table,
  globalFilter,
  setGlobalFilter,
  subjects,
}: DataTableToolbarProps) {
  const [selectedSubjects, setSelectedSubjects] = React.useState<Set<string>>(
    () => new Set(subjects.map((s) => s.code))
  );

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
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Search */}
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
        <Input
          placeholder="Search by roll no or name..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="pl-9 pr-4"
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

      {/* Columns Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2">
            <ChevronDown className="h-4 w-4" />
            Columns
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
          <DropdownMenuLabel className="text-sm font-semibold px-2 py-1.5">
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
          <DropdownMenuLabel className="text-sm font-semibold px-2 py-1.5">
            Metrics (for selected subjects)
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
            SGPA
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
