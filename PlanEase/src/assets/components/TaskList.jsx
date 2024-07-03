import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faEdit, faSave, faUndo } from '@fortawesome/free-solid-svg-icons';

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
    <ul className="task-list">
      {tasks.map((task, index) => (
        <li key={index} className={`task-item priority-${task.priority}`}>
          {editIndex === index ? (
            <form onSubmit={(e) => {
              e.preventDefault();
              handleEditSubmit(index);
            }} className="edit-form">
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
              <button type="button" onClick={handleEditCancel} className="btn2 btn-cancel">
                <FontAwesomeIcon icon={faTimes} />
              </button>
              <button type="submit" className="btn2 btn-save">
                <FontAwesomeIcon icon={faSave} />
              </button>
            </form>
          ) : (
            <div className="task-content">
              <div className="task-info">
                <strong>{task.title}</strong> - {task.duration} uur - {task.deadline} - {task.status}
                <div className="task-details">
                  Prioriteit: {task.priority} - <span className="category">Categorie: {task.category}</span>
                </div>
              </div>
              <div className="task-actions">
                {task.status !== 'done' && (
                  <button onClick={() => handleStatusChange(index, 'done')} className="btn btn-done" title="Markeer als afgerond">
                    <FontAwesomeIcon icon={faCheck} />
                  </button>
                )}
                {task.status !== 'missed' && (
                  <button onClick={() => handleStatusChange(index, 'missed')} className="btn btn-missed" title="Markeer als gemist">
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                )}
                {(task.status === 'done' || task.status === 'missed') && (
                  <button onClick={() => handleStatusChange(index, 'pending')} className="btn btn-undo" title="Markeer als openstaand">
                    <FontAwesomeIcon icon={faUndo} />
                  </button>
                )}
                <button onClick={() => handleEditClick(index, task)} className="btn btn-edit" title="Bewerk taak">
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