"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaderboardEntry = void 0;
const mongoose_1 = require("mongoose");
const leaderboardEntrySchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    team: { type: mongoose_1.Schema.Types.ObjectId, ref: "Team" },
    points: { type: Number, default: 0, min: 0 },
    rank: { type: Number, required: true, min: 1 },
}, { timestamps: true });
exports.LeaderboardEntry = (0, mongoose_1.model)("LeaderboardEntry", leaderboardEntrySchema);
