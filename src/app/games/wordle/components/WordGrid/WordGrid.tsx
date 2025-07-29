import { useWordleContext } from "../../context/useWordleContext";
import { EvaluatedLetter } from "../../types";
import { getBgColor } from "../../utils";
import { MAX_ATTEMPTS, WORD_LENGTH } from "@/app/constants/constants";

export const WordGrid = () => {
  const { currentGuess, evaluatedGuesses } = useWordleContext();

  const shouldShowCurrentGuess = evaluatedGuesses.length < MAX_ATTEMPTS;

  const rows: EvaluatedLetter[][] = [
    ...evaluatedGuesses,
    ...(shouldShowCurrentGuess
      ? [
          currentGuess
            .padEnd(WORD_LENGTH)
            .split("")
            .map((letter) => ({ letter, status: "empty" as const })),
        ]
      : []),
    ...Array(
      Math.max(
        0,
        MAX_ATTEMPTS -
          evaluatedGuesses.length -
          (shouldShowCurrentGuess ? 1 : 0)
      )
    )
      .fill(null)
      .map(() =>
        Array(WORD_LENGTH).fill({ letter: "", status: "empty" as const })
      ),
  ];

  return (
    <div className="grid grid-rows-6 gap-2">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-5 gap-1">
          {row.map((cell, colIndex) => (
            <div
              key={colIndex}
              className={`w-12 h-12 rounded border border-gray-600 flex items-center justify-center text-2xl font-bold uppercase text-white ${getBgColor(
                cell.status
              )}`}
            >
              {cell.letter}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
