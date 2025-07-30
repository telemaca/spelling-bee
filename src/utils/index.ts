import shuffleArray from "./shuffleArray";
import getFeedbackColor from "./getFeedbackColor";
import getLocalDateString from "./getToday";
import isPangram from "./pangram";
import { removeAccents } from "./removeAccents";
import { saveGameStatus, loadGameStatus } from "./gameStatus";
import { evaluateGuess } from "./evaluateGuess";
import { getBgColor } from "./getBgColor";
import { findInDictionary } from "./findInDictionary";
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
  getLocalDateString,
  isPangram,
  removeAccents,
  evaluateGuess,
  getBgColor,
  findInDictionary,
};
