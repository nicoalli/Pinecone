const express = require('express');

const homeCtrl = require('../controllers/admin.controller');



const router = express.Router();

router.get('/', function(req, res, next){
    res.render('pages/listrooms.html');
});

module.exports = router;