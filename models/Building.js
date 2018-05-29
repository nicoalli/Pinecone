var mongoose = require('mongoose');

var Schema = mongoose.Schema;


/*
	Schema for user for Database
*/
var BuildingSchema = new Schema(
    {
        _building_id : {
            type: Number
        },
        building_name: {
            type: String, required: true
        },
        building_code: {
            type: String, required: true
        },
        latitude: {
            type: Number, required: true
        },
        longitude: {
            type: Number, required: true
        },
        address: 
        { 
    	    street: String,
            city: String,
            province: String,
            postal_code: String
        }
        
    },
    {
        collection: 'buildings'
    }
);

// Doc for Mongoose Models: http://mongoosejs.com/docs/models
module.exports = mongoose.model('buildings', BuildingSchema);
