// useChat.js
import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import {
  getChannelsFromServer,
  getMessagesFromServer,
  sendMessageToServer,
  clearChatForChannel,
  createChannelOnServer,
  deleteChannelOnServer,
} from '../api';

const useChat = () => {
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [channels, setChannels] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [newChannelName, setNewChannelName] = useState('');
  const [showMessagePanel, setShowMessagePanel] = useState(true);

  const socket = io('http://localhost:3001');

  useEffect(() => {
    const fetchChannels = async () => {
      const fetchedChannels = await getChannelsFromServer();
      setChannels(fetchedChannels);
    };

    fetchChannels();
  }, []);

  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleClearChat = async () => {
    try {
        // Ensure you're passing the _id (string) instead of the whole object
        await clearChatForChannel(selectedChannel._id); 
        setMessageList([]);
        socket.emit('clearChatToServer', { channel: selectedChannel._id }); // Emit the correct channel ID
    } catch (error) {
        console.error('Error clearing chat:', error);
    }
};
  

const handleFormSubmit = async (event, message = newMessage) => {
  event.preventDefault();

  if (!message.trim()) {
      console.error('Cannot send an empty message');
      return;
  }
  
  setMessageList((prevMessages) => [...prevMessages, { text: message }]);

  try {
      // Send the message to the server
      await sendMessageToServer(selectedChannel._id, message);
      socket.emit('sendmessage', message);
  } catch (error) {
      console.error('Error sending message to server:', error);
  } finally {
      setNewMessage('');
  }
};


  

  const handleChannelSelect = async (channel) => {
    if (!channel || !channel._id) {
      console.error('Invalid channel selected:', channel);
      return;
    }
  
    try {
      const messages = await getMessagesFromServer(channel._id);
      setSelectedChannel(channel);
  
      socket.emit('joinChannel', { channel: channel._id });
  
      setNewMessage('');
  
      if (!showMessagePanel) {
        setShowMessagePanel(true);
      }
  
      setMessageList(messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };
  

  const handleNewChannelNameChange = (event) => {
    setNewChannelName(event.target.value);
  };

  const handleCreateChannel = async () => {
    if (newChannelName.trim() !== '') {
        try {
            // Call the API to create the channel
            const newChannel = await createChannelOnServer(newChannelName);

            // Add the new channel to the existing channels
            setChannels([...channels, newChannel.channel]); // Assuming the response has `newChannel.channel`
            
            // Clear the input field
            setNewChannelName('');
        } catch (error) {
            console.error('Error creating channel:', error);
        }
    }
};


  const handleDeleteChannel = async (channelId) => {
    try {
      console.log('Deleting channel with ID:', channelId); // Add this to verify the channelId
      // Call the delete function with channel._id
      await deleteChannelOnServer(channelId);
  
      // Update the local state to remove the deleted channel
      const updatedChannels = channels.filter((c) => c._id !== channelId);
      setChannels(updatedChannels);
      setShowMessagePanel(false);
  
      if (selectedChannel && selectedChannel._id === channelId) {
        setSelectedChannel(null);
        setMessageList([]);
        setShowMessagePanel(false);
      }
    } catch (error) {
      console.error('Error deleting channel:', error);
    }
};

  
  return {
    selectedChannel,
    channels,
    newMessage,
    messageList,
    newChannelName,
    showMessagePanel,
    socket,
    handleInputChange,
    handleClearChat,
    handleFormSubmit,
    handleChannelSelect,
    handleNewChannelNameChange,
    handleCreateChannel,
    handleDeleteChannel,
  };
};

export default useChat;
