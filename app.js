
/**
 * Module dependencies.
 */

var express = require('express');

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
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/eats/?', function(req, res){
  res.redirect('/eats/midautumn2007');
});

var Grocery = function () {
  this.id = 0;
  this.submitter = "Ron";
  this.submit_date = new Date;
  this.title = "知味香玉米";
  this.vote = 1;
  this.url_title = "知味香玉米";
  this.text = "這家比較讚...";
};

app.get('/eats/midautumn2007', function(req, res){
  var groceries = [];
  groceries.push(new Grocery);
  groceries.push(new Grocery);

  res.render('midautumn2007', {
    groceries: groceries,
    layout: false,
  });
});

app.get('/eats/y2006', function(req, res){
  res.render('y2006', {
    title: 'Express'
  });
});

// Only listen on $ node app.js

if (!module.parent) {
  app.listen(3000);
  console.log("Express server listening on port %d", app.address().port);
}
