const express = require("express");
const app = express();
const coachRoutes = require("./routes/coachRoutes");
const authRoutes = require("./routes/authRoutes");
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/AppError');

require('dotenv').config(); // Load environment variables from .env file

app.use(express.json());

//app.use("/api/coaches", coachRoutes);
app.use("/api/auth", authRoutes);

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.use((req, res, next) => {
  next(new AppError(`Impossible de trouver ${req.originalUrl} sur ce serveur!`, 404));
});

app.use(globalErrorHandler); // Global error handler

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
