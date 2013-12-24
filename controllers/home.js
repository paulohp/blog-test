module.exports = function (app) {

	var User = app.models.users;

	var HomeController = {
		index : function (req, res) {
			res.render('home/index');
		},
		entrar : function (req, res) {
			res.render('home/entrar');
		},
		cadastrar : function (req, res) {
			res.render('home/cadastrar');
		},
		login : function (req, res) {
			var query = { email : req.body.user.email };
			User.findOne(query)
				.select('email password')
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
			User.create(query, function (err, user) {
				if (err) {
					res.redirect('/');
					console.log("Not Passou")
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