import {useState} from 'react'
import UserContext from './userContext'
import chat from './basicData';

function UserContextProvider({children}) {
    const [username, setUsername] = useState('admin_paul_walker');
    const [chatList, setChatList] = useState(chat);
    const [socketInstance, setSocketInstance] = useState(null)
  return (
    <UserContext.Provider value={{username, setUsername, chatList, setChatList, socketInstance, setSocketInstance}}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
