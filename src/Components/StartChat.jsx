import { useContext, useEffect, useState } from "react";
import "./CSS/Toggle.css";
import "./CSS/StartChat.css";
import axios from "axios";
import useDebounce from "../hooks/useDebounce";
import UserContext from './store/UserContext'

function StartChat({ setShowStartChat, handleChatSelect }) {
  const [toggle, setToggle] = useState(false);
  const [searchRes, setSearchRes] = useState([]);
  const [noUsers, setNoUsers] = useState(false);
  const [groupMem, setGroupMem] = useState([]);
  const [frndName, setFrndName] = useState('');
  const {username, chatList , setChatList, socketInstance} = useContext(UserContext);
  const [grpName, setGrpName] = useState('');

  const debouncedName = useDebounce(frndName, 1000);
  async function makeGetRequest() {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/users?username=${frndName}`);
      // 
      if(response.data.msg){
        setNoUsers(true);
      }else{
        setNoUsers(false);
        setSearchRes(response.data.foundUsers);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    if(!debouncedName) return;
    makeGetRequest();

  },[debouncedName])

  const onToggle = (e) => {
    setToggle((prev) => !prev);
    setSearchRes([]);
    setGroupMem([username]);
  };

  const handleRemoveMem = (user)=>{
    setGroupMem(prevGroupMem => prevGroupMem.filter(uName=> uName!== user));
  }

  const selectName = (e) => {
    if (toggle) {
      if(!groupMem.includes(searchRes[e.target.dataset.key]))
        setGroupMem((groupMem) => [...groupMem, searchRes[e.target.dataset.key]]);
    } else {
      let name = searchRes[e.target.dataset.key];

      const keys = Object.keys(chatList);
      if(!keys.includes(name)){
        setChatList(prevChatList =>{
          return {
            ...prevChatList,
            [`${name}`]:{
              id:Date.now(),
              name:name,
              messages:[],
              isGroup:false,
            }
          }
        })
      }
      handleChatSelect(name)      
      setShowStartChat(false)
    }
  };


  const createGroup = () => {
    if(grpName === '') return;
    const grpDetail = {
      id:Date.now(),
      name: grpName,
      members:groupMem,
      admin:username,
    }
    socketInstance.emit('grp-formation',grpDetail);
    setChatList(prevChatList =>{
      return {
        ...prevChatList,
        [`${grpDetail.name}`]:{
          id:grpDetail.id,
          name:grpDetail.name,
          messages:[],
          isGroup:true,
        }
      }
    })
    handleChatSelect(grpDetail.name);   
    setShowStartChat(false);
  };

  return (
    <div className="main-div">
      <div className="switch-main">
        <label className="switch">
          <input type="checkbox" checked={toggle} onChange={onToggle} />
          <span className="slider round"></span>
        </label>{" "}
        <span style={{ marginLeft: "10px", marginBottom: "5px" }}>
          Group chats?
        </span>
        <button
          className="close-start-chat"
          style={{
            height: "2px",
            width: "5px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "red",
            marginLeft: "auto",
            marginBottom: "10px",
            marginRight: "5px",
          }}
          onClick={() => setShowStartChat(false)}
        >
          <span className="close-icon">x</span>
        </button>
      </div>
      {toggle && (
        <div className="group-container">
          <label htmlFor="group-label" className="group-Name">
            Group Name
          </label>
          <input
            type="text"
            id="grpName"
            value={grpName}
            onChange={(e)=>setGrpName(e.target.value)}
            className="group-input"
            placeholder="Enter your group name"
          />
        </div>
      )}
      <div className="search-container">
        <input
          type="text"
          id="friendName"
          value={frndName}
          onChange={(e)=>{setFrndName(e.target.value.toLowerCase())}}
          className="friend-input"
          placeholder="Friend's Name"
        />
        <button id="searchBtn" className="search-button" onClick={()=>makeGetRequest(frndName)}>
          Search
        </button>
      </div>
      {noUsers?<div className="searchResult-container">No users found as {frndName}</div>:<div className="searchResult-container">
        {searchRes.length === 0 ? null : (
          <ul className="search-results" onClick={(e) => selectName(e)}>
            {searchRes.map((user, index) => (
              <li key={index} className="search-item" data-key={index}>
                {user}
              </li>
            ))}
          </ul>
        )}
      </div>}
      {toggle && (
        <div className="selected-group-container">
          <p className="group-title">Selected Users for Group:</p>
          <div className="group-members">
            {(groupMem.length >0) &&
            groupMem.map((user, index) => (
              <div key={index} className="group-member" data-key={index}>
                <span className="member-name">{user}</span>
                <button
                  style={{display:`${user === username?'none':'block'}`}}
                  className="remove-user-btn"
                  onClick={()=>handleRemoveMem(user)}
                >
                  <span className="remove-icon">X</span>
                </button>
              </div>
            ))}
          </div>
          <button
            id="createGroupBtn"
            className="create-group-btn"
            onClick={createGroup}
          >
            Create Group
          </button>
        </div>
      )}
    </div>
  );
}

export default StartChat;
