module.exports = function (app) {
	var Post = app.models.posts;

	var CommentsController = {
		create: function (req, res) {
			Post.findOne({_id : req.params.id}, function (err, post){
				post.comments.push({
					email : req.body.comment.email,
					body : req.body.comment.body
				})
				post.save(function(){
					res.redirect('/post/'+post._id);
				})
			});
		},
		destroy: function(req, res){
			Post.findOne({_id: req.params.id}, function (err, post){
				post.comments = post.comments.filter(function(el) { return el._id != req.params.comment_id; });
				post.save(function(){
					res.redirect('/post/'+post._id);
				})
			});
		}
	};

	return CommentsController;
}