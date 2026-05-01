const express = require("express");
const router = express.Router();
const cloudinary = require("../config/cloudinary");
const multer = require("multer");

const Gallery = require("../models/Gallery");
const authMiddleware = require("../middleware/authMiddleware");

/* TEMP STORAGE (memory) */
const storage = multer.memoryStorage();
const upload = multer({ storage });

/* =========================
   UPLOAD IMAGE
========================= */
router.post("/add", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const dataURI = "data:" + req.file.mimetype + ";base64," + b64;

    const result = await cloudinary.uploader.upload(dataURI, {
      folder: "gallery",
    });

    const gallery = await Gallery.create({
      image: result.secure_url,
    });

    res.json({
      success: true,
      gallery,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* =========================
   GET ALL IMAGES
========================= */
router.get("/", async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      images,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* =========================
   DELETE IMAGE
========================= */
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;