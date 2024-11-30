const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const zod = require("zod");
const { User } = require("../db");
const { JWT_SECRET } = require("../config");

const router = express.Router();

const signupBody = zod.object({
  username: zod.string().email(),
  firstname: zod.string(),
  lastname: zod.string(),
  password: zod.string(),
});

// User Signup
router.post("/signup", async (req, res) => {
  const parsed = signupBody.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid input data" });
  }

  const { username, password, firstname, lastname } = parsed.data;

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    password: hashedPassword,
    firstName: firstname,
    lastName: lastname,
  });

  const token = jwt.sign({ userId: user._id }, JWT_SECRET);
  res.json({ message: "User created successfully", token });
});

// User Signin
router.post("/signin", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ userId: user._id }, JWT_SECRET);
  res.json({ token });
});

module.exports = router;
