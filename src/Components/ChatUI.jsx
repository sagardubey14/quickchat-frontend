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
    // console.log(pendingMsg);
    setChatList(prevChatList => {
      const updatedChatList = { ...prevChatList };
    
      pendingMsg.forEach(finalMsg => {
        let { msg, receiver, grpID } = finalMsg;
        if (!receiver) {
          receiver = msg.sender;
          socketInstance.emit('msg-status', {
            msgId: msg.id,
            sender: msg.sender,
            receiver: msg.receiver,
            status: 'delivered'
          });
        }
  
        if (!updatedChatList[receiver]) {
        // console.log(updatedChatList,'inside set 1 with',finalMsg);
          updatedChatList[receiver] = {
            id: grpID? grpID :Date.now(),
            name: msg.sender,
            messages: msg ? [msg] : [],
            isGroup: grpID ? true : false,
          };
        } else {
        // console.log(updatedChatList,'inside set 2 with',finalMsg);
          updatedChatList[receiver] = {
            ...updatedChatList[receiver],
            messages: [...updatedChatList[receiver].messages, msg],
          };
        }
      });
    
      return updatedChatList;
    });
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
        handlePendingMsg(msg)
        setPendingMsg(true);
      })
    }
    return () => {
      socketInstance.off(`pending-msg-${username}`);
    };
  },[socketInstance])

  const handleChatSelect = (chat) => {
    console.log(chat,'selected chat');
    
    setSelectedChat(chat);
    if(!chat)
      setShowRight(true)
  };

  
  useEffect(()=>{
    if(!socketInstance) return
    const messageListener = (finalMsg) => {
      const {msg, receiver, grpID} = finalMsg;
      handleRecieveMsg(msg, receiver, grpID);
      // socketInstance.emit(`msg-received-by-${username}`, 'msg Received');
    };
    const grpListener =(msg)=>{
      if(msg.members.includes(username)){
        handleRecieveMsg(null,msg.name, msg.id);
      }
    }

    socketInstance.on('group-formation', grpListener)
    socketInstance.on(`msg-for-${username}`, messageListener);
    
    socketInstance.on(`msg-status-${username}`, (msg)=>{
      handleStatusUpdate(msg);
    })
    return () => {
      socketInstance.off('group-formation', grpListener)
      socketInstance.off(`msg-for-${username}`, messageListener);
    };
  },[socketInstance])


  function handleStatusUpdate(msgDetail){
    const {msgId, receiver, status} = msgDetail;
    setChatList(prevChatList=>{
      let updatedChatList = {...prevChatList};
      let recieverChat = updatedChatList[receiver];
      updatedChatList[receiver] = {
        ...recieverChat,
        messages: recieverChat.messages.map(msg=>
          msg.id === msgId ? {...msg, status}: msg
        )
      }

      return updatedChatList;
    })
  }

  function handleRecieveMsg(msg, reciever = null, groupId = null){
    // console.log(msg, reciever, groupId);
    
    if(!reciever){
      socketInstance.emit('msg-status',{msgId:msg.id, sender:msg.sender, 'receiver':msg.receiver ,status:'delivered'});
      reciever = msg.sender;
    } 
    setChatList(prevChatList => {
      const updatedChatList = { ...prevChatList };
      // console.log(updatedChatList,'inside set');
      if (!updatedChatList[reciever]) {
        // console.log(updatedChatList,'inside set 1');
          updatedChatList[reciever] = {
              id: groupId ? groupId : Date.now(),
              name: reciever,
              messages: msg==null?[]:[msg],
              isGroup: groupId?true:false,
          };
      } else {
        // console.log(updatedChatList,'inside set 2');
        if(!msg) return updatedChatList;
          updatedChatList[reciever] = {
              ...updatedChatList[reciever],
              messages: [...updatedChatList[reciever].messages, msg],
          };
      }
      return updatedChatList;
    });
    // console.log(chatList);
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
          <ChatList chatList={chatList} handleChatSelect={handleChatSelect} setChatList={setChatList} username={username}/>
        </div>
      

      {/* Right Column */}
      <div className={`rightColoumn${showRight?'':'-hidden' }`}>
        <ChatDisplay 
          selectedChat={selectedChat} 
          setSelectedChat={setSelectedChat} 
          handleRecieveMsg={handleRecieveMsg}
          handleStatusUpdate={handleStatusUpdate} 
          setShowRight={setShowRight}/>
      </div>
    </div>
  );
};

export default ChatUI;
