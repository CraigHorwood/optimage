const express = require('express');
const multer = require('multer');
const { join } = require('path');
const { optimageConvert } = require('optimage');

const upload = multer({ storage: multer.memoryStorage() });
const app = express();

app.use(express.static(join(__dirname, '/public/')));

app.post('/upload', upload.single('image'), async (req, res) => {
    try {
        const response = await optimageConvert(req.file.buffer, JSON.parse(req.body.options));
        res.status(200).send(response);
    } catch (e) {
        console.log('Optimage error: ', e);
        res.status(500).send(e.message);
    }
});

app.listen(3000);