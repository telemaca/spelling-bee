import { NextResponse } from "next/server";

import { getToday } from "@/utils";

const panales: Record<string, { letras: string; central: string }> = {
  "2025-07-19": {
    letras: "ASPIREN",
    central: "A",
  },
  "2025-07-20": {
    letras: "CASINOR",
    central: "S",
  },
  "2025-07-21": {
    letras: "GESTION",
    central: "S",
  },
  "2025-07-22": {
    letras: "GDOBAEN",
    central: "A",
  },
  "2025-07-23": {
    letras: "LTSBREA",
    central: "S",
  },
  "2025-07-24": {
    letras: "TUNCEAI",
    central: "E",
  },
  "2025-07-25": {
    letras: "TINOESG",
    central: "S",
  },
};

export async function GET() {
  const today = getToday();
  const panal = panales[today] || panales["2025-07-19"];

  return NextResponse.json({ date: today, ...panal });
}
