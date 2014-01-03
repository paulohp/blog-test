module.exports = function (app) {
	var _ = require("underscore");
	var Post = app.models.posts;

	var TagController = {
		filter: function (req, res) {
			var params = {};
			var terms = {tags : req.params.tag}
			Post.find(terms, function(err, posts){
				params = {
					posts : posts,
					tags : req.tags
				};
				res.render('posts/index', params);
			});
		},
		list: function (req, res, next) {
			Post.find({}).select('tags').exec(function(err, posts){
				var tags = [];
				_.each(posts, function(post, index){
					tags.push(post.tags);
				});
				req.tags = tags.join(',');
				next();
			})
		}
	};

	return TagController;
}