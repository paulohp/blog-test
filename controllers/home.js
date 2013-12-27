module.exports = function (app) {

	var User = app.models.users;
	var Post = app.models.posts;

	var HomeController = {
		index : function (req, res) {
			var params = {};
			Post.find({}).sort({'updateAt': -1}).exec(function(err, posts){
				params = {posts : posts};
				console.log(params);
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
			console.log("Cheguei Aqui")
			var query = { email : req.body.user.email };
			User.findOne(query)
				.select('name email password')
				.exec(function(err, user){
					if (user) {
						req.session.user = user;
						res.redirect('/')
					} else{
						console.error("Error", err);
						res.redirect('/entrar')
					};
				});
		},
		signup : function (req, res) {
			var query = req.body.user;
			console.log(query);
			User.create(query, function (err, user) {
				if (err) {
					res.redirect('/');
					console.log(err, "Not Passou")
				} else {
					console.log("Ya Passou")
					req.session.user = user;
					res.redirect('/');
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