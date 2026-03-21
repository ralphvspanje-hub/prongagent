import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import {
  parseDailyBrief,
  parseJobTracker,
  parseProgress,
  parseCrashCourse,
  parseInterviewPanel,
  parsePrepBriefing,
  parseUserProfile,
  parseConfig,
  parseStats,
} from "./parsers/markdown";

const app = new Hono();

// API routes
app.get("/api/brief", async (c) => {
  const data = await parseDailyBrief();
  return c.json(data ?? { error: "No daily brief found" });
});

app.get("/api/jobs", async (c) => {
  const data = await parseJobTracker();
  return c.json(data ?? { error: "No job tracker found" });
});

app.get("/api/progress", async (c) => {
  const data = await parseProgress();
  return c.json(data ?? { error: "No progress data found" });
});

app.get("/api/crash-course", async (c) => {
  const data = await parseCrashCourse();
  return c.json(data);
});

app.get("/api/interview", async (c) => {
  const data = await parseInterviewPanel();
  return c.json(data);
});

app.get("/api/prep-briefing", async (c) => {
  const data = await parsePrepBriefing();
  return c.json(data);
});

app.get("/api/profile", async (c) => {
  const data = await parseUserProfile();
  return c.json(data ?? { error: "No user profile found" });
});

app.get("/api/config", async (c) => {
  const data = await parseConfig();
  return c.json(data ?? { error: "No config found" });
});

app.get("/api/stats", async (c) => {
  const data = await parseStats();
  return c.json(data);
});

// Static files
app.use("/*", serveStatic({ root: "./public" }));

const port = 3737;
console.log(`ProngAgent Dashboard running at http://localhost:${port}`);

export default {
  port,
  fetch: app.fetch,
};
