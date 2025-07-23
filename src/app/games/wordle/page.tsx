"use client";
import { WordleProvider } from "./context/WordleContext";
import { WordGrid } from "./components/WordGrid/WordGrid";
import { Keyboard } from "./components/Keyboard/Keyboard";
import FeedbackMessage from "./components/FeedbackMessage/FeedbackMessage";

export default function Wordle() {
  return (
    <WordleProvider>
      <main className="flex flex-col items-center justify-center min-h-screen p-4">
        <WordGrid />
        <Keyboard />
        <FeedbackMessage />
      </main>
    </WordleProvider>
  );
}
