import { Router } from "express";
import { LeaderboardEntry } from "../models/LeaderboardEntry";

export const leaderboardRouter = Router();

leaderboardRouter.get("/", async (_req, res, next) => {
  try {
    const leaderboard = await LeaderboardEntry.find()
      .populate("user")
      .populate("team")
      .sort({ rank: 1 });
    res.json(leaderboard);
  } catch (error) {
    next(error);
  }
});