/* eslint-disable react/no-unescaped-entities */
import axios from 'axios'
import {useState} from 'react'
import { Link } from 'react-router-dom';


export const Register = (props) => {
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
        axios.post('http://localhost:8800/register', formData)
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
    <div className='Login-Register-Form'>
    <div className='flex-container'>
        <div className='Hero-text'>
            <p>GoodTalk</p>
        </div>

        <div className='form-container'>
            <h2>Register</h2>
            <form className='register-form' onSubmit={handleSubmit}>
                <label htmlFor="username">Choose a username</label>
                <input type="text" id="username" name="username" onChange={handleChange} />
                <label htmlFor='password'>Choose a password</label>
                <input type="password" placeholder="********" id="password" name="password" onChange={handleChange} />
                <button className='loginButton' type="submit">Register</button>
                <div>
                    {success && <p>Form is submittted</p>}
                </div>
            </form>
            <Link to="/login"><button className='link-btn'>Already have an account? Login here.</button></Link>
        </div>
    </div>
    </div>
    </>
    )
}

export default Register;

 /* return (
        <>
    <div className='form-container'>
        <h2>Register</h2>
        <form className='register-form' onSubmit={handleSubmit}>
            <label htmlFor="username">Choose a username</label>
            <input type="text" id="username" name="username" onChange={handleChange} />
            <label htmlFor='password'>Choose a password</label>
            <input type="password" id="password" name="password" onChange={handleChange} />
            <button type="submit">Register</button>
            <div>
                {success && <p>Form is submittted</p>}
            </div>
        </form>
        {/*<button className='link-btn' onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>*
        <Link to="/login"><button className='link-btn'>Don't have an account? Login here.</button></Link>
    </div>
    </>
    )*/
/* <button className='link-btn' onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button> */
