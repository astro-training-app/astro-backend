require("dotenv").config();
const express = require("express");
const CORS = require("cors");

const coachRoutes = require("./routes/coachRoutes");
const authRoutes = require("./routes/authRoutes");
const clientRoutes = require("./routes/clientRoutes");
const measurementRoutes = require("./routes/measurementRoutes");

const AppError = require("./utils/AppError");
const globalErrorHandler = require("./controllers/errorController");

const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(
  CORS({
    origin: "http://localhost:3001",
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/coaches", coachRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/measurements", measurementRoutes);

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.use((req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server!`, 404));
});

// Global error handler
app.use(globalErrorHandler);

module.exports = app;
