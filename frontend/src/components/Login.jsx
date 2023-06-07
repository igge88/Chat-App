/* eslint-disable react/no-unescaped-entities */
// WITH JWT token
import axios from 'axios';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css'

export const Login = () => {
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
