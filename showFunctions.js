var fs = require("fs");
var file = "DBTest.db";

var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);

var volt=9;
var resistance=10;
var current;
var elementID = 0;
//For the sake of this demonstration let us say that the elem passed into some of 
//these functions has id = 2 therefore the CompNumber = 2
var elemID = 2;


/*<!--Showing that the functions work-->*/

createTable();

//Testing createComponent()
/*for(var i = 0; i < 4; i++){
  if(i==2){
    Type = "resistor";
  }
  else if(i==3){
    Type = "cell";
  }
  else
    Type = "voltmeter";

  createComponent(i+i,(i*3),Type);
}*/

/*Testing getVoltage()*/
//console.log("voltage is "+getVoltage());

/*Testing getResistance()*/
//console.log("resistance is "+getResistance());

/*Testing calcCurrent()*/
//console.log("current is "+calcCurrent());

/*Testing editValue()*/
//editValue();

/*Testing removeComponent()*/
//removeComponent();

/*Testing clearCircuit()*/
//clearCircuit();


/*<!--The functions-->*/
//All the 'real' functions are commented out below their corresponding test function

/*Create the Circuit table*/
function createTable(){
  db.serialize(function(){
    db.run("CREATE TABLE IF NOT EXISTS Circuit(CompNumber NUMERIC, Type TEXT, Value NUMERIC, xValue NUMERIC, yValue NUMERIC);");
  });
}

/*Create components for the table*/
function createComponent(left,top,type){
  var value;
  console.log("in the create thing");
  ++elementID;
  //elementID = getID(elem);

  if(type == "cell"){
    value = 10;
  }
  else if(type == "resistor"){
    value = 9;
  }
  else{
    value = null;
  }

  var stmt = db.prepare("INSERT INTO Circuit VALUES (?,?,?,?,?)");
  stmt.run(elementID,type,value,left,top);
  stmt.finalize();
}

/*Get the voltage of the circuit*/
function getVoltage(){
  //console.log("in voltage");
  db.each("SELECT rowid AS id, Value FROM Circuit WHERE Type = 'cell'", function(err, row){
     //console.log(row.Value);
     volt = row.Value;
  });
  return volt;
}
/*function getVoltage(){
  db.each("SELECT rowid AS id, Value FROM Circuit WHERE Type = 'cell'", function(err, row){
     //console.log(row.Value);
     volt += row.Value;
     console.log(volt);
  });
  return volt;
}*/

/*Get the resistance of the circuit*/
function getResistance(){
  //console.log("in resistance");
  db.each("SELECT rowid AS id, Value FROM Circuit WHERE Type = 'resistor'", function(err, row){
     //console.log(row.Value);
     resistance = row.Value;
  });
  return resistance;
}
/*function getResistance(){
  db.each("SELECT rowid AS id, Value FROM Circuit WHERE Type = 'resistor'", function(err, row){
     //console.log(row.Value);
     resistance += row.Value;
     console.log(resistance);
  });
  return resistance;
}*/

/*Calculate the current around the circuit*/
function calcCurrent(){
  //console.log("in current");
  current = (getVoltage()/getResistance());
  return current;
}

/*Changing the value of a particular component*/
function editValue() {
  var id = getID();
  var x = 5;

  var stmt = db.prepare("UPDATE Circuit SET Value = (?) WHERE CompNumber = (?)");
  stmt.run(x,id);
  stmt.finalize();
}
/*function editValue(name,elem) {
  var id = getID(elem);
  var x = document.getElementsByName("name").value;

  var stmt = db.prepare("UPDATE Circuit Set Value (?) WHERE CompNumber = (?)");
  stmt.run(x,id);
  stmt.finalize();
}*/

function removeComponent(){
  var id = getID();

  var stmt = db.prepare("DELETE FROM Circuit WHERE CompNumber = (?)");
  stmt.run(id);
  stmt.finalize();
}
/*function removeComponent(elem){
  var id = getID(elem);

  var stmt = db.prepare("DELETE FROM Circuit WHERE CompNumber = (?)");
  stmt.run(id);
  stmt.finalize();
}*/

function getID(){
  return elemID;
}
/*function getID(elem){
  return elem.attr("id");
}*/

/*Removes all rows from Circuit table*/
function clearCircuit() {
  //console.log("circuit being cleared");
  db.run("DELETE FROM Circuit WHERE CompNumber!=0 "); 
  count = 0;
}
