import { useEffect, useState } from "react";
import "./CSS/Toggle.css";
import "./CSS/StartChat.css";
import axios from "axios";
import useDebounce from "../hooks/useDebounce";

function StartChat({ setShowStartChat }) {
  const [toggle, setToggle] = useState(false);
  const [searchRes, setSearchRes] = useState([]);
  const [groupMem, setGroupMem] = useState([]);
  const [frndName, setFrndName] = useState('');

  const debouncedName = useDebounce(frndName, 1000);
  async function makeGetRequest() {
    try {
      const response = await axios.get(`http://localhost:3000/users?username=${frndName}`);
      console.log(response.data);
      if(response.data.msg){

      }else{
        setSearchRes(response.data.foundUsers);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    if(!debouncedName) return;
    makeGetRequest();
    console.log(debouncedName);

  },[debouncedName])
  
  

  const handleFrndChange = (e)=>{
    const updatedName = e.target.value;
    setFrndName(updatedName);
  }

  const onToggle = (e) => {
    console.log(e.target.value);
    setToggle((prev) => !prev);
    setSearchRes([]);
    setGroupMem([]);
  };

  const selectName = (e) => {
    console.log(e.target.dataset.key + "-" + e.target.innerText);
    if (toggle) {
      setGroupMem((groupMem) => [...groupMem, searchRes[e.target.dataset.key]]);
      console.log(groupMem);
    } else {
      console.log(searchRes[e.target.dataset.key]);
    }
  };

  const createGroup = () => {
    console.log("Group creating API");
    console.log(groupMem);
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
          onChange={(e)=>setFrndName(e.target.value)}
          className="friend-input"
          placeholder="Friend's Name"
        />
        <button id="searchBtn" className="search-button" onClick={()=>makeGetRequest(frndName)}>
          Search
        </button>
      </div>
      <div className="searchResult-container">
        {searchRes.length === 0 ? null : (
          <ul className="search-results" onClick={(e) => selectName(e)}>
            {searchRes.map((user, index) => (
              <li key={index} className="search-item" data-key={index}>
                {user.username}
              </li>
            ))}
          </ul>
        )}
      </div>
      {toggle && (
        <div className="selected-group-container">
          <p className="group-title">Selected Users for Group:</p>
          <div className="group-members">
            {groupMem.map((user, index) => (
              <div key={index} className="group-member" data-key={index}>
                <span className="member-name">{user.username}</span>
                <button
                  className="remove-user-btn"
                  onClick={() => console.log("remove user")}
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
