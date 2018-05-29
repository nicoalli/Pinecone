$(document).ready(function() {

    
   buildRoomList();

    function buildRoomList() {
        var room;
        var room_id;
        var edit_button = '<button class="btn btn-sm edit">Edit</button><br>';

            
        $.getJSON('/api/room/list_rooms', function (data) {
            let parent = $('#rlist');
            let rooms = data;

            for (let i = 0; i < rooms.length; i++) {
                //build content of list
                
               // room = rooms[i].building + <br>;
               room = rooms[i].building + '  ' + rooms[i].room_number + '<button class="btn btn-sm edit" onclick="updateRoom(\'' + rooms[i].room_number  
                + '\');")>Edit</button><br>' 


              + '<br><button class="btn btn-sm roomdelete" onclick="deleteRoom(\'' + rooms[i].room_number + '\');" id="number' 
                + rooms[i]._id + '" >Delete</button><br>' + 
                '<a class="viewroom" href="./viewroom/'+ rooms[i].room_number  
                + '")> View room </a><br>';

               

                //get user id
                room_id = rooms[i]._id;


                //insert the newly built <li> element
                let tmp = $('<li>', {
                    class: "room",
                    html: room,
                    value: room_id
                });
                parent.append(tmp);
            }
        });
        

    }


});

