const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const fs = require("fs"); // 👈 ADD THIS

const app = express();

/* CREATE UPLOADS FOLDER */
const uploadPath = "uploads";
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

/* ROUTES */
const menuRoutes = require("./routes/menuRoutes");
const ownerRoutes = require("./routes/ownerRoutes");
const authRoutes = require("./routes/authRoutes");
const settingsRoutes = require("./routes/settingsRoutes");
const galleryRoutes = require("./routes/galleryRoutes");

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());

/* API ROUTES */
app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/owner", ownerRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/gallery", galleryRoutes);

/* TEST */
app.get("/", (req, res) => {
  res.send("Backend Running...");
});

/* DB */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(process.env.PORT || 5000, () => {
      console.log("Server running...");
    });
  })
  .catch((err) => console.log(err));