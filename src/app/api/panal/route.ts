// app/api/panal/route.ts
import { NextResponse } from "next/server";

const panales: Record<string, { letras: string[]; central: string }> = {
  "2025-07-19": {
    letras: ["G", "A", "T", "O", "L", "E", "S"],
    central: "A",
  },
  "2025-07-20": {
    letras: ["C", "A", "S", "I", "N", "O", "R"],
    central: "S",
  },
};

export async function GET() {
  const hoy = new Date().toISOString().slice(0, 10);
  const panal = panales[hoy] || panales["2025-07-19"];

  return NextResponse.json({ fecha: hoy, ...panal });
}
