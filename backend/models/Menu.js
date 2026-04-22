const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  image: String,
  type: String
});

const Menu = mongoose.model("Menu", menuSchema);

module.exports = Menu;