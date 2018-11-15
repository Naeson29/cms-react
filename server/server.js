'use strict';
require('dotenv').config();

const express     = require('express');
const bodyParser  = require('body-parser');
const winston     = require('winston');
const logger      = require('morgan');
const bearerToken = require('express-bearer-token');
const PORT        = process.env.PORT || 3000;
const Routes      = require('./routes/routes');
const Constants   = require('./utils/consts');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(logger('dev'));
app.use(bearerToken());

app.listen(PORT, function() {
    winston.log('info', `Server is listening on port ${PORT}`);
});

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    if ('OPTIONS' === req.method) {
        res.send(200);
    }
    else {
        if(req.token === undefined || req.token !== Constants.token){
            res.send(401);
        }
        else{
            next();
        }
    }
});

app.use('/api', Routes);