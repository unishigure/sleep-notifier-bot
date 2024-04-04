import { schedule } from "node-cron";

import {
  startMorning,
  warnMorning,
  startLunch,
  warnLunch,
  startDinner,
  warnDinner,
} from "./mealNotify.js";
import newsNotify, { init } from "./newsNotify.js";

console.log("Start node-cron");
init();

schedule("30 */5 * * * *", () => newsNotify());

schedule("0 0 6 * * *", () => startMorning());
schedule("0 30 11 * * *", () => warnMorning());

schedule("0 0 12 * * *", () => startLunch());
schedule("0 30 17 * * *", () => warnLunch());

schedule("0 0 18 * * *", () => startDinner());
schedule("0 30 5 * * *", () => warnDinner());
