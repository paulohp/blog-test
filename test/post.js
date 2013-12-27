var app = require('../app');
var request = require('supertest')(app);
var Post = app.models.posts;
var User = app.models.users;

describe('In Post Controller', function () {

	before(function (done) {
		var user = new User({
			name : "Usuário Teste 02",
			email: 'teste02@teste.com',
			password: 'teste02'
		});
		user.save(done);
	})

	it('deve retornar status 200 ao fazer GET /', function (done) {
		request.get('/posts')
			   .end(function(err, res){
			   		res.status.should.eql(200);
			   		done();
			   });
	});

	it('deve ir para rota / ao fazer POST /signup', function (done) {
		var signup = { user: { name: "Usuário Teste", email: 'teste@teste.com', password: 'teste123' } };
		request.post('/signup')
				.send(signup)
				.end(function(err, res){
					res.headers.location.should.eql('/posts');
					done();
				});
	});
});
after(function (done) {
	require('./helpers').clearDb(done)
})