import { schedule } from "node-cron";

import newsNotify from "./newsNotify.js";
import {
  startMorning,
  warnMorning,
  startLunch,
  warnLunch,
  startDinner,
  warnDinner,
} from "./mealNotify.js";

console.log(`${new Date()}: Start node-cron`);

schedule("0 */15 * * * *", () => newsNotify());

schedule("0 0 6 * * *", () => startMorning());
schedule("0 30 11 * * *", () => warnMorning());

schedule("0 0 12 * * *", () => startLunch());
schedule("0 30 17 * * *", () => warnLunch());

schedule("0 0 18 * * *", () => startDinner());
schedule("0 30 5 * * *", () => warnDinner());