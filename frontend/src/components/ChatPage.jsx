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
            const response = await axios.get('http://localhost:8800/messages');
            setMessages(response.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const sendMessage = async () => {
        try {
            await axios.post('http://localhost:8800/messages', { content: newMessage });
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
