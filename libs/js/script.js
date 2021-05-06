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

$('#btnOceanSubmit').click(function() {
$.ajax({
    url: "libs/php/getOceanInfo.php",
    type: 'POST',
    dataType: 'json',
    data: {
        lat: $('#oceanLat').val(),
        long: $('#oceanLong').val()
    },
    success: function(result) {

        console.log(JSON.stringify(result));
        if (result.status.name == "ok") {
            console.log("OceanLookup Success!")
            console.log(result['data']);
            $('#oceanName').empty();
            $('#oceanName').append(result['data']['name']);

        }
        else if (result.status.name == "no data") {
            $('#oceanName').empty();
            $('#oceanName').append('No Data Available');
        }

    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.log("Didn't work! Here's why...");
        console.log(jqXHR);
        console.log(textStatus);
        console.log (errorThrown);
        console.log(result['data']);
    }
}); 

});

$('#btnPostalSubmit').click(function() {
    $.ajax({
        url: "libs/php/getOceanInfo.php",
        type: 'POST',
        dataType: 'json',
        data: {
            lat: $('#oceanLong').val(),
            long: $('#oceanLat').val()
        },
        success: function(result) {
    
            console.log(JSON.stringify(result));
            if (result.status.name == "ok") {
                console.log("OceanLookup Success!")
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