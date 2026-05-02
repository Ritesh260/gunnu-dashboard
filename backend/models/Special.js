const mongoose = require("mongoose");

const specialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    type: {
      type: String,
      enum: ["veg", "non-veg"],
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    desc: {
      type: String,
      required: true,
    },

    badge: {
      type: String,
      default: "Popular",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "Special",
  specialSchema
);