const express = require("express");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/auth");
const softwareRoutes = require("./routes/software");
const requestRoutes = require("./routes/request.js");
const { initializeDataSource } = require("./config/data-source");


const app = express();
app.use(cors());
app.use(express.json());

// middleware to check if the request is coming from a valid origin
app.use("/api/auth", authRoutes);
app.use("/api", softwareRoutes);
app.use("/api", requestRoutes);


initializeDataSource().then(() => {
  app.listen(5000, () => {
    console.log(`Server running on http://localhost:5000`);
  });
});

