import {useState} from 'react'
import UserContext from './userContext'

function UserContextProvider({children}) {
    const [username, setUsername] = useState(()=>{
      return localStorage.getItem('username') || null;
    });
    const [chatList, setChatList] = useState(()=>{
        return JSON.parse(localStorage.getItem('myChat')) || {};
    });
    const [socketInstance, setSocketInstance] = useState(null)
  return (
    <UserContext.Provider value={{username, setUsername, chatList, setChatList, socketInstance, setSocketInstance}}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
