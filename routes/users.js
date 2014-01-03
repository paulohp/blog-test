module.exports = function (app) {
	var users = app.controllers.users;
	var authentication = require('../middleware/authentication');
	var logged = require('../middleware/logged');

	app.get('/user/:id/edit', logged, authentication, users.edit);
	app.put('/user/:id', logged, authentication, users.update);
	app.get('/user/:id', logged, users.show);
}