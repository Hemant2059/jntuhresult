"use server";

import { revalidateTag } from "next/cache";
import { z } from "zod";

// Zod schemas
const hallticketSchema = z
  .string()
  .length(10, "Hall ticket must be 10 characters");
const semesterSchema = z.string().min(1, "Semester is required");

const classResultSchema = z.object({
  start: z.string().length(10, "Start hall ticket must be 10 characters"),
  end: z.string().length(10, "End hall ticket must be 10 characters"),
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

    const tag = `result-${hallticket}`;

    const response = await fetch(
      `https://jntuh-api.vercel.app/academic?htno=${hallticket}`,
      { next: { tags: [tag], revalidate: 3600 } },
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
      revalidateTag(tag, "default");
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

    const parsedSem = semesterSchema.safeParse(semester);
    if (!parsedSem.success)
      return {
        success: false,
        data: null,
        error: parsedSem.error.issues[0].message,
      };

    const tag = `result-${hallticket}-sem-${semester}`;

    const response = await fetch(
      `https://jntuh-api.vercel.app/sem?htno=${hallticket}&sem=${semester}`,
      { next: { tags: [tag], revalidate: 3600 } },
    );

    if (!response.ok)
      return {
        success: false,
        data: null,
        error: "Failed to fetch semester results.",
      };

    const data = await response.json();

    if (!data || Object.keys(data).length === 0) {
      revalidateTag(tag, "default");
      return {
        success: false,
        data: null,
        error: `No results found for hall ticket: ${hallticket}, Semester: ${semester}`,
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

    const tag = `result-${start}-${end}-sem-${semester}`;

    const response = await fetch(
      `https://jntuh-api.vercel.app/classresult?sem=${semester}&start_htno=${start}&end_htno=${end}`,
      { next: { tags: [tag], revalidate: 3600 } },
    );

    if (!response.ok)
      return {
        success: false,
        data: null,
        error: "Failed to fetch semester results.",
      };

    const data = await response.json();

    if (!data || Object.keys(data).length === 0) {
      revalidateTag(tag, "default");
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

    const tag = `all-results-${hallticket}`;

    const response = await fetch(
      `https://jntuh-api.vercel.app/allresult?htno=${hallticket}`,
      { next: { tags: [tag], revalidate: 3600 } },
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
      revalidateTag(tag, "default");
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
