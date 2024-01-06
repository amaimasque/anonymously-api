var express = require('express');
const { Login, Logout } = require('../controllers/UsersController');
var router = express.Router();

router.post("/login", Login)

router.post("/logout", Logout)
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
