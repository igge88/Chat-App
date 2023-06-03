import { useState } from 'react';
//import { BrowserRouter} from 'react-router-dom'
import './App.css';
import { Login } from '../src/components/Login';
import { Register } from '../src/components/Register';
import ConversationList from '../src/components/ConversationList'
//import { ChatPage } from '../src/components/ChatPage';
//import { Routes, Route, Link, } from 'react-router-dom'

function App() {
    const [currentForm, setCurrentForm] = useState('login');

    const toggleForm = (formName) => {
        setCurrentForm(formName);
    }

    return (
        <>
         <div className="App">
         {
            currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
         }
         <ConversationList />
         </div>

{/*
<Routes>
<Route path="/" element={<Login />} />
<Route path="/register" element={<Register />} />
<Route path="/conversations/:conversation_id/messages" element={<ChatPage />} />
<Route path="/conversations" element={<Register />} />
</Routes>
*/}
</>
    )
}

export default App



/*
import './App.css'
import axios from 'axios'
import {useState, useEffect} from 'react'


function App() {

    const [data, setData] = useState([])
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        axios.get('http://localhost:8800/users')
        .then(response => {
            setData(response.data)
        })
    .catch(() => {
        //handle error
    });
    }, []);

    //Post data
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name] : event.target.value
        })
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8800/users/create-account', formData)
        .then(() => {
            //Handle succes
            setSuccess(true);
        })
        .catch(() => {
            //Handle errors
        })

    }

  return (
    <>
    <div>
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input type="text" name="username" onChange={handleChange} />
            </label>
            <br />
            <label>
                Password:
                <input type="text" name="password" onChange={handleChange} />
            </label>
            <br />
            <button type="submit">Submit</button>
            <div>
                {success && <p>Form is submittted</p>}
            </div>
        </form>

        {data.map(item => (
            <div key={item.id}>
                <p>{item.username}</p>
                </div>
        ))}
    </div>
    </>
  )
}

export default App
*/
