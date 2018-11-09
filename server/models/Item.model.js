const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name: {type: String, required: true},
    category: {type: String, required: true},
    count: {type: Number, default: 1}
    },
    {versionKey: false}
);

module.exports = mongoose.model('Item', ItemSchema);