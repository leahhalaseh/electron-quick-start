var fs = require("fs");
var file = "testDB.db";


var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);
 //var alasql = require("alasql");
// var ss = db.exec("SELECT SUM(CompId) FROM Circuit");


db.serialize(function() {
  
  db.each("SELECT rowid AS id,CompId FROM Circuit", function(err, row) {
    console.log(row.id + ": " + row.CompId );

    //console.log(row.compId += row.CompId);


  });

  //var ss = db.exec("SELECT SUM(CompId) FROM Circuit");
 //console.log(ss);

 
     
	/* db.each("DELETE FROM Circuit WHERE CompId = 11",
    function (err, result) {
    if (err) throw err;
  }); */


});

function delMyRow(){

	db.each("DELETE FROM Circuit WHERE CompId = 11",
    function (err, result) {
    if (err) throw err;
});
}



db.close();