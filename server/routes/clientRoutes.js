var express = require('express');
var path = require('path');
var router = express.Router();
var passport = require('passport');


// custom files
response = require("./../component/response");
var controllers = require("./../controllers/index");
router.post('/',function(req, res, next) {
  controllers.clientCtrl.postClient(req, res);
});
router.get('/', function(req, res, next) {
  controllers.clientCtrl.getClient(req, res);
});
router.put('/', function(req, res, next) {
  controllers.clientCtrl.udpateClient(req, res);
});
router.delete('/:id', function(req, res, next) {
  controllers.clientCtrl.deleteClient(req, res);
});

// token authentication
router.post('/login', passport.authenticate('login', {session:false}) ,controllers.clientCtrl.login);
router.get('/token', passport.authenticate('token', {session:false}) ,function(req,res) {
  console.log(">>>>>>>>   verify client" , req.client._doc);
});
router.get('/loggedin',passport.authenticate('token', {session:false}), function(req,res) {
  console.log(">>>>>>>>>>>>>>>>");
  res.status(200).json({status:"OK",client:req.client._doc});
  // try {
  //   userCtrl.verifiedUser(req,res,false);
  // } catch (e) {
  //   userCtrl.verifiedUser(req,res,e);
  // }
});
module.exports = router;
