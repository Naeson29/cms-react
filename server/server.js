'use strict';
require('dotenv').config();

const express       = require('express');
const bodyParser    = require('body-parser');
const winston       = require('winston');
const logger        = require('morgan');
const bearerToken   = require('express-bearer-token');
const cors          = require('cors');
const PORT          = process.env.PORT || 3000;
const Frontend      = require('./routes/frontend');
const Backend       = require('./routes/backend');
const Auth          = require('./routes/auth');
const {
    withAuth,
    withBearer
}                   = require('./middleware');

//const cookieParser  = require('cookie-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(logger('dev'));
app.use(cors({ optionsSuccessStatus : 200 }));
app.use(bearerToken());

app.use('/front', withBearer,  Frontend);

app.use('/auth', Auth);

app.use('/admin', withAuth, Backend);

app.use('/static', express.static(__dirname + '/public'));

app.listen(PORT, function() {
    winston.log('info', `Server is listening on port ${PORT}`);
});