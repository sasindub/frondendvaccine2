import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get('http://127.0.0.1:8080/')
      .then(response => setMessage(response.data.message))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>{message}</h1>
      </header>
    </div>
  );
}

export default App;
