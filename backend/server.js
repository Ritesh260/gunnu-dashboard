const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const fs = require("fs");
const path = require("path");

const app = express();

/* =========================
   CREATE UPLOADS FOLDER
========================= */
const uploadPath = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

/* =========================
   MIDDLEWARE
========================= */
app.use(cors());
app.use(express.json());

/* =========================
   STATIC FILES (🔥 IMPORTANT FIX)
   THIS FIXES YOUR IMAGE NOT SHOWING ISSUE
========================= */
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

/* =========================
   ROUTES
========================= */
const menuRoutes = require("./routes/menuRoutes");
const ownerRoutes = require("./routes/ownerRoutes");
const authRoutes = require("./routes/authRoutes");
const settingsRoutes = require("./routes/settingsRoutes");
const galleryRoutes = require("./routes/galleryRoutes");
const specialRoutes = require("./routes/specialRoutes");
app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/owner", ownerRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/special", specialRoutes);
/* =========================
   TEST ROUTE
========================= */
app.get("/", (req, res) => {
  res.send("Backend Running...");
});

/* =========================
   DATABASE + SERVER START
========================= */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(process.env.PORT || 5000, () => {
      console.log("Server running...");
    });
  })
  .catch((err) => console.log(err));