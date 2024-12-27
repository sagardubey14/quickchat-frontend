import React from 'react'

function ChatList({chatList, handleChatSelect}) {
  return (
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
  )
}

export default ChatList
