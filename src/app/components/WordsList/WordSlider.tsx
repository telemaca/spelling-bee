import { useState, useEffect } from "react";
import { motion, PanInfo } from "framer-motion";
import { isPangram } from "@/utils";
import { usePanalDelDia } from "@/app/hooks/usedailyPanal";

type WordSliderProps = {
  columns: string[][];
  columnsPerPage?: number;
};

const WordSlider = ({ columns, columnsPerPage = 2 }: WordSliderProps) => {
  const panal = usePanalDelDia();

  const [page, setPage] = useState(0);
  const [centerLetter, setCenterLetter] = useState("");
  const [letterArray, setLetterArray] = useState([""]);

  useEffect(() => {
    if (panal) {
      const central = panal.central.toLowerCase();
      const arr = panal.letras.toLowerCase().split("");

      setCenterLetter(central);
      setLetterArray(arr);
    }
  }, [panal]);

  const totalPages = Math.ceil(columns.length / columnsPerPage);

  const paginate = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const threshold = 50; // mínimo desplazamiento en px
    if (info.offset.x < -threshold) paginate(page + 1); // swipe izquierda
    if (info.offset.x > threshold) paginate(page - 1); // swipe derecha
  };

  const start = page * columnsPerPage;
  const visibleColumns = columns.slice(start, start + columnsPerPage);
  const arr = Array.from({ length: totalPages }, (_, i) => i);

  const getWordClassName = (word: string) => {
    const pangram = isPangram(word, letterArray, centerLetter);
    if (pangram) {
      return `text-sm found-word font-bold`;
    }
    return "text-sm found-word";
  };

  return (
    <div className="relative w-full max-w-full slider-container">
      <motion.div
        className={`flex gap-4 items-start ${
          visibleColumns.length === 1 ? "justify-start" : "justify-center"
        }`}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
      >
        {visibleColumns.map((column, i) => (
          <ul key={i} className="flex flex-col min-w-[120px] gap-1">
            {column.map((word, j) => (
              <li key={j} className={getWordClassName(word)}>
                {word}
              </li>
            ))}
          </ul>
        ))}
      </motion.div>
      {totalPages > 1 && (
        <div className="flex gap-3 justify-center">
          {arr.map((p, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full paginator ${
                i === page ? "current-page" : ""
              }`}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WordSlider;
