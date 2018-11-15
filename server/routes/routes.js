'use strict';
const Constants = require('../utils/consts');
const Express   = require('express');
const Mongoose  = require('mongoose');
const Router    = Express.Router();

//Models
const Slider    = require('../models/slider');

//Connect
Mongoose.connect(`mongodb://mongodb:27017/${Constants.database}`, { useNewUrlParser: true });


//Slider
Router.get('/sliders', function(req, res) {
  Slider.find()
    .then(function(data) {
      res.json(data);
    });
});

Router.get('/sliders/:id', function(req, res) {
  let _id = req.params.id;
  Slider.findById(_id, function(err, data) {
    if (err) {
      res.status(404).send();
    } else {
      res.json(data);
    }
  });
});

module.exports = Router;
























// // Add new item
// router.post('/sliders', function(req, res, next) {
//   req.accepts('application/json');
//   let item = {
//     name: req.body.name,
//     category: req.body.category,
//     count: req.body.count
//   };
//
//   let data = new Slider(item);
//   data.save(function(err) {
//     if (err) {
//       res.status(500).send();
//     } else {
//       res.status(201).send(data._id);
//     }
//   });
// });
//
// // Delete item
// router.delete('/sliders/:id', function(req, res, next) {
//   let _id = req.params.id;
//   Item.findByIdAndRemove(_id, function(err, data) {
//     if (err) {
//       res.status(404).send();
//     } else {
//       res.status(204).send();
//     }
//   });
// });
//
// // Update item
// router.put('/sliders/:id', function(req, res, next) {
//   req.accepts('application/json');
//   let _id = req.params.id;
//   Item.findById(_id, function(err, data) {
//     if (err) {
//       res.status(404).send();
//     } else {
//       data.name = req.body.name;
//       data.category = req.body.category;
//       data.count = req.body.count;
//       data.save();
//       res.status(200).json(data);
//     }
//   });
// });