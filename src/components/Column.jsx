/** @format */

import React from "react";
import Task from './Task';
import './Column.css';

const Column = ({ tasks, column }) => {
  return (
    <div className="column">
      <h3>{column.title}</h3>
      <div>
        {
          tasks.map(task => <Task key={task.id} task={task.content} />)
        }
      </div>
    </div>
  )
};

export default Column;
