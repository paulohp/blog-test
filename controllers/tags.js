module.exports = function (app) {

	var Post = app.models.posts;

	var TagController = {
		filter : function (req, res) {
			var params = {};
			var terms = {tags : req.params.tag}
			Post.find(terms, function(err, posts){
				params = {posts : posts};
				res.render('posts/index', params);
			});
		}
	};

	return TagController;
}