//  /app/routes.js

// load the column model
var Column = require('./models/column.js');

module.exports = function(app) {

	// api ---------------------------------------------------------------------
	// get all columns
	app.get('/api/columns', function(req, res) {

		// use mongoose to get all columns in the database
		Column.find(function(err, columns) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(columns); // return all columns in JSON format
		});
	});

	// create column and send back all columns after creation
	app.post('/api/columns', function(req, res) {

		// create a column, information comes from AJAX request from Angular
		Column.create({
			columns : req.body.columns,
			charts : req.body.charts
		}, function(err, column) {
			if (err)
				res.send(err);

			// get and return all the columns after you create another
			Column.find(function(err, columns) {
				if (err)
					res.send(err)
				res.json(columns);
			});
		});

	});

	// delete a column
	app.delete('/api/columns/:column_id', function(req, res) {
		Column.remove({
			_id : req.params.column_id
		}, function(err, column) {
			if (err)
				res.send(err);

			// get and return all the columns after you create another
			Column.find(function(err, columns) {
				if (err)
					res.send(err)
				res.json(columns);
			});
		});
	});

	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
} 