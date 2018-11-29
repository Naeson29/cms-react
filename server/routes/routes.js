'use strict';
const mime                = require('mime');
const Constants           = require('../utils/consts');
const Express             = require('express');
const Mongoose            = require('mongoose');
const Router              = Express.Router();
const multer              = require('multer');
const cryptoRandomString  = require('crypto-random-string');

//Models
const Slider    = require('../models/slider');

//Connect
Mongoose.connect(`mongodb://mongodb:27017/${Constants.database}`, { useNewUrlParser: true });

//Slider
Router.get('/sliders', (req, res) => {
  Slider.find().sort({order : 1})
    .then(function(data) {
      res.json(data);
    });
});

Router.post('/sliders', function(req, res) {

    let fileName = cryptoRandomString(16);

    const upload = multer({storage: multer.diskStorage({
            destination: function (req, file, callback) {
                callback(null, 'public/slider')
            },
            filename: function (req, file, callback) {
                fileName = fileName + '.' + mime.getExtension(file.mimetype);
                callback(null, fileName)
            }
        })}).single('slider');

    upload(req, res, function(err) {
        if(err) {
            res.status(500).send(err);
        }

        Slider.count({}, function(err, count) {

            const item = {
                label : req.body.label,
                text  : req.body.text,
                order : ( count + 1),
                image : fileName

            };
            const data = new Slider(item);

            data.save(function(err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(200).send({
                        success : true,
                        id      : data._id,
                        message : 'Create and upload success slider'
                    });
                }
            });
        });
    })
});

Router.post('/sliders/:id', function(req, res) {
    let id = req.params.id;

    Slider.findOne({id : id }, function(err, data) {
        if (err) {
            res.status(500).send(err);
        } else {
            data.label = req.body.label;
            data.text  = req.body.text;
            data.save(function(err) {
                if (err) {
                    res.status(500).send(err);
                } else{
                    res.status(200).send({
                        success : true,
                        id      : data._id,
                        message : 'Update success slider'
                    });
                }
            });
        }
    });
});


module.exports = Router;






















// Router.get('/sliders/:id', (req, res) => {
//   let _id = req.params.id;
//   Slider.findById(_id, function(err, data) {
//     if (err) {
//       res.status(404).send('Not found');
//     } else {
//       res.json(data);
//     }
//   });
// });


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


