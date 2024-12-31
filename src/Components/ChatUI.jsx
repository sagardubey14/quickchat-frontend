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
  const {username, chatList, setChatList , socketInstance, setSocketInstance} = useContext(UserContext);
  const navigate = useNavigate();
  const [pendingMsg, setPendingMsg] = useState(false);

  const handlePendingMsg = (pendingMsg)=>{
    let updatedChatList = chatList;
    pendingMsg.map(msg=>{
      if(!updatedChatList[msg.sender]){
        updatedChatList[msg.sender]={
          id:Date.now(),
          name:msg.sender,
          messages:msg,
        }
      }else{
        updatedChatList[msg.sender].messages.push(msg)
      }
      return;
    })
    console.log(updatedChatList);
    
  }
  
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

  useEffect(()=>{
    console.log(chatList);
    if(!socketInstance) return
    if(!pendingMsg){
      socketInstance.on(`pending-msg-${username}`,(msg)=>{
        console.log(msg,'pending msg array');
        handlePendingMsg(msg)
        setPendingMsg(true);
      })
    }
    return () => {
      socketInstance.off(`pending-msg-${username}`);
    };
  },[socketInstance])

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
