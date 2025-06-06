const express = require("express");
const router = express.Router();
const { createUser } = require("../controllers/userControllers");

router.post("/users", createUser);

module.exports = router;
