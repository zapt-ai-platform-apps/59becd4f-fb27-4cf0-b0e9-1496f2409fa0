import { createSignal, Show } from 'solid-js';
import PlaylistUploader from './components/PlaylistUploader';
import ChannelList from './components/ChannelList';
import VideoPlayer from './components/VideoPlayer';

function App() {
  const [channels, setChannels] = createSignal([]);
  const [selectedChannel, setSelectedChannel] = createSignal(null);
  const [loading, setLoading] = createSignal(false);
  const [errorMessage, setErrorMessage] = createSignal('');

  // Handlers for playlist
  const handlePlaylistFetch = async (username, password) => {
    setLoading(true);
    setErrorMessage(''); // Reset any previous errors
    try {
      const playlistURL = `http://apsmart.in:80/get.php?username=${encodeURIComponent(
        username
      )}&password=${encodeURIComponent(
        password
      )}&type=m3u_plus&output=ts`;
      const response = await fetch(playlistURL);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch playlist: ${response.status} ${response.statusText} ${errorText}`);
      }
      const playlistContent = await response.text();
      const channelsList = parseM3UPlaylist(playlistContent);
      if (channelsList.length === 0) {
        throw new Error('No channels found in the playlist. Please check your credentials.');
      }
      setChannels(channelsList);
    } catch (error) {
      console.error('Error fetching playlist:', error);
      setErrorMessage(error.message || 'An error occurred while fetching the playlist');
    } finally {
      setLoading(false);
    }
  };

  const handleChannelSelect = (channel) => {
    setSelectedChannel(channel);
  };

  function parseM3UPlaylist(content) {
    const lines = content.split('\n');
    const channels = [];
    let currentChannel = {};
    for (let line of lines) {
      line = line.trim();
      if (line.startsWith('#EXTINF')) {
        const info = line.match(/#EXTINF:-?\d+(?: .*)?,(.*)/);
        if (info) {
          currentChannel.name = info[1];
        } else {
          currentChannel.name = 'Unknown';
        }
      } else if (line && !line.startsWith('#')) {
        currentChannel.url = line;
        channels.push({ ...currentChannel });
        currentChannel = {};
      }
    }
    return channels;
  }

  return (
    <div class="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4 text-gray-900">
      <div class="max-w-6xl mx-auto h-full">
        <div class="flex justify-between items-center mb-8">
          <h1 class="text-4xl font-bold text-purple-600">New App</h1>
        </div>

        <PlaylistUploader onFetch={handlePlaylistFetch} loading={loading()} errorMessage={errorMessage()} />

        <Show when={channels().length > 0}>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8 h-full">
            <div class="md:col-span-1">
              <ChannelList channels={channels()} onSelect={handleChannelSelect} />
            </div>
            <div class="md:col-span-3">
              <Show when={selectedChannel()}>
                <VideoPlayer channel={selectedChannel()} />
              </Show>
            </div>
          </div>
        </Show>
      </div>
    </div>
  );
}

export default App;