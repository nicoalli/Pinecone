var Room = require('../models/Room');



/* Queries db to find any room that matches the search query */
function viewRoom(req, res, next) {
    Room.find({room_number: req.params.room_number}, function (err, room) {

        if (err) throw(err);
        console.log("here");
        console.log(req.params.room_number);
        var desk = '';
        var wifi = '';
        var computer = '';
        var whiteboard_blackboard = '';
        var projector = '';
        var no_computers = room[0].number_computers + ' computers, ';
        var no_desks = room[0].number_desks + ' desks, ';
        var no_chairs = room[0].number_chairs + ' chairs, ';

        //NOTE: admin page does not use time attribute, need to include below

        if (room[0].wifi == true) {
            wifi = 'Wifi,';
        }
        if (room[0].desk == true) {
            desk = 'Desks,';
        }
        if (room[0].computer == true) {
            computer = 'Computers,';
        }
        if (room[0].whiteboard_blackboard == true) {
            whiteboard_blackboard = 'Whiteboard/Blackboard,';
        }
        if (room[0].projector == true) {
            projector = 'Projector,';
        }

        res.roomData = {
            building: room[0].building,
            room_number: room[0].room_number,
            capacity: room[0].capacity,
            number_computers: no_computers,
            number_desks: no_desks,
            number_chairs: no_chairs,
            has_wifi: wifi, 
            projector: projector, 
            boards :  whiteboard_blackboard
        };

        return next();

    });
}

function displayRooms(req, res, next){
    res.render('pages/viewroom', {room_info: res.roomData, booking_info: {}});
}

function bookRoom(req, res, next){
    res.render('pages/viewroom', {room_info: res.roomData, booking_info: req.body});
}

module.exports = {viewRoom, displayRooms, bookRoom};
