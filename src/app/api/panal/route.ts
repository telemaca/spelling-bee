// app/api/panal/route.ts
import { NextResponse } from "next/server";

import { getLocalDateString } from "@/utils";

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
};

export async function GET() {
  const today = getLocalDateString();
  const panal = panales[today] || panales["2025-07-19"];

  return NextResponse.json({ date: today, ...panal });
}
