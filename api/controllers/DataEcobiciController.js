/**
 * DataEcobiciController
 *
 * @description :: Server-side logic for managing Dataecobicis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var request = require('request'),
CronJob     = require('cron').CronJob;

module.exports = {
	getAvailability: function(req, res) {

		var url = 'https://pubsbapi.smartbike.com/api/v1/stations/status.json?access_token=';

	  	AuthEcobici.find()
	  	.sort('createdAt desc')
	  	.exec(function (err, access) {
	  		if(err){
	            console.log('Error en la obtencion del access_token')	  			
	  		}

			request( url + access[0].access_token, function (error, response, body) {
			  var body = JSON.parse(body);

			  for (var i = 0; i < body.stationsStatus.length; i++) {
			  	
			  	var availability = [
			  		body.stationsStatus[i].availability.bikes,
			  		body.stationsStatus[i].availability.slots
			  	];

			  	var disponibilidad = {
			  		id: body.stationsStatus[i].id,
			  		status: body.stationsStatus[i].status, 
			  		availability: availability
			  	}

			  	AvailabilityEcobici.create(disponibilidad).exec(function (err, data) {
			  		if(!error)
			  			console.log("Se inserto " + i)
			  	})
			  }
			res.send(body)
			});
	  	})
	},
	getAvailabilities: function (req, res) {
		var job = new CronJob('05 * * * * *', function() {

			var test = new Date();

			console.log(test.toString())


		}, null, true, "America/Mexico_City");
	}	
};