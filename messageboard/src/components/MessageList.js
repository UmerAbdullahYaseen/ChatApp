// MessageList.js
import React from 'react';

function MessageList({ showMessagePanel, selectedChannel, messageList, handleClearChat }) {
    return (
        <>
            {showMessagePanel && selectedChannel && (
                <div>
                    <h2>Messages for {selectedChannel.name}</h2>
                    <ul className="message-list">
                        {Array.isArray(messageList) && messageList.length > 0 ? (
                            messageList.map((message, index) => (
                                <li key={index}>
                                    {/* Check for the correct property */}
                                    {message.text || message.content || "No content available"}
                                </li>
                            ))
                        ) : (
                            <li>No messages available</li>
                        )}
                    </ul>
                    <button
    onClick={handleClearChat}
    className={`clear-chat-button ${messageList.length === 0 ? 'clear-chat-button-disabled' : ''}`}
    disabled={messageList.length === 0}
>
    Clear Chat
</button>
                </div>
            )}
        </>
    );
}

export default MessageList;
