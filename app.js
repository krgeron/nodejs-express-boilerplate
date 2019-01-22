const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const stockRoutes = require('./api/routes/stocks');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/stocks', stockRoutes);
app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

mongoose.connect('mongodb://rupert:Arigato123@mongodb-707-0.cloudclusters.net/test-db?authSource=admin', {useNewUrlParser : true});
mongoose.Promise = global.Promise;

module.exports = app;