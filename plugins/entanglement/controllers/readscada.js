var formsModel      = require('../../../plugins/semini/models/forms.js');
var entanglementModel      = require('../../../plugins/entanglement/models/entanglement.js');
var scadaModel      = require('../../../plugins/entanglement/models/scada.js');
var ObjectId = require('mongodb').ObjectID;
var directory = '../../../plugins/entanglement/views/'

///////////////////////////////////////////////
////     SET YOUR APP.JSON DETAILS        //// 
/////////////////////////////////////////////
//Not working ? try double dots on the json url..
var myModule = require('../../../app.json');
var sitename = myModule.sitename
var website = myModule.website
var repo = myModule.repo

/////////////////////////////////
////       DEBUGGING        //// 
///////////////////////////////
var debugMode = true
function debugging(req,query){
  if (query) {
    console.log()
    console.log('----------  DEBUGGING  ----------')
    console.log('Directory Name : '+__dirname)
    console.log('Original req URL : '+req.originalUrl)
    console.log('----------  DEBUGGING  ----------')
    console.log()
  }
} 

//////////////////////////////////////////
///////////   READ  GROUPS  /////////////
////////////////////////////////////////
exports.getscada = function(req, res) {
  //Debugging  
  debugging(req,debugMode)
  scadaModel.
  find().
  exec(function (err, docs1) {
    res.send(JSON.stringify(docs1));
  });
}