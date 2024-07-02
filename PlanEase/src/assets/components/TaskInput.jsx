import React, { useState } from 'react';

const TaskInput = ({ addTask }) => {
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [deadline, setDeadline] = useState(getTodayDate()); // Huidige datum als standaardwaarde

  // Functie om de huidige datum te krijgen in het formaat YYYY-MM-DD
  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    // Voeg een 0 toe aan maanden/dagen kleiner dan 10 voor juiste datumnotatie
    if (month < 10) {
      month = '0' + month;
    }
    if (day < 10) {
      day = '0' + day;
    }

    return `${year}-${month}-${day}`;
  }

  // Functie om de maximale datum te krijgen (1 jaar vooruit)
  function getMaxDate() {
    const today = new Date();
    const maxDate = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate());
    const year = maxDate.getFullYear();
    let month = maxDate.getMonth() + 1;
    let day = maxDate.getDate();

    // Voeg een 0 toe aan maanden/dagen kleiner dan 10 voor juiste datumnotatie
    if (month < 10) {
      month = '0' + month;
    }
    if (day < 10) {
      day = '0' + day;
    }

    return `${year}-${month}-${day}`;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && duration && deadline) {
      addTask({ title, duration, deadline, status: 'pending' });
      setTitle('');
      setDuration('');
      setDeadline(getTodayDate()); // Reset de deadline naar de huidige datum
    } else {
      alert('Vul alle velden in: titel, duur en deadline.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Wat moet je doen?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Duur (uren)"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        required
      />
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        min={getTodayDate()} // Stel de minimum datum in op de huidige datum
        max={getMaxDate()} // Stel de maximum datum in op 1 jaar vooruit
        required
      />
      <button type="submit">Toevoegen</button>
    </form>
  );
};

export default TaskInput;
