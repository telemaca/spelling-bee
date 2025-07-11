import { useEffect, useState } from "react";
import { getDailyPanal } from "@/utils/wordFinder";

export function useDailyPanal(dictionary: string[]) {
  const [panal, setPanal] = useState<null | {
    letters: string[];
    centerLetter: string;
    date: string;
    sourceWord: string;
  }>(null);

  useEffect(() => {
    const result = getDailyPanal(dictionary);
    setPanal(result);
  }, [dictionary]);

  return panal;
}
