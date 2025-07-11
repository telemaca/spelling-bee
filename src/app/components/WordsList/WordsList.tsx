import React, { useState, useEffect } from "react";

type WordListProps = {
  wordList: string[];
};

export default function WordList({ wordList }: WordListProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(wordList.join(" "));
  const wordListCopy = [...wordList];

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
          <ul>
            {wordListCopy.sort().map((word, i) => (
              <li key={i}>{word}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
