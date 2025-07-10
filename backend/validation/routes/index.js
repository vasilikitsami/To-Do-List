var express = require('express');
const { check, validationResult } = require('express-validator');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Form Validation', succsess: req.session?.success,
    errors: req.session?.errors || [] });
  req.session.errors = null;
});

router.post('/submit',
  [
    check('email', 'Invalid email address').isEmail(),
    check('password', 'Password is invalid')
      .isLength({ min: 4 })
      .custom((value, { req }) => value === req.body.confirmPassword)
  ],
  function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.session.errors = errors.array();
      req.session.success = false;
    } else {
      req.session.success = true;
      req.session.errors = null;
    }
    res.redirect('/');
  }
);


module.exports = router;
