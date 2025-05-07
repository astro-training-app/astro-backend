// controllers/authController.js
const asyncHandler = require("express-async-handler");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const AppError = require("../utils/AppError");

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * @desc Login user and return JWT token
 * @route POST /api/auth/login
 * @access Public
 * @param {string} email - User's email
 * @param {string} password - User's password
 */
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await new Promise((resolve, reject) => {
    userModel.findByEmail(email, (err, user) => {
      if (err)
        return reject(
          new AppError("Erreur lors de la recherche de l'utilisateur.", 500)
        );
      resolve(user);
    });
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError("Email ou mot de passe invalide.", 401)); // Erreur 401 Unauthorized
  }

  // --- Authenticated user ---
  const payload = {
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      type_compte: user.type_compte,
    },
  };

  const secretFromEnv = process.env.JWT_SECRET;

  const now = Date.now();
  const expirationTime = now + 60 * 60 * 1000;
  const exp = Math.floor(expirationTime / 1000);

  // Sign the JWT token with the payload and secret
  const token = jwt.sign(
    { ...payload, exp }, // Ajoute le champ "exp" dans le payload
    secretFromEnv
  );
  res.status(200).json({
    status: "success",
    message: "Utilisateur connecté avec succès.",
    token: token,
    expireAt: expirationTime,
    data: {
      user: {
        id: user.id,
        nom: user.nom,
        email: user.email,
        role: user.role,
        type_compte: user.type_compte,
      },
    },
  });
});

/**
 * @desc Register a new user
 * @route POST /api/auth/register
 * @access Public
 * @param {string} nom - User's name
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @param {string} role - User's role (amateur or pro)
 * @param {string} type_compte - User's account type (freemium or premium)
 */
exports.register = asyncHandler(async (req, res, next) => {
  const { nom, email, password, role, type_compte } = req.body;

  const existingUser = await new Promise((resolve, reject) => {
    userModel.findByEmail(email, (err, user) => {
      if (err)
        return reject(
          new AppError("Erreur lors de la vérification de l'email.", 500)
        );
      resolve(user);
    });
  });

  if (existingUser) {
    return next(new AppError("Cet email est déjà utilisé.", 409)); // 409 Conflict
  }

  const newUser = await new Promise((resolve, reject) => {
    userModel.createUser(
      { nom, email, password, role, type_compte },
      (err, result) => {
        if (err) {
          if (
            err.message &&
            err.message.includes("UNIQUE constraint failed: users.email")
          ) {
            return reject(
              new AppError(
                "Erreur interne: Email déjà pris (contrainte DB).",
                409
              )
            );
          }
          return reject(
            new AppError("Erreur lors de la création de l'utilisateur.", 500)
          );
        }
        resolve(result);
      }
    );
  });

  res.status(201).json({
    // 201 Created
    status: "success",
    message: "Utilisateur créé avec succès.",
    data: {
      userId: newUser.id,
    },
  });
});
