import { Router } from "express";
import { Team } from "../models/Team";

export const teamsRouter = Router();

teamsRouter.get("/", async (_req, res, next) => {
  try {
    const teams = await Team.find().populate("members").sort({ name: 1 });
    res.json(teams);
  } catch (error) {
    next(error);
  }
});