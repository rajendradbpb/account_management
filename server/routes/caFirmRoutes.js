var express = require('express');
var path = require('path');
var router = express.Router();
var controllers = require("./../controllers/index");
router.post('/',function(req, res, next) {
  controllers.caFirmCtrl.add(req, res);
});
router.get('/', function(req, res, next) {
  controllers.caFirmCtrl.get(req, res);
});
router.put('/', function(req, res, next) {
  controllers.caFirmCtrl.udpate(req, res);
});
router.delete('/:id', function(req, res, next) {
  controllers.caFirmCtrl.delete(req, res);
});

module.exports = router;
