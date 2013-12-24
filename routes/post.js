module.exports = function (app) {
	var posts = app.controllers.posts;

	app.get('/posts', posts.index);
	app.get('/post/:id', post.show);
	app.post('/post', posts.create);
	app.get('/post/:id/editar', posts.edit);
	app.put('/post/:id', posts.update);
	app.del('/post/:id', posts.destroy);
}