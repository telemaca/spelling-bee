import {
  GREEN_COLOR,
  YELLOW_COLOR,
  GRAY_COLOR,
} from "@/app/constants/constants";

import { LetterStatus } from "@/types";

export const getBgColor = (status: LetterStatus) => {
  switch (status) {
    case "correct":
      return GREEN_COLOR;
    case "present":
      return YELLOW_COLOR;
    case "absent":
      return GRAY_COLOR;
    default:
      return "";
  }
};
