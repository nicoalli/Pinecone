function isLoggedIn(req, res, next) {
    if ('name' in req.session) {
        next();
    }
    else {
        //there is no session variable meaning no user is logged in
        //give the client the login page instead
        res.render('pages/login');
    }
}

function isAdmin(req, res, next){
    if ('admin' in req.session){
        next();
    }
    else {
        res.render('pages/login');
    }
}

module.exports = {isLoggedIn, isAdmin};