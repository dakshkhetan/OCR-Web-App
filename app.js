const port = process.env.PORT || 8500;
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
        (async () => {
            const worker = createWorker({
                logger: m => console.log(m)
            });
            await worker.load();
            await worker.loadLanguage('eng');
            await worker.initialize('eng');
            const { data: { text } } = await worker.recognize(`./uploads/${req.file.originalname}`);
            // console.log(text);
            const { data } = await worker.getPDF('OCR Result');
            fs.writeFileSync('ocr-result.pdf', Buffer.from(data));
            console.log('PDF generated: ocr-result.pdf');
            res.redirect("/download");
            await worker.terminate();
        })();
    });
});

app.get("/download", (req, res) => {
    const file = `${__dirname}/ocr-result.pdf`;
    res.download(file);
});

// Server
app.listen(port, (err) => {
    if(err) return console.log(`Error in setting up server: ${err}`);
    console.log("Server up and running on port:", port);
});