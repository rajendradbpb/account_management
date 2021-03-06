var express = require('express');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var router = express.Router();
var bodyParser = require('body-parser');
var colors = require('colors');
var response = require("./../component/response");
var models = require("./../models/index");
var constants = require("./../../config/constants");

exports.add = function(req, res) {
  new models.caFirmModel(req.body).save(function(err, data) {
    if (err)
      response.sendResponse(res, 500, "error", constants.messages.errors.saveRole, err);
    else {
      // assign cafirm to user mark as admin
      var conditions = {
          _id: mongoose.Types.ObjectId(req.body.admin)
        },
        update = {
          caFirm: data
        },
        options = {
          new: true
        };
      models.userModel.findOneAndUpdate(conditions, update, options, function(err, user) {
        if (err) {
          response.sendResponse(res, 500, "error", constants.messages.errors.saveCafirm, err);
        } else {
          response.sendResponse(res, 200, "success", constants.messages.success.saveCafirm);
        }
      })

    }
  })
}
exports.get = function(req, res) {
  var params = {
    isDelete: false
  };
  if (req.query._id) {
    console.log("req.query.id   " + req.query._id);
    params['_id'] = mongoose.Types.ObjectId(req.query._id)
  }
  models.caFirmModel.find(params, function(err, data) {
    if (err) {
      response.sendResponse(res, 500, "error", constants.messages.errors.getCafirm, err);
    } else {
      response.sendResponse(res, 200, "success", constants.messages.success.getCafirm, data);
    }
  })
}
exports.udpate = function(req, res) {
  var query = {
    "_id": req.body._id
  }
  delete req.body['_id'];
  var options = {
    new: true
  };
  models.caFirmModel.findOneAndUpdate(query, req.body, options).exec()
    .then(function(data) {
      response.sendResponse(res, 200, "success", constants.messages.success.udpateRole, data);
    })
    .catch(function(err) {
      response.sendResponse(500, "error", constants.messages.error.udpateRole, err);
    })
}
exports.delete = function(req, res) {
  var query = {
    "_id": req.params.id
  }
  delete req.body['_id'];
  models.caFirmModel.findOneAndUpdate(query, {
    "isDelete": true
  }, {
    "new": true
  }, function(err, data) {
    if (err)
      response.sendResponse(res, 500, "error", constants.messages.errors.deleteRole, err);
    else
      response.sendResponse(res, 200, "success", constants.messages.success.deleteRole);
  })
}
