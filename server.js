// server.js
// angular version - 1.5.2

    // set up ========================
    var express  = require('express');
    var app      = express();                            
    var morgan = require('morgan');            
    var bodyParser = require('body-parser');   
    var methodOverride = require('method-override'); 
    var mongoose = require('mongoose');
    var database = require('./config/database');
    var mysql = require('mysql');


    // mysql connection
    require('./app/mysqlConnect.js')(mysql);

    // configuration =================
     
    mongoose.connect(database.url);
    

    app.use(express.static(__dirname + '/public'));            
    app.use(morgan('dev'));                                         
    app.use(bodyParser.urlencoded({'extended':'true'}));            
    app.use(bodyParser.json());                                     
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 

    app.use(methodOverride());

    // get the routes 
    require('./app/routes.js')(app);

    // application -------------------------------------------------------------
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); 
    });
    // listen (start app with node server.js) ======================================
    app.listen(8080);
    console.log("Data Visualisation App - listening on port 8080");