const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema({
  image: String,
  experience: String,
  smallTitle: String,
  heading1: String,
  heading2: String,
  name: String,
  description: String,
  feature1: String,
  feature2: String,
  feature3: String,
  whatsapp: String,
});

module.exports = mongoose.model("Owner", ownerSchema);