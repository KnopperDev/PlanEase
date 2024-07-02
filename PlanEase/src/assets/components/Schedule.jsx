import React from 'react';

const Schedule = ({ tasks }) => {
  // Hier zou je een planning genereren op basis van de taken
  return (
    <div className="schedule">
      <h2>Planning</h2>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task.title} - {task.duration} uur - {task.deadline} - {task.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Schedule;
