const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.controller');
const homeCtrl = require('../controllers/home.controller');

router.get('/', function(req, res, next){
    userCtrl.listUsers(req, res);
});

router.get('/:email', function(req, res, next){
    userCtrl.findbyEmail(req, res);
});

router.delete('/:user_id', function(req, res, next){
	userCtrl.deleteUser(req, res);
});

router.put('/:email', function(req, res, next){
	userCtrl.updateUser(req, res);
});

module.exports = router;
