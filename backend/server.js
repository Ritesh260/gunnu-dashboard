const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

/* ROUTES */
const menuRoutes = require("./routes/menuRoutes");
const ownerRoutes = require("./routes/ownerRoutes"); // ADD THIS

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());

/* STATIC IMAGE */
app.use("/uploads", express.static("uploads"));

/* API ROUTES */
app.use("/api/menu", menuRoutes);
app.use("/api/owner", ownerRoutes); // ADD THIS

/* DATABASE */
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

/* TEST */
app.get("/", (req, res) => {
  res.send("Backend Running...");
});

/* SERVER */
app.listen(5000, () => {
  console.log("Server running on port 5000");
});