function ajaxLoad(params) {
    var getPost = "POST";
    params.requireJson = true;

    if (params.method) {
        getPost = params.method;
    }

    // if (params.container) {
    //     $("#" + params.container).html("<div style='width: 100%;text-align: center;'><img src='/images/loading-icon.gif' /></div>");
    // }

    if (typeof params.show_error_message === "undefined") {
        params.show_error_message = true;
    }

    if (typeof params.show_success_message === "undefined") {
        params.show_success_message = true;
    }

    if (params._csrf) {} else {
        params._csrf = $("#_csrf").val();
    }

    $.ajax({
        url: params.url,
        data: params.data,
        type: getPost,
        beforeSend: function(request) {
            // return request.setRequestHeader('X-CSRF-Token', params._csrf);
        },
        success: function(data) {

            /*if (params.container) {
                $("#" + params.container).html(data);
 
                if (params.success_callback_function) {
                    params.success_callback_function(data);
                }
            }*/

            if (data.error) {
                if (params.show_error_message) {
                    var errorElement = displayErrorFromArray(data.error);
                    $("#" + params.container).html(errorElement);
                }

                if (params.error_callback_function) {
                    params.error_callback_function(data);
                }
            } else if (data.success_message) {

                if (params.show_success_message) {
                    var successMessage = "<div class='alert alert-success'>" + data.success_message + "</div>";
                    $("#" + params.container).html(successMessage);
                }

                if (params.success_callback_function) {
                    params.success_callback_function(data);
                }
            }
        },
        error: function(data) {
            if (params.show_error_message) {
                var errorElement = displayErrorFromArray(data.error);
                $("#" + params.container).html(errorElement);
            }

            if (params.error_callback_function) {
                params.error_callback_function(data);
            }
        }
    });
}