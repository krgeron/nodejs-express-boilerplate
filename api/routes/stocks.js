const express = require('express');
const router = express.Router();
const Stock = require('../models/stock');
const mongoose = require('mongoose');
const _ = require('lodash');

router.get('/', (req, res, next) => {
    Stock.find()
        .select('name')
        .select('symbol')
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        });
    // Stock.find({}, 'name', function (err, stocks) {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         console.log(stocks);
    //         res.status(200).json(stocks);
    //     }
    // });
});

router.get('/:symbol', (req, res, next) => {
    const stockIdParam = req.params;
    Stock.find(stockIdParam)
        .select('symbol')
        .select('name')
        .exec()
        .then(docs => {
            if (!_.isEmpty(docs)) {
                res.status(200).json(docs);
            } else {
                res.status(200).json({});
            }
        }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.post('/', (req, res, next) => {

    const name = req.body.name;
    const symbol = req.body.symbol;

    console.log(`Name ${name} and Symbol ${symbol}`);
    if (_.isUndefined(name) || _.isUndefined(symbol)) {
        res.status(400).json({
            message: 'Bad Request'
        });

        return;
    }

    const stock = new Stock({
        _id: new mongoose.Types.ObjectId(),
        name: name,
        symbol: symbol
    });

    stock.save().then(result => {
        res.status(201).json({
            message: 'Sucessfully created!'
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.patch('/', (req, res, next) => {
    res.status(200).json({});
});

router.delete('/', (req, res, next) => {
    res.status(200).json({
        message: 'Sucessfully deleted'
    })
});

module.exports = router;