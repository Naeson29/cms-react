'use strict';
require('dotenv').config();

const express      = require('express');
const bodyParser   = require('body-parser');
const winston      = require('winston');
const logger       = require('morgan');
const bearerToken  = require('express-bearer-token');
const cors         = require('cors');
const PORT         = process.env.PORT || 3000;
const Routes       = require('./routes/routes');
const Constants    = require('./utils/consts');

const session      = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// app.use(session({
//     secret : "toto",
//     maxAge :  1800000
// }));
// app.use(cookieParser());

app.use(logger('dev'));
app.use(cors({
    optionsSuccessStatus : 200
}));
app.use(bearerToken());

app.use('/static', express.static(__dirname + '/public'));

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