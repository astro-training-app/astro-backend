const express = require("express");
const app = express();
const coachRoutes = require("./routes/coachRoutes");

app.use(express.json());
app.use("/api/coaches", coachRoutes);

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
