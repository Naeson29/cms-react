'use strict';
const Constants           = require('../utils/consts');
const Express             = require('express');
const Mongoose            = require('mongoose');
const Router              = Express.Router();

//Models
const Slider     = require('../models/slider');
const Parameters = require('../models/parameters');

//Connect
Mongoose.connect(`${Constants.dbUrl}${Constants.database}`, {
    useNewUrlParser  : true,
    useCreateIndex   : true,
    useFindAndModify : false
});

//Routes

//Parameters
Router.get('/parameters', (req, res) => {
    Parameters.find()
        .then(function(data) {
            res.json(data);
        });
});

//Slider
Router.get('/sliders', (req, res) => {
  Slider.find().sort({order : 1})
    .then(function(data) {
      res.json(data);
    });
});

module.exports = Router;