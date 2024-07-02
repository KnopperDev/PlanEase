import React, { useState } from 'react';
import TaskInput from './assets/components/TaskInput';
import TaskList from './assets/components/TaskList';
import Schedule from './assets/components/Schedule';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const updateTaskStatus = (index, status) => {
    const updatedTasks = tasks.map((task, i) => 
      i === index ? { ...task, status } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="container">
      <h1>PlanEase</h1>
      <TaskInput addTask={addTask} />
      <TaskList tasks={tasks} updateTaskStatus={updateTaskStatus} />
      <Schedule tasks={tasks} />
    </div>
  );
};

export default App;
