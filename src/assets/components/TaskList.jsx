import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';

const TaskList = ({ tasks, updateTaskStatus, editTask }) => {
  const [editIndex, setEditIndex] = useState(-1);
  const [editTitle, setEditTitle] = useState('');
  const [editDuration, setEditDuration] = useState('');
  const [editDeadline, setEditDeadline] = useState('');
  const [editPriority, setEditPriority] = useState('');
  const [editCategory, setEditCategory] = useState('');

  const handleStatusChange = (index, status) => {
    updateTaskStatus(index, status);
  };

  const handleEditClick = (index, task) => {
    setEditIndex(index);
    setEditTitle(task.title);
    setEditDuration(task.duration);
    setEditDeadline(task.deadline);
    setEditPriority(task.priority);
    setEditCategory(task.category);
  };

  const handleEditCancel = () => {
    setEditIndex(-1);
  };

  const handleEditSubmit = (index) => {
    const updatedTask = {
      title: editTitle,
      duration: editDuration,
      deadline: editDeadline,
      priority: editPriority,
      category: editCategory,
      status: tasks[index].status
    };
    editTask(index, updatedTask);
    setEditIndex(-1);
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
              <select value={editPriority} onChange={(e) => setEditPriority(e.target.value)}>
                <option value="high">Hoog</option>
                <option value="medium">Gemiddeld</option>
                <option value="low">Laag</option>
              </select>
              <select value={editCategory} onChange={(e) => setEditCategory(e.target.value)}>
                <option value="personal">Persoonlijk</option>
                <option value="work">Werk</option>
                <option value="study">Studie</option>
              </select>
              <button type="button" onClick={handleEditCancel}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
              <button type="submit">
                <FontAwesomeIcon icon={faCheck} />
              </button>
            </form>
          ) : (
            <div>
              <strong>{task.title}</strong> - {task.duration} uur - {task.deadline} - {task.status}
              <div className={`task-details priority-${task.priority}`}>
                Prioriteit: {task.priority} - <span className="category">Categorie: {task.category}</span>
              </div>
              <div className="task-buttons">
                {task.status !== 'done' && (
                  <button onClick={() => handleStatusChange(index, 'done')}>
                    <FontAwesomeIcon icon={faCheck} />
                  </button>
                )}
                {task.status !== 'missed' && (
                  <button onClick={() => handleStatusChange(index, 'missed')}>
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                )}
                <button onClick={() => handleEditClick(index, task)}>
                  <FontAwesomeIcon icon={faEdit} />
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