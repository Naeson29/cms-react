const mongoose              = require('mongoose');
const Schema                = mongoose.Schema;
//const passportLocalMongoose = require('passport-local-mongoose');
const AutoIncrement         = require('mongoose-sequence')(mongoose);

const UserSchema = new Schema({
        email : {
            type     : String,
            required : true,
            unique   : true
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
//UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', UserSchema);