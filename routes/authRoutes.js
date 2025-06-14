const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

const {
  registerValidationRules,
  loginValidationRules,
  handleValidationErrors,
} = require("../middlewares/validators");

router.post(
  "/register",
  registerValidationRules(),
  handleValidationErrors,
  authController.register
);

router.post(
  "/login",
  loginValidationRules(),
  handleValidationErrors,
  authController.login
);

router.post("/logout", authMiddleware, authController.logout);

router.get("/me", authMiddleware, authController.getMe);

module.exports = router;
