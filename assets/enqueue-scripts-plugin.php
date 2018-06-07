<?php
//---------------------------------------------------------------
// Hooks for local js scripts
//---------------------------------------------------------------
add_action( 'wp_enqueue_scripts', 'aa_wp_scripts_load' );
function aa_wp_scripts_load(){
	// Deregister the included library
    wp_deregister_script( 'jquery' );
    // Register the library again from Google's CDN
	wp_register_script( 'jquery', 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0/jquery.min.js');
	// Register local script
	wp_enqueue_script( 'wp-aa-page-actions', plugin_dir_url( __FILE__ ) . 'js/wp-aa-page-actions.js' );
}