<?php
//---------------------------------------------------------------
// Hooks for local css styles
//---------------------------------------------------------------
add_action( 'wp_enqueue_scripts', 'aa_wp_styles_load' );
function aa_wp_styles_load(){
	wp_enqueue_style( 'wp-aa-style', plugin_dir_url( __FILE__ ) . 'css/wp-aa-style.css',false,'1.1','all');
	wp_enqueue_style( 'wp-aa-modal', plugin_dir_url( __FILE__ ) . 'css/wp-aa-modal.css',false,'1.1','all');
	wp_enqueue_style( 'wp-aa-loader', plugin_dir_url( __FILE__ ) . 'css/wp-aa-loader.css',false,'1.1','all');
	wp_enqueue_style( 'wp-aa-jquery-min', plugin_dir_url( __FILE__ ) . 'css/wp-aa-jquery-modal-min.css',false,'1.1','all');
}