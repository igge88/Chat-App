//import { useState } from 'react';
//import { BrowserRouter} from 'react-router-dom'
import './App.css';
import Login from '../src/components/Login';
import Register from '../src/components/Register';
import ConversationList from '../src/components/ConversationList'
import ChatPage from '../src/components/ChatPage';
import NewConversationForm from './components/NewConversationForm';
import { Routes, Route, } from 'react-router-dom'

function App() {
    /*
    const [currentForm, setCurrentForm] = useState('login');

    const toggleForm = (formName) => {
        setCurrentForm(formName);

          {
            currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
          }*/

    return (
        <>
        {/*
         <div>

            <Link to= "/login"> Go to Login </Link>
            <br />
            <Link to= "/register"> Go to Register </Link>
            <br />
            <Link to= "/conversations"> Go to Conversations </Link>
            <br />
            <Link to= "/messages"> Go to ChatPage </Link>
            <br />
            <Link to= "/new-conversation-form"> Got to New Conversation Form </Link>
         </div>
    */}
         <Routes>
         <Route path="/" element={<Login />} />
         <Route path="/login" element={<Login />} />
         <Route path="/register" element={<Register />} />
         <Route path="/conversations" element={<ConversationList />} />
         <Route path="/chat/:conversationId" element={<ChatPage />} />
         <Route path="/new-conversation-form" element={<NewConversationForm />} />
         </Routes>

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
