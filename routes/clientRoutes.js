const express = require("express");
const router = express.Router();
const clientController = require("../controllers/clientController");
const authenticateToken = require("../middlewares/authMiddleware");

router.get("/", authenticateToken, clientController.getClientsForUser);
router.post("/", authenticateToken, clientController.createClient);
router.delete("/:id", authenticateToken, clientController.deleteClient);
module.exports = router;
