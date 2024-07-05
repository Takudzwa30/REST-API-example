const express = require("express");

const bodyParser = require("body-parser");

const mongoose = require("mongoose");

const feedRoutes = require("./routes/feed");

const app = express();

// application/json
app.use(bodyParser.json());

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
