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
		user.password = crypter.hash(user.password);
		user.save(done);
	})

	it('deve retornar status 200 ao fazer GET /', function (done) {
		request.get('/posts')
			   .end(function(err, res){
			   		res.status.should.eql(200);
			   		done();
			   });
	});

	describe('GET /postar', function () {
		describe('Sem Login', function () {
			it('deve ir para rota /entrar ao fazer GET /postar sem login', function (done) {
				request.get('/postar')
					.end(function(err, res){
						res.headers.location.should.eql('/entrar');
						done();
					});
			});
		})

		describe('Com Login', function () {
			var login = { user: { email: 'teste02@teste.com', password: 'teste02' } };
			before(function (done) {
				request.post('/login')
					.send(login)
					.end(function (err, res) {
						cookies = res.headers['set-cookie'].pop().split(';')[0];
						done()
					})
			})

			it('deve ir para rota /postar ao fazer GET /postar com login', function (done) {
				var req = request.get('/postar')
				req.cookies = cookies
        		req.expect('Content-Type', /html/)
					.expect(200)
					.expect(/Novo Post/)
					.end(done)
			});
		})
	})


	/*it('deve ir para rota /post/:id ao fazer POST /post com login', function (done) {
		var post = { post: {_id:123, title: "Post De Teste", body: 'Teste Teste Teste Teste', tags: 'teste1, teste2, teste3' } };
		before(function (done) {
			// login the user
			request
				.post('/login')
				.field('email', 'teste02@teste.com')
				.field('password', 'teste02')
				.end(function (err, res) {
				// store the cookie
				cookies = res.headers['set-cookie'].pop().split(';')[0];
				done()
			})
			request.post('/post')
				.send(post)
				.end(function(err, res){
					if (err) throw err
					res.headers.location.should.eql('/post/'+post.post._id);
					done();
				});
		})
	});*/
});
after(function (done) {
	require('./helpers').clearDb(done)
})