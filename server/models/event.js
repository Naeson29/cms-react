'use strict';
const mongoose      = require('mongoose');
const Schema        = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const EventSchema = new Schema({
        title : {
            type     : String,
            required : true,
        },
        allDay  : {
            type     : Boolean,
            required : true
        },
        start : {
            type     : Date,
            required : true
        },
        end : {
            type     : Date,
            required : true
        }
    },
    {
        versionKey : false
    }
);

EventSchema.plugin(AutoIncrement, {inc_field: 'id_event'});
module.exports = mongoose.model('Event', EventSchema);