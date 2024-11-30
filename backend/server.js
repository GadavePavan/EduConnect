const express = require("express");
const cors = require("cors");
const mainRouter = require("./routes");
const mongoose = require("mongoose");

// Initialize Express App
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/collaborative_learning", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// API Routes
app.use("/api/v1", mainRouter);

// Start the Server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
