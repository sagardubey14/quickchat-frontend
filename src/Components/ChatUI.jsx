import React, { useState } from 'react';
import StartChat from './StartChat';
import ChatList from './ChatList';

const ChatUI = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [showStartChat, setShowStartChat] = useState(false);
  const chatList = [
    { id: 1, name: 'Friend 1' },
    { id: 2, name: 'Group 1' },
    { id: 3, name: 'Friend 2' },
    { id: 4, name: 'Group 2' }
  ];

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>

      {
        showStartChat && <StartChat setShowStartChat={setShowStartChat} />
      }
      {/* Left Column */}
      <div style={{ width: '200px', backgroundColor: '#f4f4f4', padding: '10px' }}>
        <button 
          onClick={()=>setShowStartChat(true)}
          style={{ width: '100%', padding: '10px', marginBottom: '10px', cursor: 'pointer' }}
        >
          + Start Chat
        </button>
        <ChatList chatList={chatList} handleChatSelect={handleChatSelect}/>
      </div>

      {/* Right Column */}
      <div style={{ flex: 1, backgroundColor: '#fff', padding: '20px' }}>
        {selectedChat ? (
          <div>
            <h2>{selectedChat.name}</h2>
            <div style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '5px' }}>
              <p>This is the chat with {selectedChat.name}.</p>
            </div>
          </div>
        ) : (
          <p>Select a chat to start messaging.</p>
        )}
      </div>
    </div>
  );
};

export default ChatUI;
