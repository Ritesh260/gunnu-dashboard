const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, default: "Customer" },
    review: { type: String, required: true },
    image: { type: String },
    approved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);