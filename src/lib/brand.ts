export const brand = {
  navy: "#1a3568",
  navyDark: "#142a54",
  yellow: "#f5c518",
  yellowHover: "#e0b010",
  grayCard: "#eef1f6",
  grayText: "#5c6470",
} as const;

export const teacherColors: Record<string, { bg: string; text: string }> = {
  viktor: { bg: "#7b2cbf", text: "#ffffff" },
  pablo: { bg: "#2563eb", text: "#ffffff" },
  fabrizio: { bg: "#dc2626", text: "#ffffff" },
  sylvina: { bg: "#22d3ee", text: "#0f172a" },
  sergio: { bg: "#f59e0b", text: "#0f172a" },
};

export const timeSlots = ["19:30 a 21:00", "21:10 a 22:40"] as const;
