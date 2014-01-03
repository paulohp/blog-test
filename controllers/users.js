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
		}
	};

	return UserController;
}