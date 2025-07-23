import { NextResponse } from "next/server";

import { getLocalDateString } from "@/utils";

const wordles: Record<string, { word: string }> = {
  "2025-07-19": {
    word: "PIARA",
  },
  "2025-07-20": {
    word: "PRADO",
  },
  "2025-07-21": {
    word: "AUDIO",
  },
  "2025-07-22": {
    word: "GESTO",
  },
  "2025-07-23": {
    word: "GESTO",
  },
  "2025-07-24": {
    word: "PARAR",
  },
  "2025-07-25": {
    word: "MANIA",
  },
};

export async function GET() {
  const today = getLocalDateString();
  const wordle = wordles[today] || wordles["2025-07-19"];

  return NextResponse.json({ date: today, ...wordle });
}
