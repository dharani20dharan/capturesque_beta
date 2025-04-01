const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");

// App Configuration
const app = express();
app.use(cors());
app.use(bodyParser.json());
const PORT = 8000;
const SECRET_KEY = "mySecretKey12345"; // Replace with a secure secret key

// MongoDB Configuration
const MONGO_URI = "mongodb+srv://Aadithyaa_Abu:0987654AadiTT@cluster0.dbja7.mongodb.net/User?retryWrites=true&w=majority";
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Define User Model
const User = mongoose.model("User", userSchema);

// Routes

// Register User
app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, error: "Email is already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save new user to the database
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.json({ success: true, message: "Registration successful" });
  } catch (error) {
    console.error("Registration error:", error);
    res.json({ success: false, error: "Registration failed" });
  }
});

// Login User
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, error: "Invalid email or password" });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.json({ success: false, error: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: "1h" });

    res.json({ success: true, token, message: "Login successful" });
  } catch (error) {
    console.error("Login error:", error);
    res.json({ success: false, error: "Login failed" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
