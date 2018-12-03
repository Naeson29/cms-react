'use strict';
const mime                = require('mime');
const Constants           = require('../utils/consts');
const Express             = require('express');
const Mongoose            = require('mongoose');
const Router              = Express.Router();
const multer              = require('multer');
const cryptoRandomString  = require('crypto-random-string');
const fs                  = require('fs');

//Models
const Slider    = require('../models/slider');

//Connect
Mongoose.connect(`mongodb://mongodb:27017/${Constants.database}`, { useNewUrlParser: true });

//Routes
Router.get('/sliders', (req, res) => {
  Slider.find()
    .then(function(data) {
      res.json(data);
    });
});

Router.post('/sliders', function(req, res) {

    let fileName = cryptoRandomString(16);

    const upload = multer({storage: multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, Constants.directory.slider)
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

            data.save(function(err, data) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(200).send({
                        success : true,
                        data    : data,
                        message : 'Create slider success'
                    });
                }
            });
        });
    })
});

Router.put('/sliders/:id', function(req, res) {
    let id = req.params.id;

    let fileName = cryptoRandomString(16);

    const upload = multer({storage: multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, Constants.directory.slider)
        },
        filename: function (req, file, callback) {
            fileName = fileName + '.' + mime.getExtension(file.mimetype);
            callback(null, fileName)
        }
    })}).single('slider');

    upload(req, res, function(err) {
        if (err) {
            res.status(500).send(err);
        }

        Slider.findOne({id : id }, function(err, data) {
            if (err) {
                res.status(500).send(err);
            } else {
                data.label = req.body.label;
                data.text  = req.body.text;
                if(req.file !== undefined){
                    fs.unlink(Constants.directory.slider + '/' + data.image);
                    data.image  = fileName;
                }
                data.save(function(err) {
                    if (err) {
                        res.status(500).send(err);
                    } else{
                        res.status(200).send({
                            success : true,
                            data    : data,
                            message : 'Update slider success'
                        });
                    }
                });
            }
        });
    })
});

Router.delete('/sliders/:id', function(req, res) {
    let id = req.params.id;

    Slider.findOneAndRemove({id : id }, function(err) {
        if (err) {
          res.status(500).send(err);
        } else {
            res.status(200).send({
                success : true,
                id      : parseInt(id),
                message : 'Delete slider success'
            });
        }
    });
});

Router.put('/sliders/order/:id', function(req, res) {

});


module.exports = Router;