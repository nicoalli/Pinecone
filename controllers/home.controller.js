var Events = require('../models/Event');
var Room = require('../models/Room');
var room_numbers = [];
var room_bookings = [];
var cancel_buttons = [];

/** Get the list of events **/
function loadHome (req, res, next){
    //find all events from db
    console.log(req.session);

    Events.find({}, function(err, events) {
        if (err) throw err;
        if (events.length > 0){
            res.render('pages/main', {events: events, name: req.session.name, admin : req.session.admin });
        } else{
            res.render('pages/main', {events: '', name: req.session.name, admin : req.session.admin })
        }
    });
}

/** Get all the users bookings **/
function loadBookings(req, res, next){
    Room.find({}, function(err, rooms){

      for (var i=0; i < rooms.length; i++) {
          var room_schedules = rooms[i].room_schedules;
          console.log(req.session.email);

              for (var j = 0; j < room_schedules.length; j++) {
              
                if(room_schedules[j].user === null) {}

                else if (room_schedules[j].user === req.session.email) {
                 
                      room_numbers.push(rooms[i].room_number);
                      room_bookings.push(room_schedules[j]);
                      var cancel_string = '<button class="btn btn-sm roomcancel" onclick="deleteBooking(\'' + rooms[i].room_number + '/' + req.session.email + '/' + room_schedules[j].start_time
                          + '\');")>Delete</button><br>';
                      cancel_buttons.push(cancel_string);
                  }
              
            }
          }
        if (err) throw err;

        return next();
    });
    
}

/** Get the user name from the session variable and display it in user profile**/
function sendName (req, res, next){
    if (req.session.name) {
        res.render('pages/user_profile', {name: req.session.name, email: req.session.email,room_numbers: room_numbers, data: room_bookings, cancel: cancel_buttons, admin : req.session.admin});
    }
    else {
        //render the log in page
        res.render('pages/login');
    }

}

/** Get the email from the db and display it in user profile**/
function sendEmail (req, res, next){

    //Display the email in the user profile
    if (req.session.email) {
        res.render('pages/user_profile', {email: req.session.email});
    }
    else {
        res.render('pages/login');
    }
}

module.exports = {sendName, sendEmail, loadHome, loadBookings};
