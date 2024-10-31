import { createSignal } from 'solid-js';

function PlaylistUploader(props) {
  const [playlistURL, setPlaylistURL] = createSignal('');
  const [playlistFile, setPlaylistFile] = createSignal(null);

  const handleURLSubmit = async (e) => {
    e.preventDefault();
    const url = playlistURL();
    if (url) {
      try {
        const response = await fetch(url);
        const content = await response.text();
        props.onUpload(content);
      } catch (error) {
        console.error('Error fetching playlist:', error);
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPlaylistFile(file);
  };

  const handleFileSubmit = async (e) => {
    e.preventDefault();
    const file = playlistFile();
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target.result;
        props.onUpload(content);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <h2 class="text-2xl font-bold mb-4 text-purple-600">Upload Playlist</h2>
      <form onSubmit={handleURLSubmit} class="mb-4">
        <input
          type="text"
          placeholder="Enter Playlist URL"
          value={playlistURL()}
          onInput={(e) => setPlaylistURL(e.target.value)}
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
        />
        <button
          type="submit"
          class={`mt-2 w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${props.loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={props.loading}
        >
          {props.loading ? 'Loading...' : 'Load Playlist'}
        </button>
      </form>
      <div class="text-center mb-4">Or</div>
      <form onSubmit={handleFileSubmit}>
        <input
          type="file"
          accept=".m3u, .txt"
          onChange={handleFileChange}
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
        />
        <button
          type="submit"
          class={`mt-2 w-full px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${props.loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={props.loading}
        >
          {props.loading ? 'Loading...' : 'Upload Playlist'}
        </button>
      </form>
    </div>
  );
}

export default PlaylistUploader;