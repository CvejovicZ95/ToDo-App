import React, { useState } from 'react';
import "./HomePage.css";
import { useAuthContext } from '../../../context/authContext';
import { useLogout } from '../../../hooks/useLogout';
import { useGetTasksByUser } from '../../../hooks/useGetAndDeleteTasksByUser';
import { useCreateTaskByUser } from '../../../hooks/useCreateTaskByUser';
import { deleteTask } from '../../../api/tasksApi';
import { useUpdateTask } from '../../../hooks/useEditTaskByUser';

export const HomePage = () => {
  const { authUser } = useAuthContext();
  const { logoutHandler } = useLogout();

  const userId = authUser ? authUser._id : null;

  const { loading, tasks, handleDeleteTask, refetchTasks } = useGetTasksByUser(userId);
  const { loading: creatingTask, handleCreateTask } = useCreateTaskByUser();
  const { updating, handleUpdateTask: handleEditTask } = useUpdateTask();

  const [searchTerm, setSearchTerm] = useState('');
  const [taskName, setTaskName] = useState('');
  const [editTaskId, setEditTaskId] = useState(null); 
  const [newTaskName, setNewTaskName] = useState('');

  const filteredTasks = tasks.filter(task =>
    task.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleTaskNameChange = (e) => {
    setTaskName(e.target.value);
  };

  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    if (!taskName) return;

    const newTask = await handleCreateTask(taskName, userId);
    if (newTask) {
      setTaskName('');
      refetchTasks(); 
    }
  };

  const handleEditClick = (id, currentName) => {
    setEditTaskId(id);
    setNewTaskName(currentName);
  };

  const handleCancelEdit = () => {
    setEditTaskId(null);
    setNewTaskName('');
  };

  const handleUpdate = async (id) => {
    try {
      await handleEditTask(id, newTaskName);
      setEditTaskId(null);
      setNewTaskName('');
      refetchTasks(); 
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      handleDeleteTask(id);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
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
        <form onSubmit={handleTaskSubmit}>
          <input 
            type="text" 
            placeholder="Enter your task..." 
            value={taskName}
            onChange={handleTaskNameChange}
          />
          <button type="submit" disabled={creatingTask}>
            {creatingTask ? 'Adding...' : 'Add Task'}
          </button>
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
              {editTaskId === task._id ? (
                <div>
                  <input 
                    type="text" 
                    value={newTaskName}
                    onChange={(e) => setNewTaskName(e.target.value)}
                  />
                  <div>
                    <button onClick={() => handleUpdate(task._id)}>Save</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                  </div>
                </div>
              ) : (
                <div>
                  <span>{task.name}</span>
                  <div>
                    <button onClick={() => handleEditClick(task._id, task.name)} disabled={updating}>
                      Edit
                    </button>
                    <button onClick={() => handleDelete(task._id)}>Delete</button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

