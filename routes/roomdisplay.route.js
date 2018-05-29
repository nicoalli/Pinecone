const express = require('express');
const roomCtrl = require('../controllers/viewroom.controller');
const router = express.Router();

router.get('/', function(req, res, next){
    res.render('pages/viewroom')
});

router.get('/:room_number', roomCtrl.viewRoom, roomCtrl.displayRooms);

router.use('/:room_number/view', roomCtrl.viewRoom, roomCtrl.bookRoom);

module.exports = router;
