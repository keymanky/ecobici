module.exports = {
	connection: 'mongo',
	autoCreatedAt: false,
	autoUpdatedAt: false,
	attributes: {
	  	id: {
			type: 'integer',
			required: true
		},
		status: {
			type: 'string',
			required: true
		},
		availability:{
			type: 'array',
			required: true
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