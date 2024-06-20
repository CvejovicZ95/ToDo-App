import React, { useState } from 'react';
import "./HomePage.css";
import { useAuthContext } from '../../../context/authContext';
import { useLogout } from '../../../hooks/useLogout';
import { useGetTasksByUser } from '../../../hooks/useGetTasksByUser';

export const HomePage = () => {
  const { authUser } = useAuthContext();
  const { logoutHandler } = useLogout();

  const userId = authUser ? authUser._id : null;

  const { loading, tasks, handleDeleteTask, handleUpdateTask } = useGetTasksByUser(userId);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredTasks = tasks.filter(task =>
    task.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  let welcomeMessage = <h2>Welcome to ToDo list...</h2>;

  if (authUser) {
    welcomeMessage = (
      <h2>{`Welcome ${authUser.username} to your ToDo list!`}</h2>
    );
  }

  return (
    <div className='home-container'>
      <div className='todo-form'>
        <div className='heading-logout'>
          {welcomeMessage}
          <button onClick={logoutHandler} className='logout-btn'>Logout</button>
        </div>
        <form>
          <input type="text" placeholder="Enter your task..." />
          <button type="submit">Add Task</button>
        </form>
      </div>
      <div className='todo-list'>
        <h2>Tasks</h2>
        <input 
          type="text" 
          placeholder="Search tasks by name..." 
          className="search-input"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <ul>
          {loading && <li>Loading tasks...</li>}
          {!loading && filteredTasks.length === 0 && <li>No tasks found...</li>}
          {!loading && filteredTasks.map((task) => (
            <li key={task._id}>
              <span>{task.name}</span>
              <div>
                <button onClick={() => handleUpdateTask(task._id, task.name)}>Edit</button>
                <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
