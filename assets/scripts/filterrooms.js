$(document).ready(function() {
    //populate the room list
    buildRoomList();

    //get list of rooms to display in the room list
    function buildRoomList() {
        $.get('room/list_rooms', function(data) {
            displayRooms(data);
        });
    }

    //for larger screens keep the building list open
    if($(window).width() >= 767){
        $('#slist').removeClass('closed');
        $('#list-dropdown').addClass('closed');
    }

    //toggle building list
    $('#list-dropdown').click(function () {
        $('#slist').slideToggle(400, "linear");
    });

    //determines if building list needs to be shown
    $(window).on('resize', function() {
        if($(window).width() >= 767){
            $('#slist').removeAttr('style');
            $('#slist').removeClass('closed');
            $('#list-dropdown').addClass('closed');
        } else{
            $('#slist').removeAttr('style');
            $('#slist').addClass('closed');
            $('#list-dropdown').removeClass('closed');
        }
    });

    /* Used to filter users */
    $('.filter').click(function(){
        var flag = 0;
        var date = $('input[name="date"]').val();
        var start_time =  $('input[name="start_time"]').val();
        var end_time =  $('input[name="end_time"]').val();
        var capacity =  $('input[name="capacity"]').val();
        var wifi = $('input[name="wifi"]').is(":checked");
        var computer = $('input[name="computer"]').is(":checked");
        var whiteboard_blackboard = $('input[name="whiteboard_blackboard"]').is(":checked");
        var projector = $('input[name="projector"]').is(":checked");
        var building = $( "#building option:selected" ).text();
        url = '/api/displayRooms?';
        if (date){
            url += "date=" + date.trim();
            flag = 1;
        }
        if (start_time){
            url += "&start_time" + start_time.trim();
            flag = 1;
        }
        if (end_time){
            url += "&end_time" + end_time.trim();
            flag = 1;
        }
        if (capacity){
            url += "&capcity=" + capacity.trim();
            flag = 1;
        }
        if (wifi){
            url += "&wifi=" + wifi;
            flag = 1;
        }
        if (computer){
            url += "&computer=" + computer;
            flag = 1;
        }
        if (whiteboard_blackboard){
            url += "&whiteboard_blackboard=" + whiteboard_blackboard;
            flag = 1;
        }
        if (projector){
            url += "&projector=" + projector;
            flag = 1;
        }
        if (building){
          url += "&building=" + building.trim();
          flag = 1;
        }
        console.log(url);
        if (!flag){
            buildRoomList();
        } else {

            $.ajax({
                url: url,
                type: "GET",
                dataType: "json",
                success: function (ret) {
                    displayRooms(ret);
                },
                error: function (err) {
                    document.write(err.responseText);
                }
            });
        }
    });

    /*  Used to load the view rooms page */
    $('body').on('click', 'a.view-room', function (e) {
        e.preventDefault();
        var data = $(this).attr('href');
        var url = '/api/viewroom/' + data;

        $.ajax({
            url: url,
            type: "GET",
            dataType: "html",
            contentType: "application/json; charset=utf-8",
            data: data,
            success: function (ret) {
                document.write(ret);
            },
            error: function (err) {
                document.write(err.responseText);
            }
        });
    });

    function displayRooms(data){
        var roomItem;
        var locationMarker = '<span class="fa fa-map-marker" aria-hidden="true"></span> ';
        var rooms = data;
        let parent = $('#room-list');

        parent.empty();

        for (let i = 0; i < rooms.length; i++) {
            //build content of list
            roomItem = rooms[i].room_number + '<br>'
                + locationMarker
                + rooms[i].building + '<br>'
                + '<a class="view-room" href="' + rooms[i].room_number + '">View Room</a>';

            //insert the newly built <li> element
            let tmp = $('<li/>', {
                class: "room",
                html: roomItem
            });
            parent.append(tmp);
        }
    }
});
