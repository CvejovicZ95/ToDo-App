import React from 'react';
import { useGetAllUsers } from '../../hooks/useGetTasksAndUsers';
import { Link } from 'react-router-dom';
import { Logout } from '../logout/Logout';
import "./UsersList.css"; 

export const UsersList = () => {
    const { users } = useGetAllUsers();

    const filteredUsers = users.filter(user => user.role === 'user');

    return (
        <div className="users-list">
            <h2>Welcome Admin to all users list</h2>
            <ul>
                {filteredUsers.map(user => (
                    <li key={user._id}>
                        <Link to={`/user-tasks/${user._id}`}>
                            <p>Username: {user.username}</p>
                        </Link>
                    </li>
                ))}
            </ul>
            <Logout/>
        </div>
    );
};
