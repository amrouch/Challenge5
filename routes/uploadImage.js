const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
    const extname = path.extname(file.originalname).toLowerCase();
    if (allowedExtensions.includes(extname)) {
        cb(null, true);
    } else {
        cb(new Error('Extension de l\'image non prise en charge'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter

});

router.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('Aucun fichier n\'a été téléchargé.');
    }

    res.send('Image téléchargé avec succès.');
});

module.exports = router;