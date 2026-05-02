const express = require("express");
const router = express.Router();
const multer = require("multer");

const Special = require("../models/Special");
const authMiddleware = require("../middleware/authMiddleware");
const cloudinary = require("../config/cloudinary");

/* MULTER */
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
   ADD SPECIAL
========================= */
router.post(
  "/add",
  authMiddleware,
  upload.single("image"),
  async (req, res) => {
    try {
      let imageUrl = "";

      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);

        imageUrl = result.secure_url;
      }

      const special = new Special({
        name: req.body.name,
        price: req.body.price,
        type: req.body.type,
        badge: req.body.badge,
        desc: req.body.desc,
        image: imageUrl,
      });

      await special.save();

      res.json({
        success: true,
        message: "Special Added",
        special,
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
   GET ALL
========================= */
router.get("/", async (req, res) => {
  try {

    const specials = await Special.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      specials,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/* =========================
   DELETE
========================= */
router.delete(
  "/:id",
  authMiddleware,
  async (req, res) => {
    try {

      await Special.findByIdAndDelete(req.params.id);

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