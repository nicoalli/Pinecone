const express = require('express');
const eventCtrl = require('../controllers/event.controller');

const router = express.Router();

router.get('/', function(req, res, next){
    eventCtrl.listEvents(req, res);
});


router.get('/:room_number', function(req, res, next){
    eventCtrl.listEventByRoomNumber(req, res);
});



module.exports = router;
