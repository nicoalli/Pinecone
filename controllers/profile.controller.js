

function loadProfile (req, res, next){

	//get admin, name, email

	res.render('pages/user_profile', {name: req.session.name, email: req.session.email, admin : req.session.admin});


}

module.exports = {loadProfile};
