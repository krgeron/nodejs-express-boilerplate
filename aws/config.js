
const AWS = require('aws-sdk');
var config = {
    initAWS : (region, profile) => {
        AWS.config.credentials = new AWS.SharedIniFileCredentials({profile: profile});
        AWS.config.update({region: region});   
        
        return AWS;
    },
};

module.exports = config;