/* eslint-disable react/no-unescaped-entities */
import axios from 'axios'
import {useState} from 'react'


export const Login = (props) => {
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
            props.onLoginSuccess();
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
    </>
  )
}
