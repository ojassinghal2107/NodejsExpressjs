// app.js
require("dotenv").config();
const express = require("express");
const path    = require("path");
const userRoutes         = require("./routes/userRoutes");
const eventRoutes        = require("./routes/eventRoutes");
const registrationRoutes = require("./routes/registerationRoutes");

const app  = express();
const PORT = 5000;

app.use(express.json());

// Serve frontend static files
app.use(express.static(path.join(__dirname, "public")));

// Mount API endpoints
app.use("/api/users",    userRoutes);
app.use("/api/events",   eventRoutes);
app.use("/api/register", registrationRoutes);

// Root → serve index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});