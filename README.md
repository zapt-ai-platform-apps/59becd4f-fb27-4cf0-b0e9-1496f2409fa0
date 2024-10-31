# New App

## Overview

New App is an IPTV streaming application that allows users to access IPTV channels by entering their username and password credentials. The app constructs the playlist URL based on the provided credentials, loads the IPTV channels, and allows users to browse and watch live TV streams directly from the app without the need to sign in.

## User Guide

### 1. Enter Credentials

1. Upon opening the app, you will be prompted to enter your IPTV service **Username** and **Password**.
2. Input your **Username** and **Password** in the provided text fields.
3. Click the **"Load Playlist"** button.
4. If the credentials are correct, the playlist will load. If not, an error message will be displayed.

### 2. Browse Channels

1. Once the playlist is loaded, a list of channels will appear on the left side of the screen.
2. Scroll through the list to find your desired channel.

### 3. Play Channel

1. Click on a channel name to start streaming.
2. The selected channel will play in the video player on the right side of the screen.
3. Use the video controls to pause, play, or adjust the volume.

## External APIs and Services

- **IPTV Provider API**: Used to fetch the M3U playlist based on user credentials.
- **Hls.js**: Integrated for streaming HLS (HTTP Live Streaming) video content.
- **Sentry**: Integrated for error logging and monitoring.

## Environment Variables

The app requires the following environment variables to function properly:

- `VITE_PUBLIC_APP_ID`
- `VITE_PUBLIC_SENTRY_DSN`
- `VITE_PUBLIC_APP_ENV`

Please ensure these are set in your `.env` file.