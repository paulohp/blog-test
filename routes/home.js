module.exports = function(app) {
  var home = app.controllers.home;
  app.get('/', home.index);
  app.get('/entrar', home.entrar);
  app.post('/login', home.login);
  app.get('/logout', home.logout);
};