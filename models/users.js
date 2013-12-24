module.exports = function (app) {
	var Schema = require('mongoose').Schema;

	var UserSchema = new Schema({
		email: {type: String, required: true, index: {unique: true}},
		password: {type: String, required: true},		
		hashed_password: 'string',
		salt: 'string'
	});


	return db.model('users', UserSchema);
}