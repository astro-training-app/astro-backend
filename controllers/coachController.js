const coachModel = require("../models/coachModel");
const asyncHandler = require("express-async-handler");
const AppError = require("../utils/AppError");

exports.getAllCoaches = asyncHandler(async (req, res, next) => {
  const coaches = await new Promise((resolve, reject) => {
    coachModel.getAll((err, results) => {
      if (err) return reject(new AppError("Error retrieving coaches.", 500));
      resolve(results);
    });
  });

  res.status(200).json({
    status: "success",
    data: coaches,
  });
});

exports.getCoach = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  if (!userId || isNaN(userId) || parseInt(userId) < 1) {
    return next(new AppError("Invalid ID provided.", 400));
  }

  const coach = await new Promise((resolve, reject) => {
    coachModel.findById(userId, (err, result) => {
      if (err) return reject(new AppError("Error retrieving the coach.", 500));
      resolve(result);
    });
  });

  if (!coach) {
    return next(new AppError("No coach found with this ID.", 404));
  }

  res.status(200).json({
    status: "success",
    data: coach,
  });
});

exports.createCoach = asyncHandler(async (req, res, next) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return next(new AppError("Name and email are required.", 400));
  }

  await new Promise((resolve, reject) => {
    coachModel.create(name, email, (err) => {
      if (err) return reject(new AppError("Error creating coach.", 500));
      resolve();
    });
  });

  res.status(201).json({
    status: "success",
    message: "Coach successfully created.",
  });
});

exports.updateCoach = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const { name, role } = req.body;

  if (!userId || isNaN(userId) || parseInt(userId) < 1) {
    return next(new AppError("Invalid ID provided.", 400));
  }

  if (!name || !role) {
    return next(new AppError("Name and email are required for update.", 400));
  }

  await new Promise((resolve, reject) => {
    coachModel.update(userId, name, role, (err) => {
      if (err) return reject(new AppError("Error updating coach.", 500));
      resolve();
    });
  });

  res.status(200).json({
    status: "success",
    message: `Coach with ID ${userId} updated successfully.`,
  });
});

exports.deleteCoach = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  if (!userId || isNaN(userId) || parseInt(userId) < 1) {
    return next(new AppError("Invalid ID provided.", 400));
  }

  await new Promise((resolve, reject) => {
    coachModel.delete(userId, (err) => {
      if (err) return reject(new AppError("Error deleting coach.", 500));
      resolve();
    });
  });

  res.status(200).json({
    status: "success",
    message: `Coach with ID ${userId} deleted successfully.`,
  });
});
