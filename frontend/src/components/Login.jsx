/*
import axios from 'axios'
import {useState, useEffect} from 'react'


export const Login = (props) => {

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
        axios.post('http://localhost:8800/users', formData)
        .then(() => {
            //Handle success
            setSuccess(true);
        })
        .catch(() => {
            //Handle errors
        })

    }



  return (
    <>
    <div className='form-container'>
        <h2>Log In</h2>
        <form className='login-form' onSubmit={handleSubmit}>
            <label htmlFor="username">username</label>
            <input type="text" id="username" name="username" onChange={handleChange} />
            <label htmlFor='password'>password</label>
            <input type="password" placeholder="********" id="password" name="password" onChange={handleChange} />
            <button type="submit">Log In</button>
            <div>
                {success && <p>Form is submittted</p>}
            </div>
        </form>
        <button className='link-btn' onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>
    </div>
    </>
  )
}

export default Login
*/
/* eslint-disable react/no-unescaped-entities */
import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

export const Login = (props) => {
  const history = useHistory();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Make the login request
      const response = await axios.post('http://localhost:8800/login', formData);
      // Assuming the server returns a user object in the response
      const user = response.data.user;
      // Redirect to the chat page
      history.push('/chat');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <>
      <div className="form-container">
        <h2>Log In</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" onChange={handleChange} />
          <label htmlFor="password">Password</label>
          <input type="password" placeholder="********" id="password" name="password" onChange={handleChange} />
          <button type="submit">Log In</button>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('register')}>
          Don't have an account? Register here.
        </button>
      </div>
    </>
  );
};

export default Login;
