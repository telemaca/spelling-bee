import { EvaluatedLetter } from "../types";

export const evaluateGuess = (
  guess: string,
  solution: string
): EvaluatedLetter[] => {
  const result: EvaluatedLetter[] = [];
  const solutionLetters = solution.split("");
  const used = Array(solution.length).fill(false); // para evitar dobles amarillos

  // Primero, marcar letras correctas (verde)
  for (let i = 0; i < guess.length; i++) {
    const letter = guess[i];
    if (letter === solution[i]) {
      result.push({ letter, status: "correct" });
      used[i] = true;
    } else {
      result.push({ letter, status: "empty" }); // temporal
    }
  }

  // Segundo, marcar presentes (amarillo)
  for (let i = 0; i < guess.length; i++) {
    if (result[i].status === "correct") continue;
    const letter = guess[i];
    const index = solutionLetters.findIndex((l, j) => l === letter && !used[j]);
    if (index !== -1) {
      result[i] = { letter, status: "present" };
      used[index] = true;
    } else {
      result[i] = { letter, status: "absent" };
    }
  }

  return result;
};
