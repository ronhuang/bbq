
var sys = require('sys');
var sqlite = require('sqlite');

var old_db = new sqlite.Database();
var new_db = new sqlite.Database();

var old_db_path = process.argv[2];
var new_db_path = process.argv[3];

new_db.open(new_db_path, function(error) {
  if (error) {
    console.log("Faile to open %s", new_db_path);
    return;
  }

  var sql = 'CREATE TABLE IF NOT EXISTS `Grocery` (`submitter` TEXT, `submit_date` INT, `title` TEXT, `vote` INT, `text` TEXT, `picture` TEXT, `event` INT, `id` VARCHAR(32) PRIMARY KEY)';
  new_db.execute(sql, function(error, rows) {
    if (error) {
      console.log("Failed to create table");
      return;
    }

    var sql = 'INSERT INTO Grocery (submitter, submit_date, title, vote, text, picture, event, id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    new_db.prepare(sql, function(error, new_statement) {
      if (error) {
        console.log("Failed to create statement: %s", sql);
        console.log(error);
        return;
      }

      old_db.open(old_db_path, function(error) {
        if (error) {
          console.log("Faile to open %s", old_db_path);
          return;
        }

        var sql = 'SELECT * FROM groceries';
        old_db.prepare(sql, function(error, old_statement) {
          if (error) throw error;
          old_statement.fetchAll(function(error, rows) {

            var i = 0, length = rows.length;

            var doStep = function() {
              row = rows[i];
              new_statement.bind(1, row.submitter, function(error) {
                if (error) return error;
                new_statement.bind(2, Date.parse(row.submit_date), function(error) {
                  if (error) return error;
                  new_statement.bind(3, row.title, function(error) {
                    if (error) return error;
                    new_statement.bind(4, row.vote, function(error) {
                      if (error) return error;
                      new_statement.bind(5, row.text, function(error) {
                        if (error) return error;
                        new_statement.bind(6, row.picture, function(error) {
                          if (error) return error;
                          new_statement.bind(7, Date.parse(row.event), function(error) {
                            if (error) return error;
                            new_statement.bind(8, "" + row.id, function(error) {
                              new_statement.step(function(error, row) {
                                if (error) return error;
                                console.log("Imported row %d/%d", i, length);
                                if (++i < length) {
                                  new_statement.clearBindings();
                                  new_statement.reset();
                                  doStep();
                                }
                              });
                            });
                          });
                        });
                      });
                    });
                  });
                });
              });
            }

            doStep();
          });
        });
      });
    });
  });
});

