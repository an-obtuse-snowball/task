$(window).on('load', function() {
    if ($('#preloader').length) {
        $('#preloader').delay(100).fadeOut('slow', function() {
            $(this).remove();
        });
    }
});

$('#btnCountryInfo').click(function() {

    $.ajax({
        url: "libs/php/getCountryInfo.php",
        type: 'POST',
        dataType: 'json',
        data: {
            country: $('#selCountry').val(),
            lang: $('#selLanguage').val()
        },
        success: function(result) {

            console.log(JSON.stringify(result));

            if (result.status.name == "ok") {

                document.getElementyById('resultsContainer').innerHTML = '<div name  id = "countryResult" name= "countryResult" class = "entry"><div>';
                $('countryResult').append(result['data'][0]['continent']);
                $('countryResult').append(result['data'][0]['capital']);
                $('countryResult').append(result['data'][0]['languages']);
                $('countryResult').append(result['data'][0]['population']);
                $('countryResult').append(result['data'][0]['areaInSqKm']);           }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // your error code
        }
    }); 

});

$('#btnOceanSubmit').click(function() {
//Complete the PostalLookup
$.ajax({
    url: "libs/php/getOceanInfo.php",
    type: 'POST',
    dataType: 'json',
    data: {
        lat: $('#oceanLong').val(),
        lang: $('#oceanLat').val()
    },
    success: function(result) {

        console.log(JSON.stringify(result));
        if (result.status.name == "ok") {
            console.log("OceanLookup Success!")
        }

    },
    error: function(jqXHR, textStatus, errorThrown) {
        // your error code
    }
}); 

});

$('#btnPostalSubmit').click(function() {
    //Complete the PostalLookup
});