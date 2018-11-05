'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const winston = require('winston');
const logger = require('morgan');
const items = require('./routes/items');


// Body Parser
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api', items);


app.listen(PORT, function() {
  winston.log('info', `Server is listening on port ${PORT}`);
});
