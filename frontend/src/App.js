import React, { useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  const fetchHelloMessage = async () => {
    try {
      const response = await fetch('/api/hello');
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error('Error fetching message:', error);
      setMessage('Failed to fetch message:', error);
    }
  };

  return (
    <div className="App">
      <h1>Blog App</h1>
      <button onClick={fetchHelloMessage}>Get Hello Message</button>
      <p>{message}</p>
    </div>
  );
}

export default App;
