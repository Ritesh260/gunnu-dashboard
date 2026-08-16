const express = require("express");
const router = express.Router();
const multer = require("multer");

const Menu = require("../models/Menu");
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
   ADD ITEM
========================= */

router.post(
  "/add",
  authMiddleware,
  upload.single("image"),
  async (req, res) => {
    try {
      console.log("BODY:", req.body);

      let imageUrl = "";

      /* =========================
         VALIDATE PRICE
      ========================= */

      const fullPrice = Number(req.body.fullPrice);

if (
  !req.body.fullPrice ||
  Number.isNaN(fullPrice)
) {
  return res.status(400).json({
    success: false,
    error: "Full price is required",
  });
}

let halfPrice;

if (
  req.body.halfPrice !== undefined &&
  req.body.halfPrice !== ""
) {
  halfPrice = Number(req.body.halfPrice);

  if (Number.isNaN(halfPrice)) {
    return res.status(400).json({
      success: false,
      error: "Invalid half price",
    });
  }
}

      /* =========================
         UPLOAD IMAGE
      ========================= */

      if (req.file) {
        const result = await cloudinary.uploader.upload(
          req.file.path
        );

        imageUrl = result.secure_url;
      }

      /* =========================
         CREATE ITEM
      ========================= */

      const newItem = new Menu({
        name: req.body.name,
        category: req.body.category,

        description:
          req.body.description ||
          "Fresh ingredients, premium sauces and perfect flavor in every bite.",

        tag: req.body.tag || "Popular",

        /* FULL + HALF PRICE */
        price: {
          full: fullPrice,
          half: halfPrice,
        },

        type: req.body.type,

        rating: Number(req.body.rating) || 5,

        image: imageUrl,
      });

      /* =========================
         SAVE
      ========================= */

      await newItem.save();

      res.status(201).json({
        success: true,
        message: "Item Added Successfully",
        data: newItem,
      });
    } catch (error) {
      console.log("ADD MENU ERROR:", error);

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
    const items = await Menu.find().sort({
      createdAt: -1,
    });

    res.json(items);
  } catch (error) {
    res.status(500).json({
      success: false,
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
      console.log("UPDATE BODY:", req.body);

      /* =========================
         FULL PRICE
         REQUIRED
      ========================= */

      if (
        req.body.fullPrice === undefined ||
        req.body.fullPrice === null ||
        req.body.fullPrice === ""
      ) {
        return res.status(400).json({
          success: false,
          error: "Full price is required",
        });
      }

      const fullPrice = Number(req.body.fullPrice);

      if (Number.isNaN(fullPrice)) {
        return res.status(400).json({
          success: false,
          error: "Invalid full price",
        });
      }

      /* =========================
         HALF PRICE
         OPTIONAL
      ========================= */

      let halfPrice;

      if (
        req.body.halfPrice !== undefined &&
        req.body.halfPrice !== null &&
        req.body.halfPrice !== ""
      ) {
        halfPrice = Number(req.body.halfPrice);

        if (Number.isNaN(halfPrice)) {
          return res.status(400).json({
            success: false,
            error: "Invalid half price",
          });
        }
      }

      /* =========================
         UPDATE DATA
      ========================= */

      const updateData = {
        name: req.body.name,
        category: req.body.category,
        description: req.body.description,
        tag: req.body.tag || "Popular",

        price: {
          full: fullPrice,
        },

        type: req.body.type,
        rating: Number(req.body.rating) || 5,
      };

      /* =========================
         HALF PRICE
         
         If entered:
         save half price

         If removed:
         don't keep old half price
      ========================= */

      if (halfPrice !== undefined) {
        updateData.price.half = halfPrice;
      } else {
        updateData.price.half = undefined;
      }

      /* =========================
         NEW IMAGE
      ========================= */

      if (req.file) {
        const result = await cloudinary.uploader.upload(
          req.file.path
        );

        updateData.image = result.secure_url;
      }

      /* =========================
         UPDATE
      ========================= */

      const updatedItem =
        await Menu.findByIdAndUpdate(
          req.params.id,
          updateData,
          {
            new: true,
            runValidators: true,
          }
        );

      if (!updatedItem) {
        return res.status(404).json({
          success: false,
          message: "Item not found",
        });
      }

      res.json({
        success: true,
        message: "Item Updated Successfully",
        data: updatedItem,
      });
    } catch (error) {
      console.log("UPDATE MENU ERROR:", error);

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
      const deletedItem =
        await Menu.findByIdAndDelete(req.params.id);

      if (!deletedItem) {
        return res.status(404).json({
          success: false,
          message: "Item not found",
        });
      }

      res.json({
        success: true,
        message: "Deleted Successfully",
      });
    } catch (error) {
      console.log("DELETE MENU ERROR:", error);

      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
);

module.exports = router;