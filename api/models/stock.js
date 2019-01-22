const mongoose = require('mongoose');
const stockSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    symbol: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Stock', stockSchema);