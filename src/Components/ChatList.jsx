import React, { useContext, useState } from 'react'
import unread from '../assets/unread.png'
import menu from '../assets/menu.png'
import './CSS/ChatList.css'
import axios from 'axios'


function ChatList({chatList, handleChatSelect, setChatList, username}) {
  
  const keys = Object.keys(chatList);
  const [showMenu, setShowMenu] = useState(false);
  

  async function makeDeleteRequest(groupName) {

    try {
      const res = await axios.delete(`${import.meta.env.VITE_API_URL}/groups/${groupName}/users/${username}`)
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  const handleClearChat = (key)=>{
    setChatList(prevChatList=>{
      let updatedChatList = {...prevChatList};
      updatedChatList[key] = {
        ...updatedChatList[key],
        messages:[],
      }
      return updatedChatList;
    })
    setShowMenu(null)
  }
  const handleDeleteChat = (key)=>{
    handleChatSelect(null)
    if(chatList[key].isGroup)
      makeDeleteRequest(chatList[key].id);
      setChatList(prevChatList=>{
        let updatedChatList = {...prevChatList};
        delete updatedChatList[key];
        return updatedChatList;
      })
      setShowMenu(null)
  }
  return (
    <div style={{ padding: '10px' }}>
          {keys.map(chatKey =>{
            const chat = chatList[chatKey];
            const lastMessage = chat.messages[chat.messages.length - 1];
            const showStar = lastMessage?.sender === chatKey && lastMessage?.status === 'sent';
            return (
              <div
                key={chatKey}
                className="chat-item"
              >
                <span onClick={() => handleChatSelect(chatKey)} >{chatKey}</span> {chat.isGroup ? null : showStar ? <img style={{height:'10px'}} src={unread} /> : null}
                <img onClick={()=>setShowMenu(chatKey)} style={{height:'20px', marginLeft:'auto'}} src={menu} />
                {showMenu === chatKey && (
                <div
                  className="chat-item__options"
                >
                  <h4 className="chat-item__options-header">Options <span onClick={()=>setShowMenu(null)} className="close">{'<'}</span></h4>
                  <button onClick={()=>handleClearChat(chatKey)} className="chat-item__button">
                    Clear Chat
                  </button>
                  <button onClick={()=>handleDeleteChat(chatKey)} className="chat-item__button">
                    {chatList[chatKey].isGroup ?'Leave Group':'Remove Chat'}
                  </button>
                </div>
              )}
              </div>
            )
          })}
        </div>
  )
}

export default ChatList
