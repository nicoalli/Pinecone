var Users = require('../models/User');
var Room = require('../models/Room');

function getUpdateRoom(req, res, next){


    Room.find({room_number: req.params.room_number}, function(err, room) {

        if(err) {throw(err);}


        var wifi = 'No';
        var computer ='No';
        var whiteboard_blackboard = 'No';
        var projector = 'No';
        var deskchair = 'No';

        var room_name = room[0].building + ' ' +  room[0].room_number;

    //NOTE: admin page does not use time attribute, need to include below

    if(room[0].wifi == true) { wifi = 'Yes'; }
    if(room[0].computer == true) { computer = 'Yes'; }
    if(room[0].whiteboard_blackboard == true) { whiteboard_blackboard = 'Yes'; }
    if(room[0].projector == true) { projector = 'Yes'; }
    if(room[0].desks_chairs == true) { deskchair = 'Yes'; }

   var save_button = '<button onclick="saveButton(\''  + room[0].room_number + '\')" class="save"> Save</button>';

    res.render('pages/editroom',
      {room_name: room_name, capacity:  room[0].capacity, computer: computer,  num_computer :  room[0].number_computers,
       num_desks: room[0].number_desks, num_chairs: room[0].number_chairs, wifi : wifi, board: whiteboard_blackboard, projector: projector,
        desk_chair : deskchair, savebutton : save_button});
    })
  };


   /** Update a room by room number **/
  
  function updateRoom(req, res){
  	Room.findOne({room_number: req.params.room_number}, function(err, room) {


      if(typeof req.body.room_schedules_add != "undefined") {
            room.room_schedules += req.body.room_schedules_add;
            room.save(function(err, room) {
              if (err) throw err;
            
            });
        };
      
      if(typeof req.body.room_schedules_remove != "undefined") {
        
            room.room_schedules -= req.body.room_schedules_delete;
            room.save(function(err, room) {
              if (err) throw err;
            
            });
        };
      
      if(typeof req.body.capacity != "undefined") {
       
            room.capacity = req.body.capacity;
            room.save(function(err, room) {
              if (err) throw err;
              
            });
        };
      
      if(typeof req.body.wifi != "undefined") {
       
            room.wifi = req.body.wifi;
            room.save(function(err, room) {
              if (err) throw err;
              
            });
        };

      if(typeof req.body.computer != "undefined") {
        
            room.computer = req.body.computer;
            room.save(function(err, room) {
              if (err) throw err;
              
            });
        };

      
      if(typeof req.body.number_computers != "undefined") {
       		
            room.number_computers = req.body.number_computers;
            room.save(function(err, room) {
              if (err) throw err;
            
            });
        };

    
    if(typeof req.body.desks_chairs != "undefined") {
          room.desks_chairs = req.body.desks_chairs;
          room.save(function(err, room) {
            if (err) throw err;
          });
      };

    
    if(typeof req.body.number_desks != "undefined") {
     
          room.number_desks = req.body.number_desks;
          room.save(function(err, room) {
            if (err) throw err;
          });
      };

    
    if(typeof req.body.number_chairs != "undefined") {
     
          room.number_chairs = req.body.number_chairs;
          room.save(function(err, room) {
            if (err) throw err;
          });
      };

    
    if(typeof req.body.whiteboard_blackboard != "undefined") {
 
          room.whiteboard_blackboard = req.body.whiteboard_blackboard;
          room.save(function(err, room) {
            if (err) throw err;
           
          });
      };

    
    if(typeof req.body.projector != "undefined") {
     	 
          room.projector = req.body.projector;
          room.save(function(err, room) {
            if (err) throw err;
            
          });
      };

    
    res.send(room);

  });
  }

  

module.exports = {updateRoom, getUpdateRoom};
