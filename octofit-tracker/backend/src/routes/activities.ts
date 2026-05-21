import { Router } from "express";
import { Activity } from "../models/Activity";

export const activitiesRouter = Router();

activitiesRouter.get("/", async (_req, res, next) => {
  try {
    const activities = await Activity.find().populate("user").sort({ activityDate: -1 });
    res.json(activities);
  } catch (error) {
    next(error);
  }
});