var express = require('express');
var path = require('path');
var router = express.Router();
var roleCtrl = require("./../controllers/roleCtrl");
router.post('/',function(req, res, next) {
  roleCtrl.addRole(req, res);
});
router.get('/', function(req, res, next) {
  roleCtrl.getRole(req, res);
});
router.put('/', function(req, res, next) {
  roleCtrl.udpateRole(req, res);
});
router.delete('/:id', function(req, res, next) {
  roleCtrl.deleteRole(req, res);
});

module.exports = router;
