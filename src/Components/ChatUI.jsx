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
    pendingMsg.map(finalMsg=>{
      let {msg, receiver} = finalMsg;
      if(!receiver) receiver = msg.sender;
      console.log(finalMsg, "to receiver");
      if(!updatedChatList[receiver]){
        updatedChatList[receiver]={
          id:Date.now(),
          name:msg.sender,
          messages:msg==null?[]:[msg],
          isGroup: msg==null?true:false,
        }
      }else{
        updatedChatList[receiver].messages.push(msg)
      }
      console.log(updatedChatList,'single');
      return;

    })
    console.log(updatedChatList,'final');
  }
  
  useEffect(()=>{
    if(username === null){
      navigate('/')
    }else{
      if(!socketInstance){
        const socketInst = io.connect(`${import.meta.env.VITE_API_URL}`,{
          query:{
            username,
          }
        })
        setSocketInstance(socketInst)
      }
    }

    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
        setSocketInstance(null);
      }
    };
  },[username])

  useEffect(()=>{
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

  
  useEffect(()=>{
    if(!socketInstance) return
    const messageListener = (finalMsg) => {
      const {msg, receiver} = finalMsg;
      console.log(finalMsg, "to receiver");
      handleRecieveMsg(msg, receiver);
      // socketInstance.emit(`msg-received-by-${username}`, 'msg Received');
    };
    const grpListener =(msg)=>{
      if(msg.members.includes(username)){
        console.log(msg ," grp details recieved by client!!");
        handleRecieveMsg(null,msg.name, msg.id);
      }
    }

    socketInstance.on('group-formation', grpListener)
    socketInstance.on(`msg-for-${username}`, messageListener);
    return () => {
      socketInstance.off('group-formation', grpListener)
      socketInstance.off(`msg-for-${username}`, messageListener);
    };
  },[socketInstance])


  function handleRecieveMsg(msg, reciever = null, groupId = null){
    console.log(msg,reciever, groupId);
    
    if(!reciever) reciever = msg.sender;
    setChatList(prevChatList => {
      const updatedChatList = { ...prevChatList };

      if (!updatedChatList[reciever]) {
        console.log('first');
        
          updatedChatList[reciever] = {
              id: groupId ? groupId : Date.now(),
              name: reciever,
              messages: msg==null?[]:[msg],
              isGroup: msg==null?true:false,
          };
      } else {
        console.log('second');
        if(!msg) return updatedChatList;
          updatedChatList[reciever] = {
              ...updatedChatList[reciever],
              messages: [...updatedChatList[reciever].messages, msg],
          };
      }

      return updatedChatList;
    });
  }

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem('username', username);
      localStorage.setItem('myChat', JSON.stringify(chatList));
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [username, chatList]);

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
        <ChatDisplay selectedChat={selectedChat} setSelectedChat={setSelectedChat} handleRecieveMsg={handleRecieveMsg} setShowRight={setShowRight}/>
      </div>
    </div>
  );
};

export default ChatUI;
