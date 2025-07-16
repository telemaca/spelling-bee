"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PrimeReactProvider } from "primereact/api";
import {
  findValidWords,
  calculatePoints,
  // getDailyPanal,
} from "../utils/wordFinder";
// import { useDailyPanal } from "./hooks/usedailyPanal";
import HexGrid from "./components/Hexgrid/Hexgrid";
import WordList from "./components/WordsList/WordsList";
import RankTimeline from "./components/Scoring/Scoring";

import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";

const LOCAL_KEY = "gameState";

export default function WordFinder() {
  const [guessedWord, setGuessedWord] = useState("");
  const [centerLetter] = useState("m");
  const [possibleWords, setPossibleWords] = useState<string[]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [points, setPoints] = useState<number>(0);
  const [maxPoints, setMaxPoints] = useState<number>(0);
  const [errorCount, setErrorCount] = useState<number>(0);
  const [shuffleId, setShuffleId] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(true);

  type FeedbackType = "success" | "short" | "error" | "existing";
  interface FeedbackState {
    on: boolean;
    message: string;
    type: FeedbackType;
  }

  const [feedback, setFeedback] = useState<FeedbackState>({
    on: false,
    message: ".",
    type: "short",
  });

  const [fixedLetters] = useState("roabgem");
  const letterArray = fixedLetters.toLowerCase().split("");

  const lettersWithoutCenter = letterArray.filter(
    (letter) => letter !== centerLetter
  );

  const [gridLetters, setGridLetters] =
    useState<string[]>(lettersWithoutCenter);

  useEffect(() => {
    const stateOfGame = localStorage.getItem(LOCAL_KEY);
    if (stateOfGame) {
      const parsedData = JSON.parse(stateOfGame);
      setFoundWords(parsedData.words);
      setPoints(parsedData.points);
    }
    // Cargamos las palabras desde un endpoint local
    fetch("/spanish-words.txt")
      .then((res) => res.text())
      .then((text) => {
        const allWords = text.split("\n").map((w) => w.trim().toLowerCase());
        const words = findValidWords(
          letterArray,
          centerLetter.toLowerCase(),
          allWords
        );
        setPossibleWords(words);
        const mapPoints = words.reduce(
          (sum, word) => sum + calculatePoints(word, letterArray),
          0
        );
        setMaxPoints(mapPoints);
      });
  }, []);

  const handleSearch = () => {
    if (guessedWord.length < 4) {
      setErrorCount((prev) => prev + 1);
      setFeedback({
        on: true,
        message: "Muy corta",
        type: "short",
      });
    } else {
      if (possibleWords.includes(guessedWord)) {
        if (!foundWords.includes(guessedWord)) {
          //! PALABRA CORRECTA NUEVA
          const wordPoints = calculatePoints(guessedWord, letterArray);
          setFeedback({
            on: true,
            message: `+ ${wordPoints} ${wordPoints > 1 ? "puntos" : "punto"}`,
            type: "success",
          });
          setFoundWords([guessedWord, ...foundWords]);
          setPoints(points + wordPoints);
          const gameState = {
            words: [guessedWord, ...foundWords],
            points: points + wordPoints,
          };
          localStorage.setItem(LOCAL_KEY, JSON.stringify(gameState));
        } else {
          //! PALABRA YA ENCONTRADA
          setErrorCount((prev) => prev + 1);
          setFeedback({
            on: true,
            message: "Ya encontrada",
            type: "existing",
          });
        }
      } else {
        if (!guessedWord.includes(centerLetter)) {
          //! PALABRA SIN LETRAS CENTRAL
          setErrorCount((prev) => prev + 1);
          setFeedback({
            on: true,
            message: "¿Letra central?",
            type: "error",
          });
        } else {
          //! PALABRA NO VÁLIDA
          setErrorCount((prev) => prev + 1);
          setFeedback({
            on: true,
            message: "No es válida",
            type: "error",
          });
        }
      }
    }

    setTimeout(() => {
      setGuessedWord("");
    }, 1000);

    setTimeout(() => {
      setFeedback({
        on: false,
        message: ".",
        type: "short",
      });
    }, 2000);
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleDelete = () => {
    setGuessedWord((prev) => prev.slice(0, -1));
  };

  const handleOnClickLetter = (letter: string) => {
    setGuessedWord((prev) => prev + letter);
  };

  function shuffleArray<T>(array: T[]): T[] {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  const shuffleLetters = () => {
    setIsVisible(false);
    setShuffleId(shuffleId + 1);
    setTimeout(() => {
      setGridLetters((prev) => shuffleArray(prev));
      setIsVisible(true);
    }, 300);
  };

  const getFeedbackColor = (feedbackType: string) => {
    switch (feedbackType) {
      case "success":
        return "bg-green-500 grow-in";
      case "error":
        return "bg-red-500";
      case "existing":
        return "bg-orange-400";
      case "short":
        return "bg-gray-500";
    }
  };

  return (
    <PrimeReactProvider>
      <div className="p-6 max-w-xl m-auto flex flex-col font-sans relative">
        {/* <div className="flex gap-4">
          <h1 className="font-semibold mb-2">Puntos: {points}</h1>
          <h2 className="font-semibold mb-2">Puntos posibles: {maxPoints}</h2>
        </div> */}

        <RankTimeline currentScore={points} totalPoints={maxPoints * 0.2} />

        <WordList wordList={foundWords} />

        <div className="mb-4 m-auto pt-26">
          <div
            className={`${
              feedback.on && feedback.type !== "success" && "fade-in"
            } opacity-0 ${getFeedbackColor(
              feedback.type
            )} text-white w-30 text-xs rounded text-center p-2 m-auto mb-6 mh-16`}
          >
            {feedback.message}
          </div>
          <input
            type="text"
            // ref={inputRef}
            className="border p-2 ml-2 opacity-0 pointer-events-none absolute"
            value={guessedWord}
            onChange={(e) => setGuessedWord(e.target.value)}
            onKeyDown={handleEnter}
          />
          <motion.div
            className="flex gap-1 flex-wrap justify-center min-h-10 custom-input"
            key={errorCount}
            animate={{ x: [0, -8, 8, -6, 6, -4, 4, 0] }}
            transition={{ duration: 0.6 }}
          >
            <AnimatePresence>
              {guessedWord.split("").map((letter, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 1, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{}}
                  transition={{
                    duration: 0.5,
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                  className={`font-bold text-2xl ${
                    letter === centerLetter ? "text-yellow-400" : ""
                  }`}
                >
                  {letter.toUpperCase()}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
        <HexGrid
          letters={gridLetters}
          centerLetter={centerLetter}
          isVisible={isVisible}
          shuffleVersion={shuffleId}
          onClickLetter={handleOnClickLetter}
        />
        <div className="flex gap-4 m-auto">
          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded-full text-sm custom-button"
          >
            Borrar
          </button>

          <button
            onClick={shuffleLetters}
            className="pi pi-refresh rounded-full text-xl custom-button custom-button-icon w-12 h-12"
          ></button>

          <button
            onClick={handleSearch}
            className="px-4 py-2 rounded-full text-sm custom-button"
          >
            Enter
          </button>
        </div>
      </div>
    </PrimeReactProvider>
  );
}
