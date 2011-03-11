
/**
 * Module dependencies.
 */

var express = require('express');
var grocery = require('./models/grocery');
require('./utils/date.format');

var persistence = require('persistencejs/lib/persistence').persistence;
var persistenceStore = require('persistencejs/lib/persistence.store.sqlite');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'darth feces was here' }));
  app.use(app.router);
  app.use('/eats', express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  persistenceStore.config(persistence, __dirname + '/db/devel.db');
});

app.configure('production', function(){
  app.use(express.errorHandler());
  persistenceStore.config(persistence, __dirname + '/db/prod.db');
});

var session = persistenceStore.getSession(function() {
  session.schemaSync();
});

// Routes

app.get('/eats/?', function(req, res){
  res.redirect('/eats/midautumn2007');
});

app.get('/eats/midautumn2007', function(req, res){
  var sort = req.param('sort', req.cookies.sort || "submit_date DESC");
  res.cookie('sort', sort, { maxAge: 604800000 }); // 7 days.
  var sort = sort.split(' ');
  var property = sort[0];
  var ascending = (sort[1] == "ASC");

  var event = new Date(2007, 9 - 1, 15); // Javascript month starts from 0.
  event = event.getTime();

  var query = grocery.Grocery.all(session).filter('event', '=', event).order(property, ascending);
  query.list(null, function(groceries) {
    res.render('midautumn2007', {
      groceries: groceries,
      layout: false,
    });
  });
});

app.get('/eats/y2006', function(req, res){
  var event = new Date(2006, 9 - 1, 22); // Javascript month starts from 0.
  event = event.getTime();

  var query = grocery.Grocery.all(session).filter('event', '=', event).order('vote', false).order('submit_date', true);
  query.list(null, function(groceries) {
    res.render('y2006', {
      groceries: groceries,
      layout: false,
    });
  });
});

// Only listen on $ node app.js

if (!module.parent) {
  app.listen(9900);
  console.log("Express server listening on port %d", app.address().port);
}
