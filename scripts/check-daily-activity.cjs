const https = require("https");

const GITHUB_USERNAME = "komilazokirova";

function getEvents() {
  return new Promise((resolve, reject) => {
    const req = https.get(
      `https://api.github.com/users/${GITHUB_USERNAME}/events/public`,
      {
        headers: {
          "User-Agent": "Daily-Activity-Checker",
          Accept: "application/vnd.github.v3+json",
        },
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(e);
          }
        });
      },
    );
    req.on("error", reject);
  });
}

async function run() {
  try {
    console.log(`Checking today's activity for [${GITHUB_USERNAME}]...`);
    const events = await getEvents();

    if (!Array.isArray(events)) {
      console.log("Unexpected API response:", events);
      process.exit(1);
    }

    // Calculate using Tashkent time (UTC+5)
    const now = new Date();
    const tashkentOffsetMs = 5 * 60 * 60 * 1000;
    const tashkentNow = new Date(now.getTime() + tashkentOffsetMs);
    const todayStr = tashkentNow.toISOString().slice(0, 10);

    console.log("Today's date (Tashkent time):", todayStr);

    // Extract all of today's PushEvents
    const todayPushes = events.filter((e) => {
      if (e.type !== "PushEvent" || !e.created_at) return false;
      const eventTashkent = new Date(
        new Date(e.created_at).getTime() + tashkentOffsetMs,
      );
      return eventTashkent.toISOString().slice(0, 10) === todayStr;
    });

    console.log(`Number of push events found today: ${todayPushes.length}`);

    if (todayPushes.length > 0) {
      console.log(
        "✅ Komila has already pushed code today! No automatic push needed.",
      );
      process.exit(0);
    } else {
      console.log(
        "⚡ No pushes were made today. Automatic activity will be recorded.",
      );
      process.exit(10);
    }
  } catch (error) {
    console.error("An error occurred:", error.message);
    process.exit(1);
  }
}

run();
