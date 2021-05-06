$(window).on('load', function() {
    if ($('#preloader').length) {
        $('#preloader').delay(100).fadeOut('slow', function() {
            $(this).remove();
        });
    }
});

$('#btnAddressSubmit').click(function() {

    $.ajax({
        url: "libs/php/getAddressLookup.php",
        type: 'POST',
        dataType: 'json',
        data: {
            lng: $('#addressLong').val(),
            lat: $('#addressLat').val()
        },
        success: function(result) {
            console.log("Basic success!");
            console.log(JSON.stringify(result));
        
            if (result.status.name == "ok") {
                $('#streetNumber').empty();
                $('#street').empty();
                $('#postalCode').empty();
                $('#countryCode').empty();
                $('#streetNumber').append(result['data']['streetNumber']);
                $('#street').append(result['data']['street']);       
                $('#postalCode').append(result['data']['postalcode']);
                $('#countryCode').append(result['data']['countryCode']);   
            }
            else if (result.status.name == "no data") {
                $('#streetNumber').empty();
                $('#street').empty();
                $('#postalCode').empty();
                $('#countryCode').empty();
                $('#streetNumber').append('No Data Available for this lat/long set');
                $('#street').append('No Data Available for this lat/long set');
                $('#postalCode').append('No Data Available for this lat/long set');
                $('#countryCode').append('No Data Available for this lat/long set');
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("Latitude:"+$('#addressLong').val()+" Longitude:"+$('#addressLat').val());
            console.log("Didn't work! Here's why...");
            console.log(jqXHR);
            console.log(textStatus);
            console.log (errorThrown);
        }
    }); 

});

$('#btnEqSubmit').click(function() {
$.ajax({
    url: "libs/php/getEarthquake.php",
    type: 'POST',
    dataType: 'json',
    data: {
        north: $('#eqNorth').val(),
        east: $('#eqEast').val(),
        south: $('#eqSouth').val(),
        west: $('#eqWest').val()
    },
    success: function(result) {
        console.log("Basic success!");
        console.log(JSON.stringify(result));
        if (result.status.name == "ok") {
            console.log("Earthquake Request: Success!")
            console.log(result['data']);
            $('#eqDate').empty();
            $('#eqDate').append(result['data'][0]['datetime']);
            $('#eqDepth').empty();
            $('#eqDepth').append(result['data'][0]['depth']);
            $('#eqMagnitude').empty();
            $('#eqMagnitude').append(result['data'][0]['magnitude']);

        }
        else if (result.status.name == "no data") {
            $('#eqDate').empty();
            $('#eqDepth').empty();
            $('#eqMagnitude').empty();
            $('#eqDate').append('No Data Available');
            $('#eqDepth').append('No Data Available');
            $('#eqMagnitude').append('No Data Available');
        }

    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.log("Didn't work! Here's why...");
        console.log(jqXHR);
        console.log(textStatus);
        console.log (errorThrown);
        console.log(result);
    }
}); 

});

$('#btnPostalSubmit').click(function() {
    $.ajax({
        url: "libs/php/getPostalLookup.php",
        type: 'POST',
        dataType: 'json',
        data: {
            lat: $('#postalLat').val(),
            long: $('#postalLong').val(),
            radius: $('#postalRadius').val()
        },
        success: function(result) {
    
            console.log(JSON.stringify(result));
            if (result.status.name == "ok") {
                $('#placeName').empty();
                $('#placeName').append(result['data'][0]['placeName']);
                $('#postalZip').empty();
                $('#postalZip').append(result['data'][0]['postalCode']);
            }
    
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("Didn't work! Here's why...");
            console.log(jqXHR);
            console.log(textStatus);
            console.log (errorThrown);
        }
    })
});