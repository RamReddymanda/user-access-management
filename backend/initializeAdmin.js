const bcrypt = require("bcrypt");
const { AppDataSource } = require("./config/data-source");
const { User } = require("./src/entities/User");
//this is to create admin user or manager
AppDataSource.initialize().then(async () => {
  const adminUser = {
    username: "admin",
    password: await bcrypt.hash("admin123", 10),
    role: "Admin",
  };

  await AppDataSource.getRepository("User").save(adminUser);
  console.log(" Admin user created.");
  process.exit();
}).catch((err) => {
  console.error(" Error:", err);
});
