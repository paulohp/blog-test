module.exports = function (app) {
	var posts = app.controllers.posts;
	var authentication = require('./../middleware/authentication');

	app.get('/posts', posts.index);
	app.get('/post/:id', posts.show);
	app.get('/postar', authentication, posts.postar);
	app.post('/post', authentication, posts.create);
	app.get('/post/:id/editar', authentication, posts.edit);
	app.put('/post/:id', authentication, posts.update);
	app.del('/post/:id', authentication, posts.destroy);
}