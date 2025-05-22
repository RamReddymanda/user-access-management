const express = require("express");
const cors = require("cors");
const { AppDataSource } = require("./config/data-source");
const authRoutes = require("./routes/auth");
const softwareRoutes = require("./routes/software");
const requestRoutes = require("./routes/request.js");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api", softwareRoutes);
app.use("/api", requestRoutes);
const { initializeDataSource } = require("./config/data-source");

initializeDataSource().then(() => {
  // Start your Express server here after DB connection
  app.listen(5000, () => {
    console.log(`Server running on http://localhost:5000`);
  });
});

// AppDataSource.initialize()
//   .then(() => {
//     app.listen(5000, () => console.log("🚀 Server running on port 5000"));
//   })
//   .catch((error) => console.error("❌ DB Connection Failed", error));
