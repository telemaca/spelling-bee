export function removeAccents(str: string): string {
  return str
    .normalize("NFD") // descompone letras acentuadas
    .replace(/[\u0300-\u036f]/g, "") // borra tildes
    .replace(/ü/g, "u"); // opcional: reemplazar diéresis
}

export function findValidWords(
  letters: string[],
  centerLetter: string,
  dictionary: string[]
): string[] {
  const letterSet = new Set(letters.map(removeAccents));
  const normalizedCenter = removeAccents(centerLetter);
  const normalizedDictionary = dictionary.map((w) => removeAccents(w));

  return normalizedDictionary.filter((word) => {
    if (word.length < 4) return false;
    if (!word.includes(normalizedCenter)) return false;

    for (const char of word) {
      if (!letterSet.has(char)) return false;
    }

    return true;
  });
}

export function calculatePoints(
  word: string,
  letters: string[],
  minLength: number = 4,
  pangramBonus: number = 3
): number {
  if (word.length < minLength) return 0;

  // Pangrama: usa todas las letras al menos una vez
  const uniqueInWord = new Set(word.split(""));
  const uniqueLetters = new Set(letters);
  const isPangram = [...uniqueLetters].every((letter) =>
    uniqueInWord.has(letter)
  );

  if (word.length === 4) return 1;

  const basePoints = word.length;
  return isPangram ? basePoints + pangramBonus : basePoints;
}

export function getHashSeedFromDate(date: Date): number {
  const ymd = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  let hash = 0;
  for (let i = 0; i < ymd.length; i++) {
    hash = ymd.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }
  return Math.abs(hash);
}

export function getDailyPanal(dictionary: string[], date = new Date()) {
  const pangramCandidates = dictionary.filter((word) => {
    const clean = word.toLowerCase().trim();
    const unique = new Set(clean);
    return unique.size >= 7;
  });

  const seed = getHashSeedFromDate(date);
  const index = seed % pangramCandidates.length;
  const pangramWord = pangramCandidates[index];

  const uniqueLetters = Array.from(new Set(pangramWord));
  const letters = uniqueLetters.slice(0, 7); // Usamos solo 7 letras
  const centerIndex = seed % 7;
  const centerLetter = letters[centerIndex];

  return {
    date: date.toDateString(),
    sourceWord: pangramWord,
    letters,
    centerLetter,
  };
}
