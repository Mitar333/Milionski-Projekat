import React, { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('https://milionski-projekat.onrender.com/')
      .then(res => res.text())
      .then(data => setMessage(data));
  }, []);

  return (
    <div>
      <h1>Zakazivanje termina kod frizera</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
