<?php

require_once("curl_helper.php");
require_once("api_config.php");

// This class has all the necessary code for making API calls
// thru artwork archive's public user API
class ArtworkArchiveApiHelper {

	//---------------------
	//define core wp-plugin functions
	//---------------------

	public static function generate_public_pieces_modal_popups($user_slug)
	{
		$action = "GET";
		//$url = ArtworkArchiveApiConfig::base_api_url_for_user_public_profile() . $user_slug;
		$url = ArtworkArchiveApiConfig::base_api_url_for_user_public_profile();
		$parameters = array("artist_slug" => $user_slug);
		$result = CurlHelper::perform_http_request($action, $url, $parameters);
		$json_decoded = json_decode($result,true);
		//echo print_r($json_decoded);
		$html_popups = "";

		for ($i = 0; $i < count($json_decoded['public_pieces']); $i++) {
			$piece_title = str_replace("-"," ",$json_decoded['public_pieces'][$i]['slug']);
			$html_popups = $html_popups . '
				<!-- popup base template for each piece -->
		        <a href="#x" class="overlay-modal" id="individual-piece-'.$json_decoded['public_pieces'][$i]['slug'].'"></a>
		        <div class="popup">
		            <img src="'.$json_decoded['public_pieces'][$i]['public_piece_image_url'].'" alt="Public Piece '.$json_decoded['public_pieces'][$i]['name'].'" class="image">
		            <p>'.$piece_title.'</p>
		            <div>
						<label>Inventory No.: '.$json_decoded['public_pieces'][$i]['inventory_number'].'</label>
					</div>
		            <div>
						<label>Size: '.$json_decoded['public_pieces'][$i]['width'].' x '.$json_decoded['public_pieces'][$i]['height'].'</label>
		            </div>
		            <a class="close" href="#close"></a>
				</div>';
		}

		return $html_popups;
	}

	function generate_css_styles()
	{
		return '<link rel="stylesheet" href="css/style.css" type="text/css">
				<link rel="stylesheet" href="css/modal.css" type="text/css">';
	}
/*
	public static function generate_public_pieces_hiddens($user_slug)
	{
		$action = "GET";
		$url = ArtworkArchiveApiConfig::base_api_url_for_user_public_profile();
		$parameters = array("artist_slug" => $user_slug);
		$result = CurlHelper::perform_http_request($action, $url, $parameters);
		$json_decoded = json_decode($result,true);
		//echo print_r($json_decoded);
		$html = "";

		for ($i = 0; $i < count($json_decoded['public_pieces']); $i++) {
			$html = $html . '<input type="hidden" id="individual-piece-'.$json_decoded['public_pieces'][$i]['slug'].'" value="'.$json_decoded['public_pieces'][$i]['name'].'">';
		}

		return $html;
	}
*/
	// This method pull an user's public profile info
	// Parameter description:
	// user_id= artwork archive user's id
	public static function get_user_public_profile_information($user_slug)
	{
		$action = "GET";
		//$url = ArtworkArchiveApiConfig::base_api_url_for_user_public_profile() . $user_slug;
		$url = ArtworkArchiveApiConfig::base_api_url_for_user_public_profile();
		$parameters = array("artist_slug" => $user_slug);
		$result = CurlHelper::perform_http_request($action, $url, $parameters);
		$json_decoded = json_decode($result,true);
		//echo print_r($json_decoded);
		$html_for_pieces = "";
		$html_popups = "";

		for ($i = 0; $i < count($json_decoded['public_pieces']); $i++) {

			$html_for_pieces = $html_for_pieces .
			
			'<div class="container thumb">
			  <img src="'.$json_decoded['public_pieces'][$i]['public_piece_image_url'].'" alt="Public Piece '.$json_decoded['public_pieces'][$i]['name'].'" class="image">
			  <div class="overlay">
			  	<div class="text">
			  		<ul>
			  			<li>'.$json_decoded['public_pieces'][$i]['name'].'</li>
			  			<li>'.$json_decoded['public_pieces'][$i]['price'].'</li>
			  			<li><a href="#individual-piece-'.$json_decoded['public_pieces'][$i]['slug'].'"> View </a></li>
			  		</ul>
			  	</div>
			  </div>
			</div>';
		}

		return

		'<div class="profile-section">
		  <img src="'.$json_decoded['public_user_image_url'].'" alt="John" style="width:100%">
		  <a class="artist-name" href="'.$json_decoded['share_url'].'">'.$json_decoded['name'].'</a>
		  <div class="public-social-links">
		  	<a href="'.$json_decoded['facebook_url'].'">&nbsp;<i class="fa fa-facebook"></i>&nbsp;</a>
		    <a href="'.$json_decoded['twitter_url'].'">&nbsp;<i class="fa fa-twitter"></i>&nbsp;</a>
		    <a href="'.$json_decoded['instagram_url'].'">&nbsp;<i class="fa fa-instagram"></i>&nbsp;</a>
		 </div>
		 <p><button class="contact-artist-button" onclick="location.href=\''.$json_decoded['email_share'].'\'">Message</button></p>
		</div>
		
		<div class="pieces-section">'
			. $html_for_pieces .
		'</div>';
	}

	// This method pull an user's public profile info
	// Parameter description:
	// user_id= artwork archive user's id
	public function get_user_public_pieces_information($user_id){
		$curlHelper = new CurlHelper();
		$action = "GET";
		$url = "https://www.artworkarchive.com/public-profile-page";
		$parameters = array("param" => "value");
		$result = $curlHelper.perform_http_request();
		return $result;
	}

}