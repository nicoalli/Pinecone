//source:
//http://stackoverflow.com/questions/1184624/convert-form-data-to-javascript-object-with-jquery?page=1&tab=active#tab-top

$('#form').submit(function (e) {
    e.preventDefault();
    var formJSON = objectifyForm($('#form').serializeArray());
    $.ajax({
        url: "/api/room/view_rooms",
        type: "POST",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(formJSON),
        success: function (result) {
            document.write(result)
        },
        error: function (err) {
           document.write(err.responseText);
        }
    });
});

/*  Used to load the view rooms page */
$('body').on('click', 'button.view-btn', function () {
    var data = $('input[name="criteria"]').val();

    if(data == undefined){
        var url = '/api/viewroom/' + $(this).val();
    } else{
        var url = '/api/viewroom/' + $(this).val() + '/view';
    }

    $.ajax({
        url: url,
        type: "GET",
        dataType: "html",
        contentType: "application/json; charset=utf-8",
        data: data,
        success: function (ret) {
            $(document).replaceWith(ret);
        },
        error: function (err) {
            document.write(err.responseText);
        }
    });
    location.href = url;
});
