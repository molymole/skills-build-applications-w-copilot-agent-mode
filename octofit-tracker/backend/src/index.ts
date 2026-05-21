import express from "express";
import { activitiesRouter } from "./routes/activities";
import { leaderboardRouter } from "./routes/leaderboard";
import { teamsRouter } from "./routes/teams";
import { usersRouter } from "./routes/users";
import { workoutsRouter } from "./routes/workouts";

const app = express();

app.use(express.json());

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
