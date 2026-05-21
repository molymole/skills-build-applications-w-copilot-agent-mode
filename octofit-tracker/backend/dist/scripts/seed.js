"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database");
const Activity_1 = require("../models/Activity");
const LeaderboardEntry_1 = require("../models/LeaderboardEntry");
const Team_1 = require("../models/Team");
const User_1 = require("../models/User");
const Workout_1 = require("../models/Workout");
async function seedDatabase() {
    console.log("Seed the octofit_db database with test data");
    await (0, database_1.connectToDatabase)();
    await Promise.all([
        Activity_1.Activity.deleteMany({}),
        LeaderboardEntry_1.LeaderboardEntry.deleteMany({}),
        Team_1.Team.deleteMany({}),
        User_1.User.deleteMany({}),
        Workout_1.Workout.deleteMany({}),
    ]);
    const users = await User_1.User.create([
        {
            username: "alex_park",
            email: "alex.park@example.com",
            displayName: "Alex Park",
            role: "captain",
        },
        {
            username: "maya_rivera",
            email: "maya.rivera@example.com",
            displayName: "Maya Rivera",
            role: "member",
        },
        {
            username: "jordan_lee",
            email: "jordan.lee@example.com",
            displayName: "Jordan Lee",
            role: "member",
        },
        {
            username: "sam_taylor",
            email: "sam.taylor@example.com",
            displayName: "Sam Taylor",
            role: "coach",
        },
    ]);
    const teams = await Team_1.Team.create([
        {
            name: "Cardio Crew",
            description: "Runners and cyclists chasing weekly endurance goals.",
            members: [users[0]._id, users[1]._id],
        },
        {
            name: "Strength Squad",
            description: "Lifters focused on progressive strength training.",
            members: [users[2]._id, users[3]._id],
        },
    ]);
    await Activity_1.Activity.create([
        {
            user: users[0]._id,
            activityType: "Running",
            durationMinutes: 42,
            caloriesBurned: 430,
            activityDate: new Date("2026-05-18T07:30:00.000Z"),
        },
        {
            user: users[1]._id,
            activityType: "Cycling",
            durationMinutes: 55,
            caloriesBurned: 510,
            activityDate: new Date("2026-05-18T17:45:00.000Z"),
        },
        {
            user: users[2]._id,
            activityType: "Strength Training",
            durationMinutes: 50,
            caloriesBurned: 360,
            activityDate: new Date("2026-05-19T12:15:00.000Z"),
        },
        {
            user: users[3]._id,
            activityType: "Yoga",
            durationMinutes: 35,
            caloriesBurned: 180,
            activityDate: new Date("2026-05-20T06:45:00.000Z"),
        },
    ]);
    await LeaderboardEntry_1.LeaderboardEntry.create([
        {
            user: users[1]._id,
            team: teams[0]._id,
            points: 1240,
            rank: 1,
        },
        {
            user: users[0]._id,
            team: teams[0]._id,
            points: 1185,
            rank: 2,
        },
        {
            user: users[2]._id,
            team: teams[1]._id,
            points: 1090,
            rank: 3,
        },
        {
            user: users[3]._id,
            team: teams[1]._id,
            points: 980,
            rank: 4,
        },
    ]);
    await Workout_1.Workout.create([
        {
            name: "Morning Mobility Reset",
            description: "Low-impact movement sequence for recovery days.",
            difficulty: "beginner",
            durationMinutes: 20,
            targetMuscles: ["hips", "hamstrings", "shoulders"],
        },
        {
            name: "Hill Sprint Builder",
            description: "Interval session designed to improve speed and cardio capacity.",
            difficulty: "intermediate",
            durationMinutes: 35,
            targetMuscles: ["quadriceps", "glutes", "calves"],
        },
        {
            name: "Total Body Strength Circuit",
            description: "Compound strength workout with squat, press, row, and core blocks.",
            difficulty: "advanced",
            durationMinutes: 48,
            targetMuscles: ["legs", "chest", "back", "core"],
        },
    ]);
    console.log(`Seeded ${users.length} users, ${teams.length} teams, 4 activities, 4 leaderboard entries, and 3 workouts.`);
}
seedDatabase()
    .catch((error) => {
    console.error("Failed to seed octofit_db:", error);
    process.exitCode = 1;
})
    .finally(async () => {
    await (0, database_1.disconnectFromDatabase)();
});
