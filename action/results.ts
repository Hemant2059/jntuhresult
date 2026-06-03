"use server";

import { z } from "zod";

// Helper: convert sgpa/cgpa string to number, defaulting to 0
function toGpa(v: any): number {
  const n = parseFloat(v);
  return isNaN(n) ? 0 : n;
}

// Helper: capitalize top-level keys (details→Details, semesters→Semesters, etc.)
function transformAcademicResponse(d: any) {
  if (!d || typeof d !== 'object') return d;
  const semesters: Record<string, any> = {};
  for (const [sem, sd] of Object.entries(d.semesters || {})) {
    semesters[sem] = {
      Result: (sd as any).result,
      SGPA: toGpa((sd as any).sgpa),
      Failed_Subjects: (sd as any).failed_subjects ?? [],
      History: (sd as any).history ?? [],
    };
  }
  return { Details: d.details, Semesters: semesters, CGPA: toGpa(d.cgpa) };
}

function transformSemesterResponse(d: any) {
  if (!d || typeof d !== 'object') return d;
  return { Details: d.details, Result: d.result, SGPA: d.sgpa ?? "", History: d.history ?? [] };
}

function transformAllResultResponse(d: any) {
  if (!d || typeof d !== 'object') return d;
  const results: Record<string, any[]> = {};
  for (const [sem, entries] of Object.entries(d.results || {})) {
    results[sem] = (entries as any[]).map((e: any) => ({
      exam_code: e.exam_code, type: e.type, result_url: e.result_url, Result: e.result,
    }));
  }
  return { Details: d.details, Results: results };
}

function transformClassResultResponse(d: any) {
  if (!d || typeof d !== 'object') return d;
  const out: Record<string, any> = {};
  for (const [rollNo, entry] of Object.entries(d)) {
    out[rollNo] = {
      Details: (entry as any).details,
      Result: (entry as any).result,
      SGPA: (entry as any).sgpa ?? "",
      History: (entry as any).history ?? [],
    };
  }
  return out;
}

function transformSpecificResultResponse(d: any) {
  if (!d || typeof d !== 'object') return d;
  if (d.results) return transformAllResultResponse(d);
  if (d.result) return transformSemesterResponse(d);
  return d;
}

// Zod schemas
const hallticketSchema = z
  .string()
  .transform((val) => val.replace(/\s+/g, ""))
  .refine((val) => val.length === 10, "Hall ticket must be 10 characters");

const semesterSchema = z.string().min(1, "Semester is required");

const classResultSchema = z.object({
  start: z
    .string()
    .transform((val) => val.replace(/\s+/g, ""))
    .refine(
      (val) => val.length === 10,
      "Start hall ticket must be 10 characters",
    ),
  end: z
    .string()
    .transform((val) => val.replace(/\s+/g, ""))
    .refine(
      (val) => val.length === 10,
      "End hall ticket must be 10 characters",
    ),
  semester: z.string().min(1, "Semester is required"),
});

export async function academicResult(prevState: any, formData: FormData) {
  try {
    const hallticket = formData.get("hallticket") as string;

    // Validate hallticket
    const parsed = hallticketSchema.safeParse(hallticket);
    if (!parsed.success) {
      return {
        success: false,
        data: null,
        error: parsed.error.issues[0].message,
      };
    }
    const validatedHtno = parsed.data;

    const response = await fetch(
      `https://jntuh-api.onrender.com/academic?htno=${validatedHtno}`,
      { cache: 'no-store' },
    );

    if (!response.ok) {
      return {
        success: false,
        data: null,
        error: "Failed to fetch result. Check hall ticket.",
      };
    }

    const data = await response.json();

    if (!data || Object.keys(data).length === 0) {
      return {
        success: false,
        data: null,
        error: `No results found for hall ticket: ${hallticket}`,
      };
    }

    return { success: true, data: transformAcademicResponse(data), error: null };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: "Failed to fetch results. Try again later.",
    };
  }
}

export async function semesterResult(prevState: any, formData: FormData) {
  try {
    const hallticket = formData.get("hallticket") as string;
    const semester = formData.get("semester") as string;

    // Validate hallticket and semester
    const parsedHall = hallticketSchema.safeParse(hallticket);
    if (!parsedHall.success)
      return {
        success: false,
        data: null,
        error: parsedHall.error.issues[0].message,
      };

    const validatedHtno = parsedHall.data;

    const parsedSem = semesterSchema.safeParse(semester);
    if (!parsedSem.success)
      return {
        success: false,
        data: null,
        error: parsedSem.error.issues[0].message,
      };

    const response = await fetch(
      `https://jntuh-api.onrender.com/sem?htno=${validatedHtno}&sem=${semester}`,
      { cache: 'no-store' },
    );

    if (!response.ok)
      return {
        success: false,
        data: null,
        error: "Failed to fetch semester results.",
      };

    const data = await response.json();

    if (!data || Object.keys(data).length === 0) {
      return {
        success: false,
        data: null,
        error: `No results found for hall ticket: ${validatedHtno}, Semester: ${semester}`,
      };
    }

    return { success: true, data: transformSemesterResponse(data), error: null };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: "Failed to fetch semester results. Try again later.",
    };
  }
}

export async function classResult(prevState: any, formData: FormData) {
  try {
    const start = formData.get("start") as string;
    const end = formData.get("end") as string;
    const semester = formData.get("semester") as string;

    // Validate class result input
    const parsed = classResultSchema.safeParse({ start, end, semester });
    if (!parsed.success)
      return {
        success: false,
        data: null,
        error: parsed.error.issues[0].message,
      };

    const { start: validatedStart, end: validatedEnd } = parsed.data;

    const response = await fetch(
      `https://jntuh-api.onrender.com/classresult?sem=${semester}&start_htno=${validatedStart}&end_htno=${validatedEnd}`,
      { cache: 'no-store' },
    );

    if (!response.ok)
      return {
        success: false,
        data: null,
        error: "Failed to fetch semester results.",
      };

    const data = await response.json();

    if (!data || Object.keys(data).length === 0) {
      return { success: false, data: null, error: "No results found" };
    }

    return { success: true, data: transformClassResultResponse(data), error: null };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: "Failed to fetch semester results. Try again later.",
    };
  }
}

export async function allResult(prevState: any, formData: FormData) {
  try {
    const hallticket = formData.get("hallticket") as string;

    // Validate hallticket
    const parsed = hallticketSchema.safeParse(hallticket);
    if (!parsed.success) {
      return {
        success: false,
        data: null,
        error: parsed.error.issues[0].message,
      };
    }

    const validatedHtno = parsed.data;

    const response = await fetch(
      `https://jntuh-api.onrender.com/allresult?htno=${validatedHtno}`,
      { cache: 'no-store' },
    );

    if (!response.ok) {
      return {
        success: false,
        data: null,
        error: "Failed to fetch results. Check hall ticket.",
      };
    }

    const data = transformAllResultResponse(await response.json());

    if (!data || !data.Results || Object.keys(data.Results).length === 0) {
      return {
        success: false,
        data: null,
        error: `No results found for hall ticket: ${validatedHtno}`,
      };
    }

    return { success: true, data, error: null };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: "Failed to fetch results. Try again later.",
    };
  }
}

export async function notificationResult(prevState: any, formData: FormData) {
  try {
    const htno = formData.get("htno") as string;
    const degree = formData.get("degree") as string;
    const examCode = formData.get("examCode") as string;
    const etype = formData.get("etype") as string;
    const type = (formData.get("type") as string) || "null";
    const result = (formData.get("result") as string) || "null";
    const grad = (formData.get("grad") as string) || "null";

    // Validate hallticket
    const parsed = hallticketSchema.safeParse(htno);
    if (!parsed.success) {
      return {
        success: false,
        data: null,
        error: parsed.error.issues[0].message,
      };
    }

    const validatedHtno = parsed.data;

    const params = new URLSearchParams();
    params.append("htno", validatedHtno);
    if (degree) params.append("degree", degree);
    if (examCode) params.append("examCode", examCode);
    if (etype) params.append("etype", etype);
    if (type) params.append("type", type);
    if (result) params.append("result", result);
    if (grad) params.append("grad", grad);

    const response = await fetch(
      `https://jntuh-api.onrender.com/specificresult?${params.toString()}`,
      { cache: 'no-store' },
    );

    if (!response.ok) {
      return {
        success: false,
        data: null,
        error: "Failed to fetch result. Check hall ticket.",
      };
    }

    const raw = await response.json();
    const data = transformSpecificResultResponse(raw);

    if (
      !data ||
      Object.keys(data).length === 0 ||
      (data.Results && Object.keys(data.Results).length === 0)
    ) {
      return {
        success: false,
        data: null,
        error: `No results found for hall ticket: ${validatedHtno}`,
      };
    }

    return { success: true, data, error: null };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: "Failed to fetch results. Try again later.",
    };
  }
}

export async function refreshNotifications() {
  try {
    const response = await fetch(
      "https://jntuh-api.onrender.com/notifications?refresh=true",
      { cache: 'no-store' },
    );
    if (!response.ok) throw new Error("Failed to fetch notifications");
    const data = await response.json();
    return { success: true, data, error: null };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: "Failed to refresh notifications. Try again later.",
    };
  }
}

export async function clearCacheAndRetry(htno: string, type: "academic" | "semester" | "allresult" | "specificresult", extraParams?: Record<string, string>) {
  try {
    await fetch("https://jntuh-api.onrender.com/refresh-cache", { cache: 'no-store' });
    
    let url = "";
    switch (type) {
      case "academic":
        url = `https://jntuh-api.onrender.com/academic?htno=${htno}`;
        break;
      case "semester":
        url = `https://jntuh-api.onrender.com/sem?htno=${htno}&sem=${extraParams?.sem || "1-1"}`;
        break;
      case "allresult":
        url = `https://jntuh-api.onrender.com/allresult?htno=${htno}`;
        break;
      case "specificresult":
        const params = new URLSearchParams();
        params.set("htno", htno);
        if (extraParams) {
          Object.entries(extraParams).forEach(([key, value]) => params.set(key, value));
        }
        url = `https://jntuh-api.onrender.com/specificresult?${params.toString()}`;
        break;
    }

    const response = await fetch(url, { cache: 'no-store' });
    if (!response.ok) throw new Error("Failed to fetch results");
    
    const raw = await response.json();
    const fn = type === "academic" ? transformAcademicResponse
      : type === "semester" ? transformSemesterResponse
      : type === "allresult" ? transformAllResultResponse
      : transformSpecificResultResponse;
    return { success: true, data: fn(raw), error: null };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: "Failed to refresh results. Try again later.",
    };
  }
}
