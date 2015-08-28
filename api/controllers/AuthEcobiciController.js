/**
 * AuthEcobiciController
 *
 * @description :: Server-side logic for managing Authecobicis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var request = require('request');

module.exports = {
	getAccessToken: function (req, res) {
		var id_client = '359_y9ebwdtf1s04kwccg848k4s48ggos4g8s8wg8owkog0wocksc',
		secret_client = '5dlu4y5axeo0o4s4k8oogsg4s8w0w48oo8wc0co44kk08oscsc',
		url           = 'https://pubsbapi.smartbike.com/oauth/v2/token?client_id=' + id_client + '&client_secret=' + secret_client + '&grant_type=client_credentials';

		request( url , function (error, response, body) {
		  var body = JSON.parse(body),
		  token    = {
		  	access_token: body.access_token
		  };
		  //console.log(body.access_token)
		  if (!error && response.statusCode == 200) {
		  	AuthEcobici.create(token).exec(function (err, access) {
		  		if(err){
		            console.log('Error en la obtencion del access_token')
		            return res.serverError({
		            	success: false,
		            	message: 'Error en la obtencion del access_token'
		            });		  			
		  		}
		  		return res.json({
		  			access_token: body
		  		})
		  	})
		  }
		})
	},
	getAllAccessToken: function (req, res) {
	  	AuthEcobici.find({
	  	}, function (err, access) {
	  		if(err){
	            console.log('Error en la obtencion de los access')
	            return res.serverError({
	            	success: false,
	            	message: 'Error en la obtencion de los access'
	            });		  			
	  		}
	  		res.json({
	  			access_tokens: access
	  		})
	  	})
	},	
	getStations: function(req, res) {

		var url = 'https://pubsbapi.smartbike.com/api/v1/stations.json?access_token=';

	  	AuthEcobici.find()
	  	.sort('createdAt desc')
	  	.exec(function (err, access) {
	  		if(err){
	            console.log('Error en la obtencion del access_token')	  			
	  		}

			request( url + access[0].access_token, function (error, response, body) {
			  var body = JSON.parse(body);

			  for (var i = 0; i < body.stations.length; i++) {
			  	
			  	var nearbyStations = new Array();
			  	for (var j = 0; j < body.stations[i].nearbyStations.length; j++) {
			  		nearbyStations.push(body.stations[i].nearbyStations[j])
			  	};		  	

			  	var location = [
			  		body.stations[i].location.lat,
			  		body.stations[i].location.lon
			  	];

			  	var estacion = {
			  		id: body.stations[i].id,
			  		name: body.stations[i].name, 
			  		address: body.stations[i].address,
			  		addressNumber: body.stations[i].addressNumber,
			  		zipCode: body.stations[i].zipCode,
			  		districtCode: body.stations[i].districtCode, 
			  		districtName: body.stations[i].districtName,
			  		nearbyStations: nearbyStations,
			  		location: location,
			  		stationType: body.stations[i].stationType
			  	}

			  	console.log(nearbyStations);
			  	StationsEcobici.create(estacion).exec(function (err, access) {
			  		if(!error)
			  			console.log("Se inserto " + i)
			  	})
			  }
			res.send(body)
			});
	  	})
	}
};