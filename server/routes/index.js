var express = require('express');
var path = require('path');
var router = express.Router();
var roleRoutes = require('./roleRoutes');

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});
router.use('/role', roleRoutes);
module.exports = router;
