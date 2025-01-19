require("dotenv").config();
const connectDb = require("./db");
const express = require("express");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Company = require("./schema");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
app.use(helmet());

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: "Too many requests, please try again later.",
});

const corsOptions = (req, callback) => {
  const allowedOrigins = ["http://localhost:3000", "https://example.com"];
  const allowedMethods = ["GET", "POST", "PUT", "DELETE"];
  const allowedHeaders = ["Content-Type", "Authorization"];

  const origin = req.header("Origin");

  if (allowedOrigins.includes(origin)) {
    callback(null, {
      origin: true,
      methods: allowedMethods,
      allowedHeaders: allowedHeaders,
    });
  } else {
    callback(new Error("Not allowed by CORS"));
  }
};

app.use(cors(corsOptions));

const app = express();
app.use(express.json());

const SecretKey = process.env.SECRET_KEY;

const hashPassword = async (password) => {
  const saltRounnds = 10;
  try {
    const hashedpassword = await bcrypt.hash(password, saltRounnds);
    console.log(hashedpassword);
    return hashedpassword;
  } catch (error) {
    console.log({ message: error.message });
  }
};

const matchPassword = async (plainPassword, hashedpassword) => {
  try {
    const match = await bcrypt.compare(plainPassword, hashedpassword);
    if (match) {
      console.log("Password is correct!");
    } else {
      console.log("Password is incorrect!");
    }
    return match;
  } catch (err) {
    console.error("Error verifying password:", err);
  }
};

app.post("/register", apiLimiter, async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashedpassword = await hashPassword(password);
  const newUser = new Company({
    name: name,
    email: email,
    password: hashedpassword,
    role: role,
  });
  try {
    await newUser.save();
    res.status(201).json({ message: "user created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Happend Creating User", Error: error.message });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Company.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await matchPassword(password, user.password);
    if (isMatch) {
      const token = jwt.sign(
        { email: user.email, role: user.role },
        SecretKey,
        { expiresIn: 8600 }
      );
      res
        .status(200)
        .json({ message: "User LoggedIn successfully", token: token });
    } else {
      res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Happed Creating User", Error: error.message });
  }
});
app.post("/logout", (req, res) => {
  try {
    res.status(200).json({
      message:
        "Logged out successfully. Please clear your token on the client-side.",
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "An unexpected error occurred." });
  }
});
const verifytokens = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(403).json({ message: "No Token Provided" });
  }
  jwt.verify(token, SecretKey, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized" });
    }
    req.useremail = decoded.email;
    req.userRole = decoded.role;
    next();
  });
};

app.get("/dashboard", verifytokens, (req, res) => {
  res.send({ message: `Welcome User ${req.useremail}`, role: req.userRole });
});

app.get("/admin", verifytokens, (req, res) => {
  res.send({ message: `Hello Admin ${req.useremail}, you have full access.` });
});

const startServer = async () => {
  try {
    await connectDb();
    console.log("Database connected successfully!");

    app.listen(3000, () => {
      console.log("Server is running on http://localhost:3000");
    });
  } catch (error) {
    console.error("Error starting the server:", error.message);
    process.exit(1);
  }
};

startServer();
