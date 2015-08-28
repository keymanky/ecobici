module.exports = {

	connection: 'mongo',
	autoCreatedAt: false,
	autoUpdatedAt: false,	
	attributes: {
		access_token:{
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