import * as fs from "fs/promises";

import "dotenv/config";
import { Type, type } from "arktype";
import Parser from "rss-parser";

import note from "./note.js";

const FEED_URL = "https://www.pokemonsleep.net/news/feed/";

const visibility = process.env.NEWS_VISIBLE
  ? process.env.NEWS_VISIBLE
  : "specified";

const parser: Parser = new Parser();

const feed: Type = type([
  {
    title: "string",
    link: "string",
    pubDate: "Date",
    imsSrc: "string",
  },
]);

async function adjustXml() {
  console.log("Start adjust xml.");
  await fs
    .mkdir("./feed")
    .then(() => console.log("Create feed directory success."))
    .catch(() => console.log("feed directory already exists."));
  await fs
    .unlink("./feed/currentFeed.xml")
    .then(() => console.log("Delete currentFeed.xml success."))
    .catch(() => console.log("currentFeed.xml not exists."));
  await fs
    .rename("./feed/latestFeed.xml", "./feed/currentFeed.xml")
    .then(() =>
      console.log("Rename latestFeed.xml to currentFeed.xml success.")
    )
    .catch(() => console.log("latestFeed.xml not exists."));
}

async function getFeed() {
  console.log("Start fetch Feed.");
  const response = await fetch(FEED_URL).catch((error) => {
    console.error("Fetch failure.");
    throw error;
  });
  if (response.ok) {
    const text = await response.text();
    await fs
      .writeFile("./feed/latestFeed.xml", text)
      .then(() => console.log("Create latestFeed.xml success."))
      .catch((error) => {
        console.error("Write XML failure.");
        throw error;
      });
  } else {
    console.error(`${response.status} : ${response.statusText}`);
    throw Error;
  }
  console.log("End fetch Feed.");
}

async function diffCheck() {
  // const feed = parser.parseURL("./feed/latestFeed.xml");

  return false;
}

function createNote(): string {
  return "";
}

export default async function newsNotify() {
  console.log("Start to check update news.");
  await adjustXml();
  await getFeed();
  if (await diffCheck()) {
    const text = createNote();
    note(text, visibility);
  }
  console.log("End to check update news.");
}

newsNotify();
