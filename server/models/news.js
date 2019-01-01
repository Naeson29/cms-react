const mongoose      = require('mongoose');
const Schema        = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const NewsSchema = new Schema({
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
    },
    {
        versionKey : false
    }
);

NewsSchema.plugin(AutoIncrement, {inc_field: 'id_news'});
module.exports = mongoose.model('News', NewsSchema);