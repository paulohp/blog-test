var app = require('../app');
var should = require('should');
var request = require('supertest')(app);

describe('In Home Controller', function () {
	it('deve retornar status 200 ao fazer GET /', function (done) {
		request.get('/')
			   .end(function(err, res){
			   		res.status.should.eql(200);
			   		done();
			   });
	});

	it('deve ir para rota / ao fazer GET /logout', function (done) {
		request.get('/logout')
			   .end(function(err, res){
			   		res.headers.location.should.eql('/');
			   		done();
			   });
	});

	it('deve ir para rota / ao fazer POST /login', function (done) {
		var login = { user: { email: 'teste@teste.com', password: 1233456 } };
		request.post('/login')
			   .send(login)
			   .end(function(err, res){
					res.headers.location.should.eql('/');
					done();
			   });
	});

	it('deve ir para rota / ao fazer POST /login', function (done) {
		var login = { user: { email: '', password: '' } };
		request.post('/login')
			   .send(login)
			   .end(function(err, res){
					res.headers.location.should.eql('/entrar');
					done();
			   });
	});
});