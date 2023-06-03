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
