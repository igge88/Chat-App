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
        FirstName: '',
        LastName: '',
        Email: '',
        Password: '',
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
                FirstName:
                <input type="text" name="FirstName" onChange={handleChange} />
            </label>
            <br />
            <label>
                LastName:
                <input type="text" name="LastName" onChange={handleChange} />
            </label>
            <br />
            <label>
                Email:
                <input type="text" name="Email" onChange={handleChange} />
            </label>
            <br />
            <label>
                Password:
                <input type="text" name="Password" onChange={handleChange} />
            </label>
            <br />
            <button type="submit">Submit</button>
            <div>
                {success && <p>Form is submittted</p>}
            </div>
        </form>

        {data.map(item => (
            <div key={item.id}>
                <p>{item.firstname} {item.lastname}</p>
                </div>
        ))}
    </div>
    </>
  )
}

export default App
