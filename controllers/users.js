module.exports = function (app) {
	var User = app.models.users;

	var UserController = {
		edit: function (req, res) {
			User.findOne({_id : req.params.id}, function (err, user){
				res.render('users/edit', {
					title: "Editar",
					user: user,
					tags : req.tags
				});
			})
		},
		update: function (req, res) {
			var id = req.params.id;
			var password = crypter.hash(req.body.user.password);
			
			User.findOne({_id: id}, function (err, user){
				user.password = password;
				
				user.save(function (err){
					if (err) throw err;
					res.redirect('/');
				});
			});
		},
		show: function (req, res) {
			var params = {};
			User.findOne({_id : req.params.id}, function(err, user){
				if (err) {
					throw err;
				}else{
					params = {
						user : user,
						tags : req.tags
					};
					res.render('users/show', params);
				};
			})
		},
		entrar : function (req, res) {
			res.render('home/entrar', {
				tags : req.tags
			});
		},
		cadastrar : function (req, res) {
			res.render('home/cadastrar', {
				tags : req.tags
			});
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

	return UserController;
}