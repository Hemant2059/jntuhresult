"use server";

import { z } from "zod";

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
      `https://jntuh-api.vercel.app/academic?htno=${validatedHtno}`,
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

    return { success: true, data, error: null };
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
      `https://jntuh-api.vercel.app/sem?htno=${validatedHtno}&sem=${semester}`,
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

    return { success: true, data, error: null };
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
      `https://jntuh-api.vercel.app/classresult?sem=${semester}&start_htno=${validatedStart}&end_htno=${validatedEnd}`,
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

    return { success: true, data, error: null };
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
      `https://jntuh-api.vercel.app/allresult?htno=${validatedHtno}`,
      { cache: 'no-store' },
    );

    if (!response.ok) {
      return {
        success: false,
        data: null,
        error: "Failed to fetch results. Check hall ticket.",
      };
    }

    const data = await response.json();

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
      `https://jntuh-api.vercel.app/specificresult?${params.toString()}`,
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
