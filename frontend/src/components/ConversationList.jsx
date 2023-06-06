import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


const ConversationList = () => {
    const [conversations, setConversations] = useState([]);
    const navigate = useNavigate(); // useNavigate hook from react-router-dom

    useEffect(() => {
        // Fetch the conversations from the server
        const token = localStorage.getItem('token'); // Get the JWT token from localStorage
        console.log(token)

        axios.get('http://localhost:8800/conversations', {
            headers: {
                Authorization: `Bearer ${token}` // Send the JWT token in the request headers
            }
        })
        .then((response) => {
            console.log(response.data)
            setConversations(response.data);
        })
        .catch((error) => {
            console.error('Error fetching conversations', error);
        });
    }, []);

    const handleCreateConversation = () => {
        navigate('/new-conversation-form'); 
      };

return (
    <div>
        <h2>Conversations</h2>
        <ul>
            {conversations.map((conversation) => (
                <li key={conversation.conversation_id}>
                    <Link to={`/chat/${conversation.conversation_id}`}>
                        {conversation.user_username}
                    </Link>
                </li>
            ))}
        </ul>
        <button onClick={handleCreateConversation}>
        Create new Conversation
      </button>
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
