var express = require('express');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var router = express.Router();
var bodyParser = require('body-parser');
var LOG = require('./../component/LOG');
var response = require("./../component/response");
var constants = require("./../../config/constants");
var userModel = require("./../models/userModel");
var password = require('password-hash-and-salt');
var jwt     = require('jsonwebtoken');
var config     = require('config');
// var password = require('password-hash-and-salt');
// var jwt     = require('jsonwebtoken');
// var config = require("config");
// var waterfall = require('async-waterfall');
// var async = require('async');
// var utility = require('./../component/utility');
/*
* this will be executed if authentication passes
*/
exports.verifiedUser = function(req,res,isError){
  console.log("verified in ctrl");
  if(!isError){
    response.sendResponse(res,200,"success",constants.messages.success.verified);
  }
  else{
    console.log(isError);
    response.sendResponse(res,200,"success",constants.messages.error.verified);
  }
}
exports.login = function (req, res) {
  // creating token that will send to the client side
  console.log("login  1111");
  try {
    var token = jwt.sign(req.user, config.token.secret, { expiresIn: config.token.expiry },
      function(token) {
        console.log("login  2222");
        var data = {
          role:req.user.role,
          token:token
        }
        response.sendResponse(res,200,"success",constants.messages.success.login,data);
      });
  } catch (e) {
    console.log("login  2222",e);
    response.sendResponse(res,500,"error",constants.messages.errors.login,e);
  }
}
exports.addUser = function(req,res){
  LOG.info("add user");
  password(req.body.password).hash(function(error, hash) {
    req.body.password = hash; // encrypting the password
    new userModel(req.body).save(function (err) {
      if(err){
        LOG.error(err.message);
        response.sendResponse(res,500,"error",constants.messages.errors.saveUser,err);
      }
        else {
          response.sendResponse(res,200,"success",constants.messages.success.saveUser);
        }
    })
  })

}
exports.getUser = function(req,res){
  var params = {
    isDelete:false
  };
  console.log("req.query._id   "+req.query._id);
  if(req.query._id){
    params['_id'] = req.query._id
  }
  userModel.findOne(params,function(err,data){
    response.sendResponse(res,200,"success",constants.messages.success.fetchRoles,data);
  })
}
exports.udpateUser = function(req,res){
  var query = {
    "_id":req.body._id
  }
  delete req.body['_id'];
  var options = {new:true};
  userModel.findOneAndUpdate(query, req.body,options).exec()
  .then(function(data) {
    response.sendResponse(res,200,"success",constants.messages.success.udpateRole,data);
  })
  .catch(function(err) {
    response.sendResponse(500,"error",constants.messages.error.udpateRole,err);
  })
}
exports.deleteUser = function(req,res){
  var query = {
    "_id":req.params.id
  }
  delete req.body['_id'];
  userModel.findOneAndUpdate(query,{"isDelete":true},{"new" :true},function(err,data) {
    if(err)
      response.sendResponse(res,500,"error",constants.messages.errors.deleteRole,err);
    else
      response.sendResponse(res,200,"success",constants.messages.success.deleteRole);
  })
}
