"use client";
import React, { createContext, useState, useEffect } from "react";
import {
  LetterStatus,
  EvaluatedLetter,
  GameStatus,
  FeedbackType,
} from "@/types";

import {
  evaluateGuess,
  findInDictionary,
  removeAccents,
  getToday,
  getAttemptsForGameDate,
  saveGameAttempt,
} from "@/utils";

import { useDailyWordle } from "../hooks/useDailyWord";

type WordleContextType = {
  currentGuess: string;
  guesses: string[];
  solution: string;
  gameStatus: GameStatus;
  keyboardStatus: Record<string, LetterStatus>;
  evaluatedGuesses: EvaluatedLetter[][];
  feedback: FeedbackType;
  addLetter: (letter: string) => void;
  removeLetter: () => void;
  submitGuess: () => void;
  resetGame: () => void;
};

export const WordleContext = createContext<WordleContextType | undefined>(
  undefined
);

export const WordleProvider = ({ children }: { children: React.ReactNode }) => {
  const dailyWordle = useDailyWordle();
  const today = getToday();
  const [dictionary, setDictionary] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState<string[]>([]);
  const [solution, setSolution] = useState("");
  const [gameStatus, setGameStatus] = useState<GameStatus>("playing");
  const [keyboardStatus, setKeyboardStatus] = useState<
    Record<string, LetterStatus>
  >({});
  const [evaluatedGuesses, setEvaluatedGuesses] = useState<EvaluatedLetter[][]>(
    []
  );
  const [feedback, setFeedback] = useState<{
    message: string;
    type: "error" | "success";
    on: boolean;
  }>({ message: "", type: "error", on: false });

  const showFeedback = (
    message: string,
    type: "error" | "success" = "error"
  ) => {
    setFeedback({ message, type, on: true });

    setTimeout(() => {
      setFeedback((prev) => ({ ...prev, on: false }));
    }, 2500);
  };

  useEffect(() => {
    const loadDictionary = async () => {
      try {
        const res = await fetch("/spanish-words.txt");
        const text = await res.text();
        const words = text
          .split("\n")
          .map((w) => removeAccents(w.trim().toLowerCase()))
          .filter((w) => w.length === 5);

        setDictionary(words);
      } catch (error) {
        console.error("Error loading dictionary:", error);
      }
    };

    loadDictionary();
  }, []);

  useEffect(() => {
    if (dailyWordle) {
      setSolution(dailyWordle.word);
      const previousAttempts = getAttemptsForGameDate("wordle", today);
      const evaluatedPrevious = previousAttempts.map((word) =>
        evaluateGuess(word, dailyWordle.word)
      );
      setEvaluatedGuesses(evaluatedPrevious);
    }
  }, [dailyWordle]);

  const addLetter = (letter: string) => {
    if (gameStatus !== "playing") return;
    if (currentGuess.length < 5) {
      setCurrentGuess((prev) => prev + letter);
    }
  };

  const removeLetter = () => {
    if (gameStatus !== "playing") return;
    setCurrentGuess((prev) => prev.slice(0, -1));
  };

  const submitGuess = () => {
    if (currentGuess.length !== 5) {
      showFeedback("Palabra incompleta", "error");
      return;
    }

    const isInDictionary = findInDictionary(
      currentGuess.toLowerCase(),
      dictionary
    );
    if (!isInDictionary) {
      showFeedback("Palabra no válida", "error");
      return;
    }

    const evaluation = evaluateGuess(currentGuess, solution);
    setEvaluatedGuesses([...evaluatedGuesses, evaluation]);

    const newGuesses = [...guesses, currentGuess];
    setGuesses(newGuesses);
    saveGameAttempt("wordle", today, currentGuess, 0);

    setKeyboardStatus((prev) => {
      const newStatus = { ...prev };

      evaluation.forEach(({ letter, status }) => {
        const prevStatus = newStatus[letter];

        // Prioridad: correct > present > absent
        if (
          status === "correct" ||
          (status === "present" && prevStatus !== "correct") ||
          (status === "absent" && !prevStatus)
        ) {
          newStatus[letter] = status;
        }
      });

      return newStatus;
    });

    if (currentGuess === solution) {
      showFeedback("¡Adivinaste!", "success");
      setGameStatus("won");
    } else if (newGuesses.length >= 6) {
      setGameStatus("lost");
      showFeedback(
        `La palabra era ${dailyWordle?.word.toUpperCase()}`,
        "error"
      );
    }

    setCurrentGuess("");
  };

  const resetGame = () => {
    setCurrentGuess("");
    setGuesses([]);
    setSolution("");
    setGameStatus("playing");
    setKeyboardStatus({});
    setFeedback({ message: "", type: "error", on: false });
  };

  return (
    <WordleContext.Provider
      value={{
        currentGuess,
        guesses,
        solution,
        gameStatus,
        keyboardStatus,
        evaluatedGuesses,
        feedback,
        addLetter,
        removeLetter,
        submitGuess,
        resetGame,
      }}
    >
      {children}
    </WordleContext.Provider>
  );
};
