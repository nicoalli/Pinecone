const express = require('express');
const roomCtrl = require('../controllers/room.controller');
const router = express.Router();

router.get('/', function(req, res, next){
    res.render('pages/filterrooms')
});

router.post('/view_rooms', function(req, res, next){
    roomCtrl.viewRooms(req, res, next);
});

router.get('/list_rooms', function(req, res, next){
    roomCtrl.listRooms(req, res);
});

router.get('/:room_number', function(req, res, next){
	console.log("single room");
	roomCtrl.listRoom(req, res);
});

router.post('/', function(req, res,next) {
	roomCtrl.addRoom(req, res);
});

/*router.get('/:_room_number', function(req, res, next){
	//roomCtrl.updateRoom(req, res);
});*/

router.delete('/:room_number', function(req, res, next){
	roomCtrl.deleteRoom(req, res);
});

//A function to delete a room schedule element in the room object
router.put('/:room_number/:booking_id/:start_time', function(req, res, next){
	roomCtrl.deleteRoomBooking(req, res);
});

router.use('/search/:search_query', roomCtrl.searchRoom);

router.use('/:room_number/book_room', function (req, res, next){
	roomCtrl.bookRoom(req,res);
});

module.exports = router;
