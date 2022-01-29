const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const password  = require('../middleware/password');

router.post('/signup', password, userCtrl.signup);    //  inscription
router.post('/login', password, userCtrl.login);  //  connexion

module.exports = router;