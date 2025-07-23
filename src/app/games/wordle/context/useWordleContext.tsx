import { useContext } from "react";
import { WordleContext } from "./WordleContext";

export const useWordleContext = () => {
  const context = useContext(WordleContext);
  if (!context)
    throw new Error("useWordleContext must be used within a WordleProvider");
  return context;
};
