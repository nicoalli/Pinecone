$(document).ready(function() {


   buildScheduleList();

    function buildScheduleList() {
        var schedule;
        var schedule_id;
        var edit_button = '<button class="btn btn-sm edit">Edit</button><br>';
         var delete_button = '<button class="btn btn-sm delete">Delete</button><br>';



        $.getJSON('/api/room/list_rooms', function (data) {
            let parent = $('#blist');
            let bookings = data;


            var user = document.getElementById("user_email").innerHTML;
            console.log(user);

            for (let i = 0; i < bookings.length; i++) {
                //build content of list

                let sched = bookings[i].room_schedules;
                for(let j = 0; j <  sched.length; j ++) {

                 if (sched[j].user === user) {    

                 schedule = bookings[i].building + '<br>' + sched[j].date + '<br>' + sched[j].start_time + ' to ' + sched[j].end_time 
                
                +  '<br><button class="btn btn-sm roomdelete" onclick="deleteBooking(\'' + bookings[i].room_number + '/' + sched[j].user + '/' + sched[j].start_time
                + '\');")>Delete</button><br>' ;



               //get user id
                room_id = bookings[i]._id;


                //insert the newly built <li> element
                let tmp = $('<li>', {
                    class: "event",
                    html: schedule,
                    value: room_id
                });
                parent.append(tmp);

                }
            }



            }
        });

    }



});
