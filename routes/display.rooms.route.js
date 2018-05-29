const express = require('express');
const displayRoomCtrl = require('../controllers/display.rooms.controller');
const router = express.Router();

router.get('/', function(req, res, next){
  displayRoomCtrl.displayRooms(req, res);
});

module.exports = router;
