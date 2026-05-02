const express = require("express");
const router = express.Router();
const multer = require("multer");
const Menu = require("../models/Menu");
const authMiddleware = require("../middleware/authMiddleware");
const cloudinary = require("../config/cloudinary");

/* =========================
   MULTER (TEMP STORAGE)
========================= */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

/* =========================
   ADD ITEM
========================= */
router.post(
  "/add",
  authMiddleware,
  upload.single("image"),
  async (req, res) => {
    try {
      let imageUrl = "";

      // 👉 upload image to cloudinary
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        imageUrl = result.secure_url;
      }

      const newItem = new Menu({
        name: req.body.name,
        category: req.body.category,
        description: req.body.description,
        tag: req.body.tag,
        price: req.body.price,
        type: req.body.type,
        rating: req.body.rating || 5,
        image: imageUrl,
      });

      await newItem.save();

      res.json({
        success: true,
        message: "Item Added Successfully",
        data: newItem,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
);

/* =========================
   GET ALL ITEMS
========================= */
router.get("/", async (req, res) => {
  try {
    const items = await Menu.find().sort({ createdAt: -1 });

    res.json(items);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

/* =========================
   GET SINGLE ITEM
========================= */
router.get("/:id", async (req, res) => {
  try {
    const item = await Menu.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    res.json(item);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/* =========================
   UPDATE ITEM
========================= */
router.put(
  "/:id",
  authMiddleware,
  upload.single("image"),
  async (req, res) => {
    try {
      const updateData = {
        name: req.body.name,
        category: req.body.category,
        description: req.body.description,
        tag: req.body.tag,
        price: req.body.price,
        type: req.body.type,
        rating: req.body.rating,
      };

      // 👉 if new image uploaded
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        updateData.image = result.secure_url;
      }

      const updatedItem = await Menu.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );

      res.json({
        success: true,
        message: "Item Updated Successfully",
        data: updatedItem,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
);

/* =========================
   DELETE ITEM
========================= */
router.delete(
  "/:id",
  authMiddleware,
  async (req, res) => {
    try {
      await Menu.findByIdAndDelete(req.params.id);

      res.json({
        success: true,
        message: "Deleted Successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
);

module.exports = router;