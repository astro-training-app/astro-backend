require('../utils/AppError');

const sendErrorDev = (err, res) => {
    res.status(err.statusCode || 500).json({
      status: err.status || 'error',
      error: err,
      message: err.message,
      stack: err.stack 
    });
  };
  
  // Fonction pour envoyer les erreurs en environnement de production (générique)
  const sendErrorProd = (err, res) => {
    // Erreurs opérationnelles (attendues, ex: validation, non trouvé): envoyer un message clair au client
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message
      });
    }
    // Erreurs de programmation ou inconnues: ne pas fuiter les détails
    else {
      // 1. Logger l'erreur pour les développeurs
      console.error('ERREUR 💥', err);
      // 2. Envoyer un message générique au client
      res.status(500).json({
        status: 'error',
        message: 'Quelque chose s\'est très mal passé !' // Message générique
      });
    }
  };
  
  
  // Le gestionnaire d'erreurs global
  module.exports = (err, req, res, next) => {
    // Logique pour définir un statut et un message par défaut si non présents
    err.statusCode = err.statusCode || 500; // 500 Internal Server Error par défaut
    err.status = err.status || 'error';
  
    // Différencier les réponses en fonction de l'environnement
    if (process.env.NODE_ENV === 'production') {
        let error = { ...err, message: err.message }; 

        // Exemple: Gérer une erreur JWT invalide
         if (error.name === 'JsonWebTokenError') error = new AppError('Token invalide. Veuillez vous reconnecter.', 401);
         // Exemple: Gérer une erreur JWT expiré
         if (error.name === 'TokenExpiredError') error = new AppError('Votre session a expiré. Veuillez vous reconnecter.', 401);
  
  
        sendErrorProd(error, res);
    } else {
      // En développement, envoyer des erreurs détaillées
      sendErrorDev(err, res);
    }
  };