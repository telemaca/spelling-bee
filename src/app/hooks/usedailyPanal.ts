import { useEffect, useState } from "react";

type Panal = {
  letras: string[];
  central: string;
  fecha: string;
};

const STORAGE_KEY = "panalDelDia";

export function usePanalDelDia() {
  const [panal, setPanal] = useState<Panal | null>(null);

  useEffect(() => {
    const hoy = new Date().toISOString().slice(0, 10);

    // Ver si ya está en localStorage
    const guardado = localStorage.getItem(STORAGE_KEY);
    if (guardado) {
      const parsed = JSON.parse(guardado);
      if (parsed.fecha === hoy) {
        setPanal(parsed);
        return;
      }
    }

    // Si no está o es de otra fecha, fetch
    fetch("/api/panal")
      .then((res) => res.json())
      .then((data: Panal) => {
        setPanal(data);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      });
  }, []);

  return panal;
}
