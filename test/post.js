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

	it('deve ir para rota /entrar ao fazer GET /postar sem login', function (done) {
		request.get('/postar')
				.end(function(err, res){
					res.headers.location.should.eql('/entrar');
					done();
				});
	});

	it('deve ir para rota /post/:id ao fazer POST /create', function (done) {
		var post = { post: {_id:123, title: "Post De Teste", body: 'Teste Teste Teste Teste', tags: 'teste1, teste2, teste3' } };
		request.post('/create')
				.send(post)
				.end(function(err, res){
					if (err) throw err
					res.headers.location.should.eql('/post/');
					done();
				});
	});
});
after(function (done) {
	require('./helpers').clearDb(done)
})