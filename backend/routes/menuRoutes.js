const express = require("express");
const router = express.Router();
const multer = require("multer");
const Menu = require("../models/Menu");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/add", upload.single("image"), async (req, res) => {
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

    res.json({ message: "Item Added Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  const items = await Menu.find();
  res.json(items);
});

router.delete("/:id", async (req, res) => {
  await Menu.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted Successfully" });
});

module.exports = router;