const fs = require("fs");
const path = require("path");

const ROOT_DIR = path.resolve(__dirname, "..");
const TOPICS_FILE = path.join(ROOT_DIR, "data", "topics.json");
const ACTIVITY_FILE = path.join(ROOT_DIR, "ACTIVITY.md");

function run() {
  if (!fs.existsSync(TOPICS_FILE)) {
    console.error("topics.json not found!");
    process.exit(1);
  }

  const topics = JSON.parse(fs.readFileSync(TOPICS_FILE, "utf-8"));

  // Check which topics have already been created
  let selectedTopic = null;

  for (const topic of topics) {
    const targetPath = path.join(ROOT_DIR, topic.folder, topic.filename);
    if (!fs.existsSync(targetPath)) {
      selectedTopic = topic;
      break;
    }
  }

  // If all topics are done, continue the cycle with an extra, timestamped variant
  if (!selectedTopic) {
    const idx = Math.floor(Math.random() * topics.length);
    const base = topics[idx];
    const timestamp = Date.now().toString().slice(-4);
    selectedTopic = {
      ...base,
      filename: `extra-${timestamp}-${base.filename}`,
      commitMessage: `feat(extra): add extra practice and extension on ${base.title}`,
    };
  }

  // Create the file
  const targetDir = path.join(ROOT_DIR, selectedTopic.folder);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const fullFilePath = path.join(targetDir, selectedTopic.filename);
  fs.writeFileSync(fullFilePath, selectedTopic.content, "utf-8");
  console.log(
    `✅ New file created: ${selectedTopic.folder}/${selectedTopic.filename}`,
  );

  // Update the ACTIVITY.md log
  const now = new Date();
  const tashkentOffsetMs = 5 * 60 * 60 * 1000;
  const tashkentNow = new Date(now.getTime() + tashkentOffsetMs);
  const dateStr = tashkentNow.toISOString().slice(0, 10);
  const timeStr = tashkentNow.toISOString().slice(11, 16);

  if (!fs.existsSync(ACTIVITY_FILE)) {
    fs.writeFileSync(
      ACTIVITY_FILE,
      "# 📈 Daily Activity Log\n\n| Date | Time | Type | Topic | File |\n| :--- | :--- | :--- | :--- | :--- |\n",
      "utf-8",
    );
  }

  const typeName =
    selectedTopic.type === "practical" ? "💻 Practical Code" : "📚 Notes";
  const logLine = `| ${dateStr} | ${timeStr} | ${typeName} | ${selectedTopic.title} | [${selectedTopic.filename}](${selectedTopic.folder}/${selectedTopic.filename}) |\n`;
  fs.appendFileSync(ACTIVITY_FILE, logLine, "utf-8");

  // Set the GitHub Actions output parameters
  const commitMsg = selectedTopic.commitMessage;
  console.log(`COMMIT_MSG: ${commitMsg}`);

  if (process.env.GITHUB_OUTPUT) {
    fs.appendFileSync(
      process.env.GITHUB_OUTPUT,
      "commit_msg=" + commitMsg + "\n",
    );
    fs.appendFileSync(
      process.env.GITHUB_OUTPUT,
      "topic_title=" + selectedTopic.title + "\n",
    );
  }
}

run();
