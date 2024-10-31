import { createSignal, onMount, createEffect, Show } from 'solid-js';
import { supabase } from './supabaseClient';
import { Auth } from '@supabase/auth-ui-solid';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import PlaylistUploader from './components/PlaylistUploader';
import ChannelList from './components/ChannelList';
import VideoPlayer from './components/VideoPlayer';

function App() {
  const [user, setUser] = createSignal(null);
  const [currentPage, setCurrentPage] = createSignal('login');
  const [channels, setChannels] = createSignal([]);
  const [selectedChannel, setSelectedChannel] = createSignal(null);
  const [loading, setLoading] = createSignal(false);

  // Authentication checking
  const checkUserSignedIn = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUser(user);
      setCurrentPage('homePage');
    }
  };

  onMount(checkUserSignedIn);

  createEffect(() => {
    const authListener = supabase.auth.onAuthStateChange((_, session) => {
      if (session?.user) {
        setUser(session.user);
        setCurrentPage('homePage');
      } else {
        setUser(null);
        setCurrentPage('login');
      }
    });

    return () => {
      authListener.data.unsubscribe();
    }
  });

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setCurrentPage('login');
  };

  // Handlers for playlist

  const handlePlaylistUpload = async (playlistContent) => {
    setLoading(true);
    try {
      // Parse the playlist content
      const channelsList = parseM3UPlaylist(playlistContent);
      setChannels(channelsList);
    } catch (error) {
      console.error('Error parsing playlist:', error);
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
        const info = line.match(/#EXTINF:-?\d+,(.*)/);
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
    <div class="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4">
      <Show when={currentPage() === 'homePage'} fallback={
        <div class="flex items-center justify-center min-h-screen">
          <div class="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
            <h2 class="text-3xl font-bold mb-6 text-center text-purple-600">Sign in with ZAPT</h2>
            <a
              href="https://www.zapt.ai"
              target="_blank"
              rel="noopener noreferrer"
              class="text-blue-500 hover:underline mb-6 block text-center"
            >
              Learn more about ZAPT
            </a>
            <Auth
              supabaseClient={supabase}
              appearance={{ theme: ThemeSupa }}
              providers={['google', 'facebook', 'apple']}
              magicLink={true}
              view="magic_link"
              showLinks={false}
              authView="magic_link"
            />
          </div>
        </div>
      }>
        <div class="max-w-6xl mx-auto">
          <div class="flex justify-between items-center mb-8">
            <h1 class="text-4xl font-bold text-purple-600">New App</h1>
            <button
              class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </div>

          <PlaylistUploader onUpload={handlePlaylistUpload} loading={loading()} />

          <Show when={channels().length > 0}>
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
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
      </Show>
    </div>
  );
}

export default App;