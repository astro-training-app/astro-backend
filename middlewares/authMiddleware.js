const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");

const JWT_SECRET = process.env.JWT_SECRET;

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return next(new AppError("Access denied: missing token", 401));
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(new AppError("Invalid or expired token", 403));
    }

    req.user = decoded.user;
    next();
  });
}

module.exports = authenticateToken;
