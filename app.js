const port = 8500;
const express = require('express');
const app = express();

// Server
app.listen(port, (err) => {
    if(err) return console.log(`Error in setting up server: ${err}`);
    console.log("Server up and running on port:", port);
});