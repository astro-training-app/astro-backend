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

exports.getClientById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const coachId = req.user.id;

  const client = await new Promise((resolve, reject) => {
    clientModel.findByIdAndCoachId(id, coachId, (err, results) => {
      if (err) return reject(new AppError("Erreur DB", 500));
      resolve(results);
    });
  });

  if (!client) {
    return next(new AppError("Aucun client trouvé.", 404));
  } else {
    res.status(200).json({
      status: "success",
      data: client,
    });
  }
});

exports.createClient = asyncHandler(async (req, res, next) => {
  console.log("req.body", req.body);
  const { nom, prenom, email, sexe, photo, age, objectif } = req.body;
  const userId = req.user.id;

  if (!nom || !prenom || !email) {
    return next(new AppError("Nom, prénom et email sont requis.", 400));
  }

  if (typeof age !== "number" || age < 0 || age > 120) {
    return next(new AppError("Âge invalide.", 400));
  }

  if (sexe && !["H", "F", "Autre"].includes(sexe)) {
    return next(
      new AppError("Sexe invalide. Valeurs autorisées : H, F, Autre.", 400)
    );
  }

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

exports.updateClient = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { nom, prenom, email, sexe, photo, age, objectif } = req.body;

  if (!id || isNaN(id) || parseInt(id) < 1) {
    return next(new AppError("ID invalide fourni.", 400));
  }

  clientModel.findById(id, (err, client) => {
    if (err) {
      return next(new AppError("Erreur lors de la recherche du client.", 500));
    }
    if (!client) {
      return next(new AppError("Aucun client trouvé avec cet ID.", 404));
    }

    if (!nom || !prenom || !email) {
      return next(new AppError("Champs obligatoires manquants.", 400));
    }

    clientModel.update(
      id,
      nom,
      prenom,
      email,
      sexe,
      photo,
      age,
      objectif,
      (err) => {
        if (err) {
          return next(new AppError("Erreur lors de la mise à jour.", 500));
        }

        res.status(200).json({
          status: "success",
          message: `Client avec l'ID ${id} mis à jour.`,
        });
      }
    );
  });
});

exports.deleteClient = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!id || isNaN(id) || parseInt(id) < 1) {
    return next(new AppError("ID invalide fourni.", 400));
  }

  clientModel.findById(id, (err, client) => {
    if (err) {
      return next(new AppError("Erreur lors de la recherche du client.", 500));
    }
    if (!client) {
      return next(new AppError("Aucun client trouvé avec cet ID.", 404));
    }

    clientModel.delete(id, (err) => {
      if (err) {
        return next(
          new AppError("Erreur lors de la suppression du client.", 500)
        );
      }

      res.status(200).json({
        status: "success",
        message: `Client avec l'ID ${id} supprimé.`,
      });
    });
  });
});
