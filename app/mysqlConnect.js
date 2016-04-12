
module.exports = function(mysql) {
	var connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'root',
	  password : 'secret',
	  database : 'tssg_meters'
	});

	connection.connect(function(err) {
  		if(err){
    		console.error('error connecting: ' + err.stack);
    		return;
  		}
  		console.log('connected as id ' + connection.threadId);
	});

	connection.query('select meter_id, meter_reading_time, real_energy_consumption from meters_data where meter_reading_time between "2015-02-02 10:00:00" and "2015-05-02 10:00:00" and meter_id=82;', function(err, rows, fields) {
  		if (err) throw err;
 	// 	for(var i=0;i<rows.length;i++){
  // 			console.log('The solution is: ', rows[i].real_energy_consumption);
		// }
	});
 
	connection.end();
}