module.exports = function (app) {
	var posts = app.controllers.posts;
	var comments = app.controllers.comments;
	var tags = app.controllers.tags;
	var authentication = require('../middleware/authentication');
	var logged = require('../middleware/logged');
	app.get('*', tags.list);

	app.get('/', logged, posts.index);
	app.get('/posts', logged, posts.index);
	app.get('/post/:id', logged, posts.show);
	app.get('/postar', authentication, logged, posts.postar);
	app.post('/post', authentication, logged, posts.create);
	app.get('/post/:id/editar', authentication, logged, posts.edit);
	app.put('/post/:id', authentication, logged, posts.update);
	app.del('/post/:id', authentication, logged, posts.destroy);

	app.get('/search', logged, posts.search);

	app.post('/post/:id/comment', comments.create);
	app.del('/post/:id/comment/:comment_id', comments.destroy);
}