import "dotenv/config";

import note from "./note.js";

const rootUrl = "https://www.pokemonsleep.net";
const feedUrl = new URL("/news/feed", rootUrl);

const visibility = process.env.NEWS_VISIBLE
  ? process.env.NEWS_VISIBLE
  : "specified";

function getRss() {}

export default function newsNotify() {
  // TODO
  console.log(`${new Date()}: News notification!`);
  note("Search RSS timing");
}
