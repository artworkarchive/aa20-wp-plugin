<?php

require_once("curl_helper.php");
require_once("api_config.php");

// This class has all the necessary code for making API calls
// thru artwork archive's public user API
class ArtworkArchiveApiHelper {

	//---------------------
	//define core wp-plugin functions
	//---------------------
	//Generates HTML for all modal popups, also gen a hidden with all of the public pieces ids
	public static function generate_public_pieces_modal_popups($user_slug)
	{
		$action = "GET";
		$url = ArtworkArchiveApiConfig::base_api_url_for_user_public_profile() . $user_slug;
		//$url = ArtworkArchiveApiConfig::base_api_url_for_user_public_profile() . $user_slug . '?page=1&page_size=100';
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
		            <img src="'.$json_decoded['public_pieces'][$i]['primary_image_large_url'].'" alt="Public Piece '.$json_decoded['public_pieces'][$i]['name'].'" class="image">
					<p>'.$piece_title.'</p>';
					if(isset($json_decoded['public_pieces'][$i]['price']))
					{
						$html_popups = $html_popups . 
						'<div>
						</div>';
						<p>Inventory No.: '.$json_decoded['public_pieces'][$i]['inventory_number'].'</p>
					}
					
					if(isset($json_decoded['public_pieces'][$i]['width']) && isset($json_decoded['public_pieces'][$i]['height']))
					{
						$html_popups = $html_popups . 
						'<div>
						</div>';
						<p>Size: '.$json_decoded['public_pieces'][$i]['width'].' x '.$json_decoded['public_pieces'][$i]['height'].'</p>
					}
					
		            $html_popups = $html_popups . '<a class="close" href="#close"></a>
				</div>';
		}

		return $html_popups;
	}

	// This method pull an user's public profile info
	// Parameter description:
	// user_id= artwork archive user's id
	// fetch all public pieces
	public static function get_user_public_pieces_information($user_slug){
		//$page=1;
		//$page_size=100;
		$action = "GET";
		$url = ArtworkArchiveApiConfig::base_api_url_for_user_public_profile() . $user_slug;
		//$url = ArtworkArchiveApiConfig::base_api_url_for_user_public_profile() . $user_slug . '?page=' . $page . '&page_size=' . $page_size;
		//$url = ArtworkArchiveApiConfig::base_api_url_for_user_public_profile() . $user_slug . '?page=1&page_size=100';
		$parameters = null;
		$result = CurlHelper::perform_http_request($action, $url, $parameters);
		$json_decoded = json_decode($result,true);
		$html_for_pieces = "";
		$html_popups = "";
		$html_hidden = "";
		$all_public_pieces_ids = "";

		$total_pages = $json_decoded['total_pages'];
		$page = $json_decoded['page'];
		$page_size = $json_decoded['page_size'];

		for ($i = 0; $i < count($json_decoded['public_pieces']); $i++) {

			if ($i > ($page_size-1) )
			{
				$none_or_block = "none";
			}
			else
			{
				$none_or_block = "block";
			}

			$all_public_pieces_ids = $all_public_pieces_ids . $json_decoded['public_pieces'][$i]['id'] . ",";

			$html_for_pieces = $html_for_pieces .
			
			'<div id="public-piece-section-'.$json_decoded['public_pieces'][$i]['id'].'" class="container thumb" style="display: '.$none_or_block.';">
			  <img src="'.$json_decoded['public_pieces'][$i]['primary_image_thumb_url'].'" alt="Public Piece '.$json_decoded['public_pieces'][$i]['name'].'" class="image">
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

		$html_hiddens = "<input id='selected_page' type='hidden' value=1 />";
		$html_loader = "<div id='main_loader' class='loader' style='display:none;'></div>";
		$html_hiddens = $html_hiddens . "<input id='public_pieces_ids' type='hidden' value='" . substr($all_public_pieces_ids, 0, -1) . "' />";
		$html_for_pagination_control = ArtworkArchiveApiHelper::generate_paging_control($user_slug, $total_pages, $page, $page_size);

		return
		'<div class="wp-aa-plugin-container">' .
		$html_hiddens . 
		$html_loader .
			'<div class="pieces-section">'
				 . $html_for_pieces .
			'</div>' .
		$html_for_pagination_control .
		'</div>';
	}

	public static function generate_paging_control($artist_slug, $total_pages, $page, $page_size)
	{
		//$total_pages = $total_pages + 1;
		$html_paging_control = 
		'<div class="pagination">
			<a style="color:#333;" href="#" onclick=showPrevPublicPiecesPage("'.$artist_slug.'",'.$total_pages.','.$page_size.')>&laquo;</a>';

		for ($i = 0; $i < $total_pages; $i++) {
			if($i==0)
			{
				//selected by default : style="color:red;"
				$html_paging_control = $html_paging_control . '<a style="color:#00c4ff;" id="page-selection-number-'.($i+1).'" href="#" onclick=onPageSelection("'.$artist_slug.'",'.$total_pages.','.($i+1).','.$page_size.');>'.($i+1).'</a>';
			}
			else
			{
				//no color
				$html_paging_control = $html_paging_control . '<a style="color:#333;" id="page-selection-number-'.($i+1).'" href="#" onclick=onPageSelection("'.$artist_slug.'",'.$total_pages.','.($i+1).','.$page_size.');>'.($i+1).'</a>';
			}
		}

		$html_paging_control = $html_paging_control . '
			<a style="color:#333;" href="#" onclick=showNextPublicPiecesPage("'.$artist_slug.'",'.$total_pages.','.$page_size.')>&raquo;</a>
		</div>';

		return $html_paging_control;
	}

}