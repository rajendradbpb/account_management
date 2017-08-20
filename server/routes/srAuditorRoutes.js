var express = require('express');
var path = require('path');
var router = express.Router();
var controllers = require("./../controllers/index");
router.post('/',function(req, res, next) {
  console.log(111111111111);
  controllers.srAuditorRoutes.addRole(req, res);
});
router.get('/', function(req, res, next) {
  controllers.srAuditorRoutes.getRole(req, res);
});
router.put('/', function(req, res, next) {
  controllers.srAuditorRoutes.udpateRole(req, res);
});
router.delete('/:id', function(req, res, next) {
  controllers.srAuditorRoutes.deleteRole(req, res);
});

module.exports = router;
