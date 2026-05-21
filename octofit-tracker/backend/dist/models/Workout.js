"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workout = void 0;
const mongoose_1 = require("mongoose");
const workoutSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, default: "" },
    difficulty: { type: String, enum: ["beginner", "intermediate", "advanced"], default: "beginner" },
    durationMinutes: { type: Number, required: true, min: 0 },
    targetMuscles: [{ type: String }],
}, { timestamps: true });
exports.Workout = (0, mongoose_1.model)("Workout", workoutSchema);
