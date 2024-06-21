import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGetTasksByUser } from '../../hooks/useGetAndDeleteTasksByUser';
import "./UsersTaksks.css"

export const UsersTasks = () => {
    const { userId } = useParams();
    const {  tasks } = useGetTasksByUser(userId);

    return (
        <div className="users-tasks-container">
            <h2 className='heading'>List of Tasks</h2>
            {tasks.length === 0 ? (
                <p>This user has no tasks.</p>
            ) : (
                <ul>
                    {tasks.map(task => (
                        <li key={task._id}>
                            {task.name}
                        </li>
                    ))}
                </ul>
            )}
            <Link to="/users">Back to All Users</Link>
        </div>
    );
};