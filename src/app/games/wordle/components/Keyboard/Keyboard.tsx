import { useWordleContext } from "../../context/useWordleContext";
import {
  GREEN_COLOR,
  YELLOW_COLOR,
  GRAY_COLOR,
  GRAY_ABSENT_COLOR,
} from "@/app/constants/constants";

export const Keyboard = () => {
  const { addLetter, removeLetter, submitGuess, keyboardStatus } =
    useWordleContext();
  const rows = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ"],
    ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "←"],
  ];

  const getKeyClass = (letter: string) => {
    const status = keyboardStatus[letter];

    switch (status) {
      case "correct":
        return GREEN_COLOR;
      case "present":
        return YELLOW_COLOR;
      case "absent":
        return GRAY_ABSENT_COLOR;
      default:
        return GRAY_COLOR;
    }
  };

  const handleClick = (key: string) => {
    if (key === "←") {
      removeLetter();
    } else if (key === "ENTER") {
      submitGuess();
    } else {
      addLetter(key);
    }
  };

  return (
    <div className="mt-6 space-y-1">
      {rows.map((row, i) => (
        <div key={i} className="flex justify-center gap-1">
          {row.map((key) => (
            <button
              key={key}
              className={`px-2 py-3 rounded font-semibold text-sm text-white ${getKeyClass(
                key
              )}`}
              onClick={() => handleClick(key)}
            >
              {key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};
