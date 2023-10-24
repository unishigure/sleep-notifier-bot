export default async function note(text: string, visibility: string) {
  console.log(`${new Date()}:\n${text}`);

  const token = process.env.TOKEN ? process.env.TOKEN : null;
  const instance = process.env.INSTANCE
    ? process.env.INSTANCE
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
    body: `{"i": "${token}", "text": "${text}", "visibility": "${visibility}"}`,
  });

  const response = await fetch(request);
  if (!response.ok) {
    console.error(`${new Date()}: ${response.status} ${response.statusText}`);
  }
}
