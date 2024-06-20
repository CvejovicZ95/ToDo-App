import React from 'react';
import { useGetAllUsers } from '../../hooks/useGetTasksAndUsers'; 

export const UsersList = () => {
    const { loading, users } = useGetAllUsers();

    if (loading) return <p>Loading users...</p>;

    return (
        <div>
            <h2>All Users</h2>
            <ul>
                {users.map(user => (
                    <li key={user._id}>
                        <p>Username: {user.username}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

