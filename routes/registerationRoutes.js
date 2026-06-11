// routes/registrationRoutes.js
const express = require("express");
const router = express.Router();
const { registerForEvent } = require("../controllers/registerationController");

router.post("/", registerForEvent);

module.exports = router;