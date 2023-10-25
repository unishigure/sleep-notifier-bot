import "dotenv/config";

import note from "./note.js";

const testMsg = process.env.TEST_MESSAGE
  ? process.env.TEST_MESSAGE
  : "Test note\ntest";

console.log("Test sending note.");
note(testMsg);
