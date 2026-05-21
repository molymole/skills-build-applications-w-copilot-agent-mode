"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const activities_1 = require("./routes/activities");
const leaderboard_1 = require("./routes/leaderboard");
const teams_1 = require("./routes/teams");
const users_1 = require("./routes/users");
const workouts_1 = require("./routes/workouts");
const app = (0, express_1.default)();
exports.app = app;
const codespaceName = process.env.CODESPACE_NAME;
const allowedOrigins = new Set([
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    ...(codespaceName ? [`https://${codespaceName}-5173.app.github.dev`] : []),
]);
app.use(express_1.default.json());
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (origin && !allowedOrigins.has(origin)) {
        res.status(403).json({ message: `Origin ${origin} is not allowed` });
        return;
    }
    if (origin) {
        res.header("Access-Control-Allow-Origin", origin);
        res.header("Vary", "Origin");
    }
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS") {
        res.sendStatus(204);
        return;
    }
    next();
});
app.get("/", (_req, res) => {
    const baseUrl = app.locals.baseUrl || "http://localhost:8000";
    res.json({ status: "OctoFit API running", baseUrl });
});
app.use("/api/users", users_1.usersRouter);
app.use("/api/teams", teams_1.teamsRouter);
app.use("/api/activities", activities_1.activitiesRouter);
app.use("/api/leaderboard", leaderboard_1.leaderboardRouter);
app.use("/api/workouts", workouts_1.workoutsRouter);
