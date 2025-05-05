const express = require("express");
const router = express.Router();
const clientController = require("../controllers/clientController");
const authenticateToken = require("../middlewares/authMiddleware");

router.get("/", authenticateToken, clientController.getClientsForUser);
router.post("/", authenticateToken, clientController.createClient);

module.exports = router;
