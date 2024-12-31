import React from 'react'

function ChatList({chatList, handleChatSelect}) {
  const keys = Object.keys(chatList);
  return (
    <div style={{ padding: '10px' }}>
          {keys.map(chatKey => (
            <div
              key={chatKey}
              onClick={() => handleChatSelect(chatKey)}
              style={{
                padding: '10px',
                marginBottom: '8px',
                cursor: 'pointer',
                backgroundColor: '#e4e4e4',
                borderRadius: '5px',
              }}
            >
              {chatKey}
            </div>
          ))}
        </div>
  )
}

export default ChatList
