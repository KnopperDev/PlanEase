import React from 'react';

const Schedule = ({ tasks }) => {
  const filteredTasks = tasks.filter(task => task.status !== 'done');

  const sortedTasks = filteredTasks.sort((a, b) => {
    if (a.priority === b.priority) {
      return new Date(a.deadline) - new Date(b.deadline);
    }
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <div className="schedule">
      <h2>Planning</h2>
      {sortedTasks.length === 0 ? (
        <p>Geen taken gepland.</p>
      ) : (
        <ul>
          {sortedTasks.map((task, index) => (
            <li key={index}>
              <strong>{task.title}</strong> - {task.duration} uur - Deadline: {task.deadline}
              <br />
              Prioriteit: {task.priority} - Categorie: {task.category}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Schedule;