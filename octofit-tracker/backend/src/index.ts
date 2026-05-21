import express from "express";
import { connectToDatabase } from "./database";
import { activitiesRouter } from "./routes/activities";
import { leaderboardRouter } from "./routes/leaderboard";
import { teamsRouter } from "./routes/teams";
import { usersRouter } from "./routes/users";
import { workoutsRouter } from "./routes/workouts";

const app = express();
const PORT = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : "http://localhost:8000";

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ status: "OctoFit API running", baseUrl });
});

app.use("/api/users", usersRouter);
app.use("/api/teams", teamsRouter);
app.use("/api/activities", activitiesRouter);
app.use("/api/leaderboard", leaderboardRouter);
app.use("/api/workouts", workoutsRouter);

connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });
