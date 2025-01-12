const mongoose = require("mongoose");
const connectDb = require("./db");
const Details = require("./schema");
const bcrypt = require("bcrypt");
const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const crypto = require("crypto");
require("dotenv").config();
const nodemailer = require("nodemailer");
const app = express();
const rateLimit = require("express-rate-limit");

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: "mongodb://127.0.0.1:27017/myDatabase",
      ttl: 14 * 24 * 60 * 60,
    }),
    cookie: { secure: false },
  })
);

const generateResetToken = () => {
  const token = crypto.randomBytes(20).toString("hex");
  const expiry = Date.now() + 3600000; // Token expires in 1 hour
  return { token, expiry };
};

const resetPasswordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // Limit each IP to 3 requests per windowMs
  message:
    "Too many password reset requests from this IP, please try again later.",
});

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

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const hashedpassword = await hashPassword(password);
  const newUser = new Details({
    name: name,
    email: email,
    password: hashedpassword,
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

app.post("/user/logging", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Details.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await matchPassword(password, user.password);
    if (isMatch) {
      req.session.user = { id: user._id, email: user.email };
      res.status(200).json({ message: "User LoggedIn successfully" });
    } else {
      res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Happed Creating User", Error: error.message });
  }
});

app.post("/user/request-reset", resetPasswordLimiter, async (req, res) => {
  const { email } = req.body;
  const user = await Details.findOne({ email: email });
  try {
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    const { token, expiry } = generateResetToken();
    user.resetToken = token;
    user.resetTokenExpiry = expiry;
    await user.save();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "hrai6245@gmail.com",
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    const mailOptions = {
      from: "hrai6245@gmail.com",
      to: user.email,
      subject: "Reset Password",
      text: `Click the link to reset your password: http://localhost:3000/user/reset-password?token=${token}`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ message: "Error sending email" });
      }
      res.status(200).json({ message: "Password reset email sent" });
    });
  } catch (error) {
    res.status(500).json({
      message: "Error requesting password reset",
      error: error.message,
    });
  }
});

app.get("/user/reset-password", async (req, res) => {
  const { token } = req.query;

  const user = await Details.findOne({
    resetToken: token,
    resetTokenExpiry: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({ message: "Invalid or expired token" });
  }
  res.status(200).json({ message: "Token is valid", token });
});

app.post("/user/reset-password", async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    const user = await Details.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const hashedPassword = await hashPassword(newPassword);
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error resetting password", error: error.message });
  }
});

const requiredLogin = (req, res, next) => {
  if (!req.session.user) {
    return res
      .status(401)
      .json({ message: "Please log in to access this page" });
  }
  next();
};

app.get("/dashboard", requiredLogin, (req, res) => {
  res
    .status(200)
    .json({ message: `Welcome to your dashboard, ${req.session.user.email}` });
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Could not log out" });
    }
    res.status(200).json({ message: "Logged out successfully" });
  });
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
