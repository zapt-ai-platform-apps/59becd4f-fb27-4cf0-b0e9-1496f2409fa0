import { createSignal, Show } from 'solid-js';

function PlaylistUploader(props) {
  const [username, setUsername] = createSignal('');
  const [password, setPassword] = createSignal('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = username();
    const pass = password();
    if (user && pass) {
      props.onFetch(user, pass);
    }
  };

  return (
    <div>
      <h2 class="text-2xl font-bold mb-4 text-purple-600">Enter Credentials</h2>
      <form onSubmit={handleSubmit} class="space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={username()}
          onInput={(e) => setUsername(e.target.value)}
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border text-gray-900"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password()}
          onInput={(e) => setPassword(e.target.value)}
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border text-gray-900"
          required
        />
        <button
          type="submit"
          class={`mt-2 w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${
            props.loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={props.loading}
        >
          {props.loading ? 'Loading...' : 'Load Playlist'}
        </button>
      </form>
      <Show when={props.errorMessage}>
        <div class="mt-4 text-red-500">{props.errorMessage}</div>
      </Show>
    </div>
  );
}

export default PlaylistUploader;