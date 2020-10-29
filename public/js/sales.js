$(document).ready(function() {
    $.ajax('/getAllProducts', {
        success: function(data, status, xhr) { // success callback function
            console.log(data)
        }
    });
});