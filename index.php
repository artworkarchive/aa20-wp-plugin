<?php
//---------------------
//header information
//---------------------
/**
	Plugin Name: Artwork Archive Portfolio Embed
	Plugin URI: https://github.com/artworkarchive/aa20-wp-plugin
	Description: Artwork Archive wordpress plugin which lets the user to pull down public data, including user's public pieces as well as user's public general information
	Version: 1.6.5
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
//include php core files
//---------------------------------------------------------------
require_once("assets/add-headers.php");
//wp-enqueue css styles
require_once("assets/enqueue-styles-plugin.php");
//wp-enqueue js scripts
require_once("assets/enqueue-scripts-plugin.php");
//include aa-wp-plugin core logic
require_once("assets/aa-wp-plugin.php");