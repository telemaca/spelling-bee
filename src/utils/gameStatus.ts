import { GameHistory, GameType } from "@/types";

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
  if (typeof window === "undefined") return {};
  const raw = localStorage.getItem("gamesHistory");
  try {
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

export const saveGameAttempt = (
  game: GameType,
  date: string,
  word: string,
  points: number
) => {
  const history = getGameHistory();

  const gameData = history[game] || {};
  const dayData = gameData[date] || { words: [], points: 0 };

  if (!dayData.words.includes(word)) {
    dayData.words.push(word);
  }

  if (points > dayData.points) {
    dayData.points = points;
  }

  gameData[date] = dayData;
  history[game] = gameData;

  localStorage.setItem("gamesHistory", JSON.stringify(history));
};

export const getAttemptsForGameDate = (
  game: GameType,
  date: string
): string[] => {
  const history = getGameHistory();
  return history[game]?.[date]?.words || [];
};

export const getPointsForGameDate = (game: GameType, date: string): number => {
  const history = getGameHistory();
  return history[game]?.[date]?.points || 0;
};

export { saveGameStatus, loadGameStatus };
