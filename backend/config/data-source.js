const { DataSource } = require("typeorm");
require("dotenv").config();

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: ["src/entities/*.js"],
});

async function initializeDataSource() {
  try {
    await AppDataSource.initialize();
    console.log("📡 Database connected");
  } catch (error) {
    console.error(" Database connection error:", error);
  }
}

module.exports = { AppDataSource, initializeDataSource };
