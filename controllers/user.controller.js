var User = require('../models/User');

/** Get list of all users **/
function listUsers (req, res){
    //get full list of rooms
    User.find({}, function(err, users) {
        if (err) throw err;
        res.send(JSON.stringify(users));
    });
}

/** Find user by email **/
function findbyEmail (req, res){
    console.log(req.params.email);
    User.find({email: req.params.email},function(err, users) {
        if (err) throw err;
          res.send(users);

    });
}

/** Add new User **/
function addUser (req, res, next){
    var user = new User();
    user.first_name = req.body.first_name;
    user.last_name = req.body.last_name;
    user.email = req.body.email;
    user.password = req.body.password;

    user.save(function(err, newUser) {
        if (err) throw err;

        req.session.name = req.body.first_name;
        req.session.email = req.body.email;
        req.session.admin = false;

        return next();
    });
}


/** Update User  **/
function updateUser (req, res){
  /*User.find({email: req.params.email}, function(err, user){
    if (err){
      res.send(err);}

      var new_user = User();
      if(req.query.first_name.length == 0) {



        new_user.first_name = user.first_name }

        else {
        new_user.first_name = req.query.first_name 

        new_user.last_name = req.query.last_name,
        new_user.email = req.query.email,
        new_user.password = req.query.password,


        res.json({ message: 'User updated', data: new_user });
    }
        
    
     /* user.save(function(err) {
      if (err)
        res.send(err);
      res.json({ message: 'User updated', data: user });
      });
      
    });
*/

}
 


 
/** Delete User **/
function deleteUser (req, res){
    
    User.remove({_id: req.params.user_id}, function(err, room) {
        if (err) throw err;
         res.json({ message: 'User removed from the rooms!' });
    });
}




module.exports = {listUsers, findbyEmail, deleteUser, addUser, updateUser};
