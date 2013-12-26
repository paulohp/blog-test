module.exports = function (app) {
	var Post = app.models.posts;
	var User = app.models.users;
	var PostController = {
		index: function (req, res) {
			var params = {};
			Post.find({}, function(err, posts){
				params = {posts : posts};
				console.log(params);
				res.render('posts/index', params);
			});
		},
		show: function (req, res) {
			res.render('posts/show', {
				title: req.post.title,
				post: req.post,
				user: req.user,
			})
		},
		postar: function (req, res) {
			res.render('posts/postar')
		},
		create: function (req, res) {
			var query = req.body.post;
			console.log(query);
			Post.create(query, function (err, post) {
				if (err) {
					res.redirect('/postar');
					console.log("Not Passou")
				} else {
					console.log("Ya Passou")
					res.redirect('/posts');
				};
			});
		},
		edit: function (req, res) {

		},
		update: function (req, res) {

		},
		destroy: function (req, res) {

		}
	}

	return PostController;
}