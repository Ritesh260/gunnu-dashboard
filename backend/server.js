const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

/* ROUTES */
const menuRoutes = require("./routes/menuRoutes");
const ownerRoutes = require("./routes/ownerRoutes");
const authRoutes = require("./routes/authRoutes");
const settingsRoutes = require("./routes/settingsRoutes");

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());

/* STATIC IMAGE */
app.use("/uploads", express.static("uploads"));

/* API ROUTES */
app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/owner", ownerRoutes);
app.use("/api/settings", settingsRoutes);

/* TEST */
app.get("/", (req, res) => {
  res.send("Backend Running...");
});

/* DATABASE + SERVER START */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(process.env.PORT || 5000, () => {
      console.log("Server running...");
    });
  })
  .catch((err) => {
    console.log("Mongo Error:", err);
  });