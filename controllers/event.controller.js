var Event = require('../models/Event');

/** Get list of all rooms **/
function listEvents (req, res){
    //get full list of rooms
    Event.find({}, function(err, events) {
        if (err) throw err;
        res.send(events);
    });
}

/**Query rooms to get a room  by room number**/
function listEventByRoomNumber(req, res){
  // Use the Room model to find a specific room
   Event.find({room_number: req.params.room_number}, function(err, event) {
        if (err) throw err;
        res.send(event);
    });

}
module.exports = {listEvents, listEventByRoomNumber};
