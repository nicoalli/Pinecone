function deleteBooking(room_url) {
  var result = window.confirm("Are you sure you want to delete this booking?");

  if(result == true) {
      //TODO: Delete room by unique booking id instead of starttime and user and room


      $.ajax({
            url:  'http://localhost:3000/api/room/' + room_url,
            type: 'PUT',
            success: function(result) {



              window.alert("Booking successfully deleted");
              location.reload();
            }

        });


  }
}
