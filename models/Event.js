var mongoose = require('mongoose');

var EventSchema = require('./Event')

var Schema = mongoose.Schema;

/*
	Schema for rooms for Database
*/
var EventSchema = new Schema(
    {
    	_event_id: {
            type: Number
        },
        room: {
         type: String,
         ref: 'rooms',
         field: 'room_number',
         required: true
        },
        event_name: {
         type: String
        },
        date: {
         type: String,
         required: true
        },
        time: {
         type: String,
         required: true
        }
     },
    {
        collection: 'events'
    }
);

// Doc for Mongoose Models: http://mongoosejs.com/docs/models
module.exports = mongoose.model('events', EventSchema);
