import "dotenv/config";

export default async function note(
  text: string,
  visibility: string = "specified"
) {
  console.log(`Text: ${text}`);

  const token = process.env.TOKEN ? process.env.TOKEN : null;
  const instance = process.env.INSTANCE
    ? process.env.INSTANCE
    : "https://example.org/";

  if (token === null) {
    console.error("Missing token.\n" + "Set token={Your Misskey Token}");
    return;
  } else if (instance === null) {
    console.error(
      "Missing instance.\n" +
        "Set instance={Your Misskey Instance. e.g. https://example.com}"
    );
    return;
  }

  let url = new URL("https://example.org/");
  try {
    url = new URL("/api/notes/create", instance);
  } catch (error) {
    console.error(`Failed parse URL. Instance: ${instance}`);
    throw error;
  }

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  const body = {
    i: token,
    text: text,
    visibility: visibility,
  };
  const request = new Request(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body),
  });

  const response = await fetch(request);
  if (!response.ok) {
    console.error(
      `${response.status} : ${response.statusText}\n` +
        `Instance: ${instance}, Visibility: ${visibility}`
    );
  } else {
    console.log("Note Success.");
  }
}
