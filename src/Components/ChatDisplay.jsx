import React, { useCallback, useContext, useEffect, useState } from 'react'
import './CSS/ScrollBar.css'
import UserContext from './store/UserContext';
import read from '../assets/read.png'
import delievered from '../assets/delievered.png'
import sent from '../assets/sent.png'
import typingImage from '../assets/typing.gif'

function ChatDisplay({selectedChat, setSelectedChat, setShowRight, handleRecieveMsg}) {
  const [status , setStatus] = useState(null);
  const [typing, setTyping] = useState(false);
  
  const {username, chatList , setChatList, socketInstance, setSocketInstance} = useContext(UserContext);
  const [text, setText] = useState('');

  useEffect(()=>{
    if(!socketInstance) return;
    if(!selectedChat) return;
    if(chatList[selectedChat].isGroup) return;
    let id;
    const handleTypingStatus = (value)=>{
      setTyping(value);
      if(id) clearTimeout(id);
      id = setTimeout(() => {
        setTyping(false)
      }, 1000);
    }
    socketInstance.emit('user-status',selectedChat, (st) => {
      if(st.status === 'online'){
        setStatus('Online');
      }else{
        let time = getFormattedTime(st.time);
        setStatus(`last seen at ${time}`);
      }
    });
    socketInstance.on(`user-typing-at-${username}`,handleTypingStatus)
    const userStatusId = setInterval(() => {
      socketInstance.emit('user-status',selectedChat, (st) => {
        if(st.status === 'online'){
          setStatus('Online');
        }else{
          let time = getFormattedTime(st.time);
          setStatus(`last seen at ${time}`);
        }
      });
    }, 10000);

    return (()=>{
      clearInterval(userStatusId);
      socketInstance.off(`user-typing-at-${username}`,handleTypingStatus)
      console.log('unmount');
    })
  },[socketInstance, selectedChat, username])

  const handleMessageStatusUpdate = useCallback(
    (msgDetail) => {
      const { msgId, receiver, status } = msgDetail;
      setChatList((prevChatList) => {
        let updatedChatList = { ...prevChatList };
        let recieverChat = updatedChatList[receiver];
        updatedChatList[receiver] = {
          ...recieverChat,
          messages: recieverChat.messages.map((msg) =>
            msg.id === msgId ? { ...msg, status } : msg
          ),
        };
        return updatedChatList;
      });
    },
    [setChatList]
  );

  function getFormattedTime(time = null) {
    const now = time?new Date(time):new Date(Date.now());
    // console.log(now);
    
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const formattedTime = `${hours}:${minutes.toString().padStart(2, '0')}`;
    return formattedTime;
  }

  function sendReadStatus(msgId, status){
    if(status === 'sent'){
      handleMessageStatusUpdate({msgId, 'receiver':selectedChat, 'status':'read'})
    }
    if(!chatList[selectedChat].isGroup){
      if(status !== 'read'){
        socketInstance.emit('msg-status',{msgId, sender:selectedChat, 'receiver':username ,status:'read'});
      }
    }
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
    handleRecieveMsg(msg, selectedChat);
    setText("");
    let grpDetail = {};
    if(chatList[selectedChat].isGroup){
      grpDetail = {
      isGroup: true,
      grpID:  chatList[selectedChat].id,
      }
    }
    socketInstance.emit(`chat-message`,{msg, grpDetail});
  }

  const handleInputChange =(e)=>{
    e.preventDefault();
    setText(e.target.value)
    if(socketInstance){
      if(status === 'Online')
        socketInstance.emit('chat-message',{typing:true, chat:selectedChat});
    }
  }

  return (
    <div style={{ flex: 1, backgroundColor: '#fff', padding: '20px', flexDirection:'column'  }}>
    {
      selectedChat ? (
      <div style={{height:'95%'}}>
        <div style={{display:'flex'}}>
        <button onClick={()=>{setShowRight(false); setSelectedChat(null)}} className='backButton' >{'<-'}</button>
        <h2>{chatList[selectedChat].name}</h2>
        </div>
        {!chatList[selectedChat].isGroup && <h3>{status}</h3>}
        {/* Chat Messages */}
        <div className='scrollable-container' >
          {
            chatList[selectedChat].messages.length === 0 ? <h2>No message Start the chat</h2> :
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
                  paddingRight: message.sender === username ? '0' : chatList[selectedChat].isGroup? '0px':'10px',
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
                          return <img src={delievered} style={{ marginRight: '5px', height:'16px', marginLeft:'5px', color: 'blue' }}/>;
                        case 'read':
                          return <img src={read} style={{ marginRight: '5px', height:'18px', marginLeft:'5px', color: 'blue' }} />;
                        case 'sent':
                          return <img src={sent} style={{ marginRight: '5px', height:'16px', marginLeft:'5px', color: 'gray' }} />;
                        default:
                          return null;
                      }
                    })():sendReadStatus(message.id,message.status)
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
    {typing && <img style={{height:'30px'}} src={typingImage} />}
     {selectedChat && 
     <div className='inputSend'>
     <input style={{width:'100%'}} value={text} onChange={handleInputChange}/>
     <button className='sendBtn' onClick={handleSend}>↗️</button>
     </div>
     }
     
     
  </div>
  
  )
}

export default ChatDisplay
