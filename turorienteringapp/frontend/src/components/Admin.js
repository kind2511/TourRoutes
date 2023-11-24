import React, { useEffect, useState } from 'react';
import './Admin.css';
import AdminDeleteUser from './AdminDeleteUser';
import AdminDeleteRoute from './AdminDeleteRoute';
import AdminPromoteUser from './AdminPromoteUser';

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

    /* 
     * Function to promote user by the Admin 
     */

    const handlePromoteUser = async (userId) => {
        try {

            // Confirmation dialog
            const isConfirmed = window.confirm("Are you sure you want to promote this user to admin?");
            if (!isConfirmed) {
                return;
            }

            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No authentication token found');
                return;
            }

            const response = await fetch(`http://localhost:8000/api/v1/users/promoteToAdmin/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();
            if (response.ok) {
                console.log("User promoted successfully:", data);
                // Success message
                window.alert("User Promoted to admin successfully");
            } else {
                console.error('Failed to promote user:', data.message);
            }
        } catch (error) {
            console.error('Error promoting user:', error);
        }
    };

    //------------------------------------------------------------>

    /* 
     * Function to delete route by the Admin 
     */

    const handleDeleteRoute = async (routeId) => {
        try {
            // Confirmation dialog
            const isConfirmed = window.confirm("Are you sure you want to delete this route?");
            if (!isConfirmed) {
                return;
            }

            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No authentication token found');
                return;
            }

            const response = await fetch(`http://localhost:8000/api/v1/tourRoutes/${routeId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();
            if (response.ok) {
                console.log("Route deleted successfully:", data);
                setRoutes(routes.filter(route => route._id !== routeId)); // UI filter to remove the route directly from screen
                // Success message
                window.alert("Route deleted successfully");
            } else {
                console.error('Failed to delete route:', data.message);
            }
        } catch (error) {
            console.error('Error deleting route:', error);
        }
    };

    //------------------------------------------------------------>

    /* 
     * Function to delete user by the Admin 
     */

    const handleDeleteUser = async (userId) => {
        try {

            // Confirmation dialog
            const isConfirmed = window.confirm("Are you sure you want to delete this user?");
            if (!isConfirmed) {
                return;
            }

            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No authentication token found');
                return;
            }

            const response = await fetch(`http://localhost:8000/api/v1/users/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();
            if (response.ok) {
                console.log("User deleted successfully:", data);
                setUsers(users.filter(user => user._id !== userId)); // UI filter to remove the user directly from screen
                // Success message
                window.alert("User deleted successfully");
            } else {
                console.error('Failed to delete user:', data.message);
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    //------------------------------------------------------------>



    return (
        <div className="admin-container">
            <div className="admin-column">
                <h2>Users:</h2>
                <ul>
                    {users.map((user, index) => (
                        <li key={user._id}>
                            {index + 1}. {user.firstName} {user.lastName}
                            <div className="admin-button-container">{/*Added div for each user list item*/}
                                <AdminDeleteUser userId={user._id} onDelete={handleDeleteUser} />
                                <AdminPromoteUser userId={user._id} onPromote={handlePromoteUser} />
                            </div>
                        </li> // Render users as a list
                    ))}
                </ul>
            </div>

            <div className="admin-column-divider"></div>

            <div className="admin-column">
                <h2>Routes:</h2>
                <ul>
                    {routes.map((route, index) => (
                        <li key={route._id}>
                            {index + 1}. {route.name}, ID: {route._id}
                            <AdminDeleteRoute routeId={route._id} onDelete={handleDeleteRoute} />
                        </li> // Render routes as a list
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Admin;