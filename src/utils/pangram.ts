const isPangram = (
  word: string,
  letters: string[],
  centerLetter: string
): boolean => {
  const uniqueLettersInWord = new Set(word);
  const hasAllLetters = letters.every((letter) =>
    uniqueLettersInWord.has(letter)
  );
  return hasAllLetters && word.includes(centerLetter);
};

export default isPangram;
