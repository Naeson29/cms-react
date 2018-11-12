const seeder = require('mongoose-seed');
const data   = require('./data');

seeder.connect('mongodb://mongodb:27017/reactCms', { useNewUrlParser: true }, function() {

    seeder.loadModels([
        './models/slider.js'
    ]);

    seeder.clearModels(['Slider'], function() {
        seeder.populateModels(data, function() {
            seeder.disconnect();
        });
    });
});
