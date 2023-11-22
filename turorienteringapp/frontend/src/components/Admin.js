import React, { useEffect, useState } from 'react';
import './Admin.css';

const Admin = () => {
    const [users, setUsers] = useState([]);


    //------------------------------------------->
    
    // Fetch Users from the backend  and set them in colom lista 
    const fetchUsers = async () => {
        try {
            // Retrieve the token from local storage
            const token = localStorage.getItem('token');

            // If there's no token, throw an error or handle as needed
            if (!token) {
                throw new Error('No token found');
            }

            const response = await fetch('http://localhost:8000/api/v1/users', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();

            if (response.ok) {
                setUsers(data.data.users);
            } else {
                // If the status code is not ok, log the status and the message
                console.error(`Failed to fetch users: ${data.message}`);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    //------------------------------------------------->

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="admin-container">
            <div className="admin-column">
                <h2>Users</h2>
                <ul>
                    {users.map((user, index) => (
                        <li key={user._id}>{index + 1}. {user.firstName} {user.lastName}</li>
                    ))}
                </ul>
            </div>

            <div className="admin-column-divider"></div>

            <div className="admin-column">
                <h2>Routes</h2>
                {/* Routes implementation will be added here later............... */}
            </div>
        </div>
    );
};

export default Admin;
