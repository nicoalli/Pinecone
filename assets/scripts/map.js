$(document).ready(function() {
    //for larger screens keep the building list open
    if($(window).width() >= 767){
        $('#blist').removeClass('closed');
        $('#blist-dropdown').addClass('closed');
        $('#list-prompt-wrapper').removeClass('hidden');
    }

    //toggle building list
    $('#blist-dropdown').click(function () {
        $('#blist').slideToggle(400, "linear");
        $('#list-prompt-wrapper').toggleClass('hidden');
    });

    //determines if building list needs to be shown
    $(window).on('resize', function() {
        if($(window).width() >= 767){
            $('#blist').removeAttr('style');
            $('#blist').removeClass('closed');
            $('#blist-dropdown').addClass('closed');
            $('#list-prompt-wrapper').removeClass('hidden');
        } else{
            $('#blist').removeAttr('style');
            $('#blist').addClass('closed');
            $('#blist-dropdown').removeClass('closed');
            $('#list-prompt-wrapper').addClass('hidden');
        }
    });

    //map variables
    var map;
    var infowindow;
    var markers = [];

    //load the map with UofT at its center
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 43.662876, lng: -79.395656},
        zoom: 15
    });

    //create an empty info window
    infowindow = new google.maps.InfoWindow({
        content: ''
    });

    //populate the building list
    buildBuildingList();

    //drop a pin based on selected building on click of a list item
    $('#blist').on('click', 'li.building', function () {
        var buildingId = $(this).attr("value");

        //send building information to db and call function to drop pin and create info window
        $.ajax({
            url: "map/marker",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({"building_id": buildingId}),
            success: function (response) {
                createWindow(response);
            }
        });
    });

    //drops pin and creates the info window for selected building
    function createWindow(buildingInfo){

        //set up the variables with the info about the building
        var blat = buildingInfo.latitude;
        var blng = buildingInfo.longitude;
        var bname = buildingInfo.building_name;
        var street = buildingInfo.address.street;
        var city = buildingInfo.address.city + ', ' + buildingInfo.address.province;
        var postCode = buildingInfo.address.postal_code;

        //create the info window
        var url = '/api/room/search/' + buildingInfo.building_name;
        var buildingWindow = '<address>' +
            '<strong>' + bname + '</strong><br>' +
            street + '<br>' + city + '<br>' + postCode + '<br>' +
            '<a href="' + url + '">view rooms</a>' +
            '</address>';

        //create the pin
        var marker = new google.maps.Marker({
            position: {lat: blat, lng: blng},
            map: map,
            title: bname,
            animation: google.maps.Animation.DROP,
            html: buildingWindow
        });
        markers.push(marker);

        //render it all on the map
        map.setZoom(17);
        map.panTo(marker.position);

        infowindow.setContent(marker.html);
        infowindow.open(map, marker);
    }

    //get list of buildings to display in the building list and map
    function buildBuildingList() {
        var buildingItem;
        var buildingId;
        var locationMarker = '<span class="fa fa-map-marker" aria-hidden="true"></span> ';

        $.get('map/loadBuildings', function(data) {
            let parent = $('#blist');
            let buildings = JSON.parse(data);
            for (let i = 0; i < buildings.length; i++) {
                //build content of list
                buildingItem = buildings[i].building_name + '<br>'
                                + locationMarker
                                + buildings[i].address.street + ' , '
                                + buildings[i].address.postal_code;

                //get building id
                buildingId = buildings[i]._id;

                //insert the newly built <li> element
                let tmp = $('<li/>', {
                    class: "building",
                    html: buildingItem,
                    value: buildingId
                });
                parent.append(tmp);

                //set up the variables with the info about the building
                var blat = buildings[i].latitude;
                var blng = buildings[i].longitude;
                var bname = buildings[i].building_name;
                var street = buildings[i].address.street;
                var city = buildings[i].address.city + ', ' + buildings[i].address.province;
                var postCode = buildings[i].address.postal_code;

                //create the info window
                var url = '/api/room/search/' + bname;
                var buildingWindow = '<address>' +
                    '<strong>' + bname + '</strong><br>' +
                    street + '<br>' + city + '<br>' + postCode + '<br>' +
                    '<a href="' + url + '">view rooms</a>' +
                    '</address>';

                //create the pin
                var marker = new google.maps.Marker({
                    position: {lat: blat, lng: blng},
                    map: map,
                    title: bname,
                    animation: google.maps.Animation.DROP,
                    html: buildingWindow
                });
                markers.push(marker);
            }

            for (var i = 0; i < markers.length; i++) {
                var marker = markers[i];
                google.maps.event.addListener(marker, 'click', function () {
                    infowindow.setContent(this.html);
                    infowindow.open(map, this);
                });
            }
        });
    }
});