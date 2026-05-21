import { Schema, model } from "mongoose";

const leaderboardEntrySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    team: { type: Schema.Types.ObjectId, ref: "Team" },
    points: { type: Number, default: 0, min: 0 },
    rank: { type: Number, required: true, min: 1 },
  },
  { timestamps: true }
);

export const LeaderboardEntry = model("LeaderboardEntry", leaderboardEntrySchema);