var Room = require('../models/Room');

/** Get list of all rooms **/
function listRooms (req, res){
    //get full list of rooms
    Room.find({}, function(err, rooms) {
        if (err) throw err;
        res.send(rooms);
    });
}

/**Query rooms to get a room  by room number**/
function listRoom(req, res){
  // Use the Room model to find a specific room
   Room.find({room_number: req.params.room_number}, function(err, room) {
        if (err) throw err;
        res.send(room);
    });
}

/** Get list of rooms according to  form criteria */
function viewRooms(req, res, next){
    if (req.body.wifi == undefined){
      req.body.wifi = [true, false];
    }
    if (req.body.computer == undefined){
      req.body.computer = [true, false];
    }
    if (req.body.computer == false || req.body.number_computers == undefined){
      req.body.number_computers = 0;
    }
    if (req.body.desks_chairs == undefined){
      req.body.desks_chairs = [true, false];
    }
    if (req.body.desks_chairs == false || req.body.number_desks == undefined){
      req.body.number_desks = 0;
    }
    if (req.body.desks_chairs == false || req.body_number_chairs == undefined){
      req.body.number_chairs = 0;
    }
    if (req.body.whiteboard_blackboard == undefined){
      req.body.whiteboard_blackboard = [true, false];
    }
    if (req.body.building == undefined){
      req.body.building = null;
    }
    console.log("room" + req.body.building)
	// Use the Room model to find a specific room with form criteria
   Room.find(
     {
      $or: [

       {'room_schedules.date': {$ne: req.body.date}},
     {'room_schedules.start_time': {$ne: req.body.start_time}},
     {'room_schedules.end_time' : {$ne: req.body.end_time}},
     {capacity : {$gt: req.body.capacity}},

     {building: req.body.building},
     { wifi : req.body.wifi},
     { computer: req.body.computer},

     {number_computers: {$gt: req.body.number_computers}},

     { desks_chairs: req.body.desks_chairs},

     { number_chairs: {$gt: req.body.number_chairs}},

     {number_desks: {$gt: req.body.number_desks}},
   
     {whiteboard_blackboard: req.body.whiteboard_blackboard},

     {projector: req.body.projector},
   ]
    },
    function(err, foundRooms){
         //save serach criteria
        var criteria = {
            date: req.body.date,
            start_time: req.body.start_time,
            end_time: req.body.end_time
        };

        if (foundRooms.length > 0){
        res.render('pages/listrooms', {data: foundRooms, criteria: criteria, title: 'All Rooms'} );
        }
        else {
          res.render('pages/noroom', {message:'There are no rooms that match your search'});

        }
  });
}



//Add a room
function addRoom(req, res){
       var room = new Room();
       room.building = req.body.building,
       room.room_number = req.body.room_number,
       room.computer = req.body.computer,
       room.number_computers = req.body.number_computers,
       room.capacity = req.body.capacity,
       room.blackboard = req.body.blackboard,
       room.projector = req.body.projector,
       room.desks = req.body.desks
       room.save(function(err) {
           if (err) throw err;
       res.json({ message: 'Room added', data: room });
       });
}

/* Delete a room */
function deleteRoom(req, res){
	 Room.remove({room_number: req.params.room_number}, function(err, room) {
        if (err) throw err;
         res.json({ message: 'Room removed from the rooms!' });
    });
}


/* Delete a room schedule element */
function deleteRoomBooking(req, res) {
  Room.find({room_number: req.params.room_number}, function(err, room) {
    if (err) throw err;

    var schedules = room[0].room_schedules;
    for(var i = 0; i < schedules.length; i ++) {
      if(schedules[i].user == req.params.booking_id
          && schedules[i].start_time == req.params.start_time) {

           room[0].room_schedules.splice(i, 1);
      }
    }
    room[0].save(function(err, room) {
            if (err) throw err;
            res.send(room);
          });


   });
}

/* Queries db to find any room that matches the search query */
function searchRoom(req, res, next){
    var query = req.params.search_query;
    var codePattern = '^' + query + '$';

    Room.find({
        $or: [
        {room_number: { '$regex': codePattern, $options: 'i' }},
        {room_number: {'$regex': query, $options:'i'}},
        {building: {'$regex': query, $options:'i'}}
        ]},

        function(err, results) {
        console.log(results);
            if (results.length > 0) {
                res.render('pages/listrooms', {data: results, title: 'Search Results'});
            } else{
                res.render('pages/noroom', {message:'There are no rooms that match your search'});
            }
        }
    );

}

/* Books the room selected by the user */
function bookRoom(req, res){
    Room.findOne({room_number: req.params.room_number}, function(err, room){
        if (err) throw err;

        //add the users booking to the room's room_schedule
        room.room_schedules.push({
            date: req.body.date,
            start_time: req.body.start_time,
            end_time: req.body.end_time,
            user: req.session.email,
            booked: true});

        //catch if there is any errors
        room.save(function (err, output){
            if (err) throw err;
            res.send({message: 'Successfully Booked'});
        });
    });
}

module.exports = {listRooms, listRoom, /*updateRoom,*/ addRoom, deleteRoom, viewRooms, searchRoom, deleteRoomBooking, bookRoom};
