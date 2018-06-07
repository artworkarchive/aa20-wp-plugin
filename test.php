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
//Artwork Archive Default Test Artist Name
$my_artist_slug = 'sophia-rouhana';
?>

<!-- Modal HTML embedded directly into document -->
<div id="pieceViewer" class="modal">
    <img id="aawp-popup-piece-image" src="" alt="Public Piece Image" class="image">
    <p id="aawp-popup-piece-name">[binded on runtime]</p>
    <div id="aawp-popup-piece-details">
        <p>[binded on runtime]</p>
    </div>
</div>

<!-- open the modal thru this button using code on runtime -->
<a class="aawp-open-modalpoup-button" href="#pieceViewer" rel="modal:open">[hidden]</a>

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

<!-- Hardcode Localhost Test CSS Static Styles Include <script src="http://code.jquery.com/jquery-1.9.1.js"></script> -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0/jquery.min.js"></script>
<!-- jQuery Modal -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.css" />

<script src="assets/js/wp-aa-page-actions.js"></script>
<link href="assets/css/wp-aa-style.css" rel="stylesheet">
<link href="assets/css/wp-aa-modal.css" rel="stylesheet">
<link href="assets/css/wp-aa-loader.css" rel="stylesheet">
<link href="assets/css/wp-aa-jquery-modal-min.css" rel="stylesheet">

<script type="text/javascript">
		onPageLoad("<?php echo $my_artist_slug ?>");
</script>