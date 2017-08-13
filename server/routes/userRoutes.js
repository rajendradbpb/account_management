var express = require('express');
var path = require('path');
var router = express.Router();
var passport = require('passport');


// custom files
response = require("./../component/response");
var userCtrl = require("./../controllers/userCtrl");
router.post('/',function(req, res, next) {
  userCtrl.addUser(req, res);
});
router.get('/', function(req, res, next) {
  userCtrl.getUser(req, res);
});
router.put('/', function(req, res, next) {
  userCtrl.udpateUser(req, res);
});
router.delete('/:id', function(req, res, next) {
  userCtrl.deleteUser(req, res);
});

// token authentication
router.post('/login', passport.authenticate('login', {session:false}) ,userCtrl.login);
router.get('/token', passport.authenticate('token', {session:false}) ,function(req,res) {
  console.log(">>>>>>>>   verify user" , req.user._doc);
});
router.get('/loggedin',passport.authenticate('token', {session:false}), function(req,res) {
  console.log(">>>>>>>>>>>>>>>>");
  res.status(200).json({status:"OK",user:req.user._doc});
  // try {
  //   userCtrl.verifiedUser(req,res,false);
  // } catch (e) {
  //   userCtrl.verifiedUser(req,res,e);
  // }
});
module.exports = router;
