import { useState, useEffect } from "react";
import {
  initializeApi,
  getChannelsFromServer,
  getMessagesFromServer,
  sendMessageToServer,
  clearChatForChannel,
  createChannelOnServer,
  deleteChannelOnServer,
  getArchivedMessages,
  getSchema,
  registerUser,
  loginUser,
} from "../api";

const useChat = () => {
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [channels, setChannels] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const [showMessagePanel, setShowMessagePanel] = useState(true);
  const [archiveMessageList, setArchiveMessageList] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState(null);
  const [loginSchema, setLoginSchema] = useState({});
  const [registerSchema, setRegisterSchema] = useState({});
  const [createChannelSchema, setCreateChannelSchema] = useState({});

  useEffect(() => {
    const init = async () => {
      try {
        await initializeApi();
        setIsInitialized(true);
        // schemas getting in the response of init apis
        setRegisterSchema(getSchema("registerUser"));
        setLoginSchema(getSchema("loginUser"));
      } catch (error) {
        console.error("Error initializing API:", error);
        setError(
          `Failed to initialize: ${error.message}. Please try again later.`
        );
      }
    };
    init();
  }, []);

  const handleRegister = async (userData) => {
    try {
      await registerUser(userData);
      setError(null); // Clear previous errors
    } catch (err) {
      console.error("Something went wrong:", err);
    }
  };

  const handleLogin = async (credentials) => {
    try {
      const response = await loginUser(credentials);
      setError(null); // Clear previous errors
      return response;
    } catch (err) {
      console.error("Validation failed:", err);
    }
  };

  useEffect(() => {
    const fetchChannels = async () => {
      if (isInitialized) {
        try {
          const data = await getChannelsFromServer();
          setChannels(data.channels);
          setCreateChannelSchema(getSchema("createChannel"));
        } catch (error) {
          console.error("Error fetching channels:", error);
          setError("Failed to fetch channels. Please try again later.");
        }
      }
    };

    fetchChannels();
  }, [isInitialized]);

  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleClearChat = async () => {
    try {
      if (!selectedChannel || !selectedChannel._id) {
        throw new Error("Invalid channel selected");
      }
      await clearChatForChannel(selectedChannel._id);
      setMessageList([]);
      setArchiveMessageList([]);
    } catch (error) {
      console.error("Error clearing chat:", error);
      setError(`Error clearing chat: ${error.message}`);
    }
  };

  const loadArchivedMessages = async () => {
    try {
      const data = await getArchivedMessages(selectedChannel._id);
      setArchiveMessageList(data.archivedMessages);
    } catch (error) {
      console.error("Error loading archived messages:", error);
    }
  };

  const handleFormSubmit = async (event, newMessage) => {
    event.preventDefault();
    if (!newMessage.trim()) return;

    try {
      await sendMessageToServer(selectedChannel._id, newMessage);
      setMessageList((prevMessages) => [...prevMessages, { text: newMessage }]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message to server:", error);
    }
  };

  const handleChannelSelect = async (channel) => {
    if (!channel || !channel._id) {
      console.error("Invalid channel selected:", channel);
      return;
    }

    try {
      const data = await getMessagesFromServer(channel._id);
      setSelectedChannel(channel);
      setNewMessage("");
      setShowMessagePanel(true);
      setMessageList(data.messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleCreateChannel = async (channelData) => {
    try {
      const data = await createChannelOnServer(channelData);
      setChannels((prev) => [...prev, data.channel]);
    } catch (error) {
      console.error("Error creating channel:", error);
    }
  };

  const handleDeleteChannel = async (channelId) => {
    try {
      await deleteChannelOnServer(channelId);
      setChannels((prev) => prev.filter((c) => c._id !== channelId));
      if (selectedChannel && selectedChannel._id === channelId) {
        setSelectedChannel(null);
        setMessageList([]);
        setShowMessagePanel(false);
      }
    } catch (error) {
      console.error("Error deleting channel:", error);
    }
  };

  return {
    selectedChannel,
    channels,
    newMessage,
    messageList,
    showMessagePanel,
    archiveMessageList,
    isInitialized,
    loginSchema,
    registerSchema,
    createChannelSchema,
    error,
    handleInputChange,
    handleClearChat,
    handleFormSubmit,
    handleChannelSelect,
    handleCreateChannel,
    handleDeleteChannel,
    loadArchivedMessages,
    handleLogin,
    handleRegister,
  };
};

export default useChat;
