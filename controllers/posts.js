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
			var post = new Post(req.body);
			post.user = req.user;

			post.save(function (err) {
				if (err) {
					res.render('posts/postar', {
						post: post,
						errors: err.errors
					})
				} else {
					res.redirect('/posts/'+post._id)
				}
			})
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