import { useEffect, useState } from "react";

import { getLocalDateString } from "@/utils";

type Panal = {
  letras: string;
  central: string;
  date: string;
};

export const usePanalDelDia = (): Panal | null => {
  const [panal, setPanal] = useState<Panal | null>(null);
  const STORAGE_KEY = "panalDelDia";

  useEffect(() => {
    const fetchPanal = async () => {
      const today = getLocalDateString();

      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.date === today) {
            setPanal(parsed);
            return;
          }
        }

        const response = await fetch("/api/panal");
        const data: Panal = await response.json();
        setPanal(data);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch (error) {
        console.error("Error fetching panal:", error);
      }
    };

    fetchPanal();
  }, []);

  return panal;
};
