module.exports = function (app) {
	var HomeController = {
		index : function (req, res) {
			res.render('home/index');
		},
		entrar : function (req, res) {
			res.render('home/entrar');
		},
		login : function (req, res) {
			console.log(req)
			var email = req.body.user.email;
			var password = req.body.user.password;

			if (email && password) {
				var user = req.body.user;
				req.session.user = user;
				res.redirect('/')
			} else{
				alert("Error");
			}; 
		},
		logout : function (req, res) {
			req.session.destroy();
			res.redirect('/');
		}
	};

	return HomeController;
}