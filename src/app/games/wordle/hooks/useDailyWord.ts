import { useEffect, useState } from "react";

import { getToday } from "@/utils";

import { Word } from "@/types";

export const useDailyWordle = (): Word | null => {
  const [wordle, setWordle] = useState<Word | null>(null);
  const STORAGE_KEY = "wordleDelDia";

  useEffect(() => {
    const fetchWordle = async () => {
      const today = getToday();

      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.date === today) {
            setWordle(parsed);
            return;
          }
        }

        const response = await fetch("/api/wordle");
        const data: Word = await response.json();
        setWordle(data);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch (error) {
        console.error("Error fetching wordle:", error);
      }
    };

    fetchWordle();
  }, []);

  return wordle;
};
