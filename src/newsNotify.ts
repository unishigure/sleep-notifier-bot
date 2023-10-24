import { Feed } from "feed";

const rootUrl = "https://www.pokemonsleep.net";
const feedUrl = new URL("/news/feed", rootUrl);

export default function newsNotify() {
  // TODO
  console.log(`${new Date()}: News notification!`);
}
