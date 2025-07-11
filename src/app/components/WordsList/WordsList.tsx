import React, { useState, useEffect } from "react";
import { Accordion, AccordionTab } from "primereact/accordion";

type WordListProps = {
  wordList: string[];
};

export default function WordList({ wordList }: WordListProps) {
  const [title, setTitle] = useState<string>(wordList.join(" "));
  const wordListCopy = [...wordList];

  const handleTabOpen = () => {
    setTitle("");
  };

  const handleTabClose = () => {
    setTitle(wordList.join(" "));
  };

  useEffect(() => {
    setTitle(wordList.join(" "));
  }, [wordList]);

  return (
    <Accordion onTabOpen={handleTabOpen} onTabClose={handleTabClose}>
      <AccordionTab header={title}>
        <ul>
          {wordListCopy.sort().map((word, i) => (
            <li key={i}>{word}</li>
          ))}
        </ul>
      </AccordionTab>
    </Accordion>
  );
}
