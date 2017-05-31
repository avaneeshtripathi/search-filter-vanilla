export function fetch (url, successHandler, errorHandler) {
    $.ajax({
        type: 'GET',
        url: url,
        dataType: 'json',
        crossOrigin: true,
        success:  function (result) {
            successHandler(result);
        },
        error: function (error) {
            errorHandler(error.responseJSON);
        }
    });
};
