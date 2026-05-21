import { Schema, model } from "mongoose";

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    activityType: { type: String, required: true },
    durationMinutes: { type: Number, required: true, min: 0 },
    caloriesBurned: { type: Number, default: 0, min: 0 },
    activityDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Activity = model("Activity", activitySchema);