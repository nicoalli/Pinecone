$(document).ready(function() {
    //shows the register or login forms
    $('.tab-options li').on('click', function () {
        $(this).addClass('active');
        $(this).siblings().removeClass('active');

        target = $(this).attr('value');

        $('.login-wrapper > article').not(target).hide();

        $(target).fadeIn(600);
    });

    //event handler to login
    $('#login-btn').click(function() {
        $('#login-form').submit(function(e) {
            e.preventDefault();

            $.ajax({
                url: "/api/login/newlogin",
                type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(objectifyForm($('#login-form').serializeArray())),
                success : function(ret){
                    document.write(ret);
                },
                error: function(err){
                    document.write(err.responseText);
                }
            });
        });
    });

    //event handler to sign up
    $('#signup-btn').click(function() {
        $('#signup-form').submit(function(e) {
            e.preventDefault();

            var data = JSON.stringify(objectifyForm($('#signup-form').serializeArray()));

            $.ajax({
                url: "/api/login/new",
                type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                data: data,
                success : function(ret){
                    document.write(ret);
                },
                error: function(err){
                    document.write(err.responseText);
                }
            });
        });
    });

});