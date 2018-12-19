const seeder    = require('mongoose-seed');
const data      = require('./data');
const Constants = require('../utils/consts');

seeder.connect(`${Constants.dbUrl}${Constants.database}`, {
    useNewUrlParser  : true,
    useCreateIndex   : true,
    useFindAndModify : false }, function() {

    seeder.loadModels([
        './models/user.js',
        './models/slider.js',
        './models/event.js'
    ]);

    seeder.clearModels(['Slider', 'User', 'Event'], function() {
        seeder.populateModels(data, function() {
            seeder.disconnect();
        });
    });
});
