const express = require("express");
const { AppDataSource } = require("../config/data-source");
const { Request } = require("../src/entities/Request");
const { authMiddleware, roleMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();
const {requestSoftware,approveOrRejectRequest,getMyRequests,allPendingRequests} = require("../controllers/requestController");
//this is to request software access
router.post("/requests", authMiddleware, roleMiddleware(["Employee","Admin"]),requestSoftware );

//this is to approve or reject a request
router.patch("/requests/:id", authMiddleware, roleMiddleware(["Manager","Admin"]),approveOrRejectRequest);

// Get all requests made by the logged-in user
router.get('/myrequests', authMiddleware, getMyRequests);

// Get all pending requests (Manage and admin only)
router.get('/requests', authMiddleware, roleMiddleware(['Manager','Admin']), allPendingRequests);

module.exports = router;