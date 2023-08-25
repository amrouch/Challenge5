const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.post('/uploads', upload.array('images',), (req, res) => {
    if (!req.files) {
        return res.status(400).send('Aucun fichier n\'a été téléchargé.');
    }

    const filenames = req.files.map(file => file.filename);
    res.send('Images téléchargées avec succès : ' + filenames.join(', '));
});

module.exports = router;