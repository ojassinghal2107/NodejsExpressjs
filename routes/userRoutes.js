// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const { createUser, getAllUsers } = require("../controllers/userController");

// Path: /api/users
router.post("/", createUser); // Triggers when sending a POST request to create a user
router.get("/", getAllUsers);  // Triggers when sending a GET request to look up all users

module.exports = router;