import React, { useState, useEffect } from "react";

type WordListProps = {
  wordList: string[];
};

export default function WordList({ wordList }: WordListProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(wordList.join(" "));

  const handleTabOpen = () => {
    setTitle(`Encontraste ${wordList.length} palabras`);
    setIsOpen(true);
  };

  const handleTabClose = () => {
    setTitle(wordList.join(" "));
    setIsOpen(false);
  };

  useEffect(() => {
    setTitle(wordList.join(" "));
  }, [wordList]);

  function splitIntoColumns(words: string[]): string[][] {
    const sorted = [...words].sort();
    const columns: string[][] = [];

    for (let i = 0; i < sorted.length; i += 15) {
      columns.push(sorted.slice(i, i + 15));
    }

    return columns;
  }

  const wordListColumns = splitIntoColumns(wordList);

  return (
    <>
      <div className={`custom-accordeon ${isOpen && "expand"}`}>
        <div className="header-container">
          <p className={`header-text ${isOpen && "border-bottom"}`}>{title}</p>
          {isOpen ? (
            <div className="pi pi-chevron-up" onClick={handleTabClose} />
          ) : (
            <div className="pi pi-chevron-down" onClick={handleTabOpen} />
          )}
        </div>
        <div className={`words-list ${isOpen && "shown"}`}>
          {wordListColumns.map((column, i) => (
            <ul key={i} className="found-words-column">
              {column.map((word, j) => (
                <li key={j} className="found-word">
                  {word}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </>
  );
}
