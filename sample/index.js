const express = require('express');
const multer = require('multer');
const { join } = require('path');
const { optimageConvert } = require('optimage');

const upload = multer({ storage: multer.memoryStorage() });
const app = express();

app.use(express.static(join(__dirname, '/public/')));

app.post('/upload', upload.single('image'), async (req, res) => {
    try {
        const response = await optimageConvert(req.file.buffer);
        console.log(response);
    } catch (e) {
        console.log('Optiamge error: ', e);
    } finally {
        res.redirect('/');
    }
});

app.listen(3000);