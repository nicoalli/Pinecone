var Users = require('../models/User');

/** Add the user to the session **/
function setName(req, res, next) {
    //check if the user is in the db
    Users.findOne({
            "email": req.body.email,
            "password": req.body.password
        },

        //add the user to the session
        function (err, result) {
            if (err) throw err;
            req.session.name = result.first_name;
            req.session.email = result.email;
            req.session.admin = result.admin;

            //the user is an administrator
            if (result.admin){
                req.session.admin = true;
            }
            //go to the next function in the chain
            return next();
    });
}

/** Get the user name from the session variable **/
function getName (req, res, next){
    //store this user in the session
    if (req.session.name) {
        return next();
    }
    else {
        //there is no session variable meaning no user is logged in
        //give the client the login page instead
        res.render('pages/login');
    }
}

//noinspection JSAnnotator
module.exports = {getName, setName};