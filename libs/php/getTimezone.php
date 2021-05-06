<?php

	// remove for production

	ini_set('display_errors', 'On');
	error_reporting(E_ALL);

	$executionStartTime = microtime(true);
		$url='http://api.geonames.org/timezoneJSON?formatted=true&lat=' . $_REQUEST['lat'] . '&lng=' . $_REQUEST['long'] . '&username=Vexxtraordinary';
		
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_URL,$url);
	
		$result=curl_exec($ch);

		curl_close($ch);

		$decode = json_decode($result,true);
		//if(isset($decode['timezone'])){	
		$output['status']['code'] = "200";
		$output['status']['name'] = "ok";
		$output['status']['description'] = "success";
		$output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
		print_r($decode);
		$output['data'] = $decode['timezone'];

    //} else {
       // $output['status']['code'] = "500";
        //$output['status']['name'] = "no data";
        //$output['status']['description'] = "No data available";
        //$output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
    //}

	header('Content-Type: application/json; charset=UTF-8');

	echo json_encode($output); 

?>
