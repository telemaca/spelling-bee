type LetterStatus = "correct" | "present" | "absent" | "empty";

type EvaluatedLetter = {
  letter: string;
  status: LetterStatus;
};

type GameStatus = "playing" | "won" | "lost";

type Word = {
  word: string;
  date: string;
};

type FeedbackType = {
  message: string;
  type: "error" | "success";
  on: boolean;
};

export type { LetterStatus, EvaluatedLetter, GameStatus, Word, FeedbackType };
