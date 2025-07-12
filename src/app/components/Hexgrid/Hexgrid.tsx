import { motion } from "framer-motion";

type HexGridProps = {
  letters: string[];
  centerLetter: string;
  isVisible: boolean;
  shuffleVersion: number;
  onClickLetter?: (letter: string) => void;
};

export default function HexGrid({
  letters,
  centerLetter,
  isVisible,
  shuffleVersion,
  onClickLetter,
}: HexGridProps) {
  const getClass = (letter: string) =>
    letter === centerLetter
      ? "bg-yellow-500 text-black font-bold"
      : "bg-gray-700 text-white";

  const grid2 = [
    [letters[0], letters[1], letters[2]],
    [centerLetter],
    [letters[3], letters[4], letters[5]],
  ];

  const getLetterComponent = (letter: string, j: number) => {
    if (letter === centerLetter) {
      return <span>{letter.toUpperCase()}</span>;
    } else {
      if (isVisible) {
        return (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            key={`${letter}-${j}-${shuffleVersion}`}
            transition={{
              duration: 0.6,
            }}
          >
            {letter.toUpperCase()}
          </motion.span>
        );
      }
    }
  };

  return (
    <>
      <div className="flex flex-col gap-0 mb-14 font-bold">
        {grid2.map((row, i) => (
          <div key={i} className="flex justify-center gap-1 hexgrid-row">
            {row.map((letter, j) => (
              <motion.div
                className={`hex-3 hex-3-${i}-${j} w-24 h-24 flex items-center justify-center text-2xl shadow-md cursor-pointer ${getClass(
                  letter
                )}`}
                key={letter + "-" + j}
                onClick={() => onClickLetter?.(letter)}
                whileTap={{ scale: 0.85 }}
                transition={{ duration: 0.2 }}
              >
                {getLetterComponent(letter, j)}
              </motion.div>
            ))}
          </div>
        ))}
      </div>
      {/* <div className="flex flex-col gap-0 mb-14 font-bold">
        {grid.map((row, i) => (
          <div key={i} className="flex justify-center gap-1 hexgrid-row">
            {row.map((letter, j) => (
              <motion.div
                className={`hex-4 w-24 h-24 flex items-center justify-center text-2xl shadow-md cursor-pointer ${getClass(
                  letter
                )}`}
                key={letter + "-" + j}
                onClick={() => onClickLetter?.(letter)}
                whileTap={{ scale: 0.85 }}
                transition={{ duration: 0.2 }}
              >
                {getLetterComponent(letter, j)}
              </motion.div>
            ))}
          </div>
        ))}
      </div> */}
    </>
  );
}
