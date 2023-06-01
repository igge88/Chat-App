import { useState } from 'react';

const Chat = () => {
  const [conversations, setConversations] = useState([]);
  const [message, setMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    // Implement the send message functionality here
  };

  return (
    <div className="container">
      <h1>Chat</h1>
      <div className="row">
        <div className="col-4">
          <h3>Conversations</h3>
          <ul className="list-group">
            {conversations.map((conversation) => (
              <li key={conversation.id} className="list-group-item">
                {conversation.participant_username}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-8">
          <h3>Chat Window</h3>
          <div className="card">
            <div className="card-body">
              {/* Chat messages display area */}
            </div>
          </div>
          <form onSubmit={handleSendMessage}>
            <div className="input-group mt-3">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="form-control"
                placeholder="Type a message..."
              />
              <button type="submit" className="btn btn-primary">Send</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
