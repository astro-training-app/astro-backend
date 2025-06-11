const clientModel = require("../models/clientModel");
const asyncHandler = require("express-async-handler");
const AppError = require("../utils/AppError");

exports.getClientsForUser = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  const clients = await new Promise((resolve, reject) => {
    clientModel.findByCoachId(userId, (err, results) => {
      if (err) return reject(new AppError("Database error", 500));
      resolve(results);
    });
  });

  res.status(200).json({
    status: "success",
    data: clients,
  });
});

exports.getClientById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const coachId = req.user.id;

  const client = await new Promise((resolve, reject) => {
    clientModel.findByIdAndCoachId(id, coachId, (err, results) => {
      if (err) return reject(new AppError("Database error", 500));
      resolve(results);
    });
  });

  if (!client) {
    return next(new AppError("Client not found.", 404));
  }

  res.status(200).json({
    status: "success",
    data: client,
  });
});

exports.createClient = asyncHandler(async (req, res, next) => {
  const { lastName, firstName, email, gender, photo, age, goal } = req.body;
  const userId = req.user.id;

  if (!lastName || !firstName || !email) {
    return next(
      new AppError("Last name, first name and email are required.", 400)
    );
  }

  if (typeof age !== "number" || age < 0 || age > 120) {
    return next(new AppError("Invalid age.", 400));
  }

  if (gender && !["M", "W", "Other"].includes(gender)) {
    return next(
      new AppError("Invalid gender. Allowed values: M, W, Other.", 400)
    );
  }

  clientModel.create(
    lastName,
    firstName,
    email,
    gender,
    photo,
    age,
    goal,
    userId,
    (err) => {
      if (err) return next(new AppError("Error while creating client", 500));
      res
        .status(201)
        .json({ status: "success", message: "Client successfully created." });
    }
  );
});

exports.updateClient = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { lastName, firstName, email, gender, photo, age, goal } = req.body;

  if (!id || isNaN(id) || parseInt(id) < 1) {
    return next(new AppError("Invalid ID provided.", 400));
  }

  clientModel.findById(id, (err, client) => {
    if (err) {
      return next(new AppError("Error while fetching client.", 500));
    }
    if (!client) {
      return next(new AppError("Client not found with this ID.", 404));
    }

    if (!lastName || !firstName || !email) {
      return next(new AppError("Missing required fields.", 400));
    }

    clientModel.update(
      id,
      lastName,
      firstName,
      email,
      gender,
      photo,
      age,
      goal,
      (err) => {
        if (err) {
          return next(new AppError("Error while updating client.", 500));
        }

        res.status(200).json({
          status: "success",
          message: `Client with ID ${id} updated.`,
        });
      }
    );
  });
});

exports.deleteClient = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!id || isNaN(id) || parseInt(id) < 1) {
    return next(new AppError("Invalid ID provided.", 400));
  }

  clientModel.findById(id, (err, client) => {
    if (err) {
      return next(new AppError("Error while fetching client.", 500));
    }
    if (!client) {
      return next(new AppError("Client not found with this ID.", 404));
    }

    clientModel.delete(id, (err) => {
      if (err) {
        return next(new AppError("Error while deleting client.", 500));
      }

      res.status(200).json({
        status: "success",
        message: `Client with ID ${id} deleted.`,
      });
    });
  });
});
