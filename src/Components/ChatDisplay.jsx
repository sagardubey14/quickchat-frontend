import React, { useContext, useEffect, useState } from 'react'
import './CSS/ScrollBar.css'
import UserContext from './store/UserContext';

function ChatDisplay({selectedChat, setShowRight}) {
  
  const {username, chatList , setChatList, socketInstance, setSocketInstance} = useContext(UserContext);
  const [text, setText] = useState('');

  useEffect(()=>{
    if(!socketInstance) return
    if(!selectedChat) return
    socketInstance.on(`msg-for-${username}`,(msg)=>{
      console.log(msg," to reciever");
      handleRecieveMsg(msg);
      // socketInstance.emit(`msg-received-by-${username}`, 'msg Recieved');
    })
  },[socketInstance, selectedChat])

  function handleRecieveMsg(msg){
    setChatList(prevChatList=>{
      return {
        ...prevChatList,
        [selectedChat]:{
          ...prevChatList[selectedChat],
          messages: [...prevChatList[selectedChat].messages, msg]
        }
      }
    })
  }

  const handleSend = ()=>{
    if(!text.trim()) return;
    let msg = {
      "id": Date.now(),
      "text": text,
      "sender": username,
      "receiver": selectedChat,
      "timeStamp": "7:00",
      "status": "sent"
    }
    console.log(msg);
    // setMsgs(msg)
    handleRecieveMsg(msg);
    setText("");
    console.log(socketInstance);
    socketInstance.emit(`chat-message`,msg);
  }

  return (
    <div style={{ flex: 1, backgroundColor: '#fff', padding: '20px', flexDirection:'column'  }}>
      {/* {console.log(chatList)} */}
    {
      selectedChat ? (
      <div style={{height:'95%'}}>
        <div style={{display:'flex'}}>
        <button onClick={()=>setShowRight(false)} className='backButton' >{'<-'}</button>
        <h2>{chatList[selectedChat].name}</h2>
        </div>
  
        {/* Chat Messages */}
        <div className='scrollable-container' >
          {
            chatList[selectedChat].messages.length === 0 ? <h1>No message Start the chat</h1> :
            chatList[selectedChat].messages.map((message) => (
            <div
              key={message.id}
              style={{
                display: 'flex',
                flexDirection: message.sender === username ? 'row-reverse' : 'row',
                marginBottom: '10px',
                alignItems: 'flex-start',
                 overflowY: 'auto'
              }}
            >
              {/* Message Bubble */}
              <div
                style={{
                  backgroundColor: message.sender === username ? '#d1f7c4' : '#f1f1f1',
                  padding: '10px',
                  paddingRight: message.sender === username ? '0' : '10px',
                  borderRadius: '10px',
                  maxWidth: '70%',
                  position: 'relative',
                  wordWrap: 'break-word',
                }}
              >
                <p style={{ margin: 0, marginBottom:'2px' }}>
                  {message.text}
                  {message.sender === username ?
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
                    })(): null
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
      <p style={{height:'90vh'}}>Select a chat to start messaging.</p>
    )}
     {/* Input box and Send button */}
     <div className='inputSend'>
     <input style={{width:'100%'}} value={text} onChange={(e)=>setText(e.target.value)}/>
     <button className='sendBtn' onClick={handleSend}>↗️</button>
     </div>
     
  </div>
  
  )
}

export default ChatDisplay
