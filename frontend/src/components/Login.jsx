/* eslint-disable react/no-unescaped-entities */
// WITH JWT token
import axios from 'axios';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css'

export const Login = (props) => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  //Post data
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8800/login', formData)
      .then((response) => {
        const { user, token } = response.data;

        // Store user ID and token in local storage
        localStorage.setItem('userId', user.user_id);
        localStorage.setItem('token', token);

        //Handle success
        setSuccess(true);
        navigate('/conversations'); // Redirect the user to the ConversationList component
      })
      .catch(() => {
        //Handle errors
      });
  };

  return (
    <>
      {/* <div className="form-container">
        <h2>Log In</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" onChange={handleChange} />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" onChange={handleChange} />
          <button type="submit">Log In</button>
          <div>{success && <p>Form is submitted</p>}</div>
        </form>
        /*<button className="link-btn" onClick={() => props.onFormSwitch('register') </button>}>*
        <Link to="/register"><button className='link-btn'>Don't have an account? Register here.</button></Link>
      </div>
          </>
  );
};*/}

<div className='Login-Register-Form'>
    <div className='flex-container'>
        <div className='Hero-text'>
            <p>GoodTalk</p>
        </div>
            <div className='form-container'>
            <h2>Log In</h2>
            <form className='login-form' onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" onChange={handleChange} />
                <label htmlFor='password'>Password</label>
                <input type="password" placeholder="********" id="password" name="password" onChange={handleChange} />
                <button className="loginButton" type="submit">Log In</button>
                    <div>
                        {success && <p>Form is submittted</p>}
                    </div>
            </form>
            <Link to="/register"><button className='link-btn'>Don't have an account? Register here.</button></Link>
        </div>
    </div>
</div>
</>
)
}

export default Login;


/* <button className='link-btn' onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>*/
/*WITHOUT JWT token
import axios from 'axios'
import {useState} from 'react'
import { useNavigate, Link } from 'react-router-dom';


export const Login = (props) => {
    const navigate = useNavigate();
    const [success, setSuccess] = useState(false)

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
        axios.post('http://localhost:8800/login', formData)
        .then(() => {
            //Handle success
            setSuccess(true);
            // Redirect the user to the ConversationList component
        navigate('/conversations');
        })
        .catch(() => {
            //Handle errors
        })

    }

  return (
    <>
    {/*}
    <div className='form-container'>
        <h2>Log In</h2>
        <form className='login-form' onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" onChange={handleChange} />
            <label htmlFor='password'>Password</label>
            <input type="password" id="password" name="password" onChange={handleChange} />
            <button type="submit">Log In</button>
            <div>
                {success && <p>Form is submitted</p>}
            </div>
        </form>
        <button className='link-btn' onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>
    </div>
    *Avsluta kommentar här
    <div className='App'>

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

    <Link to="/register"><button className='link-btn'>Don't have an account? Register here.</button></Link>

</div>

{/* <button className='link-btn' onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>

</div>
    </>
  )
}

export default Login
*/
