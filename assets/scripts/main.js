
//event handlers for menu button
$('#closebtn').on('click', function(){
    document.getElementById("side_menu").style.width = "0";
    document.getElementById("side_menu").style.display = "none";
    document.getElementById("main").style.width = "100%";
    $('#main').css('margin-top',"0%");
});

 $('#menu-btn').on('click', function(){

     document.getElementById("side_menu").style.display = "block";
    
      var is_admin =  document.getElementById("is_admin").innerHTML;

         if(is_admin.localeCompare("true") == 0) {
              $('#admin').css('visibility',"visible");
           }

      if ( $(window).width() < 850) {
          document.getElementById("side_menu").style.width = $(window).width() + 'px';
           $('#main').css('margin-top',"40%");
                 
    }

    else {
          document.getElementById("side_menu").style.width = "250px";
    }
});

$(window).on('resize', function() {
    document.getElementById("side_menu").style.display = "none";
    document.getElementById("side_menu").style.width = "0";
    document.getElementById("side_menu").style.width = "0";
});

//event handler for search bar
$('#search-btn').click(function() {
    location.reload();
    var query = $("input[type=text][name=search_query]").val();
    var url = '/api/room/search/' + query;

    $.ajax({
        url: url,
        success : function(ret){
            document.write(ret);
        },
        error: function(err){
            document.write(err.responseText);
        }
    });
});

//source:
//http://stackoverflow.com/questions/1184624/convert-form-data-to-javascript-object-with-jquery?page=1&tab=active#tab-top
function objectifyForm(formArray) {//serialize data function
    returnArray = {};
    for (var i = 0; i < formArray.length; i++){
        returnArray[formArray[i]['name']] = formArray[i]['value'];
    }
    return returnArray;
}


