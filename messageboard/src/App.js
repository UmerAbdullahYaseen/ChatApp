import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import useChat from './CustomHooks/useChat';
import ChannelsList from './components/ChannelsList';
import MessageList from './components/MessageList';
import Editor from './components/Editor';
import Login from './components/Login';
import Signup from './components/Signup';

function MainPage({ handleLogout, ...chatProps }) {
  return (
    <>
      <button onClick={handleLogout}>Logout</button>
      <ChannelsList {...chatProps} />
      <MessageList {...chatProps} />
      <Editor {...chatProps} />
    </>
  );
}

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const {
    selectedChannel,
    channels,
    newMessage,
    messageList,
    newChannelName,
    showMessagePanel,
    handleInputChange,
    handleClearChat,
    handleFormSubmit,
    handleChannelSelect,
    handleNewChannelNameChange,
    handleCreateChannel,
    handleDeleteChannel,
  } = useChat();

  const handleLogout = () => {
    setLoggedInUser(null);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/login"
            element={
              loggedInUser ? <Navigate to="/main" /> : <Login setLoggedInUser={setLoggedInUser} />
            }
          />
          <Route
            path="/signup"
            element={<Signup />}
          />
          <Route
            path="/main"
            element={
              loggedInUser ? (
                <MainPage
                  handleLogout={handleLogout}
                  selectedChannel={selectedChannel}
                  channels={channels}
                  newMessage={newMessage}
                  messageList={messageList}
                  newChannelName={newChannelName}
                  showMessagePanel={showMessagePanel}
                  handleInputChange={handleInputChange}
                  handleClearChat={handleClearChat}
                  handleFormSubmit={handleFormSubmit}
                  handleChannelSelect={handleChannelSelect}
                  handleNewChannelNameChange={handleNewChannelNameChange}
                  handleCreateChannel={handleCreateChannel}
                  handleDeleteChannel={handleDeleteChannel}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;