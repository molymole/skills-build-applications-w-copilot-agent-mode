"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./config/database");
const index_1 = require("./index");
const PORT = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : "http://localhost:8000";
index_1.app.locals.baseUrl = baseUrl;
(0, database_1.connectToDatabase)()
    .then(() => {
    index_1.app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
        console.log(`Base URL: ${baseUrl}`);
    });
})
    .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
});
