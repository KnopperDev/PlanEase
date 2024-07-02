import React, { useState, useEffect } from 'react';
import TaskInput from './assets/components/TaskInput';
import TaskList from './assets/components/TaskList';
import Schedule from './assets/components/Schedule';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('deadline');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const updateTaskStatus = (index, status) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, status } : task
    );
    setTasks(updatedTasks);
  };

  const editTask = (index, updatedTask) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = updatedTask;
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  // Functie om taken te sorteren
  const sortTasks = (tasks) => {
    return tasks.sort((a, b) => {
      if (sortBy === 'deadline') {
        return new Date(a.deadline) - new Date(b.deadline);
      } else if (sortBy === 'priority') {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        if (a.priority !== b.priority) {
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        } else {
          // Als prioriteiten gelijk zijn, sorteer dan op deadline
          return new Date(a.deadline) - new Date(b.deadline);
        }
      }
    });
  };

  const sortedAndFilteredTasks = sortTasks(filteredTasks);

  return (
    <div className="container">
      <h1>PlanEase</h1>
      <TaskInput addTask={addTask} />
      <div>
        <label htmlFor="filter">Filter taken: </label>
        <select id="filter" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">Alle</option>
          <option value="pending">Openstaand</option>
          <option value="done">Afgerond</option>
          <option value="missed">Gemist</option>
        </select>
        <label htmlFor="sort">Sorteer op: </label>
        <select id="sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="deadline">Datum</option>
          <option value="priority">Prioriteit</option>
        </select>
      </div>
      <TaskList 
        tasks={sortedAndFilteredTasks} 
        updateTaskStatus={updateTaskStatus} 
        editTask={editTask} 
      />
      <Schedule tasks={sortedAndFilteredTasks} />
    </div>
  );
};

export default App;