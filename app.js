const port = 8500;
const express = require('express');
const app = express();
const fs = require('fs');
const multer = require('multer');
const { createWorker } = require('tesseract.js');

// assets
app.use(express.static('./assets'));

// views
app.set("view engine", "ejs");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

// upload function
const upload = multer({ storage: storage }).single("avatar");

/** routes **/

app.get("/", (req, res) => {
    res.render('index');
});

app.post("/upload", (req, res) => {
    upload(req, res, (err) => {
        
    });
});

app.get("/download", (req, res) => {
    res.redirect("/");
});

// Server
app.listen(port, (err) => {
    if(err) return console.log(`Error in setting up server: ${err}`);
    console.log("Server up and running on port:", port);
});