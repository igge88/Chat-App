import { useEffect, useState } from 'react';
import axios from 'axios';

const ConversationList = () => {
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        // Fetch the conversations from the server
        const token = localStorage.getItem('token'); // Get the JWT token from localStorage

        axios.get('http://localhost:8800/conversations', {
            headers: {
                Authorization: token // Send the JWT token in the request headers
            }
        })
        .then((response) => {
            setConversations(response.data);
        })
        .catch((error) => {
            console.error('Error fetching conversations', error);
        });
    }, []);

    return (
        <div>
            <h2>Conversations</h2>
            <ul>
                {conversations.map((conversation) => (
                    <li key={conversation.conversation_id}>{conversation.user_username}</li>
                ))}
            </ul>
        </div>
    );
};

export default ConversationList;


/* WITHOUT JWT token
import { useEffect, useState } from 'react';
import axios from 'axios';

const ConversationList = () => {
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        // Fetch the conversations from the server
        axios.get('http://localhost:8800/conversations')
        .then((response) => {
            setConversations(response.data);
        })
        .catch((error) => {
            console.error('Error fetching conversations', error);
        });
    }, []);

    return (
        <div>
            <h2>Conversations</h2>
            <ul>
                {conversations.map((conversation) =>(
                    <li key={conversation.conversation_id}>{conversation.user_username}</li>
                ))}
            </ul>
        </div>
    );
};

export default ConversationList
*/
