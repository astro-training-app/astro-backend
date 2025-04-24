const { body, validationResult } = require('express-validator');

// Middleware to form validation rules and handle errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // if there are validation errors, return a 400 response with the errors
    return res.status(400).json({
      status: 'error',
      message: 'Validation failed',
      errors: errors.array() // array of validation errors
     });
  }
    // if no validation errors, proceed to the next middleware or route handler
  next();
};

// Validation rules for user registration
const registerValidationRules = () => {
  return [
    body('nom').notEmpty().withMessage('Le nom est requis').trim().escape(),
    body('email')
      .notEmpty().withMessage('L\'email est requis')
      .isEmail().withMessage('Doit être une adresse email valide')
      .normalizeEmail(),
    body('password')
      .notEmpty().withMessage('Le mot de passe est requis')
      .isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères'),
    // Optional fields with default values
    body('role').optional().isIn(['amateur', 'pro']).withMessage('Rôle invalide'),
    body('type_compte').optional().isIn(['freemium', 'premium']).withMessage('Type de compte invalide'),
  ];
};

// Validation rules for user login
const loginValidationRules = () => {
  return [
    body('email')
      .notEmpty().withMessage('L\'email est requis')
      .isEmail().withMessage('Doit être une adresse email valide')
      .normalizeEmail(),
    body('password')
      .notEmpty().withMessage('Le mot de passe est requis'),
  ];
};


module.exports = {
  registerValidationRules,
  loginValidationRules,
  handleValidationErrors,
};