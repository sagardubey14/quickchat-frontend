import React, { useContext, useEffect, useState } from 'react'
import './CSS/ScrollBar.css'
import UserContext from './store/UserContext';

function ChatDisplay({selectedChat, setShowRight, handleRecieveMsg}) {
  const [status , setStatus] = useState(null)
  
  const {username, chatList , setChatList, socketInstance, setSocketInstance} = useContext(UserContext);
  const [text, setText] = useState('');

  useEffect(()=>{
    console.log(socketInstance, selectedChat, chatList[selectedChat] );
    
    if(!socketInstance) return;
    if(!selectedChat) return;
    if(chatList[selectedChat].isGroup) return;
    console.log('checkkk');
    socketInstance.emit('user-status',selectedChat, (st) => {
      console.log('User status:', st.status);
      if(st.status === 'online'){
        setStatus('Online');
      }else{
        let time = getFormattedTime(st.time);
        setStatus(`last seen at ${time}`);
      }
    });
    // let intervalId = setInterval(() => {
    //   console.log('executiong callback for status');
      
    // }, 10000);

    return (()=>{
      // clearInterval(intervalId);
      console.log('unmount');
    })
  },[socketInstance, selectedChat])

  function getFormattedTime(time = null) {
    const now = time?new Date(time):new Date(Date.now());
    console.log(now);
    
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const formattedTime = `${hours}:${minutes.toString().padStart(2, '0')}`;
    return formattedTime;
  }

  const handleSend = ()=>{
    if(text === 'data de'){
      console.log(chatList);
      return;
    }

    if(!text.trim()) return;
    let msg = {
      "id": Date.now(),
      "text": text,
      "sender": username,
      "receiver": selectedChat,
      "timeStamp": getFormattedTime(),
      "status": "sent"
    }
    console.log(msg);
    handleRecieveMsg(msg, selectedChat);
    setText("");
    console.log(socketInstance);
    socketInstance.emit(`chat-message`,{msg, isGroup: chatList[selectedChat].isGroup});
  }

  return (
    <div style={{ flex: 1, backgroundColor: '#fff', padding: '20px', flexDirection:'column'  }}>
    {
      selectedChat ? (
      <div style={{height:'95%'}}>
        <div style={{display:'flex'}}>
        <button onClick={()=>setShowRight(false)} className='backButton' >{'<-'}</button>
        <h2>{chatList[selectedChat].name}</h2>
        </div>
        {!chatList[selectedChat].isGroup && <h3>{status}</h3>}
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
                  paddingTop: '8px',
                  paddingBottom:'8px',
                  paddingRight: message.sender === username ? '0' : '10px',
                  borderRadius: '10px',
                  maxWidth: '70%',
                  position: 'relative',
                  wordWrap: 'break-word',
                  paddingTop: chatList[selectedChat].isGroup? '0': '10px'
                }}
              >
                {(chatList[selectedChat].isGroup && message.sender !== username)
                 && 
                 <p style={{
                  margin: 0,
                  padding:'3px',
                  fontWeight: 'bold',
                  fontSize: '12px',
                  borderTopLeftRadius:'10px',
                  borderTopRightRadius: '10px',
                  color: '#333',
                  backgroundColor:'#d1d1d1',
                }}>{message.sender}</p>}
                <p style={{ margin: 0, padding:'2px' ,marginLeft:'6px', marginBottom:'2px' }}>
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
