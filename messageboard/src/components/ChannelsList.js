import React from 'react';
import { FaTrash } from 'react-icons/fa';

function ChannelsList({ channels, selectedChannel, handleChannelSelect, handleDeleteChannel, handleCreateChannel, newChannelName, handleNewChannelNameChange }) {
    return (
        <div>
            <h2>Channels</h2>
            <ul>
                {channels.map((channel) => (
                    <li
                        key={channel._id}
                        onClick={() => handleChannelSelect(channel)} 
                        className={selectedChannel && selectedChannel._id === channel._id ? 'selected-channel' : ''}
                    >
                        {channel.name} {/* Ensure you're rendering `channel.name` */}
                        <FaTrash onClick={() => handleDeleteChannel(channel._id)} className="delete-icon" /> {/* Pass the channel id or name */}
                    </li>
                ))}
            </ul>
            <div>
                <input
                    type="text"
                    placeholder="New Channel Name"
                    value={newChannelName}
                    onChange={handleNewChannelNameChange}
                />
                <button onClick={handleCreateChannel}>Create Channel</button>
            </div>
        </div>
    );
}

export default ChannelsList;
