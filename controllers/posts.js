module.exports = function (app) {
	var Post = app.models.posts;
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

		},
		postar: function (req, res) {
			res.render('posts/postar')
		},
		create: function (req, res) {

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