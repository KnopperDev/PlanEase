import React from 'react';

const Schedule = ({ tasks }) => {
  // Filter taken die niet de status "done" hebben
  const filteredTasks = tasks.filter(task => task.status !== 'done');

  return (
    <div className="schedule">
      <h2>Planning</h2>
      {filteredTasks.length === 0 ? (
        <p>Geen taken gepland.</p>
      ) : (
        <ul>
          {filteredTasks.map((task, index) => (
            <li key={index}>
              <strong>{task.title}</strong> - {task.duration} uur - Deadline: {task.deadline}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Schedule;
