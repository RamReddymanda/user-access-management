const express = require("express");
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
