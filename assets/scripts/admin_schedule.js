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

            for (let i = 0; i < bookings.length; i++) {
                //build content of list

                let sched = bookings[i].room_schedules;
                console.log("admin in sched" + sched)
                for(let j = 0; j <  sched.length; j ++) {



                 schedule = bookings[i].building + '<br>' + sched[j].date + '<br>' + sched[j].start_time + ' to ' + sched[j].end_time + '<br>' + 'Booked by: '
                + sched[j].user
                +  '<button class="btn btn-sm roomdelete" onclick="deleteBooking(\'' + bookings[i].room_number + '/' + sched[j].user + '/' + sched[j].start_time
                + '\');")>Delete</button><br>' ;



               //get user id
                room_id = bookings[i]._id;


                //insert the newly built <li> element
                let tmp = $('<li>', {
                    class: "room",
                    html: schedule,
                    value: room_id
                });
                parent.append(tmp);

                }




            }
        });

    }



});
