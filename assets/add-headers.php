<?php
/**
Plugin Name: Header Scripts
*/
add_action( 'wp_head', 'my_header_scripts' );
function my_header_scripts(){
  ?>

	<!-- 
		jQuery Modal
	-->
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/salvattore/1.0.9/salvattore.min.js"></script>
  <?php
}