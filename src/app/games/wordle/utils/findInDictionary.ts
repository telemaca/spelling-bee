import { removeAccents } from "@/utils";

export function findInDictionary(
  guessedWord: string,
  dictionary: string[]
): boolean {
  const normalizedDictionary = dictionary.map((w) => removeAccents(w));
  const normalizedGuessedWord = removeAccents(guessedWord.toLowerCase());
  return normalizedDictionary.includes(normalizedGuessedWord);
}
