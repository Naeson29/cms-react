'use strict';

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Item = require('../models/Item.model');

mongoose.connect('mongodb://mongodb:27017');

// Get all items
router.get('/items', function(req, res, next) {
  Item.find()
    .then(function(data) {
      res.json(data);
    });
});

// Get single item
router.get('/items/:id', function(req, res, next) {
  let _id = req.params.id;
  Item.findById(_id, function(err, data) {
    if (err) {
      res.status(404).send();
    } else {
      res.json(data);
    }
  });
});

// Add new item
router.post('/items', function(req, res, next) {
  req.accepts('application/json');
  let item = {
    name: req.body.name,
    category: req.body.category,
    count: req.body.count
  };

  let data = new Item(item);
  data.save(function(err) {
    if (err) {
      res.status(500).send();
    } else {
      res.status(201).send(data._id);
    }
  });
});

// Delete item
router.delete('/items/:id', function(req, res, next) {
  let _id = req.params.id;
  Item.findByIdAndRemove(_id, function(err, data) {
    if (err) {
      res.status(404).send();
    } else {
      res.status(204).send();
    }
  });
});

// Update item
router.put('/items/:id', function(req, res, next) {
  req.accepts('application/json');
  let _id = req.params.id;
  Item.findById(_id, function(err, data) {
    if (err) {
      res.status(404).send();
    } else {
      data.name = req.body.name;
      data.category = req.body.category;
      data.count = req.body.count;
      data.save();
      res.status(200).json(data);
    }
  });
});

module.exports = router;
