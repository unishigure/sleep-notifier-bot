import "dotenv/config";

import note from "./note";

const visibility = process.env.MEAL_VISIBLE
  ? process.env.MEAL_VISIBLE
  : "specified";

const morningStMsg = process.env.MORNING_START
  ? process.env.MORNING_START
  : "Start Morning";
const morningEdMsg = process.env.MORNING_END
  ? process.env.MORNING_END
  : "End Morning soon";
const lunchStMsg = process.env.LUNCH_START
  ? process.env.LUNCH_START
  : "Start Lunch";
const lunchEdMsg = process.env.LUNCH_END
  ? process.env.LUNCH_END
  : "End Lunch soon";
const dinnerStMsg = process.env.DINNER_START
  ? process.env.DINNER_START
  : "Start Dinner";
const dinnerEdMsg = process.env.DINNER_END
  ? process.env.DINNER_END
  : "End Dinner soon";

export function startMorning() {
  note(morningStMsg, visibility);
}

export function warnMorning() {
  note(morningEdMsg, visibility);
}

export function startLunch() {
  note(lunchStMsg, visibility);
}

export function warnLunch() {
  note(lunchEdMsg, visibility);
}

export function startDinner() {
  note(dinnerStMsg, visibility);
}

export function warnDinner() {
  note(dinnerEdMsg, visibility);
}
