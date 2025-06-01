import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function Chat() {
  const [searchParams] = useSearchParams();
  const rideId = searchParams.get('rideId');
  const from = searchParams.get('from');
  const to = searchParams.get('to');
  const poster = searchParams.get('poster');

  const [messages, setMessages] = useState([
    { sender: poster, text: 'Hey! Welcome to the ride 🚗' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (newMessage.trim() === '') return;

    setMessages([...messages, { sender: 'You', text: newMessage }]);
    setNewMessage('');
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>Chat Room</h2>
        <p><strong>Ride ID:</strong> {rideId}</p>
        <p><strong>From:</strong> {from} <strong>To:</strong> {to}</p>
        <p><strong>Posted By:</strong> {poster}</p>
      </div>

      <div style={styles.chatBox}>
        {messages.map((msg, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
        <div style={{ display: 'flex', marginTop: '20px' }}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            style={styles.input}
          />
          <button onClick={sendMessage} style={styles.sendButton}>Send</button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '40px auto',
    padding: '20px',
    fontFamily: 'Segoe UI, sans-serif',
  },
  header: {
    backgroundColor: '#ffe4e1', // soft green header
    padding: '20px',
    borderRadius: '10px',
    marginBottom: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    borderLeft: '6px solid #28a745',
  },
  chatBox: {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
    borderLeft: '6px solid #28a745',
    transition: 'transform 0.2s ease-in-out',
  },
  input: {
    flex: 1,
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    marginRight: '10px',
  },
  sendButton: {
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};

export default Chat;
