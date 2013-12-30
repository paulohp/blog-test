module.exports = function(app) {
	var home = app.controllers.home;
	var authentication = require('../middleware/authentication');
	var logged = require('../middleware/logged');

	app.get('/', logged, home.index);
	app.post('/login', logged, home.login);
	app.get('/entrar', logged, home.entrar);
	app.get('/cadastrar', logged, home.cadastrar);
	app.post('/signup', logged, home.signup);
	app.get('/logout', logged, home.logout);
};