/* eslint-disable react/no-unescaped-entities */
import axios from 'axios'
import {useState, useEffect} from 'react'


export const Register = (props) => {
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
        <h2>Register</h2>
        <form className='register-form' onSubmit={handleSubmit}>
            <label htmlFor="username">username of choice</label>
            <input type="text" id="username" name="username" onChange={handleChange} />
            <label htmlFor='password'>password</label>
            <input type="password" placeholder="********" id="password" name="password" onChange={handleChange} />
            <button type="submit">Register</button>
            <div>
                {success && <p>Form is submittted</p>}
            </div>
        </form>
        <button className='link-btn' onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
    </div>
    </>
    )
}
