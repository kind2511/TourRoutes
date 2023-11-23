import React, { useEffect, useState } from 'react';
import './Admin.css';

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [routes, setRoutes] = useState([]);

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

    // Fetch Routes from the backend
    const fetchRoutes = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Authentication token not found');
            }
            const response = await fetch('http://localhost:8000/api/v1/tourRoutes', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (response.ok) {
                setRoutes(data.data.tourRoutes);
            }
        } catch (error) {
            console.error('Error fetching routes:', error);
        }
    };

    // Call both functions once the when the component first mounted 
    useEffect(() => {
        fetchUsers();
        fetchRoutes();
    }, []);

    //------------------------------------------------------------>


    return (
        <div className="admin-container">
            <div className="admin-column">
                <h2>Users:</h2>
                <ul>
                    {users.map((user, index) => (
                        <li key={user._id}>{index + 1}. {user.firstName} {user.lastName}
                        <button className="admin-users-delete-button">Delete</button>
                        </li> //render users as list
                    ))}
                </ul>
            </div>

            <div className="admin-column-divider"></div>

            <div className="admin-column">
                <h2>Routes:</h2>
                <ul>
                    {routes.map((route, index) => (
                        <li key={route._id}>{index + 1}. {route.name}, ID: {route._id}
                        <button className="admin-routes-delete-button">Delete</button>
                        </li> //render routes as list
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Admin;
