var Buildings = require('../models/Building');

/** Get list of all buildings **/
function listBuildings (req, res){
    //get full building list from db
    Buildings.find({}, function(err, buildings) {
        if (err) throw err;
        var buildingJSON = JSON.stringify(buildings);
        res.send(buildingJSON);
    });
}

/** Get building information based on post request **/
function loadMarker (req, res){
    //get information of a certain building
   Buildings.findById(req.body.building_id, function(err, binfo){
       if (err) throw err;
       var binfoJSON = JSON.stringify(binfo);
       res.send(binfoJSON);
   });
}

//noinspection JSAnnotator
module.exports = {listBuildings, loadMarker};