import express from "express";
import { activitiesRouter } from "./routes/activities";
import { leaderboardRouter } from "./routes/leaderboard";
import { teamsRouter } from "./routes/teams";
import { usersRouter } from "./routes/users";
import { workoutsRouter } from "./routes/workouts";

const app = express();
const codespaceName = process.env.CODESPACE_NAME;
const allowedOrigins = new Set([
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  ...(codespaceName ? [`https://${codespaceName}-5173.app.github.dev`] : []),
]);

app.use(express.json());

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (origin && !allowedOrigins.has(origin)) {
    res.status(403).json({ message: `Origin ${origin} is not allowed` });
    return;
  }

  if (origin) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Vary", "Origin");
  }

  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.sendStatus(204);
    return;
  }

  next();
});

app.get("/", (_req, res) => {
  const baseUrl = (app.locals.baseUrl as string) || "http://localhost:8000";
  res.json({ status: "OctoFit API running", baseUrl });
});

app.use("/api/users", usersRouter);
app.use("/api/teams", teamsRouter);
app.use("/api/activities", activitiesRouter);
app.use("/api/leaderboard", leaderboardRouter);
app.use("/api/workouts", workoutsRouter);

export { app };
