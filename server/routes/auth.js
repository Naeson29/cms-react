'use strict';
const Constants = require('../utils/consts');
const Express   = require('express');
const Mongoose  = require('mongoose');
const Router    = Express.Router();
const bcrypt    = require('bcrypt');
const jwt       = require('jsonwebtoken');
const secret    = Constants.secret;

//Models
const User = require('../models/user');

//Connect
Mongoose.connect(`${Constants.dbUrl}${Constants.database}`, {
    useNewUrlParser  : true,
    useCreateIndex   : true,
    useFindAndModify : false
});

Router.post('/login', function(req, res){

    User.findOne({email : req.body.email }, function(err, data) {

        if(err){
            res.status(500).send(err);
        }

        let match;

        if(data){
            match = bcrypt.compareSync(req.body.password, data.password);
        }

        if(match){
            const token = jwt.sign({email : data.email}, secret, {
                expiresIn: '1 days'
            });

            res.status(200).send({
                success : true,
                message : 'Utilisateur authentifié',
                token   : token
            });
        }else{
            res.status(401).send({
                error   : true,
                message : 'Utilisateur et/ou mot de passe incorrect(s)'
            });
        }
    })
});

module.exports = Router;