# New App

## Overview

New App is an IPTV streaming application that allows users to upload or input their own IPTV playlists (M3U files or URLs) to access and watch IPTV channels. Users can sign in with ZAPT, upload their playlists, browse available channels, and watch live TV streams directly from the app.

## User Guide

### 1. Sign In

1. Upon opening the app, users are presented with a sign-in page.
2. Click on the **"Sign in with ZAPT"** text to initiate the authentication process.
3. Sign in using one of the supported providers:
   - **Magic Link** (email-based authentication)
   - **Google**
   - **Facebook**
   - **Apple**
4. If you don't have an account, follow the prompts to create one.

### 2. Upload Playlist

1. After signing in, you will be directed to the main app interface.
2. You have two options to upload your IPTV playlist:
   - **Enter Playlist URL**:
     - Input the URL of your M3U playlist in the provided text field.
     - Click the **"Load Playlist"** button.
   - **Upload Playlist File**:
     - Click on the file input to select an M3U or TXT file from your device.
     - Click the **"Upload Playlist"** button.

### 3. Browse Channels

1. Once the playlist is loaded, a list of channels will appear on the left side of the screen.
2. Scroll through the list to find your desired channel.

### 4. Play Channel

1. Click on a channel name to start streaming.
2. The selected channel will play in the video player on the right side of the screen.
3. Use the video controls to pause, play, or adjust the volume.

### 5. Sign Out

1. To sign out of the app, click the **"Sign Out"** button located at the top right corner of the screen.
2. You will be redirected back to the sign-in page.

## External APIs and Services

- **ZAPT Authentication**: Used for user authentication and session management.
- **Hls.js**: Integrated for streaming HLS (HTTP Live Streaming) video content.
- **Sentry**: Integrated for error logging and monitoring.

## Environment Variables

The app requires the following environment variables to function properly:

- `VITE_PUBLIC_APP_ID`
- `VITE_PUBLIC_SENTRY_DSN`
- `VITE_PUBLIC_APP_ENV`

Please ensure these are set in your `.env` file.