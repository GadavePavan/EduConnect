const express = require("express");
const userRoutes = require("./userRoutes");
const adminRoutes = require("./adminRoutes");

const router = express.Router();

router.use("/users", userRoutes);
router.use("/admins", adminRoutes);

module.exports = router;
