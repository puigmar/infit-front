/** @format */

import React, { useState, useEffect } from "react";
import "./App.css";
import initialData from "./initial-data";
import Column from "./components/Column";

function App() {
  const [data, setData] = useState(initialData);

  return (
    <div className='App'>
      {data.columnOrder.map((columnId) => {
        const column = data.columns[columnId];
        const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);
        return <Column key={column.id} column={column} tasks={tasks} />;
      })}
    </div>
  );
}

export default App;
