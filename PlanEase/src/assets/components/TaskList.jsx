import React, { useState } from 'react';

const TaskList = ({ tasks, updateTaskStatus, editTask }) => {
  const [editIndex, setEditIndex] = useState(-1);
  const [editTitle, setEditTitle] = useState('');
  const [editDuration, setEditDuration] = useState('');
  const [editDeadline, setEditDeadline] = useState('');

  const handleStatusChange = (index, status) => {
    updateTaskStatus(index, status);
  };

  const handleEditClick = (index, title, duration, deadline) => {
    setEditIndex(index);
    setEditTitle(title);
    setEditDuration(duration);
    setEditDeadline(deadline);
  };

  const handleEditCancel = () => {
    setEditIndex(-1);
    setEditTitle('');
    setEditDuration('');
    setEditDeadline('');
  };

  const handleEditSubmit = (index) => {
    const updatedTask = {
      title: editTitle,
      duration: editDuration,
      deadline: editDeadline,
      status: tasks[index].status // Behoud de oorspronkelijke status
    };
    editTask(index, updatedTask);
    setEditIndex(-1);
    setEditTitle('');
    setEditDuration('');
    setEditDeadline('');
  };

  return (
    <ul>
      {tasks.map((task, index) => (
        <li key={index}>
          {editIndex === index ? (
            <form onSubmit={() => handleEditSubmit(index)}>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                required
              />
              <input
                type="number"
                value={editDuration}
                onChange={(e) => setEditDuration(e.target.value)}
                required
              />
              <input
                type="date"
                value={editDeadline}
                onChange={(e) => setEditDeadline(e.target.value)}
                required
              />
              <button type="button" onClick={handleEditCancel}>Annuleren</button>
              <button type="submit">Opslaan</button>
            </form>
          ) : (
            <div>
              <strong>{task.title}</strong> - {task.duration} uur - {task.deadline} - {task.status}
              <div>
                {task.status !== 'done' && (
                  <button onClick={() => handleStatusChange(index, 'done')}>Gedaan</button>
                )}
                {task.status !== 'missed' && (
                  <button onClick={() => handleStatusChange(index, 'missed')}>Gemist</button>
                )}
                <button onClick={() => handleEditClick(index, task.title, task.duration, task.deadline)}>Bewerken</button>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
