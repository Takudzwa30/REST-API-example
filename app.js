const path = require("path");

const express = require("express");

const bodyParser = require("body-parser");

const mongoose = require("mongoose");

const feedRoutes = require("./routes/feed");

const app = express();

// application/json
app.use(bodyParser.json());

app.use("/images", express.static(path.join(__dirname, "images")));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, PUT, POST, PATCH, DELETE"
    );
    res.setHeader(
        "Access-COntrol-Allow-Headers",
        "Content-Type, Authorization"
    );
    next();
});

app.use("/feed", feedRoutes);
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({ message: message });
});

mongoose
    .connect(
        "mongodb+srv://takudzwamushai:QtOFVsXgKrdHKl9c@cluster0.fivjgzv.mongodb.net/messages?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then((result) => {
        app.listen(8080);
    })
    .catch((error) => {
        console.log(error);
    });
