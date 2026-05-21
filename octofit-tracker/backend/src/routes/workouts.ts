import { Router } from "express";
import { Workout } from "../models/Workout";

export const workoutsRouter = Router();

workoutsRouter.get("/", async (_req, res, next) => {
  try {
    const workouts = await Workout.find().sort({ difficulty: 1, name: 1 });
    res.json(workouts);
  } catch (error) {
    next(error);
  }
});