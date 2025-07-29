import { GameHistory, GameType } from "@/app/games/wordle/types";

type GameEntry = {
  date: string;
  status: {
    words: string[];
    points: number;
  };
};

const LOCAL_KEY = "gameHistory";

const saveGameStatus = (
  date: string,
  status: { words: string[]; points: number }
) => {
  const stored = localStorage.getItem(LOCAL_KEY);
  const history: GameEntry[] = stored ? JSON.parse(stored) : [];

  const updated: GameEntry[] = [
    ...history.filter((entry) => entry.date !== date),
    { date, status },
  ];

  localStorage.setItem(LOCAL_KEY, JSON.stringify(updated));
};

const loadGameStatus = (date: string): GameEntry["status"] | null => {
  const stored = localStorage.getItem(LOCAL_KEY);
  if (!stored) return null;

  const history: GameEntry[] = JSON.parse(stored);
  const match = history.find((entry) => entry.date === date);
  return match?.status || null;
};

export const getGameHistory = (): GameHistory => {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem("gamesHistory");
  try {
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveGameAttempt = (
  game: GameType,
  date: string,
  word: string,
  points: number
) => {
  const history = getGameHistory();

  const existingIndex = history.findIndex(
    (entry) => entry.game === game && entry.date === date
  );

  if (existingIndex !== -1) {
    const entry = history[existingIndex];

    if (!entry.status.words.includes(word)) {
      entry.status.words.push(word);
    }

    if (points > entry.status.points) {
      entry.status.points = points;
    }

    history[existingIndex] = entry;
  } else {
    history.push({
      game,
      date,
      status: {
        words: [word],
        points,
      },
    });
  }

  localStorage.setItem("gamesHistory", JSON.stringify(history));
};

export const getAttemptsForGameDate = (
  game: GameType,
  date: string
): string[] => {
  const history = getGameHistory();
  const entry = history.find((e) => e.game === game && e.date === date);
  return entry?.status.words || [];
};

export { saveGameStatus, loadGameStatus };
