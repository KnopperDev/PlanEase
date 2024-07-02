import React from 'react';

const TaskList = ({ tasks, updateTaskStatus }) => {
  return (
    <ul>
      {tasks.map((task, index) => (
        <li key={index}>
          {task.title} - {task.duration} uur - {task.deadline} - {task.status}
          <button onClick={() => updateTaskStatus(index, 'done')}>Gedaan</button>
          <button onClick={() => updateTaskStatus(index, 'missed')}>Gemist</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
