const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const multer = require("multer");

const Admin = require("../models/Admin");
const authMiddleware = require("../middleware/authMiddleware");

const cloudinary = require("../config/cloudinary");

/* =========================
   MULTER
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
   LOGIN
========================= */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin || admin.password !== password) {
      return res.status(401).json({
        message: "Invalid Email or Password",
      });
    }

    const token = jwt.sign(
      {
        id: admin._id,
        role: admin.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      success: true,
      token,
      admin,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
});

/* =========================
   UPDATE ADMIN IMAGE
========================= */
router.put(
  "/update-image",
  authMiddleware,
  upload.single("image"),
  async (req, res) => {
    try {

      let imageUrl = "";

      if (req.file) {

        const result =
          await cloudinary.uploader.upload(
            req.file.path
          );

        imageUrl = result.secure_url;
      }

      const updatedAdmin =
        await Admin.findByIdAndUpdate(
          req.user.id,
          {
            image: imageUrl,
          },
          { new: true }
        );

      res.json({
        success: true,
        message: "Image Updated",
        admin: updatedAdmin,
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

module.exports = router;