'use strict';

let express = require('express');
let app = express();
let bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
let winston = require('winston');
let logger = require('morgan');
let items = require('./routes/items');


// Body Parser
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api', items);


app.listen(3000, function() {
  winston.log('info', `Server is listening on port ${PORT}`);
});
