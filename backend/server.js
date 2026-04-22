const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const menuRoutes = require("./routes/menuRoutes");
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api/menu", menuRoutes);
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("Backend Running...");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});