import React, { useState } from 'react';

const TaskInput = ({ addTask }) => {
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && duration && deadline) {
      addTask({ title, duration, deadline, status: 'pending' });
      setTitle('');
      setDuration('');
      setDeadline('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Wat moet je doen?" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
      />
      <input 
        type="number" 
        placeholder="Duur (uren)" 
        value={duration} 
        onChange={(e) => setDuration(e.target.value)} 
      />
      <input 
        type="date" 
        value={deadline} 
        onChange={(e) => setDeadline(e.target.value)} 
      />
      <button type="submit">Toevoegen</button>
    </form>
  );
};

export default TaskInput;
