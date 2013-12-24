module.exports = function (app) {
	var db = require('../middleware/db_connect')();
	var Schema = require('mongoose').Schema;

	
	var PostSchema = new Schema({
		title: {type : String, default : '', trim : true},
		body: {type : String, default : '', trim : true},
		user: {type : Schema.ObjectId, ref : 'User'},
		comments: [{
			email: {type : String, default : '', trim : true},
			body: { type : String, default : '' },
			createdAt: { type : Date, default : Date.now }
		}],
		//tags: {type: [], get: getTags, set: setTags},
		createdAt  : {type : Date, default : Date.now},
		updateAt  : {type : Date, default : Date.now}
	});


	return db.model('posts', PostSchema);
}