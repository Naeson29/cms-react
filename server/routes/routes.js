'use strict';
const mime                = require('mime');
const Constants           = require('../utils/consts');
const Express             = require('express');
const Mongoose            = require('mongoose');
const Router              = Express.Router();
const multer              = require('multer');
const cryptoRandomString  = require('crypto-random-string');
const fs                  = require('fs');
const async               = require('async');
const bcrypt              = require('bcrypt');
const BCRYPT_SALT_ROUNDS  = 12;

//Models
const Slider = require('../models/slider');
const User   = require('../models/user');

//Connect
Mongoose.connect(`${Constants.dbUrl}${Constants.database}`, {
    useNewUrlParser  : true,
    useCreateIndex   : true,
    useFindAndModify : false
});

//Routes

Router.post('/login', function(req, res){
    const password = req.body.password;

    User.findOne({email : req.body.email }, async function(err, data) {

        if(err){
            res.status(500).send(err);
        }

        if(data){
            const match = await bcrypt.compare(password, data.password);

            if(match){
                res.status(200).send(data);
            }
            res.status(401).send();
        }
    })
});

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
        }else{
            const data = new Slider({
                label : req.body.label,
                text  : req.body.text,
                order : req.body.count,
                image : fileName
            });

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
        }
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

        Slider.findOne({id_slider : id }, function(err, data) {
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

    Slider.findOneAndDelete({id_slider : id }, function(err, data) {
        if (err) {
          res.status(500).send(err);
        } else {
            fs.unlinkSync(Constants.directory.slider + '/' + data.image);

            res.status(200).send({
                success : true,
                data    : data,
                message : 'Delete slider success'
            });
        }
    });
});

Router.post('/sliders/order', async function(req, res) {
    async.eachSeries(req.body, function(obj, done) {
        req.body[req.body.indexOf(obj)].order = (req.body.indexOf(obj) + 1);
        Slider.updateOne({ id_slider: obj.id_slider }, { $set : { order: (req.body.indexOf(obj) + 1) }}, done);
    }, function(){
        res.status(200).send({
        success : true,
        data    : req.body,
        message : 'Order slider success'})
    }
    , function(err) {
        res.status(500).send(err);
    });
});

module.exports = Router;