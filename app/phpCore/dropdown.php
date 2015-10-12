<?php
	
	


	$allCountries = get_allCountries();

	function get_allCountries() {
			$dat = array(
        array("CountryName" => "Brazil", "Country_ID" => 9, 'CountryCode' => 'br'), 
        array("CountryName" => "Germany", "Country_ID" => 10, 'CountryCode' => 'de'), 
        array("CountryName" => "Ireland", "Country_ID" => 11, 'CountryCode' => 'ie'),
        array("CountryName" => "Poland", "Country_ID" => 12, 'CountryCode' => 'pl'),
        array("CountryName" => "Portugal", "Country_ID" => 13, 'CountryCode' => 'pt') 
    );
			

		$results = json_encode($dat,true);
	    return $results;
	}
	

	//Return Query Result to Frontend
	echo $allCountries;
	
?>