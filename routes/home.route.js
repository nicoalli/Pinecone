const express = require('express');
const homeCtrl = require('../controllers/home.controller');
const roomCtrl = require('../controllers/room.controller');
const profileCtrl = require('../controllers/profile.controller');

const router = express.Router();

// Render home page
router.get('/', homeCtrl.loadHome);

router.get('/profile', function(req, res, next){
   profileCtrl.loadProfile(req, res);
});


//Send the user's name and email to userprofile
//router.use('/profile', homeCtrl.loadBookings, homeCtrl.sendName);

router.put('/:room_number/:booking_id/:start_time', function(req, res, next){
	roomCtrl.deleteRoomBooking(req, res);
});

module.exports = router;
