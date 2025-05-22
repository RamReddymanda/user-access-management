const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { AppDataSource } = require("../config/data-source");
const { User } = require("../src/entities/User");
const { signup ,login} = require("../controllers/authController");

const router = express.Router();
//this is signup route
router.post("/signup", signup);
//this is login route
router.post("/login", login);
//this is logout route
router.post("/logout", (req, res) => {
  res.json({ message: "Logged out successfully" });
  
});
module.exports = router;
