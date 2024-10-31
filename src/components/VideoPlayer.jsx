import { createEffect, onCleanup } from 'solid-js';
import Hls from 'hls.js';

function VideoPlayer(props) {
  let videoRef;
  let hls;

  createEffect(() => {
    if (hls) {
      hls.destroy();
    }

    if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(props.channel.url);
      hls.attachMedia(videoRef);
    } else if (videoRef.canPlayType('application/vnd.apple.mpegurl')) {
      videoRef.src = props.channel.url;
    } else {
      console.error('This browser does not support HLS');
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  });

  onCleanup(() => {
    if (hls) {
      hls.destroy();
    }
  });

  return (
    <div>
      <h3 class="text-xl font-bold mb-2 text-purple-600">
        Now Playing: {props.channel.name}
      </h3>
      <video
        ref={videoRef}
        controls
        autoplay
        class="w-full h-auto rounded-lg shadow-md"
      ></video>
    </div>
  );
}

export default VideoPlayer;