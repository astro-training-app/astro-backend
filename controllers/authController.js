const asyncHandler = require("express-async-handler");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const AppError = require("../utils/AppError");

const JWT_SECRET = process.env.JWT_SECRET;

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await new Promise((resolve, reject) => {
    userModel.findByEmail(email, (err, user) => {
      if (err) return reject(new AppError("Error while fetching user.", 500));
      resolve(user);
    });
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError("Invalid email or password.", 401));
  }

  const payload = {
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      account_type: user.account_type,
    },
  };

  const now = Date.now();
  const expirationTime = now + 60 * 60 * 1000;
  const exp = Math.floor(expirationTime / 1000);

  const token = jwt.sign({ ...payload, exp }, JWT_SECRET);

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 1000,
  });

  res.status(200).json({
    status: "success",
    message: "User logged in successfully.",
    data: {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        account_type: user.account_type,
      },
    },
  });
});

exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role, account_type } = req.body;

  const existingUser = await new Promise((resolve, reject) => {
    userModel.findByEmail(email, (err, user) => {
      if (err) return reject(new AppError("Error while checking email.", 500));
      resolve(user);
    });
  });

  if (existingUser) {
    return next(new AppError("This email is already in use.", 409));
  }

  const newUser = await new Promise((resolve, reject) => {
    userModel.createUser(
      { name, email, password, role, account_type },
      (err, result) => {
        if (err) {
          if (
            err.message &&
            err.message.includes("UNIQUE constraint failed: users.email")
          ) {
            return reject(
              new AppError("Email already taken (DB constraint).", 409)
            );
          }
          return reject(new AppError("Error while creating the user.", 500));
        }
        resolve(result);
      }
    );
  });

  res.status(201).json({
    status: "success",
    message: "User successfully created.",
    data: {
      userId: newUser.id,
    },
  });
});

exports.logout = asyncHandler(async (req, res, next) => {
  res.clearCookie("token");
  res.status(200).json({
    status: "success",
    message: "User logged out successfully.",
  });
});
