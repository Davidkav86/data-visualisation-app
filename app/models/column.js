// app/models/column.js

	// load mongoose to define a model
    var mongoose = require('mongoose');

    module.exports = mongoose.model('Column', {
        columns : String, 
        charts : []
    });