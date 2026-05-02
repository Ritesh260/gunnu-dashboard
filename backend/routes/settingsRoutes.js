const express = require("express");
const router = express.Router();
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
   GET PROFILE
========================= */
router.get(
  "/profile",
  authMiddleware,
  async (req, res) => {
    try {

      const admin =
        await Admin.findById(req.user.id)
        .select("-password");

      if (!admin) {
        return res.status(404).json({
          success: false,
          message: "Admin not found",
        });
      }

      res.json({
        success: true,
        admin,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });

    }
  }
);

/* =========================
   UPDATE PROFILE
========================= */
router.put(
  "/profile",
  authMiddleware,
  upload.single("image"),
  async (req, res) => {
    try {

      const updateData = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
      };

      /* CLOUDINARY IMAGE */
      if (req.file) {

        const result =
          await cloudinary.uploader.upload(
            req.file.path
          );

        updateData.image =
          result.secure_url;
      }

      const admin =
        await Admin.findByIdAndUpdate(
          req.user.id,
          updateData,
          { new: true }
        ).select("-password");

      res.json({
        success: true,
        message: "Profile updated successfully",
        admin,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message: error.message,
      });

    }
  }
);

module.exports = router;