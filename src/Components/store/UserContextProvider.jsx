import {useState} from 'react'
import UserContext from './userContext'

function UserContextProvider({children}) {
    const [username, setUsername] = useState(null);
  return (
    <UserContext.Provider value={{username, setUsername}}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
