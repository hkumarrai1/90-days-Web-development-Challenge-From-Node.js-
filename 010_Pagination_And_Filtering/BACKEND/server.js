const connectDB = require("./db");
const Stories = require("./schema");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
const corsOptions = (req, callback) => {
  const allowedOrigins = ["http://localhost:5173", "https://example.com"];
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
app.post("/create", async (req, res) => {
  const { id, story, genre } = req.body;
  const storyToAdd = new Stories({ id: id, story: story, genre: genre });
  try {
    await storyToAdd.save();
    res
      .status(201)
      .json({ message: "story Created Successfully", story: storyToAdd.story });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error Happend Creating", error: err.message });
  }
});

app.get("/stories", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const startIndex = (page - 1) * limit;

    const stories = await Stories.find().skip(startIndex).limit(limit).exec();

    res.status(200).json({
      message: "Stories fetched successfully",
      data: stories,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching stories",
      error: err.message,
    });
  }
});
app.get("/filter", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const genre = req.query.genre;
    const startIndex = (page - 1) * limit;

    if (!genre) {
      return res.status(400).json({
        message: "Genre is required",
      });
    }

    const genreExists = await Stories.exists({ genre });
    if (!genreExists) {
      return res.status(404).json({
        message: "Genre not available",
      });
    }

    const stories = await Stories.find({ genre: genre })
      .skip(startIndex)
      .limit(limit)
      .exec();

    res.status(200).json({
      message: "filtered Stories genere wise fetched successfully",
      data: stories,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching stories",
      error: err.message,
    });
  }
});

const startServer = async () => {
  try {
    await connectDB();
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
