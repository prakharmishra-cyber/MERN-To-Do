import React, { useState, useEffect } from 'react';
import './App.css';
import { addTask, getTasks, updateTask, deleteTask, } from "./services/taskServices";


function App() {

  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);

 useEffect(async () => {
  const tasks=await getTasks();
  setTaskList(tasks.data);
  console.log(taskList);
 }, [])


  const handleSubmit = async () => {
    const tt={
      task:task,
    }
    await addTask(tt);
    const tasks=await getTasks();
    setTaskList(tasks.data);
    setTask('');
  }

  const handleInputChange = (e) => {
    setTask(e.target.value);  
  }

  const removeTask = async (index) => {
    await deleteTask(index);
    const tasks=await getTasks();
    setTaskList(tasks.data);
  }

  const EditTask=async(index)=>{
      const temp=prompt('Enter the edited version');
      const tt={
        task:temp,
      }
      await updateTask(index, tt);
      const tasks=await getTasks();
      setTaskList(tasks.data);
  }

  return (
    <div className="App">
      <h1>To Do App</h1>
      <div className="form">
        <input type="text" className="form-input" placeholder="Enter the task" value={task} onChange={handleInputChange} />
        <button className="btn" onClick={handleSubmit}> Add Task</button>
      </div>
      <div className="task-shower">
        {taskList.map((tsk, index) =>
        (
          <div className="task-content" key={index}>
            <button className="task-done" onClick={() => EditTask(tsk._id)}>Edit</button>
             {tsk.task}
            <button className="task-done" onClick={() => removeTask(tsk._id)}>X</button>
          </div>
        )
        )}
      </div>
    </div>
  );
}

export default App;
