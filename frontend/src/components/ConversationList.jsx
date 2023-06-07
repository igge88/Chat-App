import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';
import { SlLogout } from 'react-icons/sl';
import './ConversationList.css';


const ConversationList = () => {
const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios
      .get('http://localhost:8800/conversations', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setConversations(response.data);
      })
      .catch((error) => {
        console.error('Error fetching conversations', error);
      });
  }, []);




  return (
    <div className="conversation-page">
      <div className="header-container">
        <div className="header">
        </div>
        <div>
          <Link to="/login" className="logout-button">
            <SlLogout />
          </Link>
        </div>
      </div>
      <div className="conversation-list">
      <h2 className="list-heading">Conversations</h2>

        <ListGroup className="list-group">
          {conversations.map((conversation) => (
            <ListGroup.Item key={conversation.conversation_id} className="list-item">
              {/*<img src={conversation.user_image} alt="User" className="user-image" />*/}
              <Link to={`/chat/${conversation.conversation_id}`} className="link">
                {conversation.user_username}
              </Link>
            </ListGroup.Item>
          ))}
        </ListGroup>
        <div className="add-conversation-wrapper">
          <Link to="/new-conversation-form" className="link-line">
            <button className="add-conversation-button">+</button>
          </Link>
        </div>
      </div>
    </div>
  );

};


export default ConversationList;
