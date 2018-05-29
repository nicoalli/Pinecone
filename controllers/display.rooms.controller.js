var Room = require('../models/Room');
function displayRooms (req, res){
  console.log("here");
  var query = {};
  var date, start_time, end_time, capacity, wifi, computer,
  desks_chairs, whiteboard_blackboard, projector, building;
  if (req.query.date) date = req.query.date;
  else date = null
 if (req.query.start_time) start_time = req.query.start_time;
 else start_time = null
  if (req.query.end_time) end_time = req.query.end_time;
  else end_time = null
  if (req.query.capacity) capacity = req.query.capacity;
  else capacity = 0;
  if (req.query.wifi) wifi = req.query.wifi;
  else wifi =   [true, false];
  if (req.query.computer) computer = req.query.computer;
  else computer = [true, false]
  if (req.query.desks_chairs) desks_chairs = req.query.desks_chairs;
  else desks_chairs = [true, false]
  if (req.query.whiteboard_blackboard) whiteboard_blackboard = req.query.whiteboard_blackboard;
  else whiteboard_blackboard = [true, false]
  if (req.query.projector) projector= req.query.projector;
  else projector = [true, false]
  if (req.query.building) building = req.query.building
  else building = null;
  console.log("wifi" + wifi)
 Room.find(
    {
     $and: [
    {'room_schedules.date': {$ne: date}},
    {'room_schedules.start_time': {$ne: start_time}},
    {'room_schedules.end_time' : {$ne: end_time}},
    {capacity : {$gt: capacity}},
    {wifi: wifi},
    {computer: computer},
    {whiteboard_blackboard : whiteboard_blackboard},
    {projector: projector},
    {building: building}
   ]
 }, function(err, rooms){
    if (err) throw err;
    console.log("here");
    //res.send(rooms);
    console.log("rooms" + rooms)
    if (rooms.length > 0) {
        res.send(rooms);
          //res.render('pages/listrooms', {data: rooms, title: 'Search Results'});
    } else{
         res.send({});
          //res.render('pages/noroom', {message:'There are no rooms that match your search'});
    }
  })
}

module.exports = {displayRooms}
