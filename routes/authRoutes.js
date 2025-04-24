// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const {
  registerValidationRules,
  loginValidationRules,
  handleValidationErrors
} = require('../middlewares/validators');

// POST /api/auth/register
// 1. Apply validation rules
// 2. Handle validation errors
// 3. Execute the controller
router.post(
  "/register",
  registerValidationRules(),
  handleValidationErrors,
  authController.register
);

// POST /api/auth/login
router.post(
    "/login",
    loginValidationRules(),
    handleValidationErrors,
    authController.login
);


module.exports = router;