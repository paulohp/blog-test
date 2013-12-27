module.exports = function (app) {

	var Post = app.models.posts;
	var User = app.models.users;

	var PostController = {
		index: function (req, res) {
			var params = {};
			Post.find({}, function(err, posts){
				params = {posts : posts};
				res.render('posts/index', params);
			});
		},
		show: function (req, res) {
			var params = {};
			Post.findOne({_id : req.params.id}, function(err, post){
				User.findOne({_id : post.user}, function(err, user){
					console.log(post);
					if (err) {
						console.log(err);
					}else{
						params = {
							post : post,
							user : user
						};
						res.render('posts/show', params);
					};
				})
			})
		},
		postar: function (req, res) {
			res.render('posts/postar')
		},
		create: function (req, res) {
			var query = req.body.post;
			query.user = req.session.user._id;
			Post.create(query, function (err, post) {
				if (err) {
					res.redirect('/postar');
					console.log("Not Passou: ", err)
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