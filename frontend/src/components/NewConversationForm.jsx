/*
import { useState } from 'react';
import axios from 'axios';

const NewConversationForm = () => {
  const [formData, setFormData] = useState({
    user1_id: '',
    user2_id: '',
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8800/conversations', formData)
      .then((response) => {
        console.log('Conversation created successfully', response.data);
      })
      .catch((error) => {
        console.error('Error creating conversation', error);
      });
  };

  return (
    <div>
      <h2>Create New Conversation</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="user1_id">User 1 ID:</label>
        <input type="text" id="user1_id" name="user1_id" onChange={handleChange} />
        <label htmlFor="user2_id">User 2 ID:</label>
        <input type="text" id="user2_id" name="user2_id" onChange={handleChange} />
        <button type="submit">Create Conversation</button>
      </form>
    </div>
  );
};

export default NewConversationForm;
*/
/*
import { useState } from 'react';
import axios from 'axios';

const NewConversationForm = () => {
  const [user2Id, setUser2Id] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user1Id = localStorage.getItem('userId');
    try {
      const response = await axios.post('http://localhost:8800/conversations', {
        user1_id: user1Id,
        user2_id: user2Id
      });
      console.log('Conversation created:', response.data);
      // Optionally, you can redirect the user to the chat page or perform any other actions
    } catch (error) {
      console.error('Error creating conversation:', error);
    }
  };

  const handleChange = (event) => {
    setUser2Id(event.target.value);
  };

  return (
    <div>
      <h2>Create New Conversation</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="user2_id">User 2 ID:</label>
        <input type="text" id="user2_id" name="user2_id" value={user2Id} onChange={handleChange} />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default NewConversationForm;
*/
import { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, Link } from 'react-router-dom';
import './NewConversationForm.css'
import CloseButton from 'react-bootstrap/CloseButton';




const NewConversationForm = () => {
  const [user2Id, setUser2Id] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const user1Id = localStorage.getItem('userId');
    try {
      const response = await axios.post('http://localhost:8800/conversations', {
        user1_id: user1Id,
        user2_id: user2Id
      });
      console.log('Conversation created:', response.data);
      navigate('/conversations');
    } catch (error) {
      console.error('Error creating conversation:', error);
    }
  };


  const handleChange = (event) => {
    setUser2Id(event.target.value);
  };




  return (
    <div className='newconversationform-page'>
        <div className='newconversationform'>
            <div className='newconversation'>
                <Link className='cancel-button' to='/conversations'>
                <CloseButton/>
                </Link>
                <h2 className='headerLinus'>Chat with a new friend!</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="user2_id">
                        <Form.Label>Put in your friends ID:</Form.Label>
                        <Form.Control type="text" name="user2_id" value={user2Id} onChange={handleChange} />
                    </Form.Group>
                    <Button className='submit-button' variant="primary" type="submit">
                        Create
                    </Button>
                </Form>
            </div>
        </div>
    </div>
  );
};


export default NewConversationForm;
