<!--
//
//base styles and fonts
//
-->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<link href="https://fonts.googleapis.com/css?family=Quicksand" rel="stylesheet">
<link href="https://fonts.googleapis.com/css?family=Magra" rel="stylesheet">
<link href="https://fonts.googleapis.com/css?family=Varela" rel="stylesheet">
<link rel="stylesheet" href="css/style.css" type="text/css">
<link rel="stylesheet" href="css/modal.css" type="text/css">'
<!--
//
//base modal popup
//
-->
<input type="hidden" id="selectedPieceHidden" value="">
<a href="#x" class="overlay-modal" id="view-individual-piece-modal-popup"></a>
<div class="popup">
    <h2 id="selectedPieceTitle">Hardcoded test</h2>
    <p>Testing</p>
    <a class="close" href="#close"></a>
</div>
<?php
//---------------------
//header information
//---------------------
/**
Plugin Name: Artwork Archive WP Plugin (Public User Information & Public Pieces)
Plugin URI: https://github.com/artworkarchive/aa_wp_plugin
Author: John Feustel & Jonathan Barquero
Author URI: http://www.artworkarchive.com/
Description: Artwork Archive wordpress plugin which lets the user to pull down public data, including user's public pieces as well as user's public general information
Version: 1.0
*/

//---------------------
//includes php required files
//---------------------
require_once("api_helper.php");

//---------------------
//define plugin related constants
//---------------------
//$apiHelper = new ArtworkArchiveApiHelper();

function add_css_styles(){
	echo ArtworkArchiveApiHelper::generate_css_styles();
}

//gets user's public profile information
//function get_user_public_profile_info($user_id){
function get_user_public_profile_info(){
	echo ArtworkArchiveApiHelper::generate_public_pieces_modal_popups('sophia-rouhana');
    echo ArtworkArchiveApiHelper::get_user_public_profile_information('sophia-rouhana');
}

//gets user's public profile information
function get_user_public_pieces_info($user_id){
	return "TODO";
}

//---------------------
// Hook our plugin functions to WordPress Event
// Set that function up to execute when the admin_notices action is called
//---------------------
//add_action('wp_head', 'add_css_styles');
add_action('after_body', 'get_user_public_profile_info');

//add_action('artworkarchive_public_profile', 'get_user_public_profile_info');

//STYLES SECTION


//Hardcode Test
/*
echo ArtworkArchiveApiHelper::generate_public_pieces_modal_popups('sophia-rouhana');
echo ArtworkArchiveApiHelper::get_user_public_profile_information('sophia-rouhana');
*/
?>

<!--//Hardcode Test-->

<!--
<link rel="stylesheet" href="css/style.css" type="text/css">
<link rel="stylesheet" href="css/modal.css" type="text/css">
-->