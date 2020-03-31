const port = 8500;
const express = require('express');
const app = express();

// assets
app.use(express.static('./assets'));

// views
app.set("view engine", "ejs");

// Server
app.listen(port, (err) => {
    if(err) return console.log(`Error in setting up server: ${err}`);
    console.log("Server up and running on port:", port);
});