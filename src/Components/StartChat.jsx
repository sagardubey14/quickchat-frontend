import { useState } from "react";
import "./CSS/Toggle.css";
// import "./CSS/StartChat.css";

function StartChat() {
  const [toggle, setToggle] = useState(false);
  const [searchRes, setSearchRes] = useState([]);
  const [groupMem, setGroupMem] = useState([]);

  const onToggle = (e) => {
    console.log(e.target.value);
    setToggle((prev) => !prev);
  };

  const searchName = () => {
    setSearchRes(["abc", "dfe", "ghi"]);
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
    <div>
      <div>
        <label className="switch">
          <input type="checkbox" checked={toggle} onChange={onToggle} />
          <span className="slider round"></span>
        </label>{" "}
        Group chats?
      </div>
      {toggle && (
        <>
          <label htmlFor="groupName">Group Name</label>
          <input type="text" id="grpName" placeholder="Enter your group name" />
        </>
      )}
      <input type="text" placeholder="Friend's Name" />
      {searchRes.length === 0 ? null : (
        <ul onClick={(e) => selectName(e)}>
          {searchRes.map((name, index) => (
            <li key={index} data-key={index}>
              {name}
            </li>
          ))}
        </ul>
      )}
      <button onClick={searchName}>Search</button>

      {toggle && (
        <div>
          Selected Users for Group:
          {groupMem.map((name, index) => (
            <div key={index} data-key={index}>
              {name}{" "}
              <button onClick={() => console.log("remove user")}>X</button>
            </div>
          ))}
          <button onClick={createGroup}>Create Group</button>
        </div>
      )}
    </div>
  );
}

export default StartChat;
