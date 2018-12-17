'use strict';
const fs = require('fs');

const deleteFiles = function(paths) {
    paths.forEach(function(path){
        fs.unlinkSync(path);
    });
};

module.exports = {deleteFiles} ;