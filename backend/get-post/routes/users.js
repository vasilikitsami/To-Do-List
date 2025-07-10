var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/test/submit', function(req, res, next){
  res.redirect('/test/...');
})

module.exports = router;
