var express = require('express');
var path = require('path');
var router = express.Router();
var roleRoutes = require('./roleRoutes');
var userRoutes = require('./userRoutes');
var clientRoutes = require('./clientRoutes');

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});
router.use('/role', roleRoutes);
router.use('/user', userRoutes);
router.use('/client', clientRoutes);

module.exports = router;
