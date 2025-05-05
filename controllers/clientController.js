const clientModel = require("../models/clientModel");
const asyncHandler = require("express-async-handler");
const AppError = require("../utils/AppError");

exports.getClientsForUser = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  const clients = await new Promise((resolve, reject) => {
    clientModel.findByCoachId(userId, (err, results) => {
      if (err) return reject(new AppError("Erreur DB", 500));
      resolve(results);
    });
  });

  res.status(200).json({
    status: "success",
    data: clients,
  });
});

exports.createClient = asyncHandler(async (req, res, next) => {
  const { nom, prenom, email, sexe, photo, age, objectif } = req.body;
  const userId = req.user.id;

  clientModel.create(
    nom,
    prenom,
    email,
    sexe,
    photo,
    age,
    objectif,
    userId,
    (err) => {
      if (err)
        return next(new AppError("Erreur lors de la création du client", 500));
      res
        .status(201)
        .json({ status: "success", message: "Client créé avec succès." });
    }
  );
});
