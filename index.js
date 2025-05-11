require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const app = express();
const coachRoutes = require("./routes/coachRoutes");
const authRoutes = require("./routes/authRoutes");
const clientRoutes = require("./routes/clientRoutes");
const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/AppError");
const mensurationsRoutes = require("./routes/mensurationsRoutes");

const CORS = require("cors");
app.use(CORS());

app.use(express.json());

//app.use("/api/coaches", coachRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/mensurations", mensurationsRoutes);

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.use((req, res, next) => {
  next(
    new AppError(
      `Impossible de trouver ${req.originalUrl} sur ce serveur!`,
      404
    )
  );
});

app.use(globalErrorHandler);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
