const ROMAN_MAP: Record<string, string> = {
  I: "1",
  II: "2",
  III: "3",
  IV: "4",
  V: "5",
};

function cleanField(val: string | undefined | null): string | undefined {
  if (!val || val === "N/A") return undefined;
  return val;
}

function extractDegree(title: string): string {
  const t = title.toUpperCase();
  if (t.includes("B.PHARMACY")) return "bpharmacy";
  if (t.includes("B.TECH")) return "btech";
  if (t.includes("M.TECH")) return "mtech";
  if (t.includes("MBA")) return "mba";
  if (t.includes("MCA")) return "mca";
  return "other";
}

function extractSemester(title: string): string | null {
  const m = title.match(/([IV]+)\s+Year\s+([IV]+)\s+Semester/i);
  if (m) {
    const y = ROMAN_MAP[m[1].toUpperCase()];
    const s = ROMAN_MAP[m[2].toUpperCase()];
    if (y && s) return `${y}-${s}`;
  }
  return null;
}

function extractRegulation(title: string): string | null {
  const m = title.match(/\(?(R\d{2,3})\)?/i);
  return m ? m[1].toUpperCase() : null;
}

function extractType(title: string): string {
  const t = title.toUpperCase();
  return t.includes("SUPPLEMENTARY") || t.includes("SUPPLY") ? "supplementary" : "regular";
}

function extractIsRcRv(title: string): boolean {
  const t = title.toUpperCase();
  return t.includes("RC/RV") || t.includes("REVALUATION") || t.includes("RC RV");
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

const MONTHS =
  "(January|February|March|April|May|June|July|August|September|October|November|December)";

function extractExamDate(title: string): string | null {
  const m = title.match(new RegExp(`${MONTHS}\\s*[-–]\\s*(\\d{4})`, "i"));
  if (m) return `${m[1]}-${m[2]}`;
  const m2 = title.match(new RegExp(`${MONTHS}\\s+(\\d{4})`, "i"));
  if (m2) return `${m2[1]}-${m2[2]}`;
  return null;
}

function extractShortTitle(title: string): string {
  return title.replace(/^Results\s+for\s+/i, "");
}

export function parseNotification(notif: { title?: string; [key: string]: any }) {
  const title = notif?.title || "";
  return {
    degree: cleanField(notif?.degree) || extractDegree(title),
    semester: cleanField(notif?.semester) || extractSemester(title) || "",
    regulation: cleanField(notif?.regulation) || extractRegulation(title) || "",
    type: cleanField(notif?.type) || extractType(title),
    is_rcrv: notif?.is_rcrv != null ? notif.is_rcrv : extractIsRcRv(title),
    slug: notif?.slug || generateSlug(title),
    exam_date: cleanField(notif?.exam_date) || extractExamDate(title) || "",
    short_title: cleanField(notif?.short_title) || extractShortTitle(title),
  };
}
