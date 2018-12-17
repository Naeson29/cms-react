'use strict';
const mime                = require('mime');
const Constants           = require('../utils/consts');
const Express             = require('express');
const Mongoose            = require('mongoose');
const Router              = Express.Router();
const multer              = require('multer');
const cryptoRandomString  = require('crypto-random-string');
const fs                  = require('fs');
//const gm                  = require('gm').subClass({imageMagick: true});
const im                  = require('imagemagick');
const async               = require('async');

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

//Auth
Router.get('/auth', (req, res) => {
    res.status(200).send({
        success : true
    });
});

//Slider
Router.get('/sliders', (req, res) => {
    Slider.find().sort({order : 1})
        .then((data) => {
            res.status(200).send({
                logged : req.logged,
                data   : data
            });
        });
});

Router.post('/sliders', (req, res) => {

    let fileName    = cryptoRandomString(16);

    const upload = multer({storage: multer.diskStorage({
            destination: (req, file, callback) => {
                callback(null, Constants.directory.slider);
            },
            filename: (req, file, callback) => {
                fileName = fileName + '.' + mime.getExtension(file.mimetype);
                callback(null, fileName);
            }
        })}).single('slider');

    upload(req, res, (err) => {
        if(err) {
            res.status(500).send(err);
        }else{

            im.crop({
                srcPath: req.file.path,
                dstPath: `${Constants.directory.slider}/min_${fileName}`,
                width: 150,
                height: 150,
                quality: 1,
                gravity: 'Center'
            });

            const data = new Slider({
                label : req.body.label,
                text  : req.body.text,
                order : req.body.count,
                image : fileName
            });

            data.save((err, data) => {
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

Router.put('/sliders/:id', (req, res) => {
    let id = req.params.id;

    let fileName = cryptoRandomString(16);

    const upload = multer({storage: multer.diskStorage({
            destination: (req, file, callback) => {
                callback(null, Constants.directory.slider)
            },
            filename: (req, file, callback) => {
                fileName = fileName + '.' + mime.getExtension(file.mimetype);
                callback(null, fileName);
            }
        })}).single('slider');

    upload(req, res, (err) => {
        if (err) {
            res.status(500).send(err);
        }else{

            im.crop({
                srcPath: req.file.path,
                dstPath: `${Constants.directory.slider}/min_${fileName}`,
                width: 150,
                height: 150,
                quality: 1,
                gravity: 'Center'
            });

            Slider.findOne({id_slider : id }, (err, data) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    data.label = req.body.label;
                    data.text  = req.body.text;
                    if(req.file !== undefined){
                        fs.unlink(Constants.directory.slider + '/' + data.image);
                        fs.unlink(Constants.directory.slider + '/min_' + data.image);
                        data.image  = fileName;
                    }
                    data.save((err) => {
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
        }
    })
});

Router.delete('/sliders/:id', (req, res) => {
    let id = req.params.id;

    Slider.findOneAndDelete({id_slider : id }, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            fs.unlinkSync(Constants.directory.slider + '/' + data.image);
            fs.unlinkSync(Constants.directory.slider + '/min_' + data.image);

            res.status(200).send({
                success : true,
                data    : data,
                message : 'Delete slider success'
            });
        }
    });
});

Router.post('/sliders/order', async (req, res) => {
    async.eachSeries(req.body, (obj, done) => {
            req.body[req.body.indexOf(obj)].order = (req.body.indexOf(obj) + 1);
            Slider.updateOne({ id_slider: obj.id_slider }, { $set : { order: (req.body.indexOf(obj) + 1) }}, done);
        }, () => {
            res.status(200).send({
                success : true,
                data    : req.body,
                message : 'Order slider success'})
        }
        , (err) => {
            res.status(500).send(err);
        });
});

//User
Router.get('/users', (req, res) => {
    User.find().sort({lastName : 1})
    .then((data) => {
        res.status(200).send({
            logged : req.logged,
            data   : data
        });
    });
});

Router.post('/users', (req, res) => {

    const data = new User({
        lastName  : req.body.lastName,
        firstName : req.body.firstName,
        email     : req.body.email,
        password  : req.body.password
    });

    data.save((err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send({
                success : true,
                data    : data,
                message : 'Create user success'
            });
        }
    });
});

Router.put('/users/:id', (req, res) => {
    let id = req.params.id;

    User.findOne({id_user : id }, (err, data) =>{
        if (err) {
            res.status(500).send(err);
        } else {
            data.lastName  = req.body.lastName;
            data.firstName = req.body.firstName;
            data.email     = req.body.email;

            if(req.body.password){
                data.password = req.body.password;
            }

            data.save((err) => {
                if (err) {
                    res.status(500).send(err);
                } else{
                    res.status(200).send({
                        success : true,
                        data    : data,
                        message : 'Update user success'
                    });
                }
            });
        }
    });
});

Router.delete('/users/:id', (req, res) => {
    let id = req.params.id;

    User.findOneAndDelete({id_user : id }, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send({
                success : true,
                data    : data,
                message : 'Delete user success'
            });
        }
    });
});

module.exports = Router;