import React, { useEffect, useState } from "react";

function MessageList({
  showMessagePanel,
  selectedChannel,
  messageList,
  handleClearChat,
  loadArchivedMessages,
  archiveMessageList,
}) {
  const [currentArchiveMessages, setCurrentArchiveMessages] = useState([]);
  // hide archive message when ever i input a new message
  useEffect(() => {
    setCurrentArchiveMessages([]);
  }, [messageList]);
  // remove arcived message when i
  useEffect(() => {
    if (messageList.length > 15) {
      messageList.shift();
    }
  }, [messageList]);

  // enable load more button only when there are messages in archieve db
  const handleArchievMessages = () => {
    loadArchivedMessages();
    setCurrentArchiveMessages(archiveMessageList.reverse());
  };

  const clearChat = () => {
    handleClearChat();
    setCurrentArchiveMessages([]);
  };

  return (
    <>
      {showMessagePanel && selectedChannel && (
        <div>
          <h2>Messages for {selectedChannel.name}</h2>
          <ul className="message-list">
            {Array.isArray(currentArchiveMessages) &&
              currentArchiveMessages.length > 0 &&
              currentArchiveMessages.map((archiveMessage, index) => (
                <li key={`current-${index}`}>
                  {archiveMessage.text ||
                    archiveMessage.content ||
                    "No content available"}
                </li>
              ))}
            {Array.isArray(messageList) && messageList.length > 0
              ? messageList.map((message, index) => (
                  <li key={`current-${index}`}>
                    {message.text || message.content || "No content available"}
                  </li>
                ))
              : currentArchiveMessages.length === 0 && (
                  <li>No messages available</li>
                )}
          </ul>

          <button
            onClick={handleArchievMessages}
            disabled={messageList.length >= 15 ? false : true}
          >
            Load More
          </button>

          <button
            onClick={clearChat}
            className={`clear-chat-button ${
              messageList.length === 0 ? "clear-chat-button-disabled" : ""
            }`}
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
