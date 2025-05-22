const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { AppDataSource } = require("../config/data-source");
const { User } = require("../src/entities/User");
const router = express.Router();

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const existingUser = await AppDataSource.getRepository("User").findOneBy({ username });
  if (existingUser) return res.status(400).json({ message: "User already exists" });
  const hashed = await bcrypt.hash(password, 10);
  const user = { username, password: hashed, role: "Employee" };
  await AppDataSource.getRepository("User").save(user);
  res.status(201).json({ message: "User registered" });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await AppDataSource.getRepository("User").findOneBy({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
  res.json({ token, role: user.role });
});
router.post("/logout", (req, res) => {
  res.json({ message: "Logged out successfully" });
  
});
module.exports = router;
