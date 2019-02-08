const express = require('express');
const router = express.Router();
const _ = require('lodash');
const awsConfig = require('../../aws/config');
var AWS = awsConfig.initAWS('ap-northeast-1', 'asurion-poc.amadevops');
var docClient = new AWS.DynamoDB.DocumentClient();

router.get('/', (req, res, next) => {
    var params = {
        TableName: "test-dynamo-db",
    };

    docClient.scan(params, function(err, data) {
      if (err) {
        console.log('Error', err);
      } else {
        //console.log('Success', data.Items);
        data.Items.forEach(function(element, index, array) {
          console.log(`Symbol: ${element.symbol} | Description: ${element.description}`);
        });

        res.status(200).json(data);
      }
    });
});

router.get('/:symbol', (req, res, next) => {
    const stockIdParam = req.params;
    //TODO
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
    
    //TODO
});

router.patch('/', (req, res, next) => {
    res.status(200).json({});
});

router.delete('/', (req, res, next) => {
    res.status(200).json({});
});

module.exports = router;