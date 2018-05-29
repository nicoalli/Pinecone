var mongoose = require('mongoose');

var RoomScheduleSchema = require('./Room_Schedule')

var Schema = mongoose.Schema;

/*
	Schema for rooms for Database
*/
var RoomSchema = new Schema(
    {
    	_room_id: {
    		type: Number
    	},
    	room_number: {
            type: String
        },
    	room_schedules: {
        	type: Array,
        	ref: [RoomScheduleSchema]
        }, 
    	capacity: {
            type: Number
        },
        wifi: {
        	type: Boolean, default: false
        },
        computer: {
            type: Boolean, default: false
        },
        number_computers: {
            type: Number, default: 0
        },
        desks_chairs: {
            type: Boolean, default: false
        },
        number_desks: {
        	type: Number, default: 0
        },
        number_chairs: {
        	type: Number, default: 0
        },
        whiteboard_blackboard: {
        	type: Boolean, default: false
        	},
        projector: {
            type: Boolean, default: false
        },
        building: {
            type:  String,
            ref:   'buildings', //model name
            field: 'building_name' //field name
        }, 
    },
    {
        collection: 'rooms'
    }
);

// Doc for Mongoose Models: http://mongoosejs.com/docs/models
module.exports = mongoose.model('rooms', RoomSchema);
