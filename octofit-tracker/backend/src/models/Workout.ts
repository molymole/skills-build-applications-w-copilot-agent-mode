import { Schema, model } from "mongoose";

const workoutSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: "" },
    difficulty: { type: String, enum: ["beginner", "intermediate", "advanced"], default: "beginner" },
    durationMinutes: { type: Number, required: true, min: 0 },
    targetMuscles: [{ type: String }],
  },
  { timestamps: true }
);

export const Workout = model("Workout", workoutSchema);