var mongoose = require('mongoose');

var Schema = mongoose.Schema;


/*
	Schema for room schedule for Database
*/
var RoomScheduleSchema = new Schema(
    {

       _booking_id: {
            type: Number
        },
       room: {
           type:  String,
           ref:   'rooms', //model name
           field: 'room_number' //field name
       },
       date: {
            type: Date, required: true, default : ""
       },
       start_time: {
            type: String, required: true
       },
       end_time: {
            type: String, required: true
       },
       user: {
       		type:  String,
            ref:   'users', //model name
           field: 'email' //field name
       },
       booked: {
        	type: Boolean, required: true
       },
    },
    {
        collection: 'room_schedules'
    }
);

// Doc for Mongoose Models: http://mongoosejs.com/docs/models
module.exports = mongoose.model('room_schedules', RoomScheduleSchema);
