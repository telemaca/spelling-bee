import { useWordleContext } from "../../context/useWordleContext";
import { EvaluatedLetter, LetterStatus } from "../../types";
import {
  GREEN_COLOR,
  MAX_ATTEMPTS,
  WORD_LENGTH,
  YELLOW_COLOR,
  GRAY_COLOR,
} from "@/app/constants/constants";

export const WordGrid = () => {
  const { currentGuess, evaluatedGuesses } = useWordleContext();

  const remainingRows = MAX_ATTEMPTS - evaluatedGuesses.length - 1;
  const rows: EvaluatedLetter[][] = [
    ...evaluatedGuesses,
    currentGuess
      .padEnd(WORD_LENGTH)
      .split("")
      .map((letter) => ({ letter, status: "empty" })),
    ...Array(remainingRows).fill(
      Array(WORD_LENGTH).fill({ letter: "", status: "empty" })
    ),
  ];

  const getBgColor = (status: LetterStatus) => {
    switch (status) {
      case "correct":
        return GREEN_COLOR;
      case "present":
        return YELLOW_COLOR;
      case "absent":
        return GRAY_COLOR;
      default:
        return "";
    }
  };

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
