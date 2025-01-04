import React, { useContext, useEffect, useState } from 'react'
import UserContext from './store/UserContext'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Admin() {
    const {username, setUsername} = useContext(UserContext);
    const [pass, setPass] = useState('');
    const [loading, setLoading] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [selectedOption, setSelectedOption] = useState('all');
    const navigate = useNavigate();

    async function makeGetRequest(){
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/admin`, {
                pass
            });
            console.log(response);
            setIsAdmin(true)
        } catch (error) {
            if (error.response) {
                if(error.response.status === 401){
                    setUsername(null);
                    console.log('Error:', error.response.data.message);
                }
            }else{
                setError('other')
                console.log(error);
            }
        }
        setLoading(false);
    }

    const handleGetData = async (type)=>{        
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/data?which=${type}`);
            console.log(response.data);
        } catch (error) {
            setError('other')
            console.log(error);
        }
        setLoading(false);
    }


    function handlePass(){
        setLoading(true);
        makeGetRequest();
    }
    
    useEffect(()=>{
        if(!username)
            navigate('/'); 
    },[username])

    
    return (
        isAdmin ? 
        (<div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
              backgroundColor: '#f4f6f9',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#fff',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              }}
            >
              <select
                onChange={(e)=>setSelectedOption(e.target.value)}
                value={selectedOption}
                style={{
                  padding: '10px 15px',
                  fontSize: '14px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  backgroundColor: '#fff',
                  marginRight: '10px',
                  outline: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                }}
              >
                <option value="queue">Get Queue</option>
                <option value="group">Get Group</option>
                <option value="users">Get Users</option>
                <option value="all">Get ALL</option>
              </select>
      
              <button
                onClick={()=>handleGetData(selectedOption)}
                style={{
                  padding: '10px 20px',
                  fontSize: '14px',
                  backgroundColor: '#007BFF',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease',
                  outline: 'none',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                }}
              >
                Fetch Data
              </button>
            </div>
          </div>):
          <div style={{
            backgroundColor: '#f4f4f9',
            borderRadius: '10px',
            padding: '20px',
            maxWidth: '400px',
            margin: 'auto',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            fontFamily: 'Arial, sans-serif',
            color: '#333',
            textAlign: 'center', // corrected from 'centre' to 'center'
            justifyContent: 'center', // ensures content is centered vertically
            alignItems: 'center', // ensures content is centered horizontally
            height: '100vh', // full viewport height
          }}>
          
            <h2 style={{
              margin: '0 0 20px 0', // adding margin to separate the text from inputs
              fontSize: '24px',
              color: '#333',
            }}>
              Admin Panel
            </h2>
          
            <span 
             style={{
                padding: '10px',
                fontSize: '14px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                backgroundColor: '#f4f4f9',
                display: 'inline-block',
                width: '100%',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
              }}>
                {import.meta.env.VITE_ADMIN_QUE}
            </span>
          
            <input
                value={pass}
                onChange={(e)=>setPass(e.target.value)}
             style={{
              padding: '10px',
              fontSize: '14px',
              border: '1px solid #ddd',
              borderRadius: '5px',
              outline: 'none',
              transition: 'border-color 0.3s',
              width: '100%', // makes inputs take the full width of the container
              ':focus': {
                borderColor: '#007bff',
              }
            }} />
          
            <button onClick={handlePass} style={{
              padding: '12px',
              backgroundColor: '#007bff',
              color: '#fff',
              fontSize: '16px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
              width: '100%', // makes the button take the full width of the container
              ':hover': {
                backgroundColor: '#0056b3',
              }
            }}>
              {loading ? 'Loading...': 'Submit'}
            </button>
          
            </div>
  )
}

export default Admin
