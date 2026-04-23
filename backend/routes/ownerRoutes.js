const express = require("express");
const router = express.Router();
const multer = require("multer");
const Owner = require("../models/Owner");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.get("/", async (req, res) => {
  let owner = await Owner.findOne();

  if (!owner) {
    owner = await Owner.create({
      name: "Rakesh Saini",
      smallTitle: "Founder Story",
      heading1: "The Taste Creator Behind",
      heading2: "Gunnu Chinese Corner",
      description: "Owner content from backend",
      feature1: "Premium Food",
      feature2: "Top Rated Taste",
      feature3: "Luxury Service",
      whatsapp: "919839621748",
      experience: "12+ Years Experience",
      image: "",
    });
  }

  res.json(owner);
});

router.put("/update/:id", upload.single("image"), async (req, res) => {
  const data = { ...req.body };

  if (req.file) {
    data.image = req.file.filename;
  }

  const updated = await Owner.findByIdAndUpdate(
    req.params.id,
    data,
    { new: true }
  );

  res.json(updated);
});

module.exports = router;