const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SliderSchema = new Schema({
        label : {
            type     : String,
            required : true
        },
        text  : {
            type     : String,
            required : true
        },
        image : {
            type     : String,
            required : true
        },
        order : {
            type     : Number,
            required : true
        }
    },
    {
        versionKey : false
    }
);

module.exports = mongoose.model('Slider', SliderSchema);