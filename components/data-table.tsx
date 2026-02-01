"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUp, ArrowDown } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTableToolbar } from "./data-table-toolbar";

/* ----- Types ----- */
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
  data: Record<string, AcademicData>;
  semester: string;
};

const METRICS = ["_internal", "_external", "_total", "_grade"];

/* ----- Helper function to abbreviate subject names ----- */
const abbreviateSubjectName = (name: string) => {
  if (!name || typeof name !== "string") return "";

  const ignoreWords = ["FOR", "AND", "OF", "THE"];

  // Split safely → remove empty parts
  const parts = name
    .split(" ")
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  if (parts.length === 0) return "";

  const lastPart = parts[parts.length - 1];

  // Preserve Lab, -I, -II as they are
  if (
    ["LAB", "-I", "-II", "-III"].includes(lastPart) ||
    lastPart.startsWith("-")
  ) {
    const main = parts
      .slice(0, -1)
      .filter((p) => !ignoreWords.includes(p.toUpperCase()))
      .map((p) => p[0].toUpperCase())
      .join("");
    return `${main} ${lastPart}`;
  }

  // For multi-word subjects, take first letter of each word
  if (parts.length > 1) {
    return parts
      .filter((p) => !ignoreWords.includes(p.toUpperCase()))
      .map((p) => p[0].toUpperCase())
      .join("");
  }

  return name.slice(0, 4).toUpperCase(); // single word
};

const DataTable: React.FC<ClassResultTableProps> = ({ data, semester }) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [globalFilter, setGlobalFilter] = React.useState("");

  /* ----- Flatten data & determine subjects ----- */
  const { rows, subjects } = React.useMemo(() => {
    const students = Object.values(data || {});
    const rows: Record<string, any>[] = [];
    let subjectOrder: { code: string; name: string }[] = [];

    for (const s of students) {
      if (s?.Result && Object.keys(s.Result).length > 0) {
        subjectOrder = Object.entries(s.Result).map(([code, sub]) => ({
          code,
          name: sub.name,
        }));
        break;
      }
    }

    for (const student of students) {
      const base: Record<string, any> = {
        rollNo: student.Details?.Roll_No ?? "",
        name: student.Details?.NAME ?? "",
        sgpa: parseFloat(student.SGPA ?? "0"),
      };

      subjectOrder.forEach(({ code }) => {
        const sub = student.Result?.[code];
        base[`${code}_internal`] = sub?.internal ?? "";
        base[`${code}_external`] = sub?.external ?? "";
        base[`${code}_total`] = sub?.total ?? "";
        base[`${code}_grade`] = sub?.grade ?? "";
      });

      rows.push(base);
    }

    return { rows, subjects: subjectOrder };
  }, [data]);

  /* ----- Columns ----- */
  const columns = React.useMemo(() => {
    const cols: ColumnDef<any>[] = [
      {
        accessorKey: "rollNo",
        header: "Roll No",
        cell: ({ row }) => (
          <div className="font-medium ">{row.getValue("rollNo")}</div>
        ),
        enableColumnFilter: true,
        enableSorting: true,
      },
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => <div>{row.getValue("name")}</div>,
        enableColumnFilter: true,
      },
    ];

    subjects.forEach(({ code }) => {
      cols.push(
        {
          accessorKey: `${code}_internal`,
          header: "I",
          cell: ({ row }) => (
            <div className="text-center text-sm">
              {row.getValue(`${code}_internal`)}
            </div>
          ),
        },
        {
          accessorKey: `${code}_external`,
          header: "E",
          cell: ({ row }) => (
            <div className="text-center text-sm">
              {row.getValue(`${code}_external`)}
            </div>
          ),
        },
        {
          accessorKey: `${code}_total`,
          header: "T",
          cell: ({ row }) => (
            <div className="text-center text-sm font-semibold">
              {row.getValue(`${code}_total`)}
            </div>
          ),
          enableSorting: true,
        },
        {
          accessorKey: `${code}_grade`,
          header: "G",
          cell: ({ row }) => (
            <div className="text-center text-sm font-semibold">
              {row.getValue(`${code}_grade`)}
            </div>
          ),
          enableSorting: true,
        }
      );
    });

    cols.push({
      accessorKey: "sgpa",
      header: "SGPA",
      cell: ({ row }) => (
        <div className="text-center font-semibold text-primary">
          {row.getValue("sgpa")}
        </div>
      ),
      enableSorting: true,
    });

    return cols;
  }, [subjects]);

  /* ----- Table instance ----- */
  const table = useReactTable({
    data: rows,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      globalFilter,
    },
  });

  /* ----- Reactive visible columns ----- */
  const visibleColumnSet = React.useMemo(() => {
    return new Set(
      table
        .getAllColumns()
        .filter((c) => c.getIsVisible())
        .map((c) => c.id)
    );
  }, [table.getState().columnVisibility]);

  const getSortIndicator = (columnId: string) => {
    const s = sorting.find((x) => x.id === columnId);
    if (!s) {
      return (
        <div className="w-4 h-4 inline ml-1 text-muted-foreground">
          <ArrowUp className="w-3 h-3 inline" />
          <ArrowDown className="w-3 h-3 inline -ml-2" />
        </div>
      );
    }
    return s.desc ? (
      <ArrowDown className="w-4 h-4 inline ml-1" />
    ) : (
      <ArrowUp className="w-4 h-4 inline ml-1" />
    );
  };

  /* ----- Render ----- */
  return (
    <div className="w-full space-y-4 ">
      {/* ----- Abbreviation legend ----- */}
      <div className="text-xs text-muted-foreground mt-2">
        <strong>Abbreviations:</strong>{" "}
        {subjects.map((s) => (
          <span key={s.code} className="mr-2">
            {abbreviateSubjectName(s.name)} = {s.name},
          </span>
        ))}
      </div>
      <DataTableToolbar
        table={table}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        subjects={subjects}
        semester={semester}
      />

      <div className="rounded-md border border-border overflow-x-auto" id="class-data-table">
        <Table>
          <TableHeader className="bg-muted">
            <TableRow className="border-b-2">
              <TableHead
                colSpan={2}
                className="text-center font-semibold text-xs py-2 px-1 border-r"
              >
                -
              </TableHead>

              {subjects.map((sub) => {
                const span = METRICS.filter((sfx) =>
                  visibleColumnSet.has(`${sub.code}${sfx}`)
                ).length;
                if (span === 0) return null;
                return (
                  <TableHead
                    key={sub.code}
                    colSpan={span}
                    className="text-center font-semibold text-xs py-2 px-1 border-r"
                  >
                    {abbreviateSubjectName(sub.name)}
                  </TableHead>
                );
              })}

              <TableHead className="text-center font-semibold text-xs py-2 px-1">
                -
              </TableHead>
            </TableRow>

            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-muted">
                {headerGroup.headers.map((header) => {
                  const isSortable =
                    header.column.columnDef.enableSorting !== false;
                  return (
                    <TableHead
                      key={header.id}
                      className={`text-center text-xs py-2 px-1 font-semibold select-none ${
                        isSortable
                          ? "hover:cursor-pointer hover:bg-muted/80"
                          : ""
                      }`}
                      onClick={() => {
                        if (isSortable) header.column.toggleSorting();
                      }}
                    >
                      <span className="flex items-center justify-center gap-0">
                        {!header.isPlaceholder &&
                          flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        {isSortable && getSortIndicator(header.column.id)}
                      </span>
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="hover:bg-muted/50 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="text-sm py-2 px-1 text-foreground"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DataTable;
