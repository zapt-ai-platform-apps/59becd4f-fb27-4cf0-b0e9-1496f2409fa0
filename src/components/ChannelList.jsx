import { For } from 'solid-js';

function ChannelList(props) {
  return (
    <div>
      <h3 class="text-xl font-bold mb-2 text-purple-600">Channels</h3>
      <div class="max-h-[calc(100vh-300px)] overflow-y-auto">
        <For each={props.channels}>
          {(channel) => (
            <div
              class="p-2 border-b border-gray-300 cursor-pointer hover:bg-gray-100"
              onClick={() => props.onSelect(channel)}
            >
              {channel.name}
            </div>
          )}
        </For>
      </div>
    </div>
  );
}

export default ChannelList;