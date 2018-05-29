var mongoose = require('mongoose');

var Schema = mongoose.Schema;


/*
	Schema for user for Database
*/
var UserSchema = new Schema(
    {
        _user_id: {
            type: Number
        },
        first_name: {
            type: String, required: true
        },
        last_name: {
            type: String, required: true
        },
        email: {
            type: String, required: true
        },
        password: {
            type: String, required: true
        },
        admin: {
        	type: Boolean, required: true, default: false
        },
    },
    {
        collection: 'users'
    }
);

// Doc for Mongoose Models: http://mongoosejs.com/docs/models
module.exports = mongoose.model('users', UserSchema);
