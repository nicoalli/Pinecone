const express = require('express');
const router = express.Router();

// Set up variable to hold the authentication functions
const auth = require('../controllers/authentication.controller');

// Set up variables that hold our routes
const roomRoutes = require('./room.route');
const mapRoutes = require('./map.route');
const loginRoutes = require('./login.route');
const userRoutes = require('./user.route');
const homeRoutes = require('./home.route');
const adminRoutes = require('./admin.route');
const eventRoutes = require('./event.route');
const viewRoomRoutes = require('./roomdisplay.route');
const displayRoomRoutes = require('./display.rooms.route.js');
const roomcriteriaRoutes = require('./roomcriteria.route');


/*router.use('/room', roomRoutes);
router.use('/map', mapRoutes);
router.use('/login', loginRoutes);
router.use('/home', homeRoutes);
router.use('/admin', adminRoutes);
router.use('/user', userRoutes);
router.use('/viewroom', viewRoomRoutes);
router.use('/event', eventRoutes);
router.use('/displayRooms', displayRoomRoutes);
router.use('/roomcriteria', roomcriteriaRoutes);*/

//mount all our routes to /api
router.use('/login', loginRoutes);
router.use('/admin', adminRoutes);

router.use('/home', auth.isLoggedIn, homeRoutes);
router.use('/room', auth.isLoggedIn, roomRoutes);
router.use('/map', auth.isLoggedIn, mapRoutes);
router.use('/user', auth.isLoggedIn, userRoutes);
router.use('/viewroom', auth.isLoggedIn, viewRoomRoutes);
router.use('/user', auth.isLoggedIn, viewRoomRoutes);
router.use('/event', auth.isLoggedIn, eventRoutes);
router.use('/displayRooms', auth.isLoggedIn, displayRoomRoutes);
router.use('/roomcriteria', auth.isLoggedIn, roomcriteriaRoutes);
router.use('/admin', auth.isAdmin, adminRoutes);

module.exports = router;
