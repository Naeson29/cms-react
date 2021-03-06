'use strict';
const Constants     = require('../utils/consts');
const mongoose      = require('mongoose');
const Schema        = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);
const bcrypt        = require('bcrypt');
const salt          = Constants.salt;

const UserSchema = new Schema({
        email : {
            type     : String,
            required : true,
            unique   : true
        },
        password  : {
            type     : String,
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

UserSchema
    .pre('save', function(next) {
        if (this.isNew || this.isModified('password')) {
            const document = this;
            bcrypt.hash(document.password, salt, (err, hashedPassword) => {
                if (err) {
                    next(err);
                }
                else {
                    document.password = hashedPassword;
                    next();
                }
            });
        }else {
            next();
        }
    })
    .post('save', function(error, doc, next) {
        if (error.name === 'MongoError' && error.code === 11000) {
            next({
                error  : true,
                code   : '001'
            });
        } else {
            next(error);
        }
    });

UserSchema.plugin(AutoIncrement, {inc_field: 'id_user'});
module.exports = mongoose.model('User', UserSchema);