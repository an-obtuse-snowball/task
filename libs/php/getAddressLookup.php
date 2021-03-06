<?php

	$executionStartTime = microtime(true);

	$url='http://api.geonames.org/findNearestAddressJSON?formatted=true&lat=' . $_REQUEST['lat'] . '&lng=' . $_REQUEST['lng'] . '&username=Vexxtraordinary';

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL,$url);

	$result=curl_exec($ch);

	curl_close($ch);

	$decode = json_decode($result,true);
	if(isset($decode['address'])){
        $output['status']['code'] = "200";
        $output['status']['name'] = "ok";
        $output['status']['description'] = "success";
        $output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
        //print_r($decode);
        $output['data'] = $decode['address'];
    } else {
        $output['status']['code'] = "500";
        $output['status']['name'] = "no data";
        $output['status']['description'] = "No data available";
        $output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
    }
	
	header('Content-Type: application/json; charset=UTF-8');

	echo json_encode($output); 

?>
