module.exports = function(app) {
  var home = app.controllers.home;
  
  app.get('/', home.index);
  app.post('/login', home.login);
  app.get('/entrar', home.entrar);
  app.get('/cadastrar', home.cadastrar);
  app.post('/signup', home.signup);
  app.get('/logout', home.logout);
};