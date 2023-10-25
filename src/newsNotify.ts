import * as fs from "fs/promises";

import "dotenv/config";
import Parser from "rss-parser";

import note from "./note.js";

const FEED_URL = "https://www.pokemonsleep.net/news/feed/";

const visibility = process.env.NEWS_VISIBLE
  ? process.env.NEWS_VISIBLE
  : "specified";

const parser: Parser = new Parser();

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
  await adjustXml();
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

async function getNewFeed() {
  const currentXml = (
    await fs.readFile("./feed/currentFeed.xml", "utf-8")
  ).toString();
  const currentFeed = (await parser.parseString(currentXml)).items;
  const lastDate = new Date(
    currentFeed[0].pubDate ? currentFeed[0].pubDate : ""
  );

  const latestXml = (
    await fs.readFile("./feed/latestFeed.xml", "utf-8")
  ).toString();
  const latestFeed = (await parser.parseString(latestXml)).items;

  const newFeeds = latestFeed.filter((feed) => {
    const pubDate = new Date(feed.pubDate ? feed.pubDate : "");
    if (pubDate > lastDate && pubDate != lastDate) return feed;
  });

  return newFeeds;
}

function createNote(feed: { [key: string]: any } & Parser.Item) {
  const title = feed.title;
  const link = feed.link;

  const text = `📣 新しいニュースが届きました！\\n\\n` + `${title}\\n` + `${link}\\n`;
  return text;
}

export default async function newsNotify() {
  console.log("Start to check update news.");
  await getFeed();
  const feed = await getNewFeed();
  if (feed.length > 0) {
    feed.forEach((f) => {
      const text = createNote(f);
      note(text, visibility);
    });
  } else {
    console.log("New news not exists.");
  }
  console.log("End to check update news.");
}

newsNotify();
