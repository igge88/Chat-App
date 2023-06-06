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
