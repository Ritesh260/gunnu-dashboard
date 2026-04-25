const express = require("express");
const router = express.Router();
const multer = require("multer");
const Menu = require("../models/Menu");
const authMiddleware = require("../middleware/authMiddleware");

/* Upload Config */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

/* ===========================
   ADD ITEM (Protected)
=========================== */
router.post(
  "/add",
  authMiddleware,
  upload.single("image"),
  async (req, res) => {
    try {
      const newItem = new Menu({
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        type: req.body.type,

        image: req.file
          ? `http://localhost:5000/uploads/${req.file.filename}`
          : "",
      });

      await newItem.save();

      res.json({
        success: true,
        message: "Item Added Successfully",
        data: newItem,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
);

/* ===========================
   GET ALL ITEMS
=========================== */
router.get("/", async (req, res) => {
  try {
    const items = await Menu.find().sort({
      createdAt: -1,
    });

    res.json(items);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

/* ===========================
   GET SINGLE ITEM
=========================== */
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

/* ===========================
   UPDATE ITEM (Protected)
=========================== */
router.put(
  "/:id",
  authMiddleware,
  upload.single("image"),
  async (req, res) => {
    try {
      const updateData = {
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        type: req.body.type,
      };

      if (req.file) {
        updateData.image =
          `http://localhost:5000/uploads/${req.file.filename}`;
      }

      const updatedItem =
        await Menu.findByIdAndUpdate(
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

/* ===========================
   DELETE ITEM (Protected)
=========================== */
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