const express = require('express');
const router = express.Router();
const mapCtrl = require('../controllers/map.controller');

/** Renders map page **/
router.get('/', function(req, res, next){
    res.render('pages/map');
});

/** Handles get request to retrieve all buildings from db **/
router.get('/loadBuildings', function(req, res, next){
    mapCtrl.listBuildings(req, res);
});

/** Handles post request to retrieve building information **/
router.post('/marker', function(req, res, next){
    mapCtrl.loadMarker(req, res);
});

module.exports = router;