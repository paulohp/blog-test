module.exports = function(app) {
  var home = app.controllers.home;
  app.get('/', home.index);
  app.get('/entrar', home.entrar);
  app.get('/cadastrar', home.cadastrar);
  app.post('/signup', home.signup);
  app.post('/login', home.login);
  app.get('/logout', home.logout);
};