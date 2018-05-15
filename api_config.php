<?php

// This class has all the necessary API entry config values
class ArtworkArchiveApiConfig {

	// This method returns API endpoint for making GET calls of user's public profile info
	public static function base_api_url_for_user_public_profile()
	{
		//LOCALHOST
		//return "http://localhost:6020/api/profile/";

		//STAGING ENVIRONMENT
		return "https://staging.artworkarchive.com/api/profile/";
	}

}