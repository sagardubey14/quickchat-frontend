import React, { useState } from 'react';

const ChatUI = () => {
  const [selectedChat, setSelectedChat] = useState(null);
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
      {/* Left Column */}
      <div style={{ width: '200px', backgroundColor: '#f4f4f4', padding: '10px' }}>
        <button 
          style={{ width: '100%', padding: '10px', marginBottom: '10px', cursor: 'pointer' }}
        >
          + Start Chat
        </button>
        <div style={{ padding: '10px' }}>
          {chatList.map(chat => (
            <div
              key={chat.id}
              onClick={() => handleChatSelect(chat)}
              style={{
                padding: '10px',
                marginBottom: '8px',
                cursor: 'pointer',
                backgroundColor: '#e4e4e4',
                borderRadius: '5px',
              }}
            >
              {chat.name}
            </div>
          ))}
        </div>
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
