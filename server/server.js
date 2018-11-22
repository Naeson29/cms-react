'use strict';
require('dotenv').config();

const express     = require('express');
const bodyParser  = require('body-parser');
const winston     = require('winston');
const logger      = require('morgan');
const bearerToken = require('express-bearer-token');
const cors        = require('cors');
const PORT        = process.env.PORT || 3000;
const Routes      = require('./routes/routes');
const Constants   = require('./utils/consts');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(logger('dev'));
app.use(cors({
    optionsSuccessStatus : 200
}));
app.use(bearerToken());

app.listen(PORT, function() {
    winston.log('info', `Server is listening on port ${PORT}`);
});

app.use((req, res, next) => {
    if(req.token !== Constants.token){
        res.status(401).send({
            error   : 401,
            message : "Unauthorized token"
        });
        return;
    }
    next();
});

app.use('/api', Routes);