const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
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

module.exports = router;
