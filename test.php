<b>Artwork Archive</b>
<i> WordPress Plugin's</i>
<small>Test Page</small>
<small>: php</small>

<?php
//---------------------------------------------------------------
// Hardcode Test Showing how does this plugin works
// Written in php
// Doesn't requires any WordPress installation
//---------------------------------------------------------------

//---------------------------------------------------------------
//Include Artwork Archive Core/Base Class for WordPress Plugin
//---------------------------------------------------------------
require_once('api_helper.php');

//Artwork Archive Default Test Artist Name
$my_artist_slug = 'sophia-rouhana';
echo ArtworkArchiveApiHelper::generate_public_pieces_modal_popups($my_artist_slug);
echo ArtworkArchiveApiHelper::get_user_public_pieces_information($my_artist_slug);

?>

<!-- Hardcode Localhost Test CSS Static Styles Include -->
<script src="http://code.jquery.com/jquery-1.9.1.js"></script>
<script src="http://public.aeonitgroup.com/aeon/artworkarchive/aa20-wp-plugin/js/wp-aa-pagination.js"></script>

<link href="http://public.aeonitgroup.com/aeon/artworkarchive/aa20-wp-plugin/css/wp-aa-style.css" rel="stylesheet">
<link href="http://public.aeonitgroup.com/aeon/artworkarchive/aa20-wp-plugin/css/wp-aa-modal.css" rel="stylesheet">