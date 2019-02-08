const express = require('express');
const router = express.Router();
const Stock = require('../models/stock');
const mongoose = require('mongoose');
const _ = require('lodash');
const awsConfig = require('../../aws/config');
const AWS = awsConfig.initAWS('ap-northeast-1', 'asurion-poc.amadevops');
const uuid = require('uuid/v4');


var ctr = 0;

const docClient = new AWS.DynamoDB.DocumentClient();

router.get('/', (req, res, next) => {

    var params = {
        TableName : 'test-dynamo-db',
    };

    docClient.scan(params, function(err, data) {
        if(err) {
            console.log(`Error: ${JSON.stringify(err)}`)
        } else {
            console.log(`Success: ${JSON.stringify(data)}`);
            res.status(200).json(data);
        }
    });
    
    // Stock.find()
    //     .select('name')
    //     .select('symbol')
    //     .exec()
    //     .then(docs => {
    //         console.log(docs);
    //         res.status(200).json(docs);
    //     }).catch(err => {
    //         console.log(err.message);
    //     });
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
    let stockIdParam = req.params;
 
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