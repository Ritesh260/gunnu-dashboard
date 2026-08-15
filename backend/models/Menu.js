const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema(
  {
    // =========================
    // ITEM NAME
    // =========================
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // =========================
    // CATEGORY
    // =========================
    category: {
      type: String,
      required: true,
      trim: true,
    },

    // =========================
    // DESCRIPTION
    // =========================
    description: {
      type: String,
      default:
        "Fresh ingredients, premium sauces and perfect flavor in every bite.",
      trim: true,
    },

    // =========================
    // TAG
    // =========================
    tag: {
      type: String,
      default: "Popular",
      trim: true,
    },

    // =========================
    // PRICE
    // =========================
    price: {
      full: {
        type: Number,
        required: true,
        min: 0,
      },

      half: {
        type: Number,
        required: true,
        min: 0,
      },
    },

    // =========================
    // IMAGE
    // =========================
    image: {
      type: String,
      required: true,
    },

    // =========================
    // FOOD TYPE
    // =========================
    type: {
      type: String,
      enum: ["veg", "non-veg"],
      required: true,
    },

    // =========================
    // RATING
    // =========================
    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },
  },
  {
    timestamps: true,
  }
);

const Menu = mongoose.model("Menu", menuSchema);

module.exports = Menu;