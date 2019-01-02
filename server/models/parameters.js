'use strict';
const mongoose      = require('mongoose');
const Schema        = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const ParametersSchema = new Schema({
        label : {
            type     : String,
            required : true,
        },
        value  : {
            type     : Boolean,
            required : true,
        },
        type  : {
            type     : Number,
            required : true,
        }
    },
    {
        versionKey : false
    }
);

ParametersSchema.plugin(AutoIncrement, {inc_field: 'id_parameter'});
module.exports = mongoose.model('Parameter', ParametersSchema);