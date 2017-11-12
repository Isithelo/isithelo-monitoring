 
var User = require('../../../models/User');
var formsModel      = require('../../../plugins/semini/models/forms.js');
var heavyliftingModel      = require('../../../plugins/heavylifting/models/heavylifting.js');
var braintree = require("braintree");

////////////////////////////////////////////
///////   BRAINTREE INTEGRATION    ////////
//////////////////////////////////////////
var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.MERCHANTID,
  publicKey: process.env.PUBLICKEY,
  privateKey: process.env.PRIVATEKEY
});

///////////////////////////////////////////////
////     SET YOUR APP.JSON DETAILS        //// 
/////////////////////////////////////////////
//Not working ? try double dots on the json url..
var myModule = require('../../../app.json');
var sitename = myModule.sitename
var website = myModule.website
var repo = myModule.repo


/////////////////////
/////  BRIEF   ///// 
///////////////////
exports.brief = function(req, res) {
  //Determine how many forms exist on the server.
  var query1 = formsModel.find().limit(12)
  query1.exec(function (err, results) {
    if(err){console.log('Error Here'); return;}
      var ids = results[10]._id
      var Formids = results[3]._id
      res.render('../../../plugins/entanglement/views/brief', {
      pagetitle: 'Brief | '+sitename ,
      items : JSON.stringify(ids),
      Formids : JSON.stringify(Formids)
    });
})
}; 

/////////////////////////
/////  DATABASE    ///// 
///////////////////////
exports.monitoring = function(req, res) {
  //Determine how many forms exist on the server.
  var query1 = formsModel.find().limit(12)
  query1.exec(function (err, results) {
    if(err){console.log('Error Here'); return;}
      var ids = '59fd5eca077e477b30dd0967'
      var Formids = results[3]._id
      res.render('../../../plugins/entanglement/views/monitoring', {
      pagetitle: 'Monitoring | '+sitename ,
      items : JSON.stringify(ids),
      Formids : JSON.stringify(Formids)
    });
})

}; 

 

//////////////////////////////////////////
///////////   READ  GROUPS  /////////////
////////////////////////////////////////
exports.groups = function(req, res) {
  //Debugging  
debugging(req,debugMode)
  formsModel.
  find({
    'entry.parent' :req.param('data'),
    'active' : 'true'
  }).
  exec(function (err, docs1) {
    if(err){console.log('Error Here'); return;}   
    if(docs1){
      for (var i = 0; i < docs1.length; i++) {
        //the menu item elementid should arrive poulated to avoid confusion.
        if(docs1[i].elementID==''){
          docs1[i].elementID=docs1[i]._id
        }
      }
    } else {
      console.log('docs1 failed')
    } 
/*
console.log('-----------groups------------')
console.log('docs1 : ',JSON.stringify(docs1))
console.log('-----------groups------------')
*/
res.send(JSON.stringify(docs1));
});
}