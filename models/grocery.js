var persistence = require('persistencejs/lib/persistence').persistence;

var Grocery = exports.Grocery = persistence.define('Grocery', {
  submitter: "TEXT",
  submit_date: "DATE",
  title: "TEXT",
  vote: "INT",
  text: "TEXT",
  picture: "TEXT",
  event: "DATE"
});

Grocery.index('submit_date');
Grocery.index('vote');
Grocery.index('submitter');
