const express = require("express");
const { AppDataSource } = require("../config/data-source");
const { Software } = require("../src/entities/Software");
const { authMiddleware, roleMiddleware } = require("../middleware/authMiddleware");
const { addSoftware,getAllSoftware,deleteSoftware,getSoftwareById,updateSoftware } = require("../controllers/softwareController");
const router = express.Router();

//this is to add software
router.post("/software", authMiddleware, roleMiddleware(["Admin"]),addSoftware);

//this is to get all software
router.get("/software", authMiddleware, getAllSoftware);

//for delete software -Only Admin can delete software
router.delete("/software/:id", authMiddleware, roleMiddleware(["Admin"]),deleteSoftware );

//for get software by id -Only Admin can get software
router.get( "/software/:id", authMiddleware, roleMiddleware(["Admin"]), getSoftwareById);

//for update software -Only Admin can update software
router.put(
  "/software/:id",
  authMiddleware,
  roleMiddleware(["Admin"]),
  updateSoftware
);

module.exports = router;