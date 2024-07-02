import React, { useState } from 'react';

const TaskInput = ({ addTask }) => {
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [deadline, setDeadline] = useState(getTodayDate());
  const [priority, setPriority] = useState('medium');
  const [category, setCategory] = useState('personal');

  function getTodayDate() {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  function getMaxDate() {
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);
    return maxDate.toISOString().split('T')[0];
  }

  const isValidDeadline = (date) => {
    return new Date(date) >= new Date(getTodayDate());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && duration && deadline && isValidDeadline(deadline)) {
      addTask({ title, duration, deadline, priority, category, status: 'pending' });
      setTitle('');
      setDuration('');
      setDeadline(getTodayDate());
      setPriority('medium');
      setCategory('personal');
    } else {
      alert('Vul alle velden correct in. De deadline mag niet in het verleden liggen.');
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
        min={getTodayDate()}
        max={getMaxDate()}
        required
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="high">Hoog</option>
        <option value="medium">Gemiddeld</option>
        <option value="low">Laag</option>
      </select>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="personal">Persoonlijk</option>
        <option value="work">Werk</option>
        <option value="study">Studie</option>
      </select>
      <button type="submit">Toevoegen</button>
    </form>
  );
};

export default TaskInput;