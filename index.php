<!-- jquery include -->
<script src="http://code.jquery.com/jquery-1.9.1.js"></script>

<?php
//---------------------
//header information
//---------------------
/**
	Plugin Name: Artwork Archive Portfolio Embed
	Plugin URI: https://github.com/artworkarchive/aa20-wp-plugin
	Description: Artwork Archive wordpress plugin which lets the user to pull down public data, including user's public pieces as well as user's public general information
	Version: 1.5.4
	Author: Artwork Archive (John Feustel & Jonathan Barquero)
	Author URI: http://www.artworkarchive.com/
    License: GPLv2 or later
	Text Domain: artwork-archive-profile
	
	Copyright 2018  Artwork Archive LLC (email : john@artworkarchive.com)
	This program is free software; you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation; either version 2 of the License, or
	(at your option) any later version.
	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.
	You should have received a copy of the GNU General Public License
	along with this program; if not, write to the Free Software
	Foundation, Inc., Denver, CO, USA
*/

//---------------------------------------------------------------
// Hook our plugin functions to WordPress Event
// Set that function up to execute when the admin_notices action is called
//---------------------------------------------------------------
add_shortcode('artworkarchive_portfolio_embed', 'get_user_public_gallery' );

//---------------------------------------------------------------
// Hooks for local css styles
//---------------------------------------------------------------
wp_enqueue_style( 'wp-aa-style', plugin_dir_url( __FILE__ ) . 'css/wp-aa-style.css',false,'1.1','all');
wp_enqueue_style( 'wp-aa-modal', plugin_dir_url( __FILE__ ) . 'css/wp-aa-modal.css',false,'1.1','all');
wp_enqueue_style( 'wp-aa-loader', plugin_dir_url( __FILE__ ) . 'css/wp-aa-loader.css',false,'1.1','all');

//---------------------------------------------------------------
// Hooks for local js scripts
//---------------------------------------------------------------
//wp_enqueue_script( 'jquery', plugin_dir_url( __FILE__ ) . 'js/jquery-1.9.1.js', false );
//wp_enqueue_script( 'jquery', plugin_dir_url( __FILE__ ) . 'js/jquery-3.3.1.js', false );
wp_enqueue_script( 'wp-aa-pagination', plugin_dir_url( __FILE__ ) . 'js/wp-aa-pagination.js', false );

//---------------------------------------------------------------
// Do work (all HTML binding and events for pagination control are handled by javascript code)
//---------------------------------------------------------------
//[artworkarchive_public_profile user_slug="sophia-rouhana"]
function get_user_public_gallery($atts){
    $a = shortcode_atts( array(
        'user_slug' => 'artwork-archive-artist-slug-name-here'
    ), $atts );

    $user_slug = $a['user_slug'];

	$js_script =  
	'<script type="text/javascript">
		onPageLoad("'.$user_slug.'");
	</script>';

	$html = '
	<!-- Artwork Archive WordPress Plugin Base Layout -->

	<!-- Common Modal Popup -->
	<a href="#x" class="aawp-overlay-modal" id="aa-wp-global-piece-viewer-modal-popup"></a>
	<div class="aawp-popup">
		<img id="aawp-popup-piece-image" src="" alt="Public Piece Image" class="image">
		<p id="aawp-popup-piece-name"></p>
		<div id="aawp-popup-piece-details"></div>
		<a class="aawp-close" href="#close"></a>
	</div>
	
	<!-- Gallery -->
	<div class="aawp-plugin-container">
		<input id="selected_page" type="hidden" value="1">
		<div id="main_loader" class="aawp-loader" style="display: none;"></div>
		<!-- HTML Created On Runtime -->
		<div id="aawp-data-section"></div>
		<div id="aawp-pieces-section" class="aawp-pieces-section"></div>
		<!-- Pagination control -->
		<div id="aawp-pagination-section" class="aawp-pagination"></div>
		<!-- Pagination Helper -->
		<input id="aawp-user-slug" type="hidden" value=""/>
	</div>';

	echo $html.$js_script;
}
?>