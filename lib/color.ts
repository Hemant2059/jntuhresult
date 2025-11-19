export const getGradeColor = (grade: string, isFailed: boolean = false) => {
  if (isFailed) return "text-rose-600 font-bold";
  switch (grade) {
    case "O":
      return "text-emerald-700 font-bold";
    case "A":
      return "text-emerald-500 font-bold";
    case "B":
      return "text-indigo-500 font-bold";
    case "C":
      return "text-amber-400 font-bold";
    case "D":
      return "text-orange-500 font-bold";
    case "F":
      return "text-rose-600 font-bold";
    default:
      return "text-gray-400 font-bold";
  }
};
