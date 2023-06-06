/* eslint-disable react-hooks/exhaustive-deps */
/* WHITOUT useParams
import { useState, useEffect } from 'react'
import axios from 'axios'

const ChatPage = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState([]);

    useEffect(() => {
        // Fetch messages when the component mounts
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await axios.get('http://localhost:8800/messages',);
            setMessages(response.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const sendMessage = async () => {
        try {
            await axios.post('http://localhost:8800/messages', );
            setNewMessage('');
            // Optionally, fetch messages again to update the message list
            fetchMessages();
        } catch (error) {
            console.error('Error sending message', error);
        }
    };

    return (
        <div>
            <h1>Chat Page</h1>
            <div>
                <h2>Messages</h2>
                <ul>
                    {messages.map((message) => (
                        <li key={message.id}>{message.content}</li>
                    ))}
                </ul>
            </div>
            <div>
                <h2>Send Message</h2>
                <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default ChatPage
*/

/* Variant 1
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { conversationId } = useParams();

  useEffect(() => {
    fetchMessages();
  }, []); // Re-fetch messages when the conversation ID changes

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`http://localhost:8800/messages/${conversationId}`);
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async () => {
    try {
      await axios.post('http://localhost:8800/messages', {
        conversation_id: conversationId,
        content: newMessage,
      });
      setNewMessage('');
      fetchMessages(); // Fetch messages again to update the message list
    } catch (error) {
      console.error('Error sending message', error);
    }
  };

  return (
    <div>
      <h1>Chat Page</h1>
      <div>
        <h2>Messages</h2>
        <ul>
          {messages.map((message) => (
            <li key={message.id}>{message.content}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Send Message</h2>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatPage;
*/

/* VARIANT 2
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { conversationId } = useParams();

  useEffect(() => {
    // Fetch messages for the specific conversation when the component mounts
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`http://localhost:8800/messages?conversation_id=${conversationId}`);
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async () => {
    try {
      await axios.post('http://localhost:8800/messages', {
        conversation_id: conversationId,
        sender_id: localStorage.getItem('userId'),
        content: newMessage
      });
      setNewMessage('');
      // Optionally, fetch messages again to update the message list
      fetchMessages();
    } catch (error) {
      console.error('Error sending message', error);
    }
  };

  return (
    <div>
      <h1>Chat Page</h1>
      <div>
        <h2>Messages</h2>
        <ul>
          {messages.map((message) => (
            <li key={message.id}>{message.content}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Send Message</h2>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatPage;
*/

// VARIANT Oscars
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ChatPage.css';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [userId, setUserId] = useState(null);
  const { conversationId } = useParams(); // Replace '1' with the conversation ID you want to fetch messages from

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUserId = localStorage.getItem('userId');
    console.log(storedUserId);

    if (storedUserId) {
      setUserId(storedUserId);
      fetchConversation();
    }

  }, []);

  const fetchConversation = async () => {

    try {
      const response = await axios.get(`http://localhost:8800/messages/${conversationId}`);
      const messagePromises = response.data.messages.map((message) => {

        return axios.get(`http://localhost:8800/users/${message.sender_id}`).then((userResponse) => {
          const senderUsername = userResponse.data.username;
          return { ...message, senderUsername };
        });
      });

      Promise.all(messagePromises)
        .then((messagesWithUsername) => {
          setMessages(messagesWithUsername);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error('Error fetching conversation:', error);
    }
  };

  const sendMessage = () => {
    axios
      .post('http://localhost:8800/messages', {
        content: newMessage,
        sender_id: userId,
        conversation_id: conversationId,
      })
      .then((response) => {
        const newMessage = response.data.message;
        const senderUsername = response.data.username;
        const messageWithUsername = { ...newMessage, senderUsername };
        setMessages((prevMessages) => [...prevMessages, messageWithUsername]);
        setNewMessage('');
        fetchConversation();
      })
      .catch((error) => {
        console.error('Error sending message', error);
      });
  };

  return (
    /*
    <div className='container'>
      <h1>Chat Page</h1>
      <div className='message-list'>
        {messages.map((message) => (
          <div key={message.id}>
            <strong>{message.senderUsername}: </strong>
            {message.content}
          </div>
        ))}
      </div>
      <div className='input-group mb-3'>
      <input
        type="text"
        className='form-control'
        placeholder="Type your message..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button className='btn btn_primary' onClick={sendMessage}>Send</button>
    </div>
    </div>
    */
   
    <div className="container">
    <h1>Chat Page</h1>
    <div className="chat-container">
      <div className="message-list">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.sender_id === userId ? 'message-right' : 'message-left'}`}
          >
            <strong>{message.senderUsername}: </strong>
            {message.content}
          </div>
        ))}
      </div>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button className="btn btn-primary" onClick={sendMessage}>Send</button>
      </div>
    </div>
  </div>
  );
};


export default ChatPage;
