module.exports = function (app) {
	var User = app.models.users;
	var Post = app.models.posts;

	var HomeController = {
		index : function (req, res) {
			var params = {};
			Post.find({}).sort({'updateAt': -1}).exec(function(err, posts){
				params = {
					posts : posts,
					tags : posts.tags
				};
				console.log()
				res.render('home/index', params);
			});
		},
		entrar : function (req, res) {
			res.render('home/entrar');
		},
		cadastrar : function (req, res) {
			res.render('home/cadastrar');
		},
		login : function (req, res) {
			var query = { email : req.body.user.email };
			var password = req.body.user.password;
			User.findOne(query)
				.select('name email password')
				.exec(function(err, user){
					if (user) {
						if (crypter.validate(user.password, password)) {
							req.session.user = user;
							res.redirect('/')
						}else{
							res.redirect('/entrar')
						}
					} else{
						res.redirect('/entrar')
					};
				});
		},
		signup : function (req, res) {
			var query = req.body.user;
			query.password = crypter.hash(query.password);
			User.create(query, function (err, user) {
				if (err) {
					res.redirect('/cadastrar');
				} else {
					req.session.user = user;
					res.redirect('/posts');
				};
			});
		},
		logout : function (req, res) {
			req.session.destroy();
			res.redirect('/');
		}
	};

	return HomeController;
}