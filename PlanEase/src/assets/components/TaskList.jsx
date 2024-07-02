import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';

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
            <form onSubmit={(e) => {
              e.preventDefault();
              handleEditSubmit(index);
            }}>
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
              <button type="button" onClick={handleEditCancel}>
                <FontAwesomeIcon icon={faTimes} /> {/* Annuleren met icoon */}
              </button>
              <button type="submit">
                <FontAwesomeIcon icon={faCheck} /> {/* Opslaan met icoon */}
              </button>
            </form>
          ) : (
            <div>
              <strong>{task.title}</strong> - {task.duration} uur - {task.deadline} - {task.status}
              <div>
                {task.status !== 'done' && (
                  <button onClick={() => handleStatusChange(index, 'done')}>
                    <FontAwesomeIcon icon={faCheck} /> {/* Gedaan met icoon */}
                  </button>
                )}
                {task.status !== 'missed' && (
                  <button onClick={() => handleStatusChange(index, 'missed')}>
                    <FontAwesomeIcon icon={faTimes} /> {/* Gemist met icoon */}
                  </button>
                )}
                <button onClick={() => handleEditClick(index, task.title, task.duration, task.deadline)}>
                  <FontAwesomeIcon icon={faEdit} /> {/* Bewerken met icoon */}
                </button>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
