const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");

const feedRoutes = require("./routes/feed");
const authRoutes = require("./routes/auth");

const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// Middleware setup
app.use(bodyParser.json());
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
app.use("/images", express.static(path.join(__dirname, "images")));

// CORS Headers setup using res.header()
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, PUT, POST, PATCH, DELETE, OPTIONS"
  );
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle preflight requests for CORS
  if (req.method === "OPTIONS") {
    return res.sendStatus(204); // No content for preflight
  }

  next();
});

// Routes
app.use("/feed", feedRoutes);
app.use("/auth", authRoutes);

// Error handling middleware
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

// MongoDB connection
mongoose
  .connect(
    "mongodb+srv://takudzwamushai:QtOFVsXgKrdHKl9c@cluster0.fivjgzv.mongodb.net/messages?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then((result) => {
    app.listen(process.env.PORT || 8080);
  })
  .catch((error) => {
    console.log(error);
  });

export default app;
