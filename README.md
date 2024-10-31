# New App

## Overview

New App is an IPTV streaming application that allows users to upload or input their own IPTV playlists (M3U files or URLs) to access and watch IPTV channels. Users can upload their playlists, browse available channels, and watch live TV streams directly from the app without the need to sign in.

## User Guide

### 1. Upload Playlist

1. Upon opening the app, you will be presented with options to upload your IPTV playlist.
2. You have two options to upload your IPTV playlist:
   - **Enter Playlist URL**:
     - Input the URL of your M3U playlist in the provided text field.
     - Click the **"Load Playlist"** button.
   - **Upload Playlist File**:
     - Click on the file input to select an M3U or TXT file from your device.
     - Click the **"Upload Playlist"** button.

### 2. Browse Channels

1. Once the playlist is loaded, a list of channels will appear on the left side of the screen.
2. Scroll through the list to find your desired channel.

### 3. Play Channel

1. Click on a channel name to start streaming.
2. The selected channel will play in the video player on the right side of the screen.
3. Use the video controls to pause, play, or adjust the volume.

## External APIs and Services

- **Hls.js**: Integrated for streaming HLS (HTTP Live Streaming) video content.
- **Sentry**: Integrated for error logging and monitoring.

## Environment Variables

The app requires the following environment variables to function properly:

- `VITE_PUBLIC_APP_ID`
- `VITE_PUBLIC_SENTRY_DSN`
- `VITE_PUBLIC_APP_ENV`

Please ensure these are set in your `.env` file.