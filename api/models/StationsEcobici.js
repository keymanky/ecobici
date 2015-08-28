module.exports = {

	connection: 'mongo',
	autoCreatedAt: false,
	autoUpdatedAt: false,		
	attributes: {
	  	id: {
			type: 'integer',
			required: true
		},
		name: {
			type: 'string',
			required: true
		},
		address:{
			type: 'string',
			required: false
		},
		addressNumber:{
			type: 'string',
			required: false
		},
		zipCode:{
			type: 'string',
			required: false
		},
		districtCode:{
			type: 'string',
			required: false
		},
		districtName:{
			type: 'string',
			required: false
		},
		nearbyStations:{
			type: 'array',
			required: false
		},		
		location:{
			type: 'array',
			required: false
		},		
		stationType:{
			type: 'string',
			required: false
		},
		creacionts:{
			type: 'string',
			defaultsTo: function () {
				var fecha = new Date();
				return fecha.toString();
			}
		}
	},
};

