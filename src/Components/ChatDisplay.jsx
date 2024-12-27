import React from 'react'

function ChatDisplay({selectedChat, setShowRight}) {
  return (
    <div style={{ flex: 1, backgroundColor: '#fff', padding: '20px', flexDirection:'column' }}>
    {selectedChat ? (
      <div style={{height:'95%'}}>
        <div style={{display:'flex'}}>
        <button onClick={()=>setShowRight(false)} className='backButton' >{'<-'}</button>
        <h2>{selectedChat.name}</h2>
        </div>
        <div style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '5px' }}>
          <p>This is the chat with {selectedChat.name}.</p>
        </div>
  
        {/* Chat Messages */}
        <div style={{ marginTop: '20px', flex:1, }}>
          {selectedChat.messages.map((message) => (
            <div
              key={message.id}
              style={{
                display: 'flex',
                flexDirection: message.sender === 'Sagar' ? 'row-reverse' : 'row',
                marginBottom: '10px',
                alignItems: 'flex-start',
                 overflowY: 'auto'
              }}
            >
              {/* Message Bubble */}
              <div
                style={{
                  backgroundColor: message.sender === 'Sagar' ? '#d1f7c4' : '#f1f1f1',
                  padding: '10px',
                  paddingRight: message.sender === 'Sagar' ? '0' : '10px',
                  borderRadius: '10px',
                  maxWidth: '70%',
                  position: 'relative',
                  wordWrap: 'break-word',
                }}
              >
                <p style={{ margin: 0, marginBottom:'2px' }}>
                  {message.text}
                  {
                    (() => {
                      switch (message.status) {
                        case 'delivered':
                          return <span style={{ marginRight: '5px', marginLeft:'5px', color: 'gray' }}>✓</span>;
                        case 'read':
                          return <span style={{ marginRight: '5px', marginLeft:'5px', color: 'blue' }}>✓</span>;
                        case 'sent':
                          return <span style={{ marginRight: '5px', marginLeft:'5px', color: 'gray' }}>↗</span>;
                        default:
                          return null;
                      }
                    })()
                  }
                </p>
                <div
                  style={{
                    fontSize: '12px',
                    color: '#888',
                    position: 'absolute',
                    bottom: '2%',
                    right: '8%',
                  }}
                >
                  {message.timeStamp}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ) : (
      <p>Select a chat to start messaging.</p>
    )}
     {/* Input box and Send button */}
     <div className='inputSend'>
     <input style={{width:'100%'}}/>
     <button className='sendBtn'>↗️</button>
     </div>
     
  </div>
  
  )
}

export default ChatDisplay
