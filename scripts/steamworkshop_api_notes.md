# Steam Workshop API notes

- The frontend should never call Steam Web API directly from the browser with your Steam API key.
- Backend should store the Steam API key in a secure server-side secret (e.g., /etc/pzserver/steam_api_key or environment variable) and proxy Workshop metadata requests.
- For Workshop metadata use the `https://api.steampowered.com/ISteamRemoteStorage/GetPublishedFileDetails/v1/` endpoint (POST) or the WebAPI endpoints requiring key + publishedfileids.
- The plugin will fallback gracefully if no API key is configured, showing Workshop ID and allowing the admin to add IDs manually.
