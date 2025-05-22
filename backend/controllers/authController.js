const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { AppDataSource } = require("../config/data-source");
const { User } = require("../src/entities/User");
const router = express.Router();

exports.signup=async (req, res) => {
try{
  const { username, password } = req.body;
  const existingUser = await AppDataSource.getRepository("User").findOneBy({ username });
  if (existingUser) return res.status(400).json({ message: "User already exists" });
  const salt = await bcrypt.genSalt(10); 
  const hashedPassword = await bcrypt.hash(password, salt);
  const newuser = { username, password: hashedPassword, role: "Employee" };
  await AppDataSource.getRepository("User").save(newuser);
  res.status(201).json({ message: "User registered" });
}
catch(err){
  console.error("Error during signup:", err);
  res.status(500).json({ message: "Internal server error" });
}
};

exports.login=async (req, res) => {
  const { username, password } = req.body;
  const user = await AppDataSource.getRepository("User").findOneBy({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
  res.json({ token, role: user.role });
}