import shuffleArray from "./shuffleArray";
import getFeedbackColor from "./getFeedbackColor";
import { getToday } from "./getToday";
import isPangram from "./pangram";
import { removeAccents } from "./removeAccents";
import { saveGameStatus, loadGameStatus } from "./gameStatus";
import { evaluateGuess } from "./evaluateGuess";
import { getBgColor } from "./getBgColor";
import { findInDictionary } from "./findInDictionary";
import {
  saveGameAttempt,
  getAttemptsForGameDate,
  getPointsForGameDate,
} from "./gameStatus";
import {
  findValidWords,
  calculatePoints,
  // getDailyPanal,
} from "./wordFinder";

export {
  shuffleArray,
  getFeedbackColor,
  saveGameStatus,
  loadGameStatus,
  findValidWords,
  calculatePoints,
  getToday,
  isPangram,
  removeAccents,
  evaluateGuess,
  getBgColor,
  findInDictionary,
  saveGameAttempt,
  getAttemptsForGameDate,
  getPointsForGameDate,
};
