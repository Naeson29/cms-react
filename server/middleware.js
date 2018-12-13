const Constants = require('./utils/consts');
const jwt       = require('jsonwebtoken');
const secret    = Constants.secret;

const withAuth = function(req, res, next) {
    const token = req.headers['x-access-token'];

    if (!token) {
        res.status(401).send({
            error   : 401,
            message : 'Unauthorized : No token provided'
        });
    }
    else {
        jwt.verify(token, secret, function(err, decoded) {
            if (err) {
                res.status(401).send({
                    error   : 401,
                    message : 'Unauthorized token'
                });
            } else {
                req.logged = decoded.id_user;
                next();
            }
        });
    }
};

const withBearer = function(req, res, next) {
    if(req.token !== Constants.token){
        res.status(401).send({
            error   : 401,
            message : "Unauthorized token"
        });
    }
    next();
};

module.exports = { withAuth, withBearer} ;