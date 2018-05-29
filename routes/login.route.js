const express = require('express');
const router = express.Router();
const loginCtrl = require('../controllers/login.controller');
const homeCtrl = require('../controllers/home.controller');
const userCtrl = require('../controllers/user.controller');

/** Handles get request for the name of the user in the session variable **/
router.get('/', loginCtrl.getName, homeCtrl.loadHome);

/** Handles post request to add user to the session **/
router.use('/newlogin', loginCtrl.setName, homeCtrl.loadHome);

/** Handles post request to register a user and add them to the session **/
router.use('/new', userCtrl.addUser, homeCtrl.loadHome);

module.exports = router;