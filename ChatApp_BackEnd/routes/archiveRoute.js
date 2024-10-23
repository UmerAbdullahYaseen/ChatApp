const express = require("express");
const { getArchivedMessages } = require("../controller/getArchivedMessages"); // Controller for archived messages
const { authenticateUser } = require("../middleware/authMiddleware");
const router = express.Router();

// Define the route to fetch archived messages
router.get(
  "/archived-messages/:channelId",
  authenticateUser,
  getArchivedMessages
);

module.exports = router;
