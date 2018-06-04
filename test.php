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
?>

<a href="#x" class="aawp-overlay-modal" id="aa-wp-global-piece-viewer-modal-popup"></a>
<div class="aawp-popup">
    <img id="aawp-popup-piece-image" src="" alt="Public Piece Image" class="image">
    <p id="aawp-popup-piece-name">piece.name</p>
    <div id="aawp-popup-piece-details">
        <p>piece.inventory</p>
        <p>piece.size</p>
        <p>piece.etc</p>
    </div>
    <a class="aawp-close" href="#close"></a>
</div>

<div class="aawp-plugin-container">

    <input id="selected_page" type="hidden" value="1">
    <div id="main_loader" class="aawp-loader" style="display: none;"></div>

    <div id="aawp-data-section">
        [dynamic html - hidden]
    </div>

    <div id="aawp-pieces-section" class="aawp-pieces-section">
        [dynamic html]
    </div>
    
    <div id="aawp-pagination-section" class="aawp-pagination">
        [dynamic html]
    </div>
</div>

<input id="aawp-user-slug" type="hidden" value=""/>

<!-- Hardcode Localhost Test CSS Static Styles Include -->
<script src="http://code.jquery.com/jquery-1.9.1.js"></script>
<script src="js/wp-aa-pagination.js"></script>
<link href="css/wp-aa-style.css" rel="stylesheet">
<link href="css/wp-aa-modal.css" rel="stylesheet">
<link href="css/wp-aa-loader.css" rel="stylesheet">

<script type="text/javascript">
		onPageLoad("<?php echo $my_artist_slug ?>");
</script>