module.exports = function (app) {
	var posts = app.controllers.posts;
	var tags = app.controllers.tags;
	var logged = require('../middleware/logged');

	
	app.get('/tags/:tag', logged, tags.filter)
}