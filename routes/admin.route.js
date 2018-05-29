const express = require('express');
const router = express.Router();
const adminCtrl = require('../controllers/admin.controller');
const userCtrl = require('../controllers/user.controller');


router.get('/', function(req, res, next){
    res.render('pages/admin');
});


router.get('/:room_number', function(req, res, next){
   adminCtrl.getUpdateRoom(req, res);
});


router.put('/:room_number', function(req, res, next){
   adminCtrl.updateRoom(req, res);
});

module.exports = router;
