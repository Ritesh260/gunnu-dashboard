const express = require("express");
const router = express.Router();

const Category = require("../models/Category");
const authMiddleware = require("../middleware/authMiddleware");

/* =========================
   GET ALL CATEGORIES
========================= */

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find({
      active: true,
    }).sort({ createdAt: 1 });

    res.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});


/* =========================
   ADD CATEGORY
========================= */

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, type } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Category name is required",
      });
    }

    const existingCategory = await Category.findOne({
      name: name.trim(),
    });

    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Category already exists",
      });
    }

    const category = new Category({
      name: name.trim(),
      type: type || "both",
    });

    await category.save();

    res.status(201).json({
      success: true,
      message: "Category Added Successfully",
      data: category,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});


/* =========================
   DELETE CATEGORY
========================= */

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.json({
      success: true,
      message: "Category Deleted Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});


module.exports = router;