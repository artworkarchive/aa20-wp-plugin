<?php

require_once("curl_helper.php");
require_once("api_config.php");

// This class has all the necessary code for making API calls
// thru artwork archive's public user API
class ArtworkArchiveApiHelper {

	//---------------------
	//define core wp-plugin functions
	//---------------------
	//Generates HTML for all modal popups
	public static function generate_public_pieces_modal_popups($user_slug)
	{
		$action = "GET";
		$url = ArtworkArchiveApiConfig::base_api_url_for_user_public_profile() . $user_slug;
		//$url = ArtworkArchiveApiConfig::base_api_url_for_user_public_profile();
		//$parameters = array("user" => $user_slug);
		$parameters = null;
		$result = CurlHelper::perform_http_request($action, $url, $parameters);
		$json_decoded = json_decode($result,true);
		$html_popups = "";

		for ($i = 0; $i < count($json_decoded['public_pieces']); $i++) {
			$piece_title = str_replace("-"," ",$json_decoded['public_pieces'][$i]['slug']);
			$html_popups = $html_popups . '
				<!-- popup base template for each piece -->
		        <a href="#x" class="overlay-modal" id="individual-piece-'.$json_decoded['public_pieces'][$i]['slug'].'"></a>
		        <div class="popup">
		            <img src="'.$json_decoded['public_pieces'][$i]['public_piece_image_url'].'" alt="Public Piece '.$json_decoded['public_pieces'][$i]['name'].'" class="image">
					<p>'.$piece_title.'</p>';
					if(isset($json_decoded['public_pieces'][$i]['price']))
					{
						$html_popups = $html_popups . 
						'<div>
							<label>Inventory No.: '.$json_decoded['public_pieces'][$i]['inventory_number'].'</label>
						</div>';
					}
					
					if(isset($json_decoded['public_pieces'][$i]['width']) && isset($json_decoded['public_pieces'][$i]['height']))
					{
						$html_popups = $html_popups . 
						'<div>
							<label>Size: '.$json_decoded['public_pieces'][$i]['width'].' x '.$json_decoded['public_pieces'][$i]['height'].'</label>
						</div>';
					}
					
		            $html_popups = $html_popups . '<a class="close" href="#close"></a>
				</div>';
		}

		return $html_popups;
	}

	// This method pull an user's public profile info
	// Parameter description:
	// user_id= artwork archive user's id
	public static function get_user_public_pieces_information($user_slug){
		$action = "GET";
		$url = ArtworkArchiveApiConfig::base_api_url_for_user_public_profile() . $user_slug;
		//$url = ArtworkArchiveApiConfig::base_api_url_for_user_public_profile();
		//$parameters = array("user" => $user_slug);
		$parameters = null;
		$result = CurlHelper::perform_http_request($action, $url, $parameters);
		$json_decoded = json_decode($result,true);
		$html_for_pieces = "";
		$html_popups = "";

		for ($i = 0; $i < count($json_decoded['public_pieces']); $i++) {

			$html_for_pieces = $html_for_pieces .
			
			'<div class="container thumb">
			  <img src="'.$json_decoded['public_pieces'][$i]['public_piece_image_url'].'" alt="Public Piece '.$json_decoded['public_pieces'][$i]['name'].'" class="image">
			  <div class="overlay">
			  	<div class="text">
			  		<ul>
						  <li>'.$json_decoded['public_pieces'][$i]['name'].'</li>';
						  if(isset($json_decoded['public_pieces'][$i]['price']))
						  {
							  $html_for_pieces = $html_for_pieces . '<li>'.$json_decoded['public_pieces'][$i]['price'].'</li>';
						  }

			$html_for_pieces = $html_for_pieces . '
			  			<li><a href="#individual-piece-'.$json_decoded['public_pieces'][$i]['slug'].'"> View </a></li>
			  		</ul>
			  	</div>
			  </div>
			</div>';
		}

		return
		'<div class="pieces-section">'
			. $html_for_pieces .
		'</div>';
	}

}