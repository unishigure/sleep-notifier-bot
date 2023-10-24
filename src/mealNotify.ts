import "dotenv/config";

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
  note(morningStMsg);
}

export function warnMorning() {
  note(morningEdMsg);
}

export function startLunch() {
  note(lunchStMsg);
}

export function warnLunch() {
  note(lunchEdMsg);
}

export function startDinner() {
  note(dinnerStMsg);
}

export function warnDinner() {
  note(dinnerEdMsg);
}

async function note(text: string) {
  console.log(`${new Date()}:\n${text}`);

  const token = process.env.token ? process.env.token : null;
  const visible = process.env.visible ? process.env.visible : "specified";
  const instance = process.env.instance
    ? process.env.instance
    : "https://example.org/";

  if (token === null) {
    console.error("Missing token. Set token={Your Misskey Token}");
    return;
  } else if (instance === null) {
    console.error(
      "Missing instance.\n",
      "Set instance={Your Misskey Instance. e.g. https://example.com}"
    );
    return;
  }

  let url = new URL("/");
  try {
    url = new URL("/api/notes/create", instance);
  } catch (e: any) {
    console.error(`${new Date()}: Failed parse URL. ${e}`);
  }

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  const request = new Request(url, {
    method: "POST",
    headers: headers,
    body: `{"i": "${token}", "text": "${text}", "visibility": "${visible}"}`,
  });

  const response = await fetch(request);
  if (!response.ok) {
    console.error(`${new Date()}: ${response.status} ${response.statusText}`);
  }
}
