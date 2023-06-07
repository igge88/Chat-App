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
import { useState, useEffect, useRef} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ChatPage.css';
import { Link, } from 'react-router-dom'

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [userId, setUserId] = useState(null);
  const { conversationId } = useParams(); // Replace '1' with the conversation ID you want to fetch messages from
  const chatContainerRef = useRef(null);

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
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;//
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
    <div className='wrapper'>
        <div className="container">
          <div className="header">
          <Link to= "/conversations"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-caret-left-fill" viewBox="0 2 16 16">
  <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
</svg></Link>
        <h1>Chat</h1>
        </div>
        <div className="chat-container" ref={chatContainerRef}>
          <div className="message-list">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`message ${message.sender_id.toString() === userId ? 'message-right' : 'message-left'}`}
              >
                <div className='message-content'>
                <strong>{message.senderUsername} </strong>
                <br />
                {message.content}
                </div>
              </div>
            ))}
          </div>
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
