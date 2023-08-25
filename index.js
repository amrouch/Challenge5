const express = require('express');
const routes = require('./routes/uploadImage');
const route = require('./routes/uploadImages');
const path = require('path');

const app = express();

app.use(express.json());
app.use(routes);
app.use(route);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(function (err, req, res, next) {
    res.status(422).send({ error: err.message });
});

app.listen(process.env.port || 4000, function () {
    console.log('now listening for requests')
});