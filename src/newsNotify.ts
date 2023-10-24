import "dotenv/config";
import { type } from "arktype";

import note from "./note.js";

const rootUrl = "https://www.pokemonsleep.net";
const feedUrl = new URL("/news/feed", rootUrl);

const visibility = process.env.NEWS_VISIBLE
  ? process.env.NEWS_VISIBLE
  : "specified";

const rss = type([]);

function adjustRss(): void {}

function getRss(): void {
  adjustRss();
}

function diffCheck(): boolean {
  return false;
}

function createNote(): string {
  return "";
}

export default function newsNotify() {
  console.log(`${new Date()}: Start to check update news.`);
  getRss();
  if (diffCheck()) {
    const text = createNote();
    // note(text, visibility);
  }
  console.log(`${new Date()}: End to check update news.`);
}
