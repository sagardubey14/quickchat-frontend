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
  const {username} = useContext(UserContext);
  const navigate = useNavigate();
  
  useEffect(()=>{
    if(username === null){
      navigate('/')
    }else{
    const socketInstance = io.connect('http://localhost:3000',{
      query:{
        username,
      }
    })
    console.log(socketInstance);
    }
  },[])

  const chatList = [
    {
      "id": 1,
      "name": "Ragas",
      "messages": [
        {
          "id": 1,
          "text": "Hey",
          "sender": "Sagar",
          "receiver": "Ragas",
          "timeStamp": "7:00",
          "status": "read"
        },
        {
          "id": 2,
          "text": "Hello",
          "sender": "Ragas",
          "receiver": "Sagar",
          "timeStamp": "7:01"
        },
        {
          "id": 3,
          "text": "hahaha",
          "sender": "Sagar",
          "receiver": "Ragas",
          "timeStamp": "7:02",
          "status": "read"
        },
        {
          "id": 4,
          "text": "Bhak",
          "sender": "Ragas",
          "receiver": "Sagar",
          "timeStamp": "7:02"
        },
        {
          "id": 5,
          "text": "hahaha",
          "sender": "Sagar",
          "receiver": "Ragas",
          "timeStamp": "7:04",
          "status": "delivered"
        },
        {
          "id": 6,
          "text": "hahaha",
          "sender": "Sagar",
          "receiver": "Ragas",
          "timeStamp": "7:04",
          "status": "sent"
        },
        {
          "id": 7,
          "text": "How's it going?",
          "sender": "Sagar",
          "receiver": "Ragas",
          "timeStamp": "7:05",
          "status": "delivered"
        },
        {
          "id": 8,
          "text": "All good, you?",
          "sender": "Ragas",
          "receiver": "Sagar",
          "timeStamp": "7:06"
        },
        {
          "id": 9,
          "text": "Busy with work, you know.",
          "sender": "Sagar",
          "receiver": "Ragas",
          "timeStamp": "7:07",
          "status": "read"
        },
        {
          "id": 10,
          "text": "Same here, life’s crazy haha",
          "sender": "Ragas",
          "receiver": "Sagar",
          "timeStamp": "7:08"
        },
        {
          "id": 11,
          "text": "Yeah, it’s never ending.",
          "sender": "Sagar",
          "receiver": "Ragas",
          "timeStamp": "7:09",
          "status": "delivered"
        },
        {
          "id": 12,
          "text": "True, I swear I never get time for myself.",
          "sender": "Ragas",
          "receiver": "Sagar",
          "timeStamp": "7:10"
        },
        {
          "id": 13,
          "text": "I get that, man. We need a vacation.",
          "sender": "Sagar",
          "receiver": "Ragas",
          "timeStamp": "7:11",
          "status": "sent"
        },
        {
          "id": 14,
          "text": "Definitely. Somewhere peaceful, far from work.",
          "sender": "Ragas",
          "receiver": "Sagar",
          "timeStamp": "7:12"
        },
        {
          "id": 15,
          "text": "That would be amazing! Any ideas?",
          "sender": "Sagar",
          "receiver": "Ragas",
          "timeStamp": "7:13",
          "status": "delivered"
        },
        {
          "id": 16,
          "text": "Maybe the mountains? Or a beach?",
          "sender": "Ragas",
          "receiver": "Sagar",
          "timeStamp": "7:14"
        },
        {
          "id": 17,
          "text": "Mountains sound perfect right now!",
          "sender": "Sagar",
          "receiver": "Ragas",
          "timeStamp": "7:15",
          "status": "sent"
        },
        {
          "id": 18,
          "text": "Same! A quiet cabin away from everyone.",
          "sender": "Ragas",
          "receiver": "Sagar",
          "timeStamp": "7:16"
        },
        {
          "id": 19,
          "text": "Haha, just imagine, no work, no noise. Pure bliss.",
          "sender": "Sagar",
          "receiver": "Ragas",
          "timeStamp": "7:17",
          "status": "read"
        },
        {
          "id": 20,
          "text": "Exactly! We should plan something soon.",
          "sender": "Ragas",
          "receiver": "Sagar",
          "timeStamp": "7:18"
        }
      ]
    },    
    { id: 2, name: 'Group 1' },
    { id: 3, name: 'Friend 2' },
    { id: 4, name: 'Group 2' }
  ];

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
    setShowRight(true)
  };

  return (
    <div className='chatUI-div'>

      {
        showStartChat &&
        <div className='StartChats'>
          <StartChat setShowStartChat={setShowStartChat} />
        </div>
      }
      {/* Left Column */}
        <div className={`leftColoumn${showRight?'-hidden':'' }`}>
          <button 
            onClick={()=>setShowStartChat(true)}
            className='startChatBtn'
          >
            + Start Chat {showRight?'1':'0'}
          </button>
          <ChatList chatList={chatList} handleChatSelect={handleChatSelect}/>
        </div>
      

      {/* Right Column */}
      <div className={`rightColoumn${showRight?'':'-hidden' }`}>
        <ChatDisplay selectedChat={selectedChat}  setShowRight={setShowRight}/>
      </div>
    </div>
  );
};

export default ChatUI;
