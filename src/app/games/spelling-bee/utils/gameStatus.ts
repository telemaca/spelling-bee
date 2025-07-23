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

export { saveGameStatus, loadGameStatus };
