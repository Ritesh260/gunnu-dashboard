const express = require("express");
const router = express.Router();
const multer = require("multer");
const Review = require("../models/Review");
const cloudinary = require("../config/cloudinary");

/* =========================
   MULTER (same as menu)
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
   ADD REVIEW (USER SIDE)
========================= */
router.post("/", upload.single("image"), async (req, res) => {
  try {
    let imageUrl = "";

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;
    } else {
      imageUrl = `https://ui-avatars.com/api/?name=${req.body.name}`;
    }

    const newReview = new Review({
      name: req.body.name,
      role: req.body.role,
      review: req.body.review,
      image: imageUrl,
    });

    await newReview.save();

    res.json({
      success: true,
      message: "Review Submitted",
      data: newReview,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* =========================
   GET APPROVED (FRONTEND)
========================= */
router.get("/", async (req, res) => {
  const reviews = await Review.find({ approved: true }).sort({ createdAt: -1 });
  res.json(reviews);
});

/* =========================
   GET ALL (ADMIN)
========================= */
router.get("/all", async (req, res) => {
  const reviews = await Review.find().sort({ createdAt: -1 });
  res.json(reviews);
});

/* =========================
   APPROVE (ADMIN)
========================= */
router.put("/:id/approve", async (req, res) => {
  await Review.findByIdAndUpdate(req.params.id, { approved: true });
  res.json({ success: true });
});

/* =========================
   DELETE (ADMIN)
========================= */
router.delete("/:id", async (req, res) => {
  await Review.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;