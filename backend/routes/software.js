const express = require("express");
const { AppDataSource } = require("../config/data-source");
const { Software } = require("../src/entities/Software");
const { authMiddleware, roleMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/software", authMiddleware, roleMiddleware(["Admin"]), async (req, res) => {
  const { name, description, accessLevels } = req.body;
  const software = { name, description, accessLevels };
  await AppDataSource.getRepository("Software").save(software);
  res.status(201).json({ message: "Software added" });
});
router.get("/software", authMiddleware, async (req, res) => {
  try {
    const softwareList = await AppDataSource.getRepository(Software).find();
    res.json(softwareList);
  } catch (err) {
    console.error("Error fetching software:", err);
    res.status(500).json({ message: "Error fetching software" });
  }
});
//Only Admin can delete software
router.delete("/software/:id", authMiddleware, roleMiddleware(["Admin"]), async (req, res) => {
  const { id } = req.params;

  try {
    const softwareRepo = AppDataSource.getRepository(Software);
    const software = await softwareRepo.findOneBy({ id: parseInt(id) });

    if (!software) {
      return res.status(404).json({ message: "Software not found" });
    }

    await softwareRepo.remove(software);
    res.json({ message: "Software deleted successfully" });
  } catch (err) {
    console.error("Error deleting software:", err);
    res.status(500).json({ message: "Error deleting software" });
  }
});
// GET /api/software/:id
router.get(
  "/software/:id",
  authMiddleware,
  roleMiddleware(["Admin"]),
  async (req, res) => {
    const { id } = req.params;
    try {
      const software = await AppDataSource.getRepository(Software).findOneBy({ id: parseInt(id) });

      if (!software) {
        return res.status(404).json({ message: "Software not found" });
      }

      res.json(software);
    } catch (err) {
      console.error("Error fetching software:", err);
      res.status(500).json({ message: "Error fetching software" });
    }
  }
);
// PUT /api/software/:id (Admin only)
router.put(
  "/software/:id",
  authMiddleware,
  roleMiddleware(["Admin"]),
  async (req, res) => {
    const { id } = req.params;
    const { name, description, accessLevels } = req.body;

    try {
      const repo = AppDataSource.getRepository(Software);
      const software = await repo.findOneBy({ id: parseInt(id) });

      if (!software) {
        return res.status(404).json({ message: "Software not found" });
      }

      software.name = name;
      software.description = description;
      software.accessLevels = accessLevels;

      await repo.save(software);
      res.json({ message: "Software updated successfully" });
    } catch (err) {
      console.error("Error updating software:", err);
      res.status(500).json({ message: "Error updating software" });
    }
  }
);

module.exports = router;