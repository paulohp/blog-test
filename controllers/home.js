module.exports = function (app) {
	var HomeController = {
		index : function (req, res) {
			res.render('home/index');
		},
		login : function (req, res) {
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