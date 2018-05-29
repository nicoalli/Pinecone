$(document).ready(function() {

    buildUserList();

    //get list of User names
    function buildUserList() {
        var user;
        var user_id;
       

        $.get('/api/user', function (data) {
            let parent = $('#ulist');
            let users = JSON.parse(data);

            for (let i = 0; i < users.length; i++) {
                //build content of list
                
                user = users[i].first_name + ' ' + users[i].last_name 
               
                + '<button class="btn btn-sm userdelete" onclick="deleteUser(\'' + users[i]._id + '\');" id="number' 
                + users[i]._id + '" >Delete</button><br>' + '<br>' + users[i].email;
                console.log(user);

                //get user id
                user_id = users[i]._id;


                //insert the newly built <li> element
                let tmp = $('<li>', {
                    class: "user",
                    html: user,
                    value: user_id
                });
                parent.append(tmp);
            }
        });
    }





});

