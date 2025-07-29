import { NextResponse } from "next/server";

import { getLocalDateString } from "@/utils";

const wordles: Record<string, { word: string }> = {
  "2025-07-19": {
    word: "PIARA",
  },
  "2025-07-29": {
    word: "PRADO",
  },
  "2025-07-30": {
    word: "AUDIO",
  },
  "2025-07-31": {
    word: "GESTO",
  },
  "2025-08-01": {
    word: "GESTO",
  },
  "2025-08-02": {
    word: "PARAR",
  },
  "2025-08-03": {
    word: "MANIA",
  },
};

export async function GET() {
  const today = getLocalDateString();
  const wordle = wordles[today] || wordles["2025-07-19"];

  return NextResponse.json({ date: today, ...wordle });
}
