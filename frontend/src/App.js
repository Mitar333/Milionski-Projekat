import React, { useState, useEffect } from 'react';
import './styles.css';

function App() {
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState({ name: '', date: '' });

  useEffect(() => {
    fetch('http://localhost:5000/api/appointments')
      .then(res => res.json())
      .then(data => setAppointments(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    setAppointments([...appointments, data]);
    setForm({ name: '', date: '' });
  };

  return (
    <div className="app">
      <h1>Zakazivanje termina</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ime"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="datetime-local"
          value={form.date}
          onChange={e => setForm({ ...form, date: e.target.value })}
          required
        />
        <button type="submit">Zakaži</button>
      </form>
      <ul>
        {appointments.map((appt, index) => (
          <li key={index}>{appt.name} - {new Date(appt.date).toLocaleString()}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
