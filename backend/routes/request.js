const express = require("express");
const { AppDataSource } = require("../config/data-source");
const { Request } = require("../src/entities/Request");
const { authMiddleware, roleMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/requests", authMiddleware, roleMiddleware(["Employee","Admin"]), async (req, res) => {
  const { softwareId, accessType, reason } = req.body;
  const request = { user: { id: req.user.id }, software: { id: softwareId }, accessType, reason };
  await AppDataSource.getRepository("Request").save(request);
  res.status(201).json({ message: "Request submitted" });
});

router.patch("/requests/:id", authMiddleware, roleMiddleware(["Manager","Admin"]), async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const requestRepo = AppDataSource.getRepository("Request");
  const request = await requestRepo.findOne({ where: { id }, relations: ["user", "software"] });
  if (!request) return res.status(404).json({ message: "Request not found" });
  request.status = status;
  await requestRepo.save(request);
  res.json({ message: `Request ${status}` });
});
router.get('/myrequests', authMiddleware, async (req, res) => {
  try {
    const requestRepo = AppDataSource.getRepository(Request);

    const requests = await requestRepo.find({
      where: { user: { id: req.user.id } },
      relations: ['software'],
    });

    res.json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
// Get all pending requests (Manage and admin only)
router.get('/requests', authMiddleware, roleMiddleware(['Manager','Admin']), async (req, res) => {
  try {
    const requestRepo = AppDataSource.getRepository(Request);

    const requests = await requestRepo.find({
      where: { status: 'Pending' },
      relations: ['user', 'software'],
    });

    res.json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to load requests' });
  }
});

module.exports = router;