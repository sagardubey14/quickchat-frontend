import React, { useContext, useEffect, useState } from 'react';
import StartChat from './StartChat';
import ChatList from './ChatList';
import './CSS/ChatUI.css'
import ChatDisplay from './ChatDisplay';
import { io } from 'socket.io-client';
import UserContext from './store/UserContext'
import { useNavigate } from 'react-router-dom';

const ChatUI = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [showStartChat, setShowStartChat] = useState(false);
  const [showRight, setShowRight] = useState(false);
  const {username, setUsername, chatList , socketInstance, setSocketInstance} = useContext(UserContext);
  const navigate = useNavigate();
  
  useEffect(()=>{
    if(username === null){
      navigate('/')
    }else{
      if(!socketInstance){
        const socketInst = io.connect('http://localhost:3000',{
          query:{
            username,
          }
        })
        setSocketInstance(socketInst)
        console.log(socketInstance); 
      }
    }
  },[username])


  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
    setShowRight(true)
  };

  return (
    <div className='chatUI-div'>

      {
        showStartChat &&
        <div className='StartChats'>
          <StartChat setShowStartChat={setShowStartChat} handleChatSelect={handleChatSelect} />
        </div>
      }
      {/* Left Column */}
        <div className={`leftColoumn${showRight?'-hidden':'' }`}>
          <button 
            onClick={()=>setShowStartChat(true)}
            className='startChatBtn'
          >
            + Start Chat {username}
          </button>
          <ChatList chatList={chatList} handleChatSelect={handleChatSelect}/>
        </div>
      

      {/* Right Column */}
      <div className={`rightColoumn${showRight?'':'-hidden' }`}>
        <ChatDisplay selectedChat={selectedChat} setSelectedChat={setSelectedChat} setShowRight={setShowRight}/>
      </div>
    </div>
  );
};

export default ChatUI;
