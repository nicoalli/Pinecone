/* Deletes the user from the Database */
function deleteUser(userID) {
  var result = window.confirm("Are you sure you want to delete this user?");

  if(result == true) {
    
        $.ajax({
            url:  'user/' + userID,
            type: 'DELETE',
            success: function(result) {
              window.alert("User successfully deleted");
              location.reload(); 
            }
          
        });   
      }
  else {}
}


/* Deletes the user from the Database */
function deleteRoom(room_number) {
  var result = window.confirm("Are you sure you want to delete this room?");

  if(result == true) {
    
        $.ajax({
            url:  'room/' + room_number,
            type: 'DELETE',
            success: function(result) {
              window.alert("Room successfully deleted");
              location.reload(); 
            }
          
        });   
      }
  else {}
}



/* Deletes the user's booking from the Database */

function deleteBooking(room_url) {
  var result = window.confirm("Are you sure you want to delete this booking?");

  if(result == true) {
     
      $.ajax({
            url:  'room/' + room_url,
            type: 'PUT',
            success: function(result) {



              window.alert("Booking successfully deleted");
              location.reload(); 
            }
          
        });
          
      }
  else {}
}

/* Deletes the user from the Database */
function updateRoom(room_number) {
  
        $.ajax({
            url:  'admin/' + room_number, 
            type: 'GET',
            success: function(result) {
           
              document.write(result);
            },
            error: function (err) {
              document.write(err.responseText);
            }
          
        });   
      }
 
