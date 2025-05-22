const express = require("express");
const { AppDataSource } = require("../config/data-source");
const { Software } = require("../src/entities/Software");
const { authMiddleware, roleMiddleware } = require("../middleware/authMiddleware");
const e = require("express");
const router = express.Router();

exports.addSoftware= async (req, res) => {
  const { name, description, accessLevels } = req.body;
  const software = { name, description, accessLevels };
  await AppDataSource.getRepository("Software").save(software);
  res.status(201).json({ message: "Software added" });
}

exports.getAllSoftware =async (req, res) => {
  try {
    const softwareList = await AppDataSource.getRepository(Software).find();
    res.json(softwareList);
  } catch (err) {
    console.error("Error fetching software:", err);
    res.status(500).json({ message: "Error fetching software" });
  }
}
exports.getSoftwareById = async (req, res) => {
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
  };

exports.updateSoftware = async (req, res) => {
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
  
exports.deleteSoftware = async (req, res) => {
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
}