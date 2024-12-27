import { useState } from "react";
import "./CSS/Toggle.css";
import "./CSS/StartChat.css";

function StartChat({setShowStartChat}) {
  const [toggle, setToggle] = useState(false);
  const [searchRes, setSearchRes] = useState([]);
  const [groupMem, setGroupMem] = useState([]);

  const onToggle = (e) => {
    console.log(e.target.value);
    setToggle((prev) => !prev);
    setSearchRes([]);
    setGroupMem([]);
  };

  const searchName = () => {
    setSearchRes(["abcasasha", "dfe", "ghi", "abc", "dfe", "ghi"]);
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
      <div className="switch-main" >
        <label className="switch">
          <input type="checkbox" checked={toggle} onChange={onToggle} />
          <span className="slider round"></span>
        </label>{" "}
        <span style={{ marginLeft: "10px", marginBottom:'5px'} }>Group chats?</span>
        <button
          className="close-start-chat"
          style={{height:'2px', width:'5px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', backgroundColor:'red', marginLeft:'auto', marginBottom:'10px', marginRight:'5px'}}
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
          className="friend-input"
          placeholder="Friend's Name"
        />
        <button id="searchBtn" className="search-button" onClick={searchName}>
          Search
        </button>
      </div>
      <div className="searchResult-container">
        {searchRes.length === 0 ? null : (
          <ul className="search-results" onClick={(e) => selectName(e)}>
            {searchRes.map((name, index) => (
              <li key={index} className="search-item" data-key={index}>
                {name}
              </li>
            ))}
          </ul>
        )}
      </div>
      {toggle && (
        <div className="selected-group-container">
          <p className="group-title">Selected Users for Group:</p>
          <div className="group-members">
            {groupMem.map((name, index) => (
              <div key={index} className="group-member" data-key={index}>
                <span className="member-name">{name}</span>
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
