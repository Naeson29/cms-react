const mongoose      = require('mongoose');
const Schema        = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

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
        },
        order : {
            type     : Number,
        }
    },
    {
        versionKey : false
    }
);

SliderSchema.plugin(AutoIncrement, {inc_field: 'id'});
module.exports = mongoose.model('Slider', SliderSchema);