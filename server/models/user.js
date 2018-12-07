const mongoose      = require('mongoose');
const Schema        = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const UserSchema = new Schema({
        login : {
            type     : String,
            required : true
        },
        password  : {
            type     : String,
            required : true
        },
        lastName : {
            type     : String,
            required : true
        },
        firstName : {
            type     : String,
            required : true
        }
    },
    {
        versionKey : false
    }
);

UserSchema.plugin(AutoIncrement, {inc_field: 'id_user'});
module.exports = mongoose.model('User', UserSchema);